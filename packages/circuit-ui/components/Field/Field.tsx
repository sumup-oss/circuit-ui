/**
 * Copyright 2020, SumUp Ltd.
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
  forwardRef,
  type FieldsetHTMLAttributes,
  type HTMLAttributes,
  type LabelHTMLAttributes,
} from 'react';
import { Confirm, Notify, Alert } from '@sumup/icons';

import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';

import classes from './Field.module.css';
import { getFieldValidity } from './FieldService.js';

export interface FieldWrapperProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Trigger disabled styles on the component.
   */
  disabled?: boolean;
}

/**
 * @private
 */
export const FieldWrapper = forwardRef<HTMLDivElement, FieldWrapperProps>(
  ({ children, disabled, className, ...props }, ref) => (
    <div
      ref={ref}
      data-disabled={disabled}
      className={clsx(classes.wrapper, className)}
      {...props}
    >
      {children}
    </div>
  ),
);

export type FieldSetProps = FieldsetHTMLAttributes<HTMLFieldSetElement>;

/**
 * @private
 */
export const FieldSet = forwardRef<HTMLFieldSetElement, FieldSetProps>(
  ({ className, ...props }, ref) => (
    <fieldset
      {...props}
      ref={ref}
      className={clsx(classes.fieldset, className)}
    />
  ),
);

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * The identifier of the corresponding form element.
   */
  htmlFor: string;
}

/**
 * @private
 */
export const FieldLabel = ({
  className,
  htmlFor,
  ...props
}: FieldLabelProps) => (
  <label
    {...props}
    htmlFor={htmlFor}
    className={clsx(classes.label, className)}
  />
);

export type FieldLegendProps = HTMLAttributes<HTMLLegendElement>;

export const FieldLegend = ({ className, ...props }: FieldLegendProps) => (
  <legend {...props} className={clsx(classes.legend, className)} />
);

export interface FieldLabelTextProps {
  /**
   * A clear and concise description of the input purpose.
   */
  label: string;
  /**
   * Label to indicate that the input is optional. Only displayed when the
   * `required` prop is falsy.
   */
  optionalLabel?: string;
  /**
   * Visually hide the label. This should only be used in rare cases and only
   * if the purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
  /**
   * The `optionalLabel` is only shown when the input is not required.
   */
  required?: boolean;
}

/**
 * @private
 */
export function FieldLabelText({
  label,
  hideLabel,
  optionalLabel,
  required,
}: FieldLabelTextProps) {
  return (
    <span
      className={clsx(
        classes['label-text'],
        hideLabel && utilClasses.hideVisually,
      )}
    >
      {label}
      {optionalLabel && !required ? (
        <span
          className={classes['label-text-optional']}
        >{` (${optionalLabel})`}</span>
      ) : null}
    </span>
  );
}

export interface FieldDescriptionProps extends HTMLAttributes<HTMLSpanElement> {
  validationHint?: string;
}

/**
 * @private
 */
export const FieldDescription = ({
  className,
  ...props
}: FieldDescriptionProps) => (
  <span {...props} className={clsx(classes.description, className)} />
);

export interface FieldValidationHintProps
  extends HTMLAttributes<HTMLSpanElement> {
  validationHint?: string;
  disabled?: boolean;
  invalid?: boolean;
  hasWarning?: boolean;
  showValid?: boolean;
}

const icons = {
  invalid: Alert,
  warning: Notify,
  valid: Confirm,
};

/**
 * @private
 */
export const FieldValidationHint = ({
  validationHint,
  className,
  hasWarning,
  showValid,
  invalid,
  disabled,
  ...props
}: FieldValidationHintProps) => {
  const validity = getFieldValidity({
    hasWarning,
    showValid,
    invalid,
    disabled,
  });
  const Icon = validity && icons[validity];
  const hasMessage = Boolean(validationHint);
  const isStatusMessage = Boolean(validity);

  const classNames = clsx(
    classes['validation-hint'],
    validity && classes[validity],
    className,
  );

  return (
    <>
      {hasMessage && !isStatusMessage && (
        <div className={classNames} {...props}>
          {validationHint}
        </div>
      )}
      <span role="status" aria-live="polite">
        {hasMessage && isStatusMessage && (
          <div className={classNames} {...props}>
            {Icon && (
              <div className={classes['validation-hint-icon']}>
                <Icon aria-hidden="true" size="16" />
              </div>
            )}
            {validationHint}
          </div>
        )}
      </span>
    </>
  );
};
