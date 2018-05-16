import * as utils from './utils';
import { ASCENDING, DESCENDING } from './constants';

describe('Table utils', () => {
  describe('mapProps()', () => {
    describe('isString', () => {
      it('should map the string to children key', () => {
        const props = 'Foo';
        const expected = { children: props };
        const actual = utils.mapProps(props);

        expect(actual).toEqual(expected);
      });
    });

    it('should forward the props object', () => {
      const props = { children: 'Foo' };
      const expected = props;
      const actual = utils.mapProps(props);

      expect(actual).toEqual(expected);
    });
  });

  describe('getChildren()', () => {
    describe('isString', () => {
      it('should return it', () => {
        const props = 'Foo';
        const expected = props;
        const actual = utils.getChildren(props);

        expect(actual).toBe(expected);
      });
    });

    it('should return the children prop', () => {
      const props = { children: 'Foo' };
      const expected = 'Foo';
      const actual = utils.getChildren(props);

      expect(actual).toBe(expected);
    });
  });

  describe('getSortByValue()', () => {
    describe('no sortByValue', () => {
      it('should return the children', () => {
        const props = 'Foo';
        const expected = props;
        const actual = utils.getSortByValue(props);

        expect(actual).toBe(expected);
      });
    });

    it('should return the sortByValue', () => {
      const props = { sortByValue: 'Foo' };
      const expected = props.sortByValue;
      const actual = utils.getSortByValue(props);

      expect(actual).toBe(expected);
    });
  });

  describe('getSortDirection()', () => {
    describe('sort not active', () => {
      it('should return ASCENDING', () => {
        const expected = ASCENDING;
        const isActive = false;
        const actual = utils.getSortDirection(isActive);

        expect(actual).toBe(expected);
      });
    });

    describe('no currentSort', () => {
      it('should return ASCENDING', () => {
        const expected = ASCENDING;
        const isActive = true;
        const actual = utils.getSortDirection(isActive);

        expect(actual).toBe(expected);
      });
    });

    describe('ASCENDING', () => {
      it('should return DESCENDING', () => {
        const currentSort = ASCENDING;
        const isActive = true;
        const expected = DESCENDING;
        const actual = utils.getSortDirection(isActive, currentSort);

        expect(actual).toBe(expected);
      });
    });

    describe('DESCENDING', () => {
      it('should return ASCENDING', () => {
        const currentSort = DESCENDING;
        const isActive = true;
        const expected = ASCENDING;
        const actual = utils.getSortDirection(isActive, currentSort);

        expect(actual).toBe(expected);
      });
    });

    describe('unknown direction', () => {
      it('should return ASCENDING', () => {
        const currentSort = 'Foo';
        const isActive = true;
        const expected = ASCENDING;
        const actual = utils.getSortDirection(isActive, currentSort);

        expect(actual).toBe(expected);
      });
    });
  });

  describe('ascendingSort', () => {
    it('should sort the array by sortByValue/children on ascending order', () => {
      const index = 0;
      const a = ['Foo'];
      const b = ['Bar'];
      const arr = [a, b];
      const expected = [b, a];
      const actual = [...arr].sort(utils.ascendingSort(index));

      expect(actual).toEqual(expected);
    });
  });

  describe('descendingSort', () => {
    it('should sort the array by sortByValue/children on descending order', () => {
      const index = 0;
      const a = ['Bar'];
      const b = ['Foo'];
      const arr = [a, b];
      const expected = [b, a];
      const actual = [...arr].sort(utils.descendingSort(index));

      expect(actual).toEqual(expected);
    });
  });
});
