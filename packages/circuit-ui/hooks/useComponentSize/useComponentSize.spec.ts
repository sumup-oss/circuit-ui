/**
 * Copyright 2019, SumUp Ltd.
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

import { newRenderHook, act } from '../../util/test-utils';

import { useComponentSize } from './useComponentSize';

jest.mock('../../util/helpers', () => ({
  throttle: jest.fn(<T>(fn: T) => fn),
}));

describe('useComponentSize', () => {
  afterAll(() => {
    jest.resetModules();
  });

  it('should return the current element size', () => {
    const ref = {
      current: {
        offsetWidth: 800,
        offsetHeight: 450,
      } as HTMLElement,
    };
    const { result } = newRenderHook(() => useComponentSize(ref));

    expect(result.current).toEqual({ width: 800, height: 450 });
  });

  describe('when ResizeObserver is supported', () => {
    let originalResizeObserver: typeof global.ResizeObserver;

    const observe = jest.fn();
    const unobserve = jest.fn();
    const disconnect = jest.fn();

    beforeAll(() => {
      originalResizeObserver = global.ResizeObserver;

      global.ResizeObserver = jest.fn(() => ({
        observe,
        disconnect,
        unobserve,
      }));
    });

    afterAll(() => {
      global.ResizeObserver = originalResizeObserver;
    });

    it('should update on element resize events', () => {
      const ref = {
        current: {
          offsetWidth: 800,
          offsetHeight: 450,
        } as HTMLElement,
      };

      const { unmount } = newRenderHook(() => useComponentSize(ref));
      expect(observe).toHaveBeenCalledTimes(1);

      unmount();
      expect(disconnect).toHaveBeenCalledTimes(1);
    });
  });

  describe('when ResizeObserver is not supported', () => {
    it('should update on window resize events', () => {
      const ref = {
        current: {
          offsetWidth: 800,
          offsetHeight: 450,
        } as HTMLElement,
      };

      const { result, unmount } = newRenderHook(() => useComponentSize(ref));

      act(() => {
        // @ts-expect-error The value is mocked
        ref.current.offsetWidth = 400;

        global.dispatchEvent(new Event('resize'));
      });

      expect(result.current).toEqual({ width: 400, height: 450 });
      unmount();
    });
  });
});
