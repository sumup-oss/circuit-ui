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

import { useEffect, useRef, type RefObject } from 'react';

import { isArray } from '../../util/type-check';

export function useClickOutside(
  ref: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  callback: (event: MouseEvent) => void,
  active = true,
): void {
  const isOutsideClick = useRef(false);

  const refs = isArray(ref) ? ref : [ref];

  // biome-ignore lint/correctness/useExhaustiveDependencies: The `refs` array is recreated on each render, but the ref objects inside don't necessarily change. Spreading the array allows React to compare the ref objects themselves.
  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const handleOutsideMousedown = (event: MouseEvent) => {
      isOutsideClick.current = !refs.some((r) =>
        r.current ? r.current.contains(event.target as Node) : true,
      );
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (isOutsideClick.current) {
        callback(event);
      }
      isOutsideClick.current = false;
    };

    document.addEventListener('mousedown', handleOutsideMousedown);
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideMousedown);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [...refs, callback, active]);
}
