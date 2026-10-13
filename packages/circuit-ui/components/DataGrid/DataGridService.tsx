import type {
  BasicType,
  Column,
  ColumnType,
  MobileSlots,
  Option,
} from './types.js';
import type { PropsWithChildren, ReactNode } from 'react';
import { getInitialState } from '../Timestamp/TimestampService.js';
import { QuickActions } from './components/DefaultComponents/QuickActions/QuickActions.js';
import styles from './DataGrid.module.css';
import { RowActions } from './components/DefaultComponents/RowActions/RowActions.js';
import { formatNumber } from '@sumup-oss/intl';
import type { Locale } from '../../util/i18n.js';
import {
  isArray,
  isNil,
  isNumberArray,
  isObject,
  isString,
  isStringArray,
  isStringOrNumber,
} from '../../util/type-check.js';
import { Temporal } from 'temporal-polyfill';
import type { ClickEvent } from '../../types/events.js';
import { CircuitError } from '../../util/errors.js';
import { Checkmark, Close } from '@sumup-oss/icons';

function ListCellWrapper({ children }: PropsWithChildren) {
  return <div className={styles['list-cell-wrapper']}>{children}</div>;
}

export function isValidZonedDateTimeInput(value: string): boolean {
  try {
    Temporal.ZonedDateTime.from(value);
    return true;
  } catch {
    return false;
  }
}

export function defaultFormatFn<P>(
  type: ColumnType<P>,
  data: P,
  value: BasicType,
  locale: Locale,
  uniqueId: string,
): ReactNode {
  const { name, ...rest } = type;

  if (name !== 'row-actions' && name !== 'quick-actions' && isNil(value)) {
    return null;
  }

  if (name === 'date') {
    if (isString(value) && isValidZonedDateTimeInput(value)) {
      return getInitialState({
        datetime: value,
        formattingLocale: locale,
        formatStyle: 'short',
        includeTime: false,
        ...rest,
      }).label;
    }
    throw new CircuitError(
      'DataGrid',
      'The date provided is not a valid ZonedDateTime date.',
    );
  }
  if (name === 'number') {
    if (!isStringOrNumber(value)) {
      throw new CircuitError(
        'DataGrid',
        'The value provided is not a number or string.',
      );
    }

    if (Number.isNaN(Number(value))) {
      throw new CircuitError(
        'DataGrid',
        'The value provided is not a valid number.',
      );
    }
    let numberValue = String(value);

    if ('formattingOptions' in rest) {
      const { formattingOptions } = rest;
      numberValue = formatNumber(Number(value), locale, formattingOptions);
    }

    return numberValue;
  }
  if (name === 'boolean') {
    if (
      typeof value !== 'boolean' &&
      !(value === 'true' || value === 'false')
    ) {
      throw new CircuitError(
        'DataGrid',
        'Column type `boolean` must either be boolean or "true"/"false" strings.',
      );
    }
    const actualValue = typeof value === 'boolean' ? value : value === 'true';
    const { accessibleLabel } = type;
    return (
      <>
        {actualValue ? (
          <Checkmark
            color="var(--cui-fg-success)"
            size="16"
            aria-label={accessibleLabel(actualValue)}
          />
        ) : (
          <Close
            color="var(--cui-fg-danger)"
            size="16"
            aria-label={accessibleLabel(actualValue)}
          />
        )}
      </>
    );
  }
  if (name === 'singleSelection') {
    const { options } = type;
    if (
      !isOptionArray(options) &&
      !('getOptionValue' in rest) &&
      !('getOptionLabel' in rest)
    ) {
      throw new CircuitError(
        'DataGrid',
        'Column type `singleSelection` options require `getOptionValue` and `getOptionLabel`.',
      );
    }
    if (!isStringOrNumber(value)) {
      throw new CircuitError(
        'DataGrid',
        'Column type `singleSelection` requires a string or number value.',
      );
    }
    const { render, getOptionLabel, getOptionValue } = type;
    const optionsToUse = isOptionArray(options)
      ? options
      : options.map((option) => ({
          label: getOptionLabel?.(option) ?? '',
          value: getOptionValue?.(option) ?? '',
        }));

    const selectedItem = optionsToUse.find(
      (option) => value === option.value,
    ) ?? {
      value,
      label: String(value),
    };

    if (render) {
      return render(selectedItem);
    }

    return selectedItem.label;
  }
  if (name === 'multiSelection') {
    const { options } = type;
    if (
      !isOptionArray(options) &&
      !('getOptionValue' in rest) &&
      !('getOptionLabel' in rest)
    ) {
      throw new CircuitError(
        'DataGrid',
        'Column type `singleSelection` options require `getOptionValue` and `getOptionLabel`.',
      );
    }
    if (!isStringArray(value) && !isNumberArray(value)) {
      throw new CircuitError(
        'DataGrid',
        'Column type `multiSelection` requires an array of string or number values.',
      );
    }

    if (value.length === 0) {
      return null;
    }

    const { render, getOptionValue, getOptionLabel } = type;

    const optionsToUse = isOptionArray(options)
      ? options
      : options.map((option) => ({
          label: getOptionLabel?.(option) ?? '',
          value: getOptionValue?.(option) ?? '',
        }));

    return render ? (
      <ListCellWrapper>
        {optionsToUse
          .filter((option) => String(value).includes(String(option.value)))
          .map((item) => render(item, `${uniqueId}-${item.value}`))}
      </ListCellWrapper>
    ) : (
      optionsToUse
        .filter((option) => String(value).includes(String(option.value)))
        .map((option) => option.label)
        .join(', ')
    );
  }
  if (name === 'row-actions' && 'actions' in rest && 'label' in rest) {
    const { actions: rowActions, label, labelDescription } = rest;
    const actions =
      rowActions instanceof Function ? rowActions(data) : rowActions;
    const accessibleActions = actions.map((action) => {
      const { 'aria-description': description, onClick, ...other } = action;
      const customOnClick = (event: ClickEvent) =>
        action.onClick?.(event, data);
      return {
        ...other,
        onClick: customOnClick,
        'aria-description': description(data),
      };
    });
    return (
      <RowActions
        actions={accessibleActions}
        label={label}
        labelDescription={labelDescription(data)}
      />
    );
  }

  if (name === 'quick-actions' && 'actions' in rest && !('label' in rest)) {
    const { actions: quickActions } = rest;
    if (quickActions.length > 4) {
      throw new CircuitError(
        'DataGrid',
        'The number of quick actions must not surpass 4.',
      );
    }
    const actions =
      quickActions instanceof Function ? quickActions(data) : quickActions;

    return <QuickActions actions={actions} value={data} />;
  }

  return value as ReactNode;
}

