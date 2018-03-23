import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { uniqueId } from '../../util/id';

import RadioButton from '../RadioButton';

/**
 * A group of RadioButtons.
 */
const RadioButtonGroup = ({
  options,
  onChange: onToggle,
  value: activeValue,
  name
}) => (
  <Fragment>
    {options &&
      options.map(({ label, value, className, ...props }) => (
        <div key={value} className={className}>
          <RadioButton
            {...{ ...props, value, onToggle }}
            checked={value === activeValue}
            name={name || uniqueId('radio-button-group_')}
          >
            {label}
          </RadioButton>
        </div>
      ))}
  </Fragment>
);

RadioButtonGroup.propTypes = {
  /**
   * A collection of available options. Each option must have at least
   * a value and label.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool
    })
  ).isRequired,
  /**
   * Controles/Toggles the checked state. Passed on to the RadioButtons.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * The value of the currently checked RadioButton.
   */
  value: PropTypes.string.isRequired,
  /**
   * A unique name for the radio group.
   */
  name: PropTypes.string
};

RadioButtonGroup.defaultProps = {
  name: null
};

/**
 * @component
 */
export default RadioButtonGroup;
