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

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value?: unknown): value is Function {
  return typeof value === 'function';
}

export function isString(value?: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value?: unknown): value is number {
  return typeof value === 'number';
}

export function isArray(value?: unknown): value is [] {
  return (
    Boolean(value) &&
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Array
  );
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return value === Object(value) && !isArray(value) && !isFunction(value);
}
