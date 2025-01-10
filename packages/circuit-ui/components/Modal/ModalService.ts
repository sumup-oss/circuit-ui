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

export function getKeyboardFocusableElements(
  element: HTMLElement,
): HTMLElement[] {
  return [
    ...element.querySelectorAll(
      'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])',
    ),
  ].filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      !el.hasAttribute('aria-disabled') &&
      !el.getAttribute('aria-hidden'),
  ) as HTMLElement[];
}

export function getFirstFocusableElement(
  dialog: HTMLElement,
  skipFirst?: boolean,
): HTMLElement {
  const focusableElements = getKeyboardFocusableElements(dialog);
  if (!skipFirst) {
    return focusableElements[0];
  }
  // if there is only one focusable element (the close button), focus it
  return focusableElements.length === 1
    ? focusableElements[0]
    : focusableElements[1];
}
