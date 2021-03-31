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

import React from 'react';
import { css } from '@emotion/core';
import { Search, Cross } from '@sumup/icons';

import styled, { StyleProps } from '../../styles/styled';
import Input from '../Input';
import { InputProps } from '../Input/Input';
import IconButton from '../IconButton';

export interface SearchInputProps extends InputProps {
  /**
   * Callback function when the user clears the field.
   */
  onClear?: () => void;
  /**
   * Visually hidden text label on the clear button for screen readers.
   * Crucial for accessibility.
   */
  clearLabel?: string;
}

const clearButtonStyles = ({ theme }: StyleProps) => css`
  border: none;
  margin: 0 !important;
  width: auto !important;
  height: calc(100% - 2px) !important;
  pointer-events: all !important;
  cursor: pointer !important;
  border-radius: ${theme.borderRadius.giga};
`;

const ClearButton = styled(IconButton)(clearButtonStyles);

/**
 * SearchInput component for forms.
 */
export const SearchInput = React.forwardRef(
  (
    { value, onClear, clearLabel = 'Clear', ...props }: SearchInputProps,
    ref: SearchInputProps['ref'],
  ) => (
    <Input
      value={value}
      type="text"
      renderPrefix={(renderProps) => <Search {...renderProps} />}
      renderSuffix={(renderProps) =>
        value && onClear ? (
          <ClearButton
            onClick={onClear}
            label={clearLabel}
            data-testid="input-clear"
            {...renderProps}
          >
            <Cross />
          </ClearButton>
        ) : null
      }
      {...props}
      ref={ref}
    />
  ),
);

SearchInput.displayName = 'SearchInput';
