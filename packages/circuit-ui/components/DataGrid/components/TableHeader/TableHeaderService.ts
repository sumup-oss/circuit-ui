import type { SortValue } from '../../types.js';

/**
 * Cycles the sorting of a column through ascending order, descending order
 * and no sorting (`undefined`). Sorting by a different column starts with
 * ascending.
 */
export function getNextSort(
  columnId: string,
  current?: SortValue,
): SortValue | undefined {
  if (current?.columnId !== columnId) {
    return { columnId, direction: 'ascending' };
  }

  return current.direction === 'ascending'
    ? { columnId, direction: 'descending' }
    : undefined;
}
