/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as utils from './utils';

describe('Table utils', () => {
  describe('mapRowProps()', () => {
    describe('isArray', () => {
      it('should map the array to cells key', () => {
        const props = ['Foo'];
        const expected = { cells: props };
        const actual = utils.mapRowProps(props);

        expect(actual).toEqual(expected);
      });
    });

    it('should forward the props object', () => {
      const props = { cells: ['Foo'] };
      const expected = props;
      const actual = utils.mapRowProps(props);

      expect(actual).toEqual(expected);
    });
  });

  describe('getRowCells()', () => {
    describe('isArray', () => {
      it('should return it', () => {
        const props = ['Foo'];
        const expected = props;
        const actual = utils.getRowCells(props);

        expect(actual).toEqual(expected);
      });
    });

    it('should return the cells prop', () => {
      const props = { cells: ['Foo'] };
      const expected = ['Foo'];
      const actual = utils.getRowCells(props);

      expect(actual).toEqual(expected);
    });
  });

  describe('mapCellProps()', () => {
    describe('isString', () => {
      it('should map the string to children key', () => {
        const props = 'Foo';
        const expected = { children: props };
        const actual = utils.mapCellProps(props);

        expect(actual).toEqual(expected);
      });
    });

    it('should forward the props object', () => {
      const props = { children: 'Foo' };
      const expected = props;
      const actual = utils.mapCellProps(props);

      expect(actual).toEqual(expected);
    });
  });

  describe('getCellChildren()', () => {
    describe('isString', () => {
      it('should return it', () => {
        const props = 'Foo';
        const expected = props;
        const actual = utils.getCellChildren(props);

        expect(actual).toBe(expected);
      });
    });

    it('should return the children prop', () => {
      const props = { children: 'Foo' };
      const expected = 'Foo';
      const actual = utils.getCellChildren(props);

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
      const props = { children: 'Foo', sortByValue: 'Foo' };
      const expected = props.sortByValue;
      const actual = utils.getSortByValue(props);

      expect(actual).toBe(expected);
    });
  });

  describe('getSortDirection()', () => {
    describe('sort not active', () => {
      it('should return "ascending"', () => {
        const expected = 'ascending';
        const isActive = false;
        const actual = utils.getSortDirection(isActive);

        expect(actual).toBe(expected);
      });
    });

    describe('no currentSort', () => {
      it('should return "ascending"', () => {
        const expected = 'ascending';
        const isActive = true;
        const actual = utils.getSortDirection(isActive);

        expect(actual).toBe(expected);
      });
    });

    describe('"ascending"', () => {
      it('should return "descending"', () => {
        const currentSort = 'ascending';
        const isActive = true;
        const expected = 'descending';
        const actual = utils.getSortDirection(isActive, currentSort);

        expect(actual).toBe(expected);
      });
    });

    describe('"descending"', () => {
      it('should return "ascending"', () => {
        const currentSort = 'descending';
        const isActive = true;
        const expected = 'ascending';
        const actual = utils.getSortDirection(isActive, currentSort);

        expect(actual).toBe(expected);
      });
    });

    describe('unknown direction', () => {
      it('should return "ascending"', () => {
        const currentSort = 'Foo';
        const isActive = true;
        const expected = 'ascending';
        // @ts-expect-error currentSort can only be "ascending" or "descending"
        const actual = utils.getSortDirection(isActive, currentSort);
        expect(actual).toBe(expected);
      });
    });
  });

  describe('ascendingSort', () => {
    it('should sort the array by sortByValue/children on ascending order', () => {
      const index = 0;
      const arr = [[10], [7], [2]];
      const expected = [[2], [7], [10]];
      const actual = [...arr].sort(utils.ascendingSort(index));

      expect(actual).toEqual(expected);
    });
  });

  describe('descendingSort', () => {
    it('should sort the array by sortByValue/children on descending order', () => {
      const index = 0;
      const arr = [[2], [7], [10]];
      const expected = [[10], [7], [2]];
      const actual = [...arr].sort(utils.descendingSort(index));

      expect(actual).toEqual(expected);
    });
  });
});
