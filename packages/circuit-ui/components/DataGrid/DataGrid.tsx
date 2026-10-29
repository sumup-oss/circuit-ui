'use client';

import {
  useCallback,
  useEffect,
  useRef,
  type TableHTMLAttributes,
  useId,
  type Ref,
  useState,
} from 'react';
import { TableHeader } from './components/TableHeader/TableHeader.js';
import { Row } from './components/Row/Row.js';
import {
  isArrowDown,
  isArrowLeft,
  isArrowRight,
  isArrowUp,
  isControlEnd,
  isControlHome,
  isEnd,
  isHome,
  isPageDown,
  isPageUp,
} from '../../util/key-codes.js';
import classes from './DataGrid.module.css';
import { clsx } from '../../styles/clsx.js';
import { getListItemFragmentContent } from './DataGridService.js';
import { applyMultipleRefs } from '../../util/refs.js';
import type {
  Column,
  MobileConfig,
  WithColumnPicker,
  WithSearchBar,
} from './types.js';
import { useMedia } from '../../hooks/useMedia/index.js';
import { ListItemGroup } from '../ListItemGroup/index.js';
import type { Locale } from '../../util/i18n.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';
import { utilClasses } from '../../styles/utility.js';
import type { ClickEvent } from '../../types/events.js';
import { FilterBar } from './components/FilterBar/FilterBar.js';

export interface DataGridProps<P>
  extends TableHTMLAttributes<HTMLDivElement>,
    WithSearchBar,
    WithColumnPicker {
  /**
   * The columns to display, in order. Each column defines its header label,
   * data type, and how to read and render the cell value from a row.
   */
  columns: Column<P>[];
  /**
   * The rows of the grid, one object per row. Columns use this data to
   * render their cell values.
   */
  data: P[];
  /**
   * Label to be used as the table's caption.
   * Captions help screen reader users understand what the table is about
   * and decide if they want to read it.
   */
  label: string;
  /**
   * Configuration for the mobile layout. When provided, the grid renders as
   * a list of items on viewports at or below `mobileBreakpoint`. Use `slots`
   * to map column ids to the list item's content areas.
   * If omitted, the grid is displayed as a table on all viewports.
   */
  mobileConfig?: MobileConfig<P>;
  /**
   * The maximum viewport width (in pixels) at which the mobile layout is
   * used. Only applies when `mobileConfig` is provided.
   * @default 768
   */
  mobileBreakpoint?: number;
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   */
  formattingLocale?: Locale;
  /**
   * A ref forwarded to the underlying `table` element (or to the list
   * element when the mobile layout is rendered).
   */
  ref?: Ref<HTMLTableElement>;
}

/**
 * The DataGrid component displays tabular data and allows users to navigate,
 * edit, and act on records directly within the table.
 */
