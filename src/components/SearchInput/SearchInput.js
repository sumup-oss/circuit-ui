import React from 'react';
import PropTypes from 'prop-types';
import { cx } from 'react-emotion';

import Input from '../Input';
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
