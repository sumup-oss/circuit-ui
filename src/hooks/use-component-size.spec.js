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

import { renderHook, act } from '@testing-library/react-hooks';

import useComponentSize from './use-component-size';

jest.mock('lodash/fp/throttle', () =>
  jest.fn(() => (fn) => {
    // eslint-disable-next-line no-param-reassign
    fn.cancel = jest.fn();
    return fn;
  }),
);

describe('useComponentSize', () => {
  afterAll(() => {
    jest.resetModules();
  });

  it('should return default values wihout ref', () => {
    const { result } = renderHook(() => useComponentSize());

    expect(result.current).toEqual({ width: 0, height: 0 });
  });

  it('should return the current element size', () => {
    const ref = {
      current: {
        offsetWidth: 800,
        offsetHeight: 450,
      },
    };
    const { result } = renderHook(() => useComponentSize(ref));

    expect(result.current).toEqual({ width: 800, height: 450 });
  });

  it('should update on window resize events', async () => {
    const ref = {
      current: {
        offsetWidth: 800,
        offsetHeight: 450,
      },
    };

    const { result, unmount } = renderHook(() => useComponentSize(ref));

    await act(() => {
      ref.current.offsetWidth = 400;

      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({ width: 400, height: 450 });
    unmount();
  });

  it('should update with resize observer if available', () => {
    const observe = jest.fn();
    const disconnect = jest.fn();
    global.ResizeObserver = jest.fn(() => ({
      observe,
      disconnect,
    }));

    const ref = {
      current: {
        offsetWidth: 800,
        offsetHeight: 450,
      },
    };

    const { unmount } = renderHook(() => useComponentSize(ref));
    expect(observe).toHaveBeenCalledTimes(1);

    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);

    global.ResizeObserver = undefined;
  });
});
