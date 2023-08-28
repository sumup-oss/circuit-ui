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

import { forwardRef, FieldsetHTMLAttributes, useId } from 'react';

import { Selector, SelectorProps, SelectorSize } from '../Selector/Selector.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import {
  FieldLabelText,
  FieldLegend,
  FieldSet,
  FieldValidationHint,
} from '../Field/index.js';
import { isEmpty } from '../../util/helpers.js';
import { clsx } from '../../styles/clsx.js';

import classes from './SelectorGroup.module.css';

export interface SelectorGroupProps
  extends Omit<
    FieldsetHTMLAttributes<HTMLFieldSetElement>,
    'onChange' | 'onBlur'
  > {
  /**
   * A collection of available options. Each option must have at least
   * a value and label.
   */
  options: Omit<SelectorProps, 'onChange' | 'onBlur' | 'name'>[];
  /**
   * A callback that is called when any of the inputs change their values.
   * Passed on to the Selectors.
   */
  onChange?: SelectorProps['onChange'];
  /**
   * A callback that is called when any of the inputs lose focus.
   * Passed on to the Selectors.
   */
  onBlur?: SelectorProps['onBlur'];
  /**
   * The value of the currently checked options.
   */
  value?: string | string[];
  /**
   * The value of the initially checked options.
   */
  defaultValue?: string | string[];
  /**
   * A description of the selector group.
   */
  label: string;
  /**
   * A unique name for the selector group.
   */
  name?: string;
  /**
   * Whether the user can select multiple options.
   */
  multiple?: boolean;
  /**
   * Size of the Selectors within the group. Default: 'mega'.
   */
  size?: SelectorSize;
  /**
   * Whether the group should take the whole width available. Defaults to true.
   */
  stretch?: boolean;
  /**
   * Visually hide the label. This should only be used in rare cases and only
   * if the purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
  /**
   * Label to indicate that the input is optional. Only displayed when the
   * `required` prop is falsy.
   */
  optionalLabel?: string;
  /**
   * Marks the input group as required.
   */
  required?: boolean;
  /**
   * An information, warning or error message, displayed below the input.
   */
  validationHint?: string;
  /**
   * Marks the inputs as invalid.
   */
  invalid?: boolean;
}

function isChecked(
  option: SelectorProps,
  value: SelectorGroupProps['value'] = [],
  multiple?: boolean,
): boolean {
  return multiple ? value.includes(option.value) : value === option.value;
}

/**
 * A group of Selectors.
 */
export const SelectorGroup = forwardRef<
  HTMLFieldSetElement,
  SelectorGroupProps
>(
  (
    {
      options,
      onChange,
      onBlur,
      value,
      defaultValue,
      'name': customName,
      'aria-describedby': descriptionId,
      label,
      required,
      optionalLabel,
      disabled,
      multiple,
      size,
      stretch = false,
      validationHint,
      invalid,
      hideLabel,
      ...props
    },
    ref,
  ) => {
    const randomName = useId();
    const name = customName || randomName;
    const validationHintId = useId();
    const descriptionIds = `${
      descriptionId ? `${descriptionId} ` : ''
    }${validationHintId}`;

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !isSufficientlyLabelled(label)
    ) {
      throw new AccessibilityError(
        'SelectorGroup',
        'The `label` prop is missing or invalid. Pass `hideLabel` if you intend to hide the label visually.',
      );
    }

    if (isEmpty(options)) {
      return null;
    }

    return (
      <FieldSet
        name={name}
        aria-describedby={descriptionIds}
        ref={ref}
        disabled={disabled}
        role={multiple ? undefined : 'radiogroup'}
        aria-orientation={multiple ? undefined : 'horizontal'}
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
        <div className={clsx(classes.base, stretch && classes.stretch)}>
          {options.map((option) => (
            <Selector
              {...option}
              key={option.label}
              className={classes.option}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              multiple={multiple}
              size={size}
              disabled={disabled || option.disabled}
              invalid={invalid || option.invalid}
              checked={
                value ? isChecked(option, value, multiple) : option.checked
              }
              defaultChecked={
                defaultValue
                  ? isChecked(option, defaultValue, multiple)
                  : option.defaultChecked
              }
            />
          ))}
        </div>
        <FieldValidationHint
          id={validationHintId}
          invalid={invalid}
          disabled={disabled}
          validationHint={validationHint}
        />
      </FieldSet>
    );
  },
);

SelectorGroup.displayName = 'SelectorGroup';
