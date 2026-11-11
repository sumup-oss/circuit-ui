import { Sort } from '@sumup-oss/icons';
import { Cell } from '../Cell/Cell.js';
import { Body } from '../../../Body/index.js';
import { clsx } from '../../../../styles/clsx.js';
import { utilClasses } from '../../../../styles/utility.js';
import { memo, type HTMLAttributes } from 'react';
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
          const title = (
            <Body
              as="span"
              size="s"
              weight="semibold"
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
              aria-sort={direction}
              className={clsx(
                isSortable && classes.sortable,
                direction && classes.sorted,
              )}
              style={{
                maxWidth: `var(--${id}-col-max-width)`,
                minWidth: `var(--${id}-col-min-width)`,
              }}
            >
              {isSortable ? (
                <button
                  type="button"
                  className={clsx(
                    classes['sort-button'],
                    utilClasses.focusVisible,
                  )}
                  onClick={() => onSortChange?.(getNextSort(id, sort))}
                >
                  {title}
                  <Sort
                    aria-hidden="true"
                    size="16"
                    className={classes['sort-icon']}
                  />
                </button>
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
