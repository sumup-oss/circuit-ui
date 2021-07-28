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

import { RefObject, useEffect, useRef } from 'react';

export function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void,
  active = true,
): void {
  const isOutsideClick = useRef(false);
  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const handleOutsideMousedown = (event: MouseEvent) => {
      isOutsideClick.current = ref.current
        ? !ref.current.contains(event.target as Node)
        : false;
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (isOutsideClick.current) {
        callback(event);
      }
    };

    document.addEventListener('mousedown', handleOutsideMousedown);
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideMousedown);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [ref, callback, active]);
}
