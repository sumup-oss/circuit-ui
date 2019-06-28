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
