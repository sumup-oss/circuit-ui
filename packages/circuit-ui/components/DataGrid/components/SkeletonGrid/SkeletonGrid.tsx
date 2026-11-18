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
  columns: { id: string; type: string }[];
  gridId: string;
  isMobile?: boolean;
}

const SkeletonGridComponent = ({
  itemsPerPage,
  columns,
  gridId,
  isMobile,
}: SkeletonGridProps) => (
  <>
    {Array.from({ length: itemsPerPage }, (_row, rowIndex) => (
      <tr
        data-testid="skeleton-row"
        key={`${gridId}-skeleton-row-${rowIndex}`}
        className={classes.row}
      >
        {isMobile ? (
          <td
            className={clsx(isMobile ? classes['mobile-cell'] : classes.cell)}
          >
            <SkeletonContainer isLoading className={classes.container}>
              <div className={classes.labels}>
                <Skeleton className={classes.title}>
                  <span />
                </Skeleton>
                <Skeleton className={classes.subtitle}>
                  <span />
                </Skeleton>
              </div>

              <Skeleton className={classes.trailing}>
                <span />
              </Skeleton>
            </SkeletonContainer>
          </td>
        ) : (
          columns.map(({ id, type }, cellIndex) => (
            <td
              key={`${gridId}-skeleton-row-${rowIndex}-cell-${cellIndex}`}
              className={clsx(classes.cell)}
              style={{
                width: `var(--${id}-col-width)`,
              }}
            >
              <div
                className={clsx(
                  (type === 'row-actions' || type === 'quick-actions') &&
                    classes['align-right'],
                )}
              >
                <SkeletonContainer isLoading>
                  {type === 'quick-actions' ? (
                    <div className={classes['quick-actions']}>
                      <Skeleton className={clsx(classes.circle)}>
                        <span />
                      </Skeleton>
                      <Skeleton className={clsx(classes.circle)}>
                        <span />
                      </Skeleton>
                      <Skeleton className={clsx(classes.circle)}>
                        <span />
                      </Skeleton>
                    </div>
                  ) : (
                    <Skeleton
                      className={clsx(
                        type === 'row-actions' ? classes.circle : classes.bar,
                      )}
                    >
                      <span />
                    </Skeleton>
                  )}
                </SkeletonContainer>
              </div>
            </td>
          ))
        )}
      </tr>
    ))}
  </>
);

export const SkeletonGrid = memo(
  SkeletonGridComponent,
) as typeof SkeletonGridComponent;
