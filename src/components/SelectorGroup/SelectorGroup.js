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
import { includes } from 'lodash/fp';

import { uniqueId } from '../../util/id';

import Selector from '../Selector';

/**
 * A group of Selectors.
 */
const SelectorGroup = ({
  options,
  onChange,
  value: activeValue,
  name: customName,
  label,
  multiple,
  ...props
}) => {
  const name = customName || uniqueId('selector-group_');
  return (
    <div role="group" aria-label={label} {...props}>
      {options &&
        options.map(({ children, value, ...rest }) => (
          <Selector
            key={value}
            {...{ ...rest, value, name, onChange, multiple }}
            checked={includes(value, activeValue)}
          >
            {children}
          </Selector>
        ))}
    </div>
  );
};

SelectorGroup.propTypes = {
  /**
   * A collection of available options. Each option must have at least
   * a value and children.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      children: PropTypes.any.isRequired,
      disabled: PropTypes.bool
    })
  ).isRequired,
  /**
   * Controles/Toggles the checked state. Passed on to the Selectors.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * The value of the currently checked Selector.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  /**
   * A unique name for the radio group.
   */
  name: PropTypes.string,
  /**
   * A visually hidden description of the selector group for screen readers.
   */
  label: PropTypes.string,
  /**
   * Whether the user can select multiple options.
   */
  multiple: PropTypes.bool
};

SelectorGroup.defaultProps = {
  name: null,
  multiple: false
};

/**
 * @component
 */
export default SelectorGroup;
