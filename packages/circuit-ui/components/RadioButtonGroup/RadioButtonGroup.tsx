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

import { FieldsetHTMLAttributes, Ref, forwardRef } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';
import { hideVisually, typography } from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import { RadioButton, RadioButtonProps } from '../RadioButton/RadioButton';
import ValidationHint from '../ValidationHint';

export interface RadioButtonGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /**
   * A collection of available options. Each option must have at least
   * a value and a label.
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
   * The ref to the HTML DOM element
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
  /**
   * Visually hide the label. This should only be used in rare cases and only if the
   * purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
}

type LegendProps = Pick<RadioButtonGroupProps, 'hideLabel'>;

const legendStyles = ({ theme }: StyleProps) => css`
  margin-bottom: ${theme.spacings.bit};
`;

const legendHiddenStyles = ({ hideLabel }: LegendProps) =>
  hideLabel && hideVisually();

const Legend = styled('legend')<LegendProps>(
  typography('two'),
  legendStyles,
  legendHiddenStyles,
);

/**
 * A group of RadioButtons.
 */
export const RadioButtonGroup = forwardRef(
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
      hideLabel,
      ...props
    }: RadioButtonGroupProps,
    ref: RadioButtonGroupProps['ref'],
  ) => {
    if (
      process.env.UNSAFE_DISABLE_ACCESSIBILITY_ERRORS !== 'true' &&
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new Error(
        'The RadioButtonGroup component is missing a `label` prop. This is an accessibility requirement. Pass `hideLabel` if you intend to hide the label visually.',
      );
    }
    const name = customName || uniqueId('radio-button-group_');
    return (
      <fieldset name={name} ref={ref} {...props}>
        <Legend hideLabel={hideLabel}>{label}</Legend>
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
                label={children}
              />
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
