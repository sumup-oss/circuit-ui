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

// biome-ignore lint/complexity/noBannedTypes: There is no better type for this type guard
export function isFunction(value?: unknown): value is Function {
  return typeof value === 'function';
}

export function isString(value?: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value?: unknown): value is number {
  return typeof value === 'number';
}

export function isArray<T>(value?: unknown): value is T[] {
  return Array.isArray(value);
}

export function isObject<T extends Record<string, unknown>>(
  value: unknown,
): value is T {
  return value === Object(value) && !isArray(value) && !isFunction(value);
}

export function isNil(value?: unknown): value is null | undefined {
  return value === undefined || value === null;
}

export function isHTMLElement(element: unknown): element is HTMLElement {
  return element instanceof HTMLElement;
}
