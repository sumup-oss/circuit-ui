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

import { useEffect } from 'react';

import { isEscape } from '../../util/key-codes.js';

/**
 * Calls a function when the escape key is pressed.
 * Deactivate it when not used to improve performance.
 */
export function useEscapeKey(
  callback: (event: KeyboardEvent) => void,
  active = true,
): void {
  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const handleEscapePress = (event: KeyboardEvent) => {
      if (isEscape(event)) {
        callback(event);
      }
    };

    document.addEventListener('keydown', handleEscapePress);
    return () => {
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [callback, active]);
}
