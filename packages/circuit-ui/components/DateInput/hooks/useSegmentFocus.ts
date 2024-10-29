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

import { useId, useMemo } from 'react';

export type SegmentFocus = {
  props: { 'data-focus-list': string };
  previous: () => void;
  next: () => void;
};

export function useSegmentFocus(): SegmentFocus {
  const name = useId();

  return useMemo(() => {
    const getElements = () => {
      const elements = document.querySelectorAll<HTMLElement>(
        `[data-focus-list="${name}"]`,
      );
      return Array.from(elements);
    };

    const getCurrentIndex = (elements: HTMLElement[]) => {
      const currentElement = document.activeElement as HTMLElement;
      return elements.indexOf(currentElement);
    };

    const previous = () => {
      const elements = getElements();
      const currentIndex = getCurrentIndex(elements);
      const newIndex = currentIndex - 1;

      if (newIndex < 0) {
        return;
      }

      elements[newIndex].focus();
    };

    const next = () => {
      const elements = getElements();
      const currentIndex = getCurrentIndex(elements);
      const newIndex = currentIndex + 1;

      if (newIndex >= elements.length) {
        return;
      }

      elements[newIndex].focus();
    };

    return {
      props: { 'data-focus-list': name },
      previous,
      next,
    };
  }, [name]);
}
