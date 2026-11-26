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

import { describe, expect, it, vi } from 'vitest';

import { renderHook, userEvent } from '../../util/test-utils.js';

import { useEscapeKey } from './useEscapeKey.js';

describe('useEscapeKey', () => {
  it('should call the callback when the escape key is pressed', async () => {
    const callback = vi.fn();
    renderHook(() => useEscapeKey(callback));

    await userEvent.keyboard('{Escape}');

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback when the hook is inactive', async () => {
    const callback = vi.fn();
    renderHook(() => useEscapeKey(callback, false));

    await userEvent.keyboard('{Escape}');

    expect(callback).not.toHaveBeenCalled();
  });

  it('should only call the most recently activated callback', async () => {
    const first = vi.fn();
    const second = vi.fn();
    renderHook(() => useEscapeKey(first));
    renderHook(() => useEscapeKey(second));

    await userEvent.keyboard('{Escape}');

    expect(second).toHaveBeenCalledTimes(1);
    expect(first).not.toHaveBeenCalled();
  });

  it('should call the callbacks one at a time as they are deactivated', async () => {
    const first = vi.fn();
    const second = vi.fn();
    renderHook(() => useEscapeKey(first));
    const { unmount } = renderHook(() => useEscapeKey(second));

    await userEvent.keyboard('{Escape}');
    unmount();
    await userEvent.keyboard('{Escape}');

    expect(second).toHaveBeenCalledTimes(1);
    expect(first).toHaveBeenCalledTimes(1);
  });

  it('should keep its position in the stack when the callback changes', async () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderHook(({ cb }) => useEscapeKey(cb), {
      initialProps: { cb: first },
    });
    renderHook(() => useEscapeKey(second));

    rerender({ cb: vi.fn() });
    await userEvent.keyboard('{Escape}');

    expect(second).toHaveBeenCalledTimes(1);
  });

  it('should block the components beneath when the callback is a no-op', async () => {
    const callback = vi.fn();
    renderHook(() => useEscapeKey(callback));
    renderHook(() => useEscapeKey(() => {}));

    await userEvent.keyboard('{Escape}');

    expect(callback).not.toHaveBeenCalled();
  });
});
