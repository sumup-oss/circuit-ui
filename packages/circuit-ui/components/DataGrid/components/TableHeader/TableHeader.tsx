import { Cell } from '../Cell/Cell.js';
import { Body } from '../../../Body/index.js';
import { clsx } from '../../../../styles/clsx.js';
import { utilClasses } from '../../../../styles/utility.js';
import { memo, type HTMLAttributes } from 'react';
import type { Column } from '../../types.js';
import classes from './TableHeader.module.css';

export type TableHeaderProps<P> = HTMLAttributes<HTMLTableRowElement> & {
  columns: Column<P>[];
};

function TableHeaderComponent<P>({ columns, ...rest }: TableHeaderProps<P>) {
  return (
    <thead>
      <tr className={classes.base} {...rest}>
        {columns.map(({ label, id, type }, index) => (
          <Cell
            as="th"
            role="columnheader"
            key={`${id}-col-header`}
            data-x={index}
            data-y={0}
            tabIndex={index === 0 ? 0 : -1}
            style={{
              maxWidth: `var(--${id}-col-max-width)`,
              minWidth: `var(--${id}-col-min-width)`,
            }}
          >
            <Body
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
          </Cell>
        ))}
      </tr>
    </thead>
  );
}

export const TableHeader = memo(
  TableHeaderComponent,
) as typeof TableHeaderComponent;
