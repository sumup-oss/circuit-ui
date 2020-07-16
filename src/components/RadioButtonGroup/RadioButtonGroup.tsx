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

import React, { HTMLProps, Ref } from 'react';

import { uniqueId } from '../../util/id';
import { RadioButton, RadioButtonProps } from '../RadioButton/RadioButton';

export interface RadioButtonGroupProps extends HTMLProps<HTMLDivElement> {
  /**
   * A collection of available options. Each option must have at least
   * a value and children.
   */
  options: Omit<RadioButtonProps, 'onChange'>[];
  /**
   * Controles/Toggles the checked state. Passed on to the RadioButtons.
   */
  onChange: RadioButtonProps['onChange'];
  /**
   * A visually hidden description of the selector group for screen readers.
   */
  label: string;
  /**
   * The value of the currently checked RadioButton.
   */
  value?: RadioButtonProps['value'];
  /**
   * The ref to the HTML Dom element
   */
  ref?: Ref<HTMLDivElement>;
}

const RadioButtonGroupComponent = (
  {
    options,
    onChange,
    value: activeValue,
    name: customName,
    label,
    ...props
  }: RadioButtonGroupProps,
  ref: RadioButtonGroupProps['ref'],
) => {
  const name = customName || uniqueId('radio-button-group_');
  return (
    <div role="group" aria-label={label} ref={ref} {...props}>
      {options &&
        options.map(({ children, value, className, ...rest }) => (
          <div key={value && value.toString()} className={className}>
            <RadioButton
              {...{ ...rest, value, name, onChange }}
              checked={value === activeValue}
            >
              {children}
            </RadioButton>
          </div>
        ))}
    </div>
  );
};

/**
 * A group of RadioButtons.
 */
export const RadioButtonGroup = React.forwardRef(RadioButtonGroupComponent);
