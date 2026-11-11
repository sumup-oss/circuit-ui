import type { SortValue } from '../../types.js';

/**
 * Toggles the sorting of a column between ascending and descending.
 * Sorting by a different column starts with ascending.
 */
export function getNextSort(columnId: string, current?: SortValue): SortValue {
  const isAscending =
    current?.columnId === columnId && current.direction === 'ascending';

  return { columnId, direction: isAscending ? 'descending' : 'ascending' };
}
