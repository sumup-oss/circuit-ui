import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { includes } from 'lodash';

import { uniqueId } from '../../util/id';

import Checkbox from '../Checkbox';

/**
 * A group of Checkboxes.
 */
const CheckboxGroup = ({
  options,
  onChange: onToggle,
  value: activeValue,
  name
}) => (
  <Fragment>
    {options &&
      options.map(({ label, value, className, ...props }) => (
        <div key={value} className={className}>
          <Checkbox
            {...{ ...props, value, onToggle }}
            checked={includes(activeValue, value)}
            name={name || uniqueId('checkbox-group_')}
          >
            {label}
          </Checkbox>
        </div>
      ))}
  </Fragment>
);

CheckboxGroup.propTypes = {
  /**
   * A consice description of the example prop.
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
   * Controles/Toggles the checked state.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Value string for input.
   */
  value: PropTypes.string.isRequired,
  /**
   * A unique name for the checkbox group.
   */
  name: PropTypes.string
};

CheckboxGroup.defaultProps = {
  name: null
};

/**
 * @component
 */
export default CheckboxGroup;
