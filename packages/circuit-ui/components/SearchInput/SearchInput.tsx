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
import { Search, Close } from '@sumup/icons';

import Input from '../Input/index.js';
import type { InputElement, InputProps } from '../Input/index.js';
import IconButton from '../IconButton/index.js';
import { AccessibilityError } from '../../util/errors.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { clsx } from '../../styles/clsx.js';
import type { ClickEvent } from '../../types/events.js';

import classes from './SearchInput.module.css';

type ClearProps =
  | { onClear?: never; clearLabel?: never }
  | {
      /**
       * Callback function when the user clears the field.
       */
      onClear: (event: ClickEvent) => void;
      /**
       * Visually hidden text label on the clear button for screen readers.
       * Crucial for accessibility.
       */
      clearLabel: string;
    };

export type SearchInputProps = InputProps & ClearProps;

/**
 * SearchInput component for forms.
 */
export const SearchInput = forwardRef<InputElement, SearchInputProps>(
  ({ value, onClear, clearLabel, inputClassName, ...props }, ref) => {
    const localRef = useRef<InputElement>(null);

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      onClear &&
      !clearLabel
    ) {
      throw new AccessibilityError(
        'SearchInput',
        'The `clearLabel` prop is missing. Omit the `onClear` prop if you intend to disable the input clearing functionality.',
      );
    }

    const onClick = (event: ClickEvent) => {
      onClear?.(event);
      localRef.current?.focus();
    };

    return (
      <Input
        value={value}
        type="search"
        renderPrefix={(renderProps) => <Search size="16" {...renderProps} />}
        renderSuffix={(renderProps) =>
          value && onClear && clearLabel ? (
            <IconButton
              {...renderProps}
              onClick={onClick}
              label={clearLabel}
              className={clsx(renderProps.className, classes['clear-button'])}
            >
              <Close size="16" />
            </IconButton>
          ) : null
        }
        inputClassName={clsx(classes.base, inputClassName)}
        {...props}
        ref={applyMultipleRefs(localRef, ref)}
      />
    );
  },
);

SearchInput.displayName = 'SearchInput';
