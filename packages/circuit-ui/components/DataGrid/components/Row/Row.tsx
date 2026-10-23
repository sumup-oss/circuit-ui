import { memo, type HTMLAttributes } from 'react';
import { Cell } from '../Cell/Cell.js';
import { defaultFormatFn } from '../../DataGridService.js';
import type { BasicType, Column } from '../../types.js';
import type { Locale } from '../../../../util/i18n.js';
import classes from './Row.module.css';
import { clsx } from '../../../../styles/clsx.js';

export interface RowProps<P> extends HTMLAttributes<HTMLTableRowElement> {
  columns: Column<P>[];
  data: P;
  rowIndex: number;
  formattingLocale: Locale;
}

const RowComponent = <P,>({
  columns,
  data,
  formattingLocale,
  rowIndex,
  className,
  ...props
}: RowProps<P>) => (
  <tr className={clsx(classes.base, className)} {...props}>
    {columns.map(({ id, type, getValue, isRowHeader, maxWidth }, index) => {
      const value = getValue
        ? getValue?.(data)
        : (data[id as keyof P] as BasicType);
      return (
        <Cell
          tabIndex={-1}
          key={`${id}-${rowIndex}-${index}`}
          aria-colindex={index + 1}
          data-x={index}
          data-y={rowIndex + 1}
          as={isRowHeader ? 'th' : 'td'}
          role={isRowHeader ? 'rowheader' : 'gridcell'}
          style={{
            maxWidth: `var(--${id}-col-max-width)`,
            minWidth: `var(--${id}-col-min-width)`,
          }}
          className={maxWidth ? classes.overflow : undefined}
        >
          {type.name === 'custom'
            ? type.render?.(data)
            : defaultFormatFn(
                type,
                data,
                value,
                formattingLocale,
                `${id}-${rowIndex}-${index}`,
              )}
        </Cell>
      );
    })}
  </tr>
);

export const Row = memo(RowComponent) as typeof RowComponent;
