import { type HTMLAttributes, memo, useCallback, useMemo, useRef } from 'react';
import { ListItem } from '../../../ListItem/index.js';
import { Cell } from '../Cell/Cell.js';
import classes from './MobileRow.module.css';
import type { Column, MobileConfig } from '../../types.js';
import { getListItemFragmentContent } from '../../DataGridService.js';
import type { Locale } from '../../../../util/i18n.js';
import { isEnter, isSpacebar } from '../../../../util/key-codes.js';
import { RowActions } from '../DefaultComponents/RowActions/RowActions.js';
import type { ClickEvent } from '../../../../types/events.js';

type MobileRowProps<P> = HTMLAttributes<HTMLTableRowElement> & {
  rowIndex: number;
  mobileConfig: MobileConfig<P>;
  columns: Column<P>[];
  formattingLocale: Locale;
  data: P;
  rowId: string;
};

const MobileRowComponent = <P,>({
  rowIndex,
  mobileConfig,
  columns,
  formattingLocale,
  rowId,
  data,
  onClick,
  ...props
}: MobileRowProps<P>) => {
  const cellData = useMemo(
    () =>
      getListItemFragmentContent(
        columns,
        data,
        formattingLocale,
        mobileConfig.slots,
        rowId,
      ),
    [columns, data, formattingLocale, mobileConfig.slots, rowId],
  );

  const menuRef = useRef<HTMLDivElement>(null);

  const accessibleActions = useMemo(() => {
    if (mobileConfig.menu) {
      const { actions: rowActions } = mobileConfig.menu;
      const actions =
        typeof rowActions === 'function' ? rowActions(data) : rowActions;
      return actions.map(
        ({
          'aria-description': description,
          onClick: actionOnClick,
          ...other
        }) => ({
          ...other,
          onClick: (event: ClickEvent) => actionOnClick?.(event, data),
          'aria-description': description(data),
        }),
      );
    }
    return [];
  }, [mobileConfig.menu, data]);

  const handleKeydown = useCallback(
    (event: React.KeyboardEvent<HTMLTableCellElement>) => {
      if (menuRef.current?.contains(event.target as Node)) {
        return;
      }
      if (isEnter(event) || isSpacebar(event)) {
        mobileConfig.onClick?.(event, data);
      }
    },
    [mobileConfig.onClick, data],
  );

  const handleOnClick = useCallback(
    (event: ClickEvent) => {
      if (menuRef.current?.contains(event.target as Node)) {
        return;
      }
      mobileConfig.onClick?.(event, data);
    },
    [mobileConfig.onClick, data],
  );

  return (
    <tr {...props} className={classes.base}>
      <Cell
        tabIndex={rowIndex === 0 ? 0 : -1}
        role="gridcell"
        aria-colindex={1}
        data-x={0}
        data-y={rowIndex}
        className={classes.cell}
        onKeyDown={handleKeydown}
        onClick={handleOnClick}
      >
        <ListItem className={classes.item} {...cellData} />
        {mobileConfig.menu && accessibleActions.length > 0 && (
          <div className={classes.menu} ref={menuRef}>
            <RowActions
              label={mobileConfig.menu.label}
              labelDescription={mobileConfig.menu.labelDescription(data)}
              actions={accessibleActions}
            />
          </div>
        )}
      </Cell>
    </tr>
  );
};

export const MobileRow = memo(MobileRowComponent) as typeof MobileRowComponent;