export function getListItemFragmentContent<P>(
  columns: Column<P>[],
  data: P,
  locale: Locale,
  mobileConfig: MobileSlots,
  uniqueId: string,
) {
  const result: Record<string, ReactNode> = {};
  (Object.keys(mobileConfig) as Array<keyof MobileSlots>).forEach((key) => {
    const colKey = mobileConfig[key];
    if (colKey) {
      const dataElements = colKey.split(';');
      if (dataElements.length === 1) {
        const column = columns.find((col) => col.id === dataElements[0]);
        if (column) {
          const { type, getValue } = column;
          const value = getValue
            ? getValue(data)
            : (data[dataElements[0] as keyof P] as BasicType);
          result[key] =
            type.name === 'custom'
              ? type.render?.(data)
              : defaultFormatFn(type, data, value, locale, uniqueId);
        }
      }

      if (dataElements.length > 1) {
        result[key] = intersperseWithDot(
          dataElements
            .map((element) => {
              const column = columns.find((col) => col.id === element);
              if (column) {
                const { type, getValue } = column;
                const value = getValue
                  ? getValue(data)
                  : (data[element as keyof P] as BasicType);
                return type.name === 'custom'
                  ? type.render?.(data)
                  : defaultFormatFn(type, data, value, locale, uniqueId);
              }
              return null;
            })
            .filter(Boolean),
        );
      }
    }
  });

  return result as {
    leadingComponent?: ReactNode;
    label: ReactNode;
    details?: ReactNode;
    trailingDetails?: ReactNode;
    trailingLabel?: ReactNode;
  };
}

function intersperseWithDot(elements: ReactNode[]) {
  return (
    <>
      {elements.map((el, i) =>
        i === 0 || (i > 0 && isNil(el))
          ? [el]
          : [<>&nbsp;&middot;&nbsp;</>, el],
      )}
    </>
  );
}

function isOption(value?: unknown): value is Option {
  return (
    isObject(value) && isStringOrNumber(value.value) && isString(value.label)
  );
}

export function isOptionArray(value?: unknown): value is Option[] {
  return isArray(value) && value.every(isOption);
}

export function getAllFocusableElements(parent: HTMLElement | null) {
  if (!parent) {
    return [];
  }

  return parent.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)',
  );
}
