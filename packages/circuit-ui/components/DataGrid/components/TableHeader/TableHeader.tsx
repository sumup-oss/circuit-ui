import { Sort, SortAscending, SortDescending } from '@sumup-oss/icons';
import { Cell } from '../Cell/Cell.js';
import { Body } from '../../../Body/index.js';
import { clsx } from '../../../../styles/clsx.js';
import { utilClasses } from '../../../../styles/utility.js';
import { memo, type HTMLAttributes, type KeyboardEvent } from 'react';
import { isEnter, isSpacebar } from '../../../../util/key-codes.js';
import type { Column, SortValue } from '../../types.js';
import { getNextSort } from './TableHeaderService.js';
import classes from './TableHeader.module.css';

export type TableHeaderProps<P> = Omit<
  HTMLAttributes<HTMLTableRowElement>,
  'onChange'
> & {
  columns: Column<P>[];
  /**
   * The current sorting of the data.
   */
  sort?: SortValue;
  /**
   * Called when the user sorts by a column. Sorting is only available when
   * this is provided.
   */
  onSortChange?: (sort?: SortValue) => void;
};

const SORT_ICONS = { ascending: SortAscending, descending: SortDescending };

function TableHeaderComponent<P>({
  columns,
  sort,
  onSortChange,
  ...rest
}: TableHeaderProps<P>) {
  return (
    <thead>
      <tr className={classes.base} {...rest}>
        {columns.map(({ label, id, type, sortable }, index) => {
          const isSortable = Boolean(sortable && onSortChange);
          const direction = sort?.columnId === id ? sort.direction : undefined;
          const SortIcon = direction ? SORT_ICONS[direction] : Sort;
          const handleSort = () => onSortChange?.(getNextSort(id, sort));
          const sortProps = isSortable
            ? {
                onClick: handleSort,
                onKeyDown: (event: KeyboardEvent<HTMLTableCellElement>) => {
                  if (isEnter(event) || isSpacebar(event)) {
                    event.preventDefault();
                    handleSort();
                  }
                },
              }
            : undefined;
          const title = (
            <Body
              as="span"
              size="s"
              weight="bold"
              color="subtle"
              className={clsx(
                type.name === 'row-actions' && utilClasses.hideVisually,
                classes.title,
              )}
              title={label}
            >
              {label}
            </Body>
          );

          return (
            <Cell
              as="th"
              role="columnheader"
              key={`${id}-col-header`}
              data-x={index}
              data-y={0}
              tabIndex={index === 0 ? 0 : -1}
              aria-sort={isSortable ? (direction ?? 'none') : undefined}
              className={clsx(
                classes.cell,
                type.name === 'quick-actions' && classes['align-right'],
                isSortable && classes.sortable,
                direction && classes.sorted,
              )}
              style={{
                maxWidth: `var(--${id}-col-max-width)`,
                minWidth: `var(--${id}-col-min-width)`,
              }}
              {...sortProps}
            >
              {isSortable ? (
                <div className={classes['sort-content']}>
                  {title}
                  <SortIcon
                    aria-hidden="true"
                    size="16"
                    className={classes['sort-icon']}
                  />
                </div>
              ) : (
                title
              )}
            </Cell>
          );
        })}
      </tr>
    </thead>
  );
}

export const TableHeader = memo(
  TableHeaderComponent,
) as typeof TableHeaderComponent;
