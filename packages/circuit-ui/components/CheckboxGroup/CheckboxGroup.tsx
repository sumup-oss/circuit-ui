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

import {
  FieldsetHTMLAttributes,
  InputHTMLAttributes,
  Ref,
  forwardRef,
} from 'react';

import styled from '../../styles/styled';
import { typography } from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import { Checkbox, CheckboxProps } from '../Checkbox/Checkbox';
import {
  FieldWrapper,
  FieldLabelText,
  FieldValidationHint,
} from '../FieldAtoms';
import { AccessibilityError } from '../../util/errors';

export interface CheckboxGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /**
   * A collection of available options. Each option must have at least a label and a value
   * for the respective Checkbox.
   */
  options: (Omit<CheckboxProps, 'onChange'> & {
    label: string;
  })[];
  /**
   * The values of the Checkboxes that are checked by default.
   */
  value?: CheckboxProps['value'][];
  /**
   * A callback that is called when the any of the checkboxes change their values.
   * Passed on to the Checkboxes.
   */
  onChange: CheckboxProps['onChange'];
  /**
   * A description of the selector group.
   */
  label: string;
  /**
   * Label to indicate that the input group is optional. Only displayed when the
   * `required` prop is falsy.
   */
  optionalLabel?: string;
  /**
   * The ref to the HTML DOM element.
   */
  ref?: Ref<HTMLFieldSetElement>;
  /**
   * Makes the input group required.
   */
  required?: InputHTMLAttributes<HTMLInputElement>['required'];
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
   * Visually hide the label. This should only be used in rare cases and only
   * if the purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
}

const Legend = styled('legend')<Record<string, unknown>>(typography('two'));

/**
 * A group of Checkboxes.
 */
export const CheckboxGroup = forwardRef(
  (
    {
      options,
      value,
      onChange,
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
    }: CheckboxGroupProps,
    ref: CheckboxGroupProps['ref'],
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new AccessibilityError(
        'CheckboxGroup',
        'The `label` prop is missing. Pass `hideLabel` if you intend to hide the label visually.',
      );
    }
    const name = customName || uniqueId('checkbox-button-group_');
    const validationHintId = uniqueId('validation-hint_');
    const descriptionIds = `${
      descriptionId ? `${descriptionId} ` : ''
    }${validationHintId}`;

    // Check if any of the Checkboxes are checked by default.
    let checkedCheckboxes: { [k: string]: boolean } = {};
    if (value) {
      checkedCheckboxes = value.reduce(
        (
          accumulator: { [k: string]: boolean },
          checkboxValue: CheckboxProps['value'],
        ) => {
          if (checkboxValue) {
            accumulator[checkboxValue.toString()] = options.some(
              (option) => checkboxValue === option.value,
            );
          }
          return accumulator;
        },
        {},
      );
    }

    return (
      <FieldWrapper
        as="fieldset"
        role="group"
        aria-describedby={descriptionIds}
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
            ({
              value: checkboxValue,
              className,
              style,
              label: checkboxLabel,
              ...rest
            }) => (
              <div
                key={checkboxValue && checkboxValue.toString()}
                className={className}
                style={style}
              >
                <Checkbox
                  {...{
                    ...rest,
                    value: checkboxValue,
                    name,
                    required,
                    onChange,
                    checked:
                      !!checkboxValue &&
                      checkedCheckboxes[checkboxValue.toString()],
                  }}
                >
                  {checkboxLabel}
                </Checkbox>
              </div>
            ),
          )}
        <FieldValidationHint
          id={validationHintId}
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

CheckboxGroup.displayName = 'CheckboxGroup';
