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
  name: customName
}) => {
  const name = customName || uniqueId('radio-button-group_');
  return (
    <Fragment>
      {options &&
        options.map(({ label, value, className, ...props }) => (
          <div key={value} className={className}>
            <RadioButton
              {...{ ...props, value, name, onToggle }}
              checked={value === activeValue}
            >
              {label}
            </RadioButton>
          </div>
        ))}
    </Fragment>
  );
};

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
