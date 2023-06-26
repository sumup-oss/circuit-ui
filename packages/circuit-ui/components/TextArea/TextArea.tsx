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

import { forwardRef, useRef } from 'react';

import Input from '../Input/index.js';
import type { InputElement, InputProps } from '../Input/index.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { clsx } from '../../styles/clsx.js';

import { useAutoExpand } from './useAutoExpand.js';
import classes from './TextArea.module.css';

export type TextAreaProps = Omit<InputProps, 'rows'> & {
  /**
   * The number of visible text lines for the control.
   * If set to `auto`, the control will auto-expand vertically to show the whole value.
   */
  rows?: InputProps['rows'] | 'auto';
  /**
   * Define the minimum number of visible text lines for the control.
   * Works only when `rows` is set to `auto`.
   */
  minRows?: InputProps['rows'];
};

/**
 * TextArea component for forms.
 */
export const TextArea = forwardRef<InputElement, TextAreaProps>(
  ({ inputClassName, ...props }, ref) => {
    const localRef = useRef<InputElement>(null);
    const modifiedProps = useAutoExpand(localRef, props);

    return (
      <Input
        {...modifiedProps}
        inputClassName={clsx(classes.base, inputClassName)}
        as="textarea"
        ref={applyMultipleRefs(localRef, ref)}
      />
    );
  },
);

TextArea.displayName = 'TextArea';
