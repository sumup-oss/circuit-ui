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

import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import {
  chunk,
  clamp,
  eachFn,
  isEmpty,
  last,
  shiftInRange,
  throttle,
} from './helpers.js';

describe('helpers', () => {
  describe('clamp', () => {
    const min = 10;
    const max = 20;

    describe('when the value is less than the minimum value', () => {
      it('should return the minimum value', () => {
        const value = 5;
        const actual = clamp(value, min, max);

        expect(actual).toBe(min);
      });
    });

    describe('when the value is greater than the maximum value', () => {
      it('should return the maximum value', () => {
        const value = 25;
        const actual = clamp(value, min, max);

        expect(actual).toBe(max);
      });
    });

    describe('when the value is greater than the minimum value and less than the maximum value', () => {
      it('should return the value', () => {
        const value = 15;
        const actual = clamp(value, min, max);

        expect(actual).toBe(value);
      });
    });

    describe('when the minimum value is equal to or greater than the maximum value', () => {
      it('should throw an error', () => {
        expect(() => clamp(15, 10, 5)).toThrow();
      });
    });
  });

  describe('eachFn', () => {
    it('should call each function with the passed arguments', () => {
      const fns = [vi.fn(), vi.fn(), vi.fn()];
      const combinedFns = eachFn(fns);

      combinedFns('foo');

      fns.forEach((fn) => {
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith('foo');
      });
    });

    it('should ignore non-function values', () => {
      const fns = [vi.fn(), undefined, null, 1, 'foo'] as ((
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

    it('should return false for unrecognized type', () => {
      const actual = isEmpty(vi.fn());
      expect(actual).toBeFalsy();
    });
  });

  describe('throttle', () => {
    beforeAll(() => {
      vi.useFakeTimers();
    });
    afterAll(() => {
      vi.useRealTimers();
    });

    it('should trigger the function at most once per timeout when called rapidly', () => {
      const fn = vi.fn();
      const timeout = 100;
      const throttledFn = throttle(fn, timeout);

      const interval = setInterval(throttledFn, 15);

      vi.advanceTimersByTime(500);

      clearInterval(interval);

      expect(fn).toHaveBeenCalledTimes(5);
    });

    it('should trigger the function at most once per timeout  when called infrequently', () => {
      const fn = vi.fn();
      const timeout = 100;
      const throttledFn = throttle(fn, timeout);

      const interval = setInterval(throttledFn, 150);

      vi.advanceTimersByTime(500);

      clearInterval(interval);

      expect(fn).toHaveBeenCalledTimes(3);
    });
  });

  describe('chunk', () => {
    it('should split an array into chunks', () => {
      const array = [1, 2, 3, 4, 5, 6];
      const chunkSize = 2;
      const actual = chunk(array, chunkSize);
      expect(actual).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
      ]);
    });

    it('should return an empty array for an empty array', () => {
      const array: never[] = [];
      const chunkSize = 5;
      const actual = chunk(array, chunkSize);
      expect(actual).toEqual([]);
    });

    it('should have a shorter end chunk if the array is not evenly divisible by the chunk size', () => {
      const array = [1, 2, 3, 4, 5];
      const chunkSize = 3;
      const actual = chunk(array, chunkSize);
      expect(actual).toEqual([
        [1, 2, 3],
        [4, 5],
      ]);
    });

    it('should have a single shorter chunk if the array length is smaller than the chunk size', () => {
      const array = [1, 2, 3];
      const chunkSize = 4;
      const actual = chunk(array, chunkSize);
      expect(actual).toEqual([[1, 2, 3]]);
    });
  });

  describe('last', () => {
    it('should return the last item in an array', () => {
      const array = [1, 2, 3, 4, 5, 6];
      const actual = last(array);
      expect(actual).toBe(6);
    });

    it('should return undefined for an empty array', () => {
      const array: never[] = [];
      const actual = last(array);
      expect(actual).toBeUndefined();
    });

    it('should return undefined for an undefined array', () => {
      const array = undefined;
      const actual = last(array);
      expect(actual).toBeUndefined();
    });

    it('should return undefined for null', () => {
      const array = undefined;
      const actual = last(array);
      expect(actual).toBeUndefined();
    });
  });

  describe('shiftInRange', () => {
    it('should increase a value within a range', () => {
      const actual = shiftInRange(4, 2, 1, 12);
      expect(actual).toBe(6);
    });

    it('should decrease a value within a range', () => {
      const actual = shiftInRange(4, -2, 1, 12);
      expect(actual).toBe(2);
    });

    it('should loop around to the end', () => {
      const actual = shiftInRange(4, -6, 1, 12);
      expect(actual).toBe(10);
    });

    it('should loop around to the start', () => {
      const actual = shiftInRange(7, 10, 4, 12);
      expect(actual).toBe(8);
    });

    it('should loop around to the start', () => {
      const actual = shiftInRange(4, 10, 2, 12);
      expect(actual).toBe(3);
    });

    it('should loop around multiple times', () => {
      const actual = shiftInRange(4, -9, 2, 5);
      expect(actual).toBe(3);
    });
  });
});
