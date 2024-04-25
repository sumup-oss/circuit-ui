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

'use client';

import { forwardRef, useState } from 'react';

import Input from '../Input/index.js';
import type { InputElement, InputProps } from '../Input/index.js';

import { PasswordVisibilityToggle } from './PasswordVisibilityToggle.js';

type ShowProps =
  | { showLabel?: never; hideLabel?: never }
  | {
      /**
       * Visually hidden text label on the button for toggling the password
       * to visible state for screen readers.
       * Crucial for accessibility.
       */
      showLabel: string;
      /**
       * Visually hidden text label on the button for toggling the password
       * to hidden state for screen readers.
       * Crucial for accessibility.
       */
      hideLabel: string;
    };

export type PasswordInputProps = InputProps & ShowProps;

/**
 * PasswordInput component for forms.
 */
export const PasswordInput = forwardRef<InputElement, PasswordInputProps>(
  ({ value, showLabel, hideLabel, inputClassName, ...props }) => {
    const [show, setShow] = useState(false);

    return (
      <Input
        value={value}
        type={show ? 'text' : 'password'}
        {...(value && showLabel && hideLabel
          ? {
              renderSuffix: ({ className }) => (
                <PasswordVisibilityToggle
                  visible={show}
                  className={className}
                  onShowClick={() => setShow(!show)}
                  showLabel={showLabel}
                  hideLabel={hideLabel}
                />
              ),
            }
          : {})}
        inputClassName={inputClassName}
        {...props}
      />
    );
  },
);

PasswordInput.displayName = 'SearchInput';
