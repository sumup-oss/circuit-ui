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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderHook } from '../../util/test-utils.js';

import { useScrollLock } from './useScrollLock.js';

// biome-ignore lint/suspicious/noSkippedTests: FIXME: This test broke with recent dependency upgrades. The document.body.style.top property no longer appears writeable.
describe.skip('useScrollLock', () => {
  vi.spyOn(window, 'scrollTo');

  beforeEach(() => {
    window.scrollY = 100;
  });

  afterEach(() => {
    vi.resetAllMocks();
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
  });

  it('locks the scroll when `isActive` is true', () => {
    const { rerender } = renderHook(({ isActive }) => useScrollLock(isActive), {
      initialProps: { isActive: false },
    });

    rerender({ isActive: true });

    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.top).toBe('-100px');
    expect(document.body.style.width).toBe('0px');
  });

  it('unlocks the scroll when `isActive` is false', () => {
    const { rerender } = renderHook(({ isActive }) => useScrollLock(isActive), {
      initialProps: { isActive: true },
    });

    rerender({ isActive: false });

    expect(document.body.style.position).toBe('');
    expect(document.body.style.top).toBe('');
    expect(document.body.style.width).toBe('');
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 100);
  });

  it('unlocks the scroll when unmounted', () => {
    const { unmount } = renderHook(() => useScrollLock(true));

    expect(document.body.style.position).toBe('fixed');

    unmount();

    expect(document.body.style.position).toBe('');
    expect(document.body.style.top).toBe('');
    expect(document.body.style.width).toBe('');
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 100);
  });

  it('locks the scroll once for multiple instances', () => {
    renderHook(() => useScrollLock(true));

    window.scrollY = 0;

    renderHook(() => useScrollLock(true));

    expect(document.body.style.top).toBe('-100px');
  });

  it('unlocks the scroll once for multiple instances', () => {
    const { rerender } = renderHook(({ isActive }) => useScrollLock(isActive), {
      initialProps: { isActive: true },
    });

    window.scrollY = 0;

    const { unmount } = renderHook(() => useScrollLock(true));

    rerender({ isActive: false });
    unmount();

    expect(document.body.style.position).toBe('');
    expect(document.body.style.top).toBe('');
    expect(document.body.style.width).toBe('');
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 100);
  });
});
