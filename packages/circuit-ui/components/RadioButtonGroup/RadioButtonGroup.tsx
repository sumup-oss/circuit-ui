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

import { uniqueId } from '../../util/id';
import {
  RadioButton,
  RadioButtonProps,
  RadioButtonGroupContext,
} from '../RadioButton/RadioButton';
import {
  FieldLabelText,
  FieldValidationHint,
  FieldLegend,
  FieldSet,
} from '../FieldAtoms';
import { AccessibilityError } from '../../util/errors';
import { isEmpty } from '../../util/helpers';

export interface RadioButtonGroupProps
  extends Omit<
    FieldsetHTMLAttributes<HTMLFieldSetElement>,
    'onChange' | 'onBlur'
  > {
  /**
   * A collection of available options. Each option must have at least a value
   * and a label.
   */
  options: Omit<RadioButtonProps, 'onChange' | 'onBlur' | 'name'>[];
  /**
   * A callback that is called when any of the inputs change their values.
   * Passed on to the RadioButtons.
   */
  onChange?: RadioButtonProps['onChange'];
  /**
   * A callback that is called when any of the inputs lose focus.
   * Passed on to the RadioButtons.
   */
  onBlur?: RadioButtonProps['onBlur'];
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
   * The value of the currently checked RadioButton.
   */
  defaultValue?: RadioButtonProps['value'];
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

/**
 * A group of RadioButtons.
 */
export const RadioButtonGroup = forwardRef(
  (
    {
      options,
      onChange,
      onBlur,
      value,
      defaultValue,
      'name': customName,
      label,
      invalid,
      validationHint,
      showValid,
      disabled,
      hasWarning,
      hideLabel,
      optionalLabel,
      required,
      'aria-describedby': descriptionId,
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

    if (isEmpty(options)) {
      return null;
    }

    const name = customName || uniqueId('radio-button-group_');
    const validationHintId = uniqueId('validation-hint_');
    const descriptionIds = `${
      descriptionId ? `${descriptionId} ` : ''
    }${validationHintId}`;

    return (
      <FieldSet
        role="radiogroup"
        aria-describedby={descriptionIds}
        aria-orientation="vertical"
        name={name}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <FieldLegend>
          <FieldLabelText
            label={label}
            hideLabel={hideLabel}
            optionalLabel={optionalLabel}
            required={required}
          />
        </FieldLegend>
        <RadioButtonGroupContext.Provider value={true}>
          {options.map(({ className, style, ...option }) => (
            <div key={option.label} className={className} style={style}>
              <RadioButton
                {...option}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                disabled={disabled || option.disabled}
                invalid={invalid || option.invalid}
                checked={value ? option.value === value : option.checked}
                defaultChecked={
                  defaultValue
                    ? option.value === defaultValue
                    : option.defaultChecked
                }
              />
            </div>
          ))}
        </RadioButtonGroupContext.Provider>
        <FieldValidationHint
          id={validationHintId}
          invalid={invalid}
          showValid={showValid}
          disabled={disabled}
          hasWarning={hasWarning}
          validationHint={validationHint}
        />
      </FieldSet>
    );
  },
);

RadioButtonGroup.displayName = 'RadioButtonGroup';
