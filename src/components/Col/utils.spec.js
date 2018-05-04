import { head, last } from 'lodash/fp';
import * as utils from './utils';
import { DEFAULT_BREAKPOINT } from './constants';

describe('Col utils', () => {
  beforeEach(jest.clearAllMocks);

  describe('isDefault()', () => {
    it('should return true if the provided breakpoint is the default one', () => {
      const breakpoint = DEFAULT_BREAKPOINT;

      const expected = true;
      const actual = utils.isDefault(breakpoint);

      expect(actual).toBe(expected);
    });

    it('should return false if the provided breakpoint is not the default one', () => {
      const breakpoint = 'foo';

      const expected = false;
      const actual = utils.isDefault(breakpoint);

      expect(actual).toBe(expected);
    });
  });

  describe('sortByPriority()', () => {
    it('should sort the provided key/value tuple array based on the provided grid priority', () => {
      const grid = {
        default: {
          priority: 0
        },
        last: {
          priority: 2
        },
        first: {
          priority: 1
        }
      };

      const breakpoints = [['last'], ['first'], ['default']];

      const expected = [['default'], ['first'], ['last']];
      const actual = utils.sortByPriority(grid, breakpoints);

      expect(actual).toEqual(expected);
    });
  });

  describe('mapBreakpoint()', () => {
    it('should call the provided fn with grid[key], theme and value', () => {
      const mock = jest.fn();
      const grid = {
        default: {}
      };
      const theme = 'default';
      const tuple = ['default', 0];

      utils.mapBreakpoint(mock, grid, theme, tuple);

      expect(mock).toHaveBeenCalledWith(grid[head(tuple)], theme, last(tuple));
    });
  });
});
