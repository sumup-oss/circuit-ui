/**
 * Copyright 2022, SumUp Ltd.
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
import userEvent from '@testing-library/user-event';
import React, { FormEvent } from 'react';
import { render, screen } from '@testing-library/react';

import { InputElement } from '../Input/Input';

import { useAutoExpand } from './useAutoExpand';

const createTextAreaRef = (props = {}) => {
  render(<textarea {...props} />);
  return {
    current: screen.getByRole('textbox'),
  } as React.MutableRefObject<InputElement>;
};

describe('useAutoExpand hook', () => {
  describe('when rows is not set', () => {
    test('should render default Props', () => {
      const ref = createTextAreaRef();
      const { result } = renderHook(() =>
        useAutoExpand(ref, {
          label: 'test',
        }),
      );
      expect(result.current).toEqual({
        label: 'test',
        onInput: undefined,
        rows: undefined,
      });
    });

    test('should pass provided `onInput` as is', () => {
      const ref = createTextAreaRef();
      const onInputHandler = jest.fn();

      const {
        result: { current: modifiedProps },
      } = renderHook(() =>
        useAutoExpand(ref, {
          label: 'test',
          onInput: onInputHandler,
        }),
      );

      expect(modifiedProps.onInput).toEqual(onInputHandler);
    });
  });

  describe('when rows is set as number', () => {
    test('should return rows when rows is a number', () => {
      const ref = createTextAreaRef();
      const { result } = renderHook(() =>
        useAutoExpand(ref, {
          label: 'test',
          rows: 2,
        }),
      );
      expect(result.current).toEqual({
        label: 'test',
        onInput: undefined,
        rows: 2,
      });
      expect(ref.current).not.toHaveAttribute('style');
    });

    test('should pass provided `onInput` as is', () => {
      const ref = createTextAreaRef();
      const onInputHandler = jest.fn();

      const {
        result: { current: modifiedProps },
      } = renderHook(() =>
        useAutoExpand(ref, {
          label: 'test',
          rows: 2,
          onInput: onInputHandler,
        }),
      );

      expect(modifiedProps.onInput).toEqual(onInputHandler);
    });
  });

  describe('when rows is set as `auto`', () => {
    test('should generate element style', () => {
      const ref = createTextAreaRef();
      const { result } = renderHook(() =>
        useAutoExpand(ref, { label: 'test', rows: 'auto' }),
      );

      expect(result.current).toHaveProperty('onInput');
      expect(ref.current).toHaveAttribute('style');
    });

    test('should use scrollHeight as style.height', () => {
      const ref = createTextAreaRef();
      const mockedScrollHeight = 123;
      jest
        .spyOn(ref.current, 'scrollHeight', 'get')
        .mockImplementation(() => mockedScrollHeight);

      renderHook(() =>
        useAutoExpand(ref, {
          label: 'test',
          value: 'blablabla',
          rows: 'auto',
        }),
      );

      expect(ref.current.style.height).toEqual(`${mockedScrollHeight}px`);
    });

    test('should use placeholder as value if empty', () => {
      const ref = createTextAreaRef();
      const valueSetter = jest.fn();
      const placeholderString = 'random string';
      jest.spyOn(ref.current, 'value', 'set').mockImplementation(valueSetter);

      renderHook(() =>
        useAutoExpand(ref, {
          label: 'test',
          placeholder: placeholderString,
          rows: 'auto',
        }),
      );

      expect(valueSetter).toBeCalledWith(placeholderString);
    });

    test('should have a rows props when minRows is defined', () => {
      const ref = createTextAreaRef();
      const { result } = renderHook(() =>
        useAutoExpand(ref, {
          label: 'test',
          rows: 'auto',
          minRows: 3,
        }),
      );
      expect(result.current).toHaveProperty('onInput');
      expect(result.current.rows).toEqual(3);
      expect(ref.current).toHaveAttribute('style');
    });

    test('should modified provided `onInput`', () => {
      const ref = createTextAreaRef();
      const onInputHandler = jest.fn();

      const {
        result: { current: modifiedProps },
      } = renderHook(() =>
        useAutoExpand(ref, {
          label: 'test',
          rows: 'auto',
          onInput: onInputHandler,
        }),
      );

      expect(modifiedProps.onInput).not.toEqual(onInputHandler);
      // We need to apply those props on a second textarea for code coverage.
      render(<textarea aria-label="second" {...modifiedProps} />);
      expect(onInputHandler).toHaveBeenCalledTimes(0);
      userEvent.type(screen.getByLabelText('second'), '{space}{space}');
      expect(onInputHandler).toHaveBeenCalledTimes(2);
    });

    test('should allow preventing resize from onInput handler', () => {
      const onInputHandler = jest
        .fn()
        .mockImplementation((e: FormEvent<InputElement>) => {
          e.preventDefault();
        });

      const ref = createTextAreaRef({ onInput: onInputHandler });
      const scrollHeightGetter = jest.fn();
      jest
        .spyOn(ref.current, 'scrollHeight', 'get')
        .mockImplementation(scrollHeightGetter);

      renderHook(() =>
        useAutoExpand(ref, {
          label: 'test',
          rows: 'auto',
          onInput: onInputHandler,
        }),
      );

      // initial
      expect(onInputHandler).toHaveBeenCalledTimes(0);
      expect(scrollHeightGetter).toHaveBeenCalledTimes(1);

      // typing
      userEvent.type(screen.getByRole('textbox'), '{space}{space}');
      expect(onInputHandler).toHaveBeenCalledTimes(2);
      expect(scrollHeightGetter).toHaveBeenCalledTimes(1);
    });
  });
});
