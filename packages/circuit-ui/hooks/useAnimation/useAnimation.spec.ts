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

import { beforeAll, describe, expect, it, vi } from 'vitest';

import { renderHook, act } from '../../util/test-utils.jsx';

import { useAnimation } from './useAnimation.js';

describe('useAnimation', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  it('should return the animation state and a callback', () => {
    const { result } = renderHook(() => useAnimation());
    const [isAnimating, animateFn] = result.current;

    expect(isAnimating).toBeFalsy();
    expect(typeof animateFn).toBe('function');
  });

  it('should run the animation when the callback is called', () => {
    const animation = {
      duration: 500,
      onStart: vi.fn(),
      onEnd: vi.fn(),
    };
    const { result } = renderHook(() => useAnimation());
    const [, animateFn] = result.current;

    act(() => {
      animateFn(animation);
    });

    expect(result.current[0]).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(animation.duration);
    });

    expect(result.current[0]).toBeFalsy();
  });

  it('should call onStart at the start of the animation', () => {
    const animation = {
      duration: 500,
      onStart: vi.fn(),
      onEnd: vi.fn(),
    };
    const { result } = renderHook(() => useAnimation());
    const [, animateFn] = result.current;

    act(() => {
      animateFn(animation);
    });

    expect(animation.onStart).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(animation.duration);
    });

    expect(animation.onStart).toHaveBeenCalledTimes(1);
  });

  it('should call onEnd at the end of the animation', () => {
    const animation = {
      duration: 500,
      onStart: vi.fn(),
      onEnd: vi.fn(),
    };
    const { result } = renderHook(() => useAnimation());
    const [, animateFn] = result.current;

    act(() => {
      animateFn(animation);
    });

    expect(animation.onEnd).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(animation.duration);
    });

    expect(animation.onEnd).toHaveBeenCalledTimes(1);
  });
});
