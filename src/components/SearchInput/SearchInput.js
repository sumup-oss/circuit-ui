import React from 'react';

import { childrenPropType } from '../../util/shared-prop-types';

import Input from '../Input';
import { ReactComponent as SearchIcon } from './search.svg';

/**
 * SearchInput component for forms.
 */
const SearchInput = ({ children, ...props }) => (
  <Input
    {...props}
    role="search"
    renderPrefix={({ className }) => <SearchIcon {...{ className }} />}
  >
    {children}
  </Input>
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
