/**
 * Copyright 2022, SumUp Ltd.
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

import { Checkbox, type CheckboxProps } from '../Checkbox/Checkbox.js';
import {
  FieldLabelText,
  FieldValidationHint,
  FieldSet,
  FieldLegend,
} from '../Field/index.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { isEmpty } from '../../util/helpers.js';
import { idx } from '../../util/idx.js';

import classes from './CheckboxGroup.module.css';

// TODO: Remove the value override in the next major.
type Options = Omit<
  CheckboxProps,
  'onChange' | 'validationHint' | 'name' | 'value' | 'optionalLabel'
> & {
  value: string | number;
};

export interface CheckboxGroupProps
  extends Omit<
    FieldsetHTMLAttributes<HTMLFieldSetElement>,
    'onChange' | 'onBlur' | 'defaultValue'
  > {
  /**
   * A name for the CheckboxGroup. This name is shared among the individual Checkboxes.
   */
  name: string;
  /**
   * A collection of available options. Each option must have at least a label and a value
   * for the respective Checkbox.
   * Pass the optional `required` prop to indicate a Checkbox is required.
   */
  options: Options[];
  /**
   * The values of the Checkboxes that are checked by default (uncontrolled).
   */
  defaultValue?: Options['value'][];
  /**
   * The values of the Checkboxes that are checked by default (controlled).
   */
  value?: Options['value'][];
  /**
   * A callback that is called when any of the inputs change their values.
   * Passed on to the Checkboxes.
   */
  onChange?: CheckboxProps['onChange'];
  /**
   * A callback that is called when any of the inputs lose focus.
   * Passed on to the Checkboxes.
   */
  onBlur?: CheckboxProps['onBlur'];
  /**
   * A description of the selector group.
   */
  label: string;
  /**
   * Label to indicate that the input is optional. Only displayed when the
   * `required` prop is falsy.
   */
  optionalLabel?: string;
  /**
   * The ref to the HTML DOM element.
   */
  ref?: Ref<HTMLFieldSetElement>;
  /**
   * An information, warning or error message, displayed below the Checkboxes.
   */
  validationHint?: string;
  /**
   * Triggers error message below the Checkboxes.
   */
  invalid?: boolean;
  /**
   * Triggers warning message below the Checkboxes.
   */
  hasWarning?: boolean;
  /**
   * Triggers valid message below the Checkboxes.
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
 * A group of Checkboxes.
 */
export const CheckboxGroup = forwardRef(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      onBlur,
      name,
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
    }: CheckboxGroupProps,
    ref: CheckboxGroupProps['ref'],
  ) => {
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
        'CheckboxGroup',
        'The `label` prop is missing or invalid. Pass `hideLabel` if you intend to hide the label visually.',
      );
    }

    if (isEmpty(options)) {
      return null;
    }

    return (
      <FieldSet
        aria-describedby={descriptionIds}
        name={name}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <FieldLegend>
          <FieldLabelText
            label={label}
            hideLabel={hideLabel}
            required={required}
            optionalLabel={optionalLabel}
          />
        </FieldLegend>
        <ul className={classes.base}>
          {options.map((option) => (
            <li key={option.value || option.label}>
              <Checkbox
                {...option}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled || option.disabled}
                invalid={invalid || option.invalid}
                checked={value ? value.includes(option.value) : option.checked}
                defaultChecked={
                  defaultValue
                    ? defaultValue.includes(option.value)
                    : option.defaultChecked
                }
              />
            </li>
          ))}
        </ul>
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

CheckboxGroup.displayName = 'CheckboxGroup';
