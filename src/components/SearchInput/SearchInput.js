import React from 'react';
import PropTypes from 'prop-types';
import { cx } from 'react-emotion';

import Input from '../Input';
import IconInputWrapper from '../IconInputWrapper';
import SearchIcon from './search.svg';

/**
 * SearchInput component for forms.
 */
const SearchInput = ({ disabled, selector, ...props }) => (
  <IconInputWrapper
    {...{ selector }}
    role="search"
    icon={({ className, disabledClassName }) => (
      <SearchIcon
        {...{ disabled }}
        className={cx(className, { [disabledClassName]: disabled })}
      />
    )}
    input={({ className }) => <Input {...{ ...props, disabled, className }} />}
  />
);

SearchInput.propTypes = {
  /**
   * An ID rendered as data-selector attribute on the
   * component. Used for tracking and e2e testing.
   */
  selector: PropTypes.string.isRequired,
  /**
   * Triggers disabled styles on the component. This is also forwarded as
   * attribute to the <input> element.
   */
  disabled: PropTypes.bool
};

SearchInput.defaultProps = {
  disabled: false
};

/**
 * @component
 */
export default SearchInput;
