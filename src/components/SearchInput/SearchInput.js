import React from 'react';

import IconInput from '../IconInput';
import SearchIcon from './search.svg';

/**
 * SearchInput component for forms.
 */
const SearchInput = ({ ...props }) => (
  <IconInput role="search" {...props}>
    {({ className }) => <SearchIcon {...{ className }} />}
  </IconInput>
);

/**
 * @component
 */
export default SearchInput;
