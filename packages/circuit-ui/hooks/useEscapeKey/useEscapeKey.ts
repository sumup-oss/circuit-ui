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

import { useEffect, useRef } from 'react';

import { isEscape } from '../../util/key-codes.js';

import { useLatest } from '../useLatest/useLatest.js';

type Entry = { callback: { current: (event: KeyboardEvent) => void } };

/**
 * The active hooks in the order they were activated. Only the last one
 * handles the escape key, so that stacked components are dismissed one at a
 * time, starting with the most recently opened one.
 */
const stack: Entry[] = [];

function handleKeyDown(event: KeyboardEvent) {
  if (!isEscape(event) || event.isComposing) {
    return;
  }
  const top = stack[stack.length - 1];
  if (!top) {
    return;
  }
  // Prevents native dialogs beneath the top entry from closing as well.
  event.preventDefault();
  top.callback.current(event);
}

function register(entry: Entry) {
  if (stack.length === 0) {
    document.addEventListener('keydown', handleKeyDown);
  }
  stack.push(entry);
}

function unregister(entry: Entry) {
  const index = stack.indexOf(entry);
  if (index !== -1) {
    stack.splice(index, 1);
  }
  if (stack.length === 0) {
    document.removeEventListener('keydown', handleKeyDown);
  }
}

/**
 * Calls a function when the escape key is pressed. When multiple components
 * are active, only the most recently activated one is called. Pass a no-op
 * callback to block the escape key from reaching the components beneath.
 * Deactivate it when not used to improve performance.
 */
export function useEscapeKey(
  callback: (event: KeyboardEvent) => void,
  active = true,
): void {
  const callbackRef = useLatest(callback);
  const entry = useRef<Entry>({ callback: callbackRef });

  useEffect(() => {
    if (!active) {
      return undefined;
    }
    const { current } = entry;
    register(current);
    return () => {
      unregister(current);
    };
  }, [active]);
}
