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

'use client';

import {
  forwardRef,
  useId,
  type FieldsetHTMLAttributes,
  type InputHTMLAttributes,
  type Ref,
} from 'react';

import {
  FieldLabelText,
  FieldValidationHint,
  FieldLegend,
  FieldSet,
} from '../Field/index.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { isEmpty } from '../../util/helpers.js';
import { idx } from '../../util/idx.js';
import {
  RadioButton,
  type RadioButtonProps,
} from '../RadioButton/RadioButton.js';

import classes from './RadioButtonGroup.module.css';

type Option = Omit<RadioButtonProps, 'onChange' | 'name' | 'children'> & {
  /**
   * A clear and concise description of the option's purpose.
   */
  label: string;
  /**
   * Further details about the option's purpose.
   */
  description?: string;
};

export interface RadioButtonGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /**
   * A collection of available options. Each option must have at least a value
   * and a label.
   */
  options: Option[];
  /**
   * A callback that is called when any of the inputs change their values.
   * Passed on to the RadioButtons.
   */
  onChange?: RadioButtonProps['onChange'];
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
    const randomName = useId();
    const name = customName || randomName;
    const validationHintId = useId();
    const descriptionIds = idx(
      descriptionId,
      validationHint && validationHintId,
    );

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !isSufficientlyLabelled(label)
    ) {
      throw new AccessibilityError(
        'RadioButtonGroup',
        'The `label` prop is missing or invalid. Pass `hideLabel` if you intend to hide the label visually.',
      );
    }

    if (isEmpty(options)) {
      return null;
    }

    return (
      <FieldSet
        role="radiogroup"
        aria-describedby={descriptionIds}
        aria-orientation="vertical"
        aria-invalid={invalid && 'true'}
        aria-required={required && 'true'}
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
        <div className={classes.base}>
          {options.map((option) => (
            <RadioButton
              {...option}
              key={option.value?.toString() || option.label}
              disabled={disabled || option.disabled}
              required={required || option.required}
              name={name}
              onChange={onChange}
              checked={value ? option.value === value : option.checked}
              defaultChecked={
                defaultValue
                  ? option.value === defaultValue
                  : option.defaultChecked
              }
            />
          ))}
        </div>
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
