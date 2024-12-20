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

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderHook } from '../../util/test-utils.js';

import { useScrollLock } from './useScrollLock.js';

describe('useScrollLock', () => {
  Object.defineProperty(window, 'scrollTo', {
    value: vi.fn(),
    writable: true,
  });

  Object.defineProperty(window, 'scrollY', { value: 1, writable: true });

  beforeEach(() => {
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollY = 1;
  });

  it('locks the scroll when `isLocked` is true', () => {
    window.scrollY = 100;
    const { rerender } = renderHook(({ isLocked }) => useScrollLock(isLocked), {
      initialProps: { isLocked: false },
    });

    rerender({ isLocked: true });

    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.top).toBe('-100px');
  });

  it('unlocks the scroll when `isLocked` is false', () => {
    window.scrollY = 100;

    const { rerender } = renderHook(({ isLocked }) => useScrollLock(isLocked), {
      initialProps: { isLocked: true },
    });

    rerender({ isLocked: false });

    expect(document.body.style.position).toBe('');
    expect(document.body.style.top).toBe('');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 100);
  });
});
