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

export type CheckboxOptions = Omit<
  CheckboxProps,
  'onChange' | 'validationHint' | 'name' | 'value'
> & {
  label: string;
  value: string | number;
  required?: InputHTMLAttributes<HTMLInputElement>['required'];
};

export interface CheckboxGroupProps
  extends Omit<
    FieldsetHTMLAttributes<HTMLFieldSetElement>,
    'onChange' | 'name' | 'defaultValue'
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
  options: CheckboxOptions[];
  /**
   * The values of the Checkboxes that are checked by default (uncontrolled).
   */
  defaultValue?: CheckboxOptions['value'][];
  /**
   * The values of the Checkboxes that are checked by default (controlled).
   */
  value?: CheckboxOptions['value'][];
  /**
   * A callback that is called when any of the checkboxes change their values.
   * Passed on to the Checkboxes.
   */
  onChange: CheckboxProps['onChange'];
  /**
   * A description of the selector group.
   */
  label: string;
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
   * Visually hide the label. This should only be used in rare cases and only
   * if the purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
}

const Legend = styled('legend')<Record<'children', JSX.Element>>(
  typography('two'),
);

const UnorderedList = styled.ul`
  list-style-type: none;
`;

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
      name,
      label,
      invalid,
      validationHint,
      showValid,
      disabled,
      hasWarning,
      hideLabel,
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
    const validationHintId = uniqueId('validation-hint_');
    const descriptionIds = `${
      descriptionId ? `${descriptionId} ` : ''
    }${validationHintId}`;

    return (
      <FieldWrapper
        as="fieldset"
        aria-describedby={descriptionIds}
        name={name}
        // @ts-expect-error TypeScript isn't smart enough to recognize the `as` prop.
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <Legend>
          <FieldLabelText label={label} hideLabel={hideLabel} />
        </Legend>
        <UnorderedList>
          {options.map(({ checked, defaultChecked, required, ...option }) => (
            <li key={option.label}>
              <Checkbox
                {...{
                  ...option,
                  name,
                  required,
                  onChange,
                  validationHint: undefined, // disallow `validationHint` for the single Checkbox
                  checked: value?.includes(option.value) ?? checked,
                  defaultChecked:
                    defaultValue?.includes(option.value) ?? defaultChecked,
                }}
              />
            </li>
          ))}
        </UnorderedList>
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
