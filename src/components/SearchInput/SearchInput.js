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

import { childrenPropType } from '../../util/shared-prop-types';

import Input from '../Input';
import { ReactComponent as SearchIcon } from './icons/search.svg';
import { ReactComponent as ClearIcon } from './icons/clear.svg';

const StyledClearIcon = styled(ClearIcon)`
  pointer-events: all !important;
  cursor: pointer !important;
`;

/**
 * SearchInput component for forms.
 */
const SearchInput = ({ children, value, onClear, ...props }) => (
  <Input
    value={value}
    type="text"
    renderPrefix={({ className }) => <SearchIcon {...{ className }} />}
    renderSuffix={({ className }) =>
      value && onClear ? (
        <StyledClearIcon onClick={onClear} {...{ className }} />
      ) : null
    }
    {...props}
  >
    {children}
  </Input>
);

SearchInput.propTypes = {
  ...Input.propTypes,
  children: childrenPropType,
  onClear: PropTypes.func
};

SearchInput.defaultProps = {
  children: null,
  onClear: null
};

/**
 * @component
 */
export default SearchInput;
