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

import { isArray, isFunction, isObject, isString } from './type-check';

/**
 * Calls each function in an array with the arguments it receives.
 * Falsy functions are ignored.
 */
export function eachFn<Args extends []>(
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

  return true;
}
