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

import { MutableRefObject, FormEvent } from 'react';

import { renderHook, userEvent, render, screen } from '../../util/test-utils';
import { InputElement } from '../Input/Input';

import { TextArea, TextAreaProps } from './TextArea';
import { useAutoExpand } from './useAutoExpand';

const baseTextareaProps: TextAreaProps = {
  label: 'Test',
};

const createTextAreaRef = (props = {}) => {
  render(<TextArea label="Test" {...props} />);
  return {
    current: screen.getByRole('textbox'),
  } as MutableRefObject<InputElement>;
};

describe('useAutoExpand hook', () => {
  describe('when rows is not set', () => {
    test('should render default Props', () => {
      const ref = createTextAreaRef();
      const { result } = renderHook(() =>
        useAutoExpand(ref, baseTextareaProps),
      );
      expect(result.current).toEqual({
        ...baseTextareaProps,
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
          ...baseTextareaProps,
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
          ...baseTextareaProps,
          rows: 2,
        }),
      );
      expect(result.current).toEqual({
        ...baseTextareaProps,
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
          ...baseTextareaProps,
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
        useAutoExpand(ref, { ...baseTextareaProps, rows: 'auto' }),
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
          ...baseTextareaProps,
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
          ...baseTextareaProps,
          placeholder: placeholderString,
          rows: 'auto',
        }),
      );

      expect(valueSetter).toHaveBeenCalledWith(placeholderString);
    });

    test('should have a rows props when minRows is defined', () => {
      const ref = createTextAreaRef();
      const { result } = renderHook(() =>
        useAutoExpand(ref, {
          ...baseTextareaProps,
          rows: 'auto',
          minRows: 3,
        }),
      );
      expect(result.current).toHaveProperty('onInput');
      expect(result.current.rows).toEqual(3);
      expect(ref.current).toHaveAttribute('style');
    });

    test('should modify provided `onInput`', async () => {
      const ref = createTextAreaRef();
      const onInputHandler = jest.fn();

      const {
        result: { current: modifiedProps },
      } = renderHook(() =>
        useAutoExpand(ref, {
          ...baseTextareaProps,
          rows: 'auto',
          onInput: onInputHandler,
        }),
      );

      expect(modifiedProps.onInput).not.toEqual(onInputHandler);
      // We need to apply those props on a second textarea for code coverage.
      render(<TextArea {...modifiedProps} label="second" />);
      expect(onInputHandler).toHaveBeenCalledTimes(0);
      await userEvent.type(screen.getByLabelText('second'), '{ }{ }');
      expect(onInputHandler).toHaveBeenCalledTimes(2);
    });

    test('should allow preventing resize from onInput handler', async () => {
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
          ...baseTextareaProps,
          rows: 'auto',
          onInput: onInputHandler,
        }),
      );

      // initial
      expect(onInputHandler).toHaveBeenCalledTimes(0);
      expect(scrollHeightGetter).toHaveBeenCalledTimes(1);

      // typing
      await userEvent.type(screen.getByRole('textbox'), '{ }{ }');
      expect(onInputHandler).toHaveBeenCalledTimes(2);
      expect(scrollHeightGetter).toHaveBeenCalledTimes(1);
    });
  });
});
