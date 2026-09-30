/**
 * Copyright 2026, SumUp Ltd.
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
import { useState } from 'react';

import { act, renderHook } from '../../../../util/test-utils.js';

import { useFilterDraft } from './useFilterDraft.js';

describe('useFilterDraft', () => {
  it('should start with the committed value', () => {
    const { result } = renderHook(() => useFilterDraft('a', vi.fn()));

    expect(result.current.draft).toBe('a');
  });

  describe('when applying', () => {
    it('should only commit the draft when calling apply', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useFilterDraft<string>('a', onChange),
      );

      act(() => result.current.setDraft('b'));

      expect(result.current.draft).toBe('b');
      expect(onChange).not.toHaveBeenCalled();

      act(() => result.current.apply());

      expect(onChange).toHaveBeenCalledWith('b');
    });
  });

  describe('when discarding', () => {
    it('should reset the draft to the committed value', () => {
      const { result } = renderHook(() => useFilterDraft<string>('a', vi.fn()));

      act(() => result.current.setDraft('b'));
      act(() => result.current.discard());

      expect(result.current.draft).toBe('a');
    });
  });

  describe('when clearing', () => {
    it('should empty the draft without committing', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useFilterDraft<string>('a', onChange),
      );

      act(() => result.current.clear());

      expect(result.current.draft).toBeUndefined();
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('when the committed value changes', () => {
    it('should follow the new value', () => {
      const { result } = renderHook(() => {
        const [value, setValue] = useState<string | undefined>('a');
        return { setValue, ...useFilterDraft<string>(value, setValue) };
      });

      act(() => result.current.setDraft('b'));
      act(() => result.current.setValue(undefined));

      expect(result.current.draft).toBeUndefined();
    });
  });
});
