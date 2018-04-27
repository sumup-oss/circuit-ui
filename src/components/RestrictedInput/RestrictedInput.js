import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import { handleKeyDown, handleCarretPosition } from './RestrictedInputService';

// TODO: add state management to enable shortcurts. This
// will require tracking the previously pressed key and
// allowing the event to bubble when the previous key was
// a modifier key.

/**
 * A wrapper around Input that disables specific keys from
 * registering and ensures the carret stays on one side of the
 * input at all times.
 */
const RestrictedInput = ({
  filteredKeys,
  onFocus,
  onMouseUp,
  alignCarretLeft,
  ...props
}) => (
  <Input
    {...props}
    onKeyDown={handleKeyDown(filteredKeys)}
    onFocus={handleCarretPosition(onFocus, alignCarretLeft)}
    onMouseUp={handleCarretPosition(onMouseUp, alignCarretLeft)}
  />
);

RestrictedInput.LEFT = 'left';
RestrictedInput.RIGHT = 'right';

RestrictedInput.propTypes = {
  /**
   * An array of keys that shold register with the input. All
   * other keys will be ignored.
   */
  filteredKeys: PropTypes.arrayOf(PropTypes.string),
  /**
   * An array of keys that shold register with the input. All
   * other keys will be ignored.
   */
  alignCarretLeft: PropTypes.bool,
  /**
   * A focus event handler. We use our own to limit the keys a user
   * can press when editing.
   */
  onFocus: PropTypes.func,
  /**
   * mouseup event handler. We use our own to move the carret
   * to one side of the input whenever a user clicks it.
   */
  onMouseUp: PropTypes.func
};

RestrictedInput.defaultProps = {
  alignCarretLeft: false,
  onFocus: null,
  onMouseUp: null,
  filteredKeys: []
};

/**
 * @component
 */
export default RestrictedInput;
