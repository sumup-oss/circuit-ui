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

import { forwardRef, useRef } from 'react';
import { Search } from '@sumup-oss/icons';

import { Input, type InputProps } from '../Input/index.js';
import { CloseButton } from '../CloseButton/index.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { clsx } from '../../styles/clsx.js';
import type { ClickEvent } from '../../types/events.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';
import type { Locale } from '../../util/i18n.js';

import classes from './SearchInput.module.css';
import { translations } from './translations/index.js';

export type SearchInputProps = InputProps & {
  /**
   * Callback function when the user clears the field.
   */
  onClear?: (event: ClickEvent) => void;
  /**
   * Visually hidden text label on the clear button for screen readers.
   * Crucial for accessibility.
   */
  clearLabel?: string;
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   * Defaults to `navigator.language` in supported environments.
   */
  locale?: Locale;
};

/**
 * SearchInput component for forms.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    const { value, onClear, clearLabel, inputClassName, locale, ...rest } =
      useI18n(props, translations);
    const localRef = useRef<HTMLInputElement>(null);

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      onClear &&
      !isSufficientlyLabelled(clearLabel)
    ) {
      throw new AccessibilityError(
        'SearchInput',
        'The `clearLabel` prop is missing or invalid. Omit the `onClear` prop if you intend to disable the input clearing functionality.',
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
        renderPrefix={(prefixProps) => (
          <Search
            size="16"
            className={prefixProps.className}
            aria-hidden="true"
          />
        )}
        {...(value && onClear && clearLabel
          ? {
              renderSuffix: (renderProps) => (
                <CloseButton {...renderProps} size="s" onClick={onClick}>
                  {clearLabel}
                </CloseButton>
              ),
            }
          : {})}
        inputClassName={clsx(classes.base, inputClassName)}
        {...rest}
        ref={applyMultipleRefs(localRef, ref)}
      />
    );
  },
);

SearchInput.displayName = 'SearchInput';