export function DataGrid<P>({
  data,
  columns,
  className,
  label,
  mobileConfig,
  formattingLocale: customFormattingLocale,
  mobileBreakpoint = 768,
  searchBarConfig,
  ref,
  columnPickerConfig,
  ...props
}: DataGridProps<P>) {
  const rowId = useId();
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const savedInStorage = sessionStorage
      .getItem(`cui-grid-${label}-visible-columns`)
      ?.split('|');

    return savedInStorage
      ? columns.filter(({ id }) => savedInStorage.includes(id))
      : columns;
  });

  const isMobile = useMedia(`(max-width: ${mobileBreakpoint}px)`);
  const { formattingLocale } = useI18n({
    formattingLocale: customFormattingLocale,
  });
  const internalRef = useRef<HTMLTableElement>(null);

  const handleClickEvent = useCallback((event: MouseEvent) => {
    const table = internalRef.current;
    const target = (event.target as HTMLTableCellElement).closest('th, td');
    if (!target || !table) {
      return;
    }
    const activeCell = table?.querySelector('[tabindex="0"]');
    const currentX = Number(activeCell?.getAttribute('data-x'));
    const currentY = Number(activeCell?.getAttribute('data-y'));
    const newX = Number(target?.getAttribute('data-x'));
    const newY = Number(target?.getAttribute('data-y'));
    if (newX !== currentX || newY !== currentY) {
      const newActiveCell = table.querySelector(
        `[data-x="${newX}"][data-y="${newY}"]`,
      ) as HTMLTableCellElement;

      activeCell?.setAttribute('tabindex', '-1');
      newActiveCell?.setAttribute('tabindex', '0');
      if (!newActiveCell.contains(document.activeElement)) {
        newActiveCell?.focus();
      }
    }
  }, []);

  const handleKeyboardEvent = useCallback(
    (event: KeyboardEvent) => {
      const table = internalRef.current;
      if (!table) {
        return;
      }
      const activeCell = table?.querySelector('[tabindex="0"]');
      const currentX = Number(activeCell?.getAttribute('data-x'));
      const currentY = Number(activeCell?.getAttribute('data-y'));
      let newX = currentX;
      let newY = currentY;
      if (isArrowUp(event) && currentY > 0) {
        newY = currentY - 1;
      }
      if (isArrowDown(event) && currentY < data.length) {
        newY = currentY + 1;
      }
      if (isArrowRight(event) && currentX < visibleColumns.length) {
        newX = currentX + 1;
      }
      if (isArrowLeft(event) && currentX > 0) {
        newX = currentX - 1;
      }
      if (isPageUp(event)) {
        newY = Math.max(0, currentY - 5);
      }
      if (isPageDown(event)) {
        newY = Math.min(data.length, currentY + 5);
      }
      if (isHome(event)) {
        newX = 0;
      }
      if (isEnd(event)) {
        newX = visibleColumns.length - 1;
      }
      if (isControlHome(event)) {
        newY = 0;
        newX = 0;
      }
      if (isControlEnd(event)) {
        newY = data.length;
        newX = visibleColumns.length - 1;
      }
      if (newX !== currentX || newY !== currentY) {
        const newActiveCell = table.querySelector(
          `[data-x="${newX}"][data-y="${newY}"]`,
        ) as HTMLTableCellElement;

        activeCell?.setAttribute('tabindex', '-1');
        newActiveCell?.setAttribute('tabindex', '0');
        newActiveCell?.focus();
      }
    },
    [data, visibleColumns],
  );

  useEffect(() => {
    internalRef.current?.addEventListener('keydown', handleKeyboardEvent);
    internalRef.current?.addEventListener('click', handleClickEvent);
    return () => {
      internalRef.current?.removeEventListener('keydown', handleKeyboardEvent);
      internalRef.current?.removeEventListener('click', handleClickEvent);
    };
  }, [handleKeyboardEvent, handleClickEvent]);

  useEffect(() => {
    columns.forEach(({ maxWidth, minWidth, id, type }) => {
      if (type.name === 'row-actions' || type.name === 'quick-actions') {
        return;
      }
      if (maxWidth) {
        internalRef.current?.style.setProperty(
          `--${id}-col-max-width`,
          `${maxWidth}px`,
        );
      }
      if (minWidth) {
        internalRef.current?.style.setProperty(
          `--${id}-col-min-width`,
          `${minWidth}px`,
        );
      }
    });
  }, [columns]);

  const onVisibleColumnChange = useCallback(
    (value: string[]) => {
      const newValue = columns.filter(({ id }) => value.includes(id));
      setVisibleColumns(newValue);
      sessionStorage.setItem(
        `cui-grid-${label}-visible-columns`,
        value.join('|'),
      );
    },
    [columns, label],
  );

  return (
    <div className={classes.wrapper}>
      {(searchBarConfig || columnPickerConfig) && (
        <FilterBar
          searchBarConfig={searchBarConfig}
          onVisibleColumnChange={onVisibleColumnChange}
          columns={columns}
          visibleColumns={visibleColumns}
          isMobile={isMobile}
          columnPickerConfig={columnPickerConfig}
        />
      )}
      {isMobile && mobileConfig ? (
        <ListItemGroup
          ref={ref}
          label={label}
          className={classes.list}
          hideLabel={mobileConfig.hideLabel}
          items={data.map((value, index) => ({
            key: `${rowId}-${index}`,
            variant: 'action',
            onClick: (event: ClickEvent) =>
              mobileConfig.onClick?.(event, value),
            ...getListItemFragmentContent(
              columns,
              value,
              formattingLocale,
              mobileConfig.slots,
              `${rowId}-${index}`,
            ),
          }))}
        />
      ) : (
        <div className={classes.table}>
          <table
            ref={applyMultipleRefs(ref, internalRef)}
            className={clsx(classes.base, className)}
            // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: grid is valid role for table
            role="grid"
            aria-colcount={columns.length}
            aria-rowcount={data.length}
            {...props}
          >
            <caption className={utilClasses.hideVisually}>{label}</caption>
            <TableHeader columns={visibleColumns} />

            <tbody>
              {data.map((value, index) => (
                <Row
                  rowIndex={index}
                  key={`${rowId}-${index}`}
                  columns={visibleColumns}
                  formattingLocale={formattingLocale}
                  data={value}
                  className={classes.row}
                  aria-rowindex={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
