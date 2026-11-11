import { describe, expect, it } from 'vitest';

import { getNextSort } from './TableHeaderService.js';

describe('TableHeaderService', () => {
  describe('getNextSort', () => {
    it('should sort in ascending order when the data is not sorted', () => {
      expect(getNextSort('name')).toEqual({
        columnId: 'name',
        direction: 'ascending',
      });
    });

    it('should sort in descending order after ascending order', () => {
      expect(
        getNextSort('name', { columnId: 'name', direction: 'ascending' }),
      ).toEqual({ columnId: 'name', direction: 'descending' });
    });

    it('should sort in ascending order again after descending order', () => {
      expect(
        getNextSort('name', { columnId: 'name', direction: 'descending' }),
      ).toEqual({ columnId: 'name', direction: 'ascending' });
    });

    it('should start over in ascending order for a different column', () => {
      expect(
        getNextSort('age', { columnId: 'name', direction: 'descending' }),
      ).toEqual({ columnId: 'age', direction: 'ascending' });
    });
  });
});
