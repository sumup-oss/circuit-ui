/* eslint-disable no-param-reassign */
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

import { FormEvent, RefObject, useCallback, useEffect } from 'react';

import type { InputElement } from '../Input/Input.js';
import { useComponentSize } from '../../hooks/useComponentSize/index.js';

import type { TextAreaProps } from './index.js';

type ModifiedProps = Omit<TextAreaProps, 'minRows' | 'rows'> & {
  rows: TextAreaProps['minRows'];
};

export const useAutoExpand = (
  ref: RefObject<InputElement>,
  { minRows, rows = minRows, onInput, ...props }: TextAreaProps,
): ModifiedProps => {
  const autoExpand = rows === 'auto';

  const { height, width } = useComponentSize(ref);

  const updateElementHeight = useCallback(
    (el: EventTarget & HTMLTextAreaElement) => {
      const previousValue = el.value !== undefined ? el.value : '';
      const shouldUsePlaceholder = !previousValue.length && !!props.placeholder;
      if (shouldUsePlaceholder) {
        el.value = props.placeholder !== undefined ? props.placeholder : '';
      }

      el.style.height = 'auto';
      if (el.scrollHeight) {
        el.style.height = `${el.scrollHeight}px`;
      }
      if (shouldUsePlaceholder) {
        el.value = previousValue;
      }
    },
    [props.placeholder],
  );

  const inputHandler = useCallback(
    (e: FormEvent<InputElement>) => {
      if (onInput) {
        onInput(e);
      }
      if (!e.defaultPrevented) {
        updateElementHeight(e.currentTarget);
      }
    },
    [onInput, updateElementHeight],
  );

  useEffect(() => {
    const el = ref.current;
    if (el && autoExpand) {
      el.style.resize = 'none';
      el.style.overflowY = 'hidden';
      updateElementHeight(el);
    }
  }, [autoExpand, ref, updateElementHeight, minRows, height, width]);

  return {
    ...props,
    onInput: autoExpand ? inputHandler : onInput,
    rows: autoExpand ? minRows : rows,
  };
};
