/**
 * Copyright 2024, SumUp Ltd.
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

export function changeInputValue<
  Element extends HTMLInputElement | HTMLSelectElement,
>(element: Element | null, value: string) {
  if (element) {
    const prototype = Object.getPrototypeOf(element) as Element;
    // React overwrites the input.value setter. In order to be able to trigger
    // a 'change' event on the input, we need to use the native setter.
    // Adapted from https://stackoverflow.com/a/46012210/4620154
    Object.getOwnPropertyDescriptor(prototype, 'value')?.set?.call(
      element,
      value,
    );
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }
}
