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

import {
  FieldsetHTMLAttributes,
  InputHTMLAttributes,
  Ref,
  forwardRef,
} from 'react';

import styled from '../../styles/styled';
import { typography } from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import { RadioButton, RadioButtonProps } from '../RadioButton/RadioButton';
import {
  FieldWrapper,
  FieldLabelText,
  FieldValidationHint,
} from '../FieldAtoms';
import { AccessibilityError } from '../../util/errors';

export interface RadioButtonGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /**
   * A collection of available options. Each option must have at least a value
   * and a label.
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
   * Label to indicate that the input is optional. Only displayed when the
   * `required` prop is falsy.
   */
  optionalLabel?: string;
  /**
   * The value of the currently checked RadioButton.
   */
  value?: RadioButtonProps['value'];
  /**
   * The ref to the HTML DOM element
   */
  ref?: Ref<HTMLFieldSetElement>;
  /**
   * An information, warning or error message, displayed below the input.
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
   * Makes the input group required.
   */
  required?: InputHTMLAttributes<HTMLInputElement>['required'];
  /**
   * Visually hide the label. This should only be used in rare cases and only
   * if the purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
}

type LegendProps = Pick<RadioButtonGroupProps, 'hideLabel'>;

const Legend = styled('legend')<LegendProps>(typography('two'));

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
      optionalLabel,
      required,
      ...props
    }: RadioButtonGroupProps,
    ref: RadioButtonGroupProps['ref'],
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new AccessibilityError(
        'RadioButtonGroup',
        'The `label` prop is missing. Pass `hideLabel` if you intend to hide the label visually.',
      );
    }
    const name = customName || uniqueId('radio-button-group_');
    return (
      <FieldWrapper
        as="fieldset"
        name={name}
        // @ts-expect-error TypeScript isn't smart enough to recognize the `as` prop.
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <Legend>
          <FieldLabelText
            label={label}
            hideLabel={hideLabel}
            optionalLabel={optionalLabel}
            required={required}
          />
        </Legend>
        {options &&
          options.map(
            ({ label: optionLabel, value, className, style, ...rest }) => (
              <div
                key={value && value.toString()}
                className={className}
                style={style}
              >
                <RadioButton
                  {...{ ...rest, value, name, required, onChange }}
                  checked={value === activeValue}
                  label={optionLabel}
                />
              </div>
            ),
          )}
        <FieldValidationHint
          invalid={invalid}
          showValid={showValid}
          disabled={disabled}
          hasWarning={hasWarning}
          validationHint={validationHint}
        />
      </FieldWrapper>
    );
  },
);

RadioButtonGroup.displayName = 'RadioButtonGroup';
