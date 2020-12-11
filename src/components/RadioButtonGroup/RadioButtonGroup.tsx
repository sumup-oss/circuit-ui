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

/** @jsx jsx */
import React, { HTMLProps, Ref } from 'react';
import { css, jsx } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';
import { textKilo } from '../../styles/style-helpers';
import { uniqueId } from '../../util/id';
import { RadioButton, RadioButtonProps } from '../RadioButton/RadioButton';
import ValidationHint from '../ValidationHint';

export interface RadioButtonGroupProps
  extends Omit<HTMLProps<HTMLFieldSetElement>, 'onChange'> {
  /**
   * A collection of available options. Each option must have at least
   * a value and children.
   */
  options: Omit<RadioButtonProps, 'onChange'>[];
  /**
   * Controls/Toggles the checked state. Passed on to the RadioButtons.
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
  ref?: Ref<HTMLFieldSetElement>;
  /**
   * Warning/error/valid message, displayed below the radio buttons.
   */
  validationHint?: string;
  /**
   * Triggers error message below the radio buttons.
   */
  invalid?: boolean;
  /**
   * Triggers warning message below the radio buttons.
   */
  hasWarning?: boolean;
  /**
   * Triggers valid message below the radio buttons.
   */
  showValid?: boolean;
}

const legendBaseStyles = ({ theme }: StyleProps) => css`
  ${textKilo({ theme })};
  margin-bottom: ${theme.spacings.bit};
`;

const StyledLegend = styled('legend')<HTMLProps<HTMLLegendElement>>(
  legendBaseStyles,
);

/**
 * A group of RadioButtons.
 */
export const RadioButtonGroup = React.forwardRef(
  (
    {
      options,
      onChange,
      value: activeValue,
      name: customName,
      label,
      invalid,
      validationHint,
      showValid,
      disabled,
      hasWarning,
      ...props
    }: RadioButtonGroupProps,
    ref: RadioButtonGroupProps['ref'],
  ) => {
    const name = customName || uniqueId('radio-button-group_');
    return (
      <fieldset name={name} ref={ref} {...props}>
        {label && <StyledLegend>{label}</StyledLegend>}
        {options &&
          options.map(({ children, value, className, style, ...rest }) => (
            <div
              key={value && value.toString()}
              className={className}
              style={style}
            >
              <RadioButton
                {...{ ...rest, value, name, onChange }}
                checked={value === activeValue}
              >
                {children}
              </RadioButton>
            </div>
          ))}
        <ValidationHint
          invalid={invalid}
          showValid={showValid}
          disabled={disabled}
          hasWarning={hasWarning}
          validationHint={validationHint}
        />
      </fieldset>
    );
  },
);

RadioButtonGroup.displayName = 'RadioButtonGroup';
