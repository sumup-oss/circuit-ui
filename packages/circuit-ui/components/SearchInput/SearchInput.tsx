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

import { forwardRef } from 'react';
import { css } from '@emotion/core';
import { Search, Close } from '@sumup/icons';

import styled, { StyleProps } from '../../styles/styled';
import Input from '../Input';
import { InputProps } from '../Input/Input';
import IconButton from '../IconButton';

type ClearProps =
  | { onClear?: never; clearLabel?: never }
  | {
      /**
       * Callback function when the user clears the field.
       */
      onClear: () => void;
      /**
       * Visually hidden text label on the clear button for screen readers.
       * Crucial for accessibility.
       */
      clearLabel: string;
    };

export type SearchInputProps = InputProps & ClearProps;

const clearButtonStyles = ({ theme }: StyleProps) => css`
  border: none;
  margin: 0 !important;
  width: auto !important;
  pointer-events: all !important;
  cursor: pointer !important;
  border-radius: ${theme.borderRadius.byte};
`;

const ClearButton = styled(IconButton)(clearButtonStyles);

/**
 * SearchInput component for forms.
 */
export const SearchInput = forwardRef(
  (
    { value, onClear, clearLabel, ...props }: SearchInputProps,
    ref: SearchInputProps['ref'],
  ) => {
    if (
      process.env.UNSAFE_DISABLE_ACCESSIBILITY_ERRORS !== 'true' &&
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      onClear &&
      !clearLabel
    ) {
      throw new Error(
        'The SearchInput component is missing a `clearLabel` prop. This is an accessibility requirement. Omit the `onClear` prop if you intend to disable the input clearing functionality.',
      );
    }
    return (
      <Input
        value={value}
        type="text"
        renderPrefix={(renderProps) => <Search {...renderProps} />}
        renderSuffix={(renderProps) =>
          value && onClear && clearLabel ? (
            <ClearButton onClick={onClear} label={clearLabel} {...renderProps}>
              <Close />
            </ClearButton>
          ) : null
        }
        {...props}
        ref={ref}
      />
    );
  },
);

SearchInput.displayName = 'SearchInput';
