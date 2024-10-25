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

import { isArray, isFunction, isObject, isString } from './type-check.js';

/**
 * Calls each function in an array with the arguments it receives.
 * Falsy functions are ignored.
 */
export function eachFn<Args extends unknown[]>(
  fns: (undefined | ((...args: Args) => unknown))[],
) {
  return (...args: Args): void =>
    fns.forEach((fn) => isFunction(fn) && fn(...args));
}

/**
 * Checks whether an array, object, or string is empty or whether the value is
 * falsy.
 */
export function isEmpty(value: unknown): boolean {
  if (!value) {
    return true;
  }

  if (isString(value) || isArray(value)) {
    return !value.length;
  }

  if (isObject(value)) {
    return !Object.keys(value).length;
  }

  return false;
}

/**
 * Clamps a value within a range of values between a minimum and maximum limit.
 */
export function clamp(value: number, min: number, max: number): number {
  if (process.env.NODE_ENV !== 'production' && min >= max) {
    throw new RangeError(
      `The minimum value (${min}) must be less than the maximum value (${max}).`,
    );
  }
  return Math.max(min, Math.min(value, max));
}

type Fn<T extends []> = (...args: T) => void;

/**
 * Triggers a function at most once in a given amount of time.
 */
export function throttle<T extends []>(fn: Fn<T>, timeout: number): Fn<T> {
  let ready = true;
  return (...args: T) => {
    if (!ready) {
      return;
    }

    ready = false;
    fn(...args);
    setTimeout(() => {
      ready = true;
    }, timeout);
  };
}

/**
 * Splits an array into chunks of the specified length.
 */
export function chunk<T>(array: T[], chunkSize: number): T[][] {
  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}

/**
 * Returns the last item in an array.
 */
export function last(array: undefined | null): undefined;
export function last<T>(array: T[]): T;
export function last<T>(array: T[] | undefined | null): T | undefined {
  return isArray(array) ? array[array.length - 1] : undefined;
}

/**
 * Increases or decreases a value by an offset and loops back around to stay
 * within a given range.
 */
export function shiftInRange(
  value: number, // must be in range
  offset: number, // positive or negative
  min: number, // inclusive
  max: number, // inclusive
) {
  const modulus = max - min + 1;
  return ((value - min + (offset % modulus) + modulus) % modulus) + min;
}
