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
import PropTypes from 'prop-types';
import { Search, Cross } from '@sumup/icons';

import styled from '@emotion/styled';

import Input from '../Input';
import IconButton from '../IconButton';

const ClearButton = styled(IconButton)`
  border: none;
  margin: 0 !important;
  width: auto !important;
  height: calc(100% - 2px) !important;
  pointer-events: all !important;
  cursor: pointer !important;
`;

const SearchInputComponent = (
  { children, value, onClear, clearLabel, ...props },
  ref
) => (
  <Input
    value={value}
    type="text"
    renderPrefix={renderProps => <Search {...renderProps} />}
    renderSuffix={renderProps =>
      value && onClear ? (
        <ClearButton
          onClick={onClear}
          label={clearLabel}
          variant="secondary"
          data-testid="input-clear"
          {...renderProps}
        >
          <Cross />
        </ClearButton>
      ) : null
    }
    {...props}
    ref={ref}
  >
    {children}
  </Input>
);

/**
 * SearchInput component for forms.
 */
const SearchInput = React.forwardRef(SearchInputComponent);

SearchInput.propTypes = {
  ...Input.propTypes,
  /**
   * Callback function when the user clears the field.
   */
  onClear: PropTypes.func,
  /**
   * Visually hidden text label on the clear button for screen readers.
   * Crucial for accessibility.
   */
  clearLabel: PropTypes.string
};

SearchInput.defaultProps = {
  onClear: null,
  clearLabel: 'Clear',
  ref: undefined
};

/**
 * @component
 */
export default SearchInput;
