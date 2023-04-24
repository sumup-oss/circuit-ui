/**
 * Copyright 2021, SumUp Ltd.
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

import { KeyboardEvent, useCallback, useId } from 'react';

import { isArrowDown, isArrowUp } from '../../util/key-codes.js';

export type FocusProps = {
  'data-focus-list': string;
  'onKeyDown': (event: KeyboardEvent) => void;
};

/**
 * Enables keyboard navigation for a list of focusable elements.
 * Spread the props returned by the hook onto each list item.
 */
export function useFocusList(): FocusProps {
  const name = useId();

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isArrowUp(event) && !isArrowDown(event)) {
        return;
      }

      event.preventDefault();

      const items = document.querySelectorAll<HTMLElement>(
        `[data-focus-list="${name}"]`,
      );
      const currentEl = event.target as HTMLElement;
      const currentIndex = Array.from(items).indexOf(currentEl);
      const newIndex = isArrowUp(event)
        ? getPrevIndex(currentIndex, items.length)
        : getNextIndex(currentIndex, items.length);
      const newEl = items.item(newIndex);

      newEl.focus();
    },
    [name],
  );

  return { 'data-focus-list': name, onKeyDown };
}

function getPrevIndex(currentIndex: number, length: number): number {
  return currentIndex - 1 < 0 ? length - 1 : currentIndex - 1;
}

function getNextIndex(currentIndex: number, length: number): number {
  return currentIndex + 1 >= length ? 0 : currentIndex + 1;
}
