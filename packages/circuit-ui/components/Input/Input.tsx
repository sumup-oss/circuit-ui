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
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useId,
} from 'react';

import {
  FieldWrapper,
  FieldLabel,
  FieldLabelText,
  FieldValidationHint,
} from '../Field/index.js';
import { ReturnType } from '../../types/return-type.js';
import { AccessibilityError } from '../../util/errors.js';
import { clsx } from '../../styles/clsx.js';

import classes from './Input.module.css';

export type InputElement = HTMLInputElement & HTMLTextAreaElement;
type CircuitInputHTMLAttributes = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface InputProps extends CircuitInputHTMLAttributes {
  /**
   * A clear and concise description of the input purpose.
   */
  label: string;
  /**
   * The HTML input element to render.
   */
  as?: 'input' | 'textarea';
  /**
   * A unique identifier for the input field. If not defined, a randomly
   * generated id is used.
   */
  id?: string;
  /**
   * Render prop that should render a left-aligned overlay icon or element.
   * Receives a className prop.
   */
  renderPrefix?: ComponentType<{ className?: string }>;
  /**
   * Render prop that should render a right-aligned overlay icon or element.
   * Receives a className prop.
   */
  renderSuffix?: ComponentType<{ className?: string }>;
  /**
   * An information, warning or error message, displayed below the input.
   */
  validationHint?: string;
  /**
   * Label to indicate that the input is optional. Only displayed when the
   * `required` prop is falsy.
   */
  optionalLabel?: string;
  /**
   * Triggers error styles on the component. Important for accessibility.
   */
  invalid?: boolean;
  /**
   * Triggers warning styles on the component.
   */
  hasWarning?: boolean;
  /**
   * Enables valid styles on the component.
   */
  showValid?: boolean;
  /**
   * Triggers readonly styles on the component.
   */
  readOnly?: boolean;
  /**
   * Aligns text in the input
   */
  textAlign?: 'left' | 'right';
  /**
   * Visually hide the label. This should only be used in rare cases and only
   * if the purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
  /**
   * Class to overwrite the input element styles.
   */
  inputClassName?: string;
}

/**
 * Input component for forms. Takes optional prefix and suffix as render props.
 */
export const Input = forwardRef<InputElement, InputProps>(
  (
    {
      value,
      'renderPrefix': RenderPrefix,
      'renderSuffix': RenderSuffix,
      validationHint,
      optionalLabel,
      required,
      invalid,
      hasWarning,
      showValid,
      disabled,
      textAlign,
      inputClassName,
      'as': Element = 'input',
      label,
      hideLabel,
      'id': customId,
      className,
      style,
      'aria-describedby': descriptionId,
      ...props
    },
    ref,
  ): ReturnType => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      props.type !== 'hidden' &&
      !label
    ) {
      throw new AccessibilityError(
        'Input',
        'The `label` prop is missing. Pass `hideLabel` if you intend to hide the label visually.',
      );
    }

    const id = useId();
    const inputId = customId || id;
    const validationHintId = useId();
    const descriptionIds = `${
      descriptionId ? `${descriptionId} ` : ''
    }${validationHintId}`;

    const prefix = RenderPrefix && <RenderPrefix className={classes.prefix} />;
    const suffix = RenderSuffix && <RenderSuffix className={classes.suffix} />;

    const hasPrefix = Boolean(prefix);
    const hasSuffix = Boolean(suffix);

    return (
      <FieldWrapper className={className} style={style} disabled={disabled}>
        <FieldLabel htmlFor={inputId}>
          <FieldLabelText
            label={label}
            hideLabel={hideLabel}
            optionalLabel={optionalLabel}
            required={required}
          />
        </FieldLabel>
        <div className={classes.wrapper}>
          {prefix}
          <Element
            id={inputId}
            value={value}
            ref={ref}
            aria-describedby={descriptionIds}
            className={clsx(
              classes.base,
              !disabled && hasWarning && classes.warning,
              textAlign === 'right' && classes['align-right'],
              hasPrefix && classes['has-prefix'],
              hasSuffix && classes['has-suffix'],
              inputClassName,
            )}
            aria-invalid={invalid && 'true'}
            required={required}
            disabled={disabled}
            {...props}
          />
          {suffix}
        </div>
        <FieldValidationHint
          id={validationHintId}
          disabled={disabled}
          invalid={invalid}
          hasWarning={hasWarning}
          showValid={showValid}
          validationHint={validationHint}
        />
      </FieldWrapper>
    );
  },
);

Input.displayName = 'Input';
