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
  ComponentType,
  ReactNode,
  SelectHTMLAttributes,
  forwardRef,
  useId,
} from 'react';
import { ChevronDown } from '@sumup/icons';

import { ReturnType } from '../../types/return-type.js';
import {
  FieldWrapper,
  FieldLabel,
  FieldLabelText,
  FieldValidationHint,
} from '../Field/index.js';
import { AccessibilityError } from '../../util/errors.js';
import { clsx } from '../../styles/clsx.js';

import classes from './Select.module.css';

export type SelectOption = {
  value: string | number;
  label: string;
  disabled?: boolean;
  [key: string]: unknown;
};

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode;
  /**
   * A clear and concise description of the select purpose.
   */
  label: string;
  /**
   * Name of the select form element.
   */
  name?: string;
  /**
   * Options to select from. Can also be provided with the children prop.
   */
  options?: SelectOption[];
  /**
   * Styles the select as disabled.
   */
  disabled?: boolean;
  /**
   * Triggers error styles on the component. Important for accessibility.
   */
  invalid?: boolean;
  /**
   * Currently selected value. Matches the "value" property of the options
   * objects. If value is falsy, Select will render the "placeholder" prop as
   * currently selected.
   */
  value?: string | number;
  /**
   * String to show when no selection is made.
   */
  placeholder?: string;
  /**
   * Render prop that should render a left-aligned overlay icon or element.
   * Receives a className prop.
   */
  renderPrefix?: ComponentType<{ value?: string | number; className?: string }>;
  /**
   * An information or error message, displayed below the select.
   */
  validationHint?: string;
  /**
   * Label to indicate that the select is optional. Only displayed when the
   * `required` prop is falsy.
   */
  optionalLabel?: string;
  /**
   * Visually hide the label. This should only be used in rare cases and only
   * if the purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
  /**
   * A unique identifier for the input field. If not defined, a randomly
   * generated id is used.
   */
  id?: string;
}

/**
 * A native select component.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      value,
      defaultValue,
      placeholder,
      disabled,
      invalid,
      required,
      options,
      children,
      'renderPrefix': RenderPrefix,
      validationHint,
      optionalLabel,
      label,
      hideLabel,
      className,
      style,
      'id': customId,
      'aria-describedby': descriptionId,
      ...props
    },
    ref,
  ): ReturnType => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new AccessibilityError(
        'Select',
        'The `label` prop is missing. Pass `hideLabel` if you intend to hide the label visually.',
      );
    }
    const id = useId();
    const selectId = customId || id;
    const validationHintId = useId();
    const descriptionIds = `${
      descriptionId ? `${descriptionId} ` : ''
    }${validationHintId}`;

    const prefix = RenderPrefix && (
      <RenderPrefix className={classes.prefix} value={value} />
    );
    const hasPrefix = Boolean(prefix);

    return (
      <FieldWrapper className={className} style={style} disabled={disabled}>
        <FieldLabel htmlFor={selectId}>
          <FieldLabelText
            label={label}
            hideLabel={hideLabel}
            optionalLabel={optionalLabel}
            required={required}
          />
        </FieldLabel>
        <div className={classes.wrapper}>
          {prefix}
          <select
            id={selectId}
            value={value}
            ref={ref}
            aria-describedby={descriptionIds}
            aria-invalid={invalid && 'true'}
            required={required}
            disabled={disabled}
            defaultValue={defaultValue}
            className={clsx(
              classes.base,
              hasPrefix && classes['has-prefix'],
              className,
            )}
            {...props}
          >
            {!value && !defaultValue && (
              /**
               * We need a key here just like when mapping over options.
               * We're prefixing the key with an underscore to avoid clashes
               * with option values.
               */
              <option key="_placeholder" value="">
                {placeholder}
              </option>
            )}
            {children ||
              (options &&
                options.map(({ label: optionLabel, ...rest }) => (
                  <option key={rest.value} {...rest}>
                    {optionLabel}
                  </option>
                )))}
          </select>
          <ChevronDown className={classes.icon} size="16" aria-hidden="true" />
        </div>
        <FieldValidationHint
          id={validationHintId}
          disabled={disabled}
          invalid={invalid}
          validationHint={validationHint}
        />
      </FieldWrapper>
    );
  },
);

Select.displayName = 'Select';
