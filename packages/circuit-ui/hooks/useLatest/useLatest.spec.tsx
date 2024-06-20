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

import { describe, expect, it } from 'vitest';

import { renderHook } from '../../util/test-utils.js';

import { useLatest } from './useLatest.js';

describe('useLatest', () => {
  it('should store the latest value in a ref object', () => {
    const value = 'value';
    const { result } = renderHook(() => useLatest(value));

    expect(result.current).toEqual({ current: value });
  });

  it('should update the stored value', () => {
    const initialValue = 'value';
    const { result, rerender } = renderHook((value = initialValue) =>
      useLatest(value),
    );

    const newValue = 'newValue';

    rerender(newValue);

    expect(result.current).toEqual({ current: newValue });
  });
});
