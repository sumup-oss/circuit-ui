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

import styled from '@emotion/styled';

import Input from '../Input';
import IconButton from '../IconButton';
import { ReactComponent as SearchIcon } from './icons/search.svg';
import { ReactComponent as ClearIcon } from './icons/clear.svg';

const ClearButton = styled(IconButton)`
  pointer-events: all !important;
  cursor: pointer !important;
`;

/**
 * SearchInput component for forms.
 */
const SearchInput = ({ children, value, onClear, clearLabel, ...props }) => (
  <Input
    value={value}
    type="text"
    renderPrefix={renderProps => <SearchIcon {...renderProps} />}
    renderSuffix={renderProps =>
      value && onClear ? (
        <ClearButton
          onClick={onClear}
          label={clearLabel}
          data-testid="input-clear"
          {...renderProps}
        >
          <ClearIcon />
        </ClearButton>
      ) : null
    }
    {...props}
  >
    {children}
  </Input>
);

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
  clearLabel: 'Clear'
};

/**
 * @component
 */
export default SearchInput;
