import React from 'react';

import { childrenPropType } from '../../util/shared-prop-types';

import IconInput from '../IconInput';
import SearchIcon from './search.svg';

/**
 * SearchInput component for forms.
 */
const SearchInput = ({ children, ...props }) => (
  <IconInput
    {...props}
    role="search"
    iconLeft={({ className }) => <SearchIcon {...{ className }} />}
  >
    {children}
  </IconInput>
);

SearchInput.propTypes = {
  children: childrenPropType
};

SearchInput.defaultProps = {
  children: null
};

/**
 * @component
 */
export default SearchInput;
