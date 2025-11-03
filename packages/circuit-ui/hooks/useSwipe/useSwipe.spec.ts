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

import { describe, expect, it, vi } from 'vitest';
import type { TouchEvent } from 'react';

import { renderHook, act } from '../../util/test-utils.js';

import { useSwipe } from './useSwipe.js';

function createTouchEvent(
  type: 'touchstart' | 'touchmove' | 'touchend',
  position: { clientX: number; clientY: number },
) {
  return new TouchEvent(type, {
    targetTouches: [position as unknown as Touch],
  }) as unknown as TouchEvent;
}

describe('useSwipe', () => {
  it('should call the callback when a user swipes right', () => {
    const onSwipe = vi.fn();
    const { result } = renderHook(() => useSwipe(onSwipe));

    const { onTouchStart, onTouchMove, onTouchEnd } = result.current;

    act(() => {
      onTouchStart(createTouchEvent('touchstart', { clientX: 0, clientY: 0 }));
      onTouchMove(createTouchEvent('touchmove', { clientX: 55, clientY: 0 }));
      onTouchEnd();
    });

    expect(onSwipe).toHaveBeenCalledExactlyOnceWith('right');
  });

  it('should call the callback when a user swipes left', () => {
    const onSwipe = vi.fn();
    const { result } = renderHook(() => useSwipe(onSwipe));

    const { onTouchStart, onTouchMove, onTouchEnd } = result.current;

    act(() => {
      onTouchStart(createTouchEvent('touchstart', { clientX: 55, clientY: 0 }));
      onTouchMove(createTouchEvent('touchmove', { clientX: 0, clientY: 0 }));
      onTouchEnd();
    });

    expect(onSwipe).toHaveBeenCalledExactlyOnceWith('left');
  });

  it('should call the callback when a user swipes up', () => {
    const onSwipe = vi.fn();
    const { result } = renderHook(() => useSwipe(onSwipe));

    const { onTouchStart, onTouchMove, onTouchEnd } = result.current;

    act(() => {
      onTouchStart(createTouchEvent('touchstart', { clientX: 0, clientY: 55 }));
      onTouchMove(createTouchEvent('touchmove', { clientX: 0, clientY: 0 }));
      onTouchEnd();
    });

    expect(onSwipe).toHaveBeenCalledExactlyOnceWith('up');
  });

  it('should call the callback when a user swipes down', () => {
    const onSwipe = vi.fn();
    const { result } = renderHook(() => useSwipe(onSwipe));

    const { onTouchStart, onTouchMove, onTouchEnd } = result.current;

    act(() => {
      onTouchStart(createTouchEvent('touchstart', { clientX: 0, clientY: 0 }));
      onTouchMove(createTouchEvent('touchmove', { clientX: 0, clientY: 55 }));
      onTouchEnd();
    });

    expect(onSwipe).toHaveBeenCalledExactlyOnceWith('down');
  });

  it('should prioritize the dimension with the larger swipe distance', () => {
    const onSwipe = vi.fn();
    const { result } = renderHook(() => useSwipe(onSwipe));

    const { onTouchStart, onTouchMove, onTouchEnd } = result.current;

    act(() => {
      onTouchStart(createTouchEvent('touchstart', { clientX: 0, clientY: 0 }));
      onTouchMove(createTouchEvent('touchmove', { clientX: 55, clientY: 75 }));
      onTouchEnd();
    });

    expect(onSwipe).toHaveBeenCalledExactlyOnceWith('down');
  });

  it('should not call the callback when a user swipes less than the minimum distance', () => {
    const onSwipe = vi.fn();
    const { result } = renderHook(() => useSwipe(onSwipe));

    const { onTouchStart, onTouchMove, onTouchEnd } = result.current;

    act(() => {
      onTouchStart(createTouchEvent('touchstart', { clientX: 0, clientY: 0 }));
      onTouchMove(createTouchEvent('touchmove', { clientX: 30, clientY: 0 }));
      onTouchEnd();
    });

    expect(onSwipe).not.toHaveBeenCalled();
  });
});
