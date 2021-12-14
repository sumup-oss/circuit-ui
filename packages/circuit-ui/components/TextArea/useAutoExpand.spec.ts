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

import { renderHook } from '@testing-library/react-hooks';

import { HTMLCircuitInputElement } from '../Input/Input';

import { useAutoExpand } from './useAutoExpand';

const createTextAreaRef = () => ({
  current: document.createElement('textarea') as HTMLCircuitInputElement,
});

describe('useAutoExpand hook', () => {
  describe('when rows is not set', () => {
    test('should render default Props', () => {
      const ref = createTextAreaRef();
      const { result } = renderHook(() =>
        useAutoExpand(ref, {
          label: 'test hook',
        }),
      );
      expect(result.current).toEqual({
        label: 'test hook',
        onInput: undefined,
        rows: undefined,
      });
    });
  });

  describe('when rows is set', () => {
    test('should return rows when rows is a number', () => {
      const ref = createTextAreaRef();
      const { result } = renderHook(() =>
        useAutoExpand(ref, {
          label: 'test hook',
          rows: 2,
        }),
      );
      expect(result.current).toEqual({
        label: 'test hook',
        onInput: undefined,
        rows: 2,
      });
      expect(ref.current).not.toHaveAttribute('style');
    });

    test('should modify element style when rows is "auto"', () => {
      const ref = createTextAreaRef();
      const { result } = renderHook(() =>
        useAutoExpand(ref, {
          label: 'test hook',
          rows: 'auto',
        }),
      );
      expect(result.current).toHaveProperty('onInput');
      expect(ref.current).toHaveAttribute('style');
    });

    test('should have a rows props when rows is "auto" and minRows is defined', () => {
      const ref = createTextAreaRef();
      const { result } = renderHook(() =>
        useAutoExpand(ref, {
          label: 'test hook',
          rows: 'auto',
          minRows: 3,
        }),
      );
      expect(result.current).toHaveProperty('onInput');
      expect(result.current.rows).toEqual(3);
      expect(ref.current).toHaveAttribute('style');
    });
  });
});
