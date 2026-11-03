import { memo } from 'react';

import { Skeleton, SkeletonContainer } from '../../../Skeleton/index.js';

import classes from './SkeletonGrid.module.css';
import { clsx } from '../../../../index.js';

export interface SkeletonGridProps {
  /**
   * The number of skeleton rows to render.
   */
  itemsPerPage: number;
  /**
   * The number of skeleton columns to render.
   */
  columns: string[];
  gridId: string;
}

const SkeletonGridComponent = ({
  itemsPerPage,
  columns,
  gridId,
}: SkeletonGridProps) => (
  <>
    {Array.from({ length: itemsPerPage }, (_row, rowIndex) => (
      <tr
        data-testid="skeleton-row"
        key={`${gridId}-skeleton-row-${rowIndex}`}
        className={classes.row}
      >
        {columns.map((column, cellIndex) => (
          <td
            key={`${gridId}-skeleton-row-${rowIndex}-cell-${cellIndex}`}
            className={clsx(classes.cell)}
          >
            <div
              style={{
                maxWidth: `var(--${column}-col-max-width)`,
                minWidth: `var(--${column}-col-min-width)`,
              }}
            >
              <SkeletonContainer isLoading>
                <Skeleton className={classes.skeleton}>
                  <span className={classes.bar} />
                </Skeleton>
              </SkeletonContainer>
            </div>
          </td>
        ))}
      </tr>
    ))}
  </>
);

export const SkeletonGrid = memo(
  SkeletonGridComponent,
) as typeof SkeletonGridComponent;
