/**
 * Copyright 2022, SumUp Ltd.
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

import { eachFn, isEmpty } from './helpers';

describe('helpers', () => {
  describe('eachFn', () => {
    it('should call each function with the passed arguments', () => {
      const fns = [jest.fn(), jest.fn(), jest.fn()];
      const combinedFns = eachFn(fns);

      combinedFns('foo');

      fns.forEach((fn) => {
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith('foo');
      });
    });

    it('should ignore non-function values', () => {
      const fns = [jest.fn(), undefined, null, 1, 'foo'] as ((
        ...args: any[]
      ) => any)[];
      const combinedFns = eachFn(fns);

      expect(() => combinedFns()).not.toThrow();
      expect(fns[0]).toHaveBeenCalledTimes(1);
    });
  });

  describe('isEmpty', () => {
    it('should return true for null', () => {
      const actual = isEmpty(null);
      expect(actual).toBeTruthy();
    });

    it('should return true for undefined', () => {
      const actual = isEmpty(undefined);
      expect(actual).toBeTruthy();
    });

    it('should return true for false', () => {
      const actual = isEmpty(false);
      expect(actual).toBeTruthy();
    });

    it('should return true for an empty array', () => {
      const actual = isEmpty([]);
      expect(actual).toBeTruthy();
    });

    it('should return true for an empty object', () => {
      const actual = isEmpty({});
      expect(actual).toBeTruthy();
    });

    it('should return true for an empty string', () => {
      const actual = isEmpty('');
      expect(actual).toBeTruthy();
    });

    it('should return false for a non-empty array', () => {
      const actual = isEmpty(['foo']);
      expect(actual).toBeFalsy();
    });

    it('should return false for a non-empty object', () => {
      const actual = isEmpty({ foo: 'bar' });
      expect(actual).toBeFalsy();
    });

    it('should return false for a non-empty string', () => {
      const actual = isEmpty('foo');
      expect(actual).toBeFalsy();
    });
  });
});
