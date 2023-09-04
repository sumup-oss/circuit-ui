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

import { Fragment, InputHTMLAttributes, forwardRef, useId } from 'react';

import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { FieldWrapper } from '../Field/index.js';
import { clsx } from '../../styles/clsx.js';
import utilityClasses from '../../styles/utility.js';

import classes from './Selector.module.css';

export type SelectorSize = 'kilo' | 'mega' | 'flexible';

export interface SelectorProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * A clear and concise description of the input's purpose.
   */
  label: string;
  /**
   * A more detailed description of the input's purpose.
   */
  description?: string;
  /**
   * Value string for input.
   */
  value: string;
  /**
   * A unique identifier for the input field. If not defined, a randomly generated id is used.
   */
  id?: string;
  /**
   * The name of the selector.
   */
  name?: string;
  /**
   * Choose from 3 sizes. Default: 'mega'.
   */
  size?: SelectorSize;
  /**
   * Whether the selector is selected or not.
   */
  checked?: boolean;
  /**
   *Marks the input as invalid.
   */
  invalid?: boolean;
  /**
   * Whether the selector is disabled or not.
   */
  disabled?: boolean;
  /**
   * Whether the user can select multiple options.
   */
  multiple?: boolean;
  children?: never;
}

/**
 * @deprecated Use the SelectorGroup component instead.
 */
export const Selector = forwardRef<HTMLInputElement, SelectorProps>(
  (
    {
      label,
      description,
      value,
      'id': customId,
      name,
      disabled,
      invalid,
      multiple,
      onChange,
      'aria-describedby': describedBy,
      className,
      style,
      size = 'mega',
      children,
      ...props
    },
    ref,
  ) => {
    const randomId = useId();
    const inputId = customId || randomId;
    const descriptionId = useId();
    const descriptionIds = [describedBy, description && descriptionId]
      .filter(Boolean)
      .join(' ');
    const type = multiple ? 'checkbox' : 'radio';

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !isSufficientlyLabelled(label)
    ) {
      throw new AccessibilityError(
        'Selector',
        'The `label` prop is missing or invalid.',
      );
    }

    const hasDescription = Boolean(description);

    return (
      <FieldWrapper className={className} style={style} disabled={disabled}>
        <input
          type={type}
          id={inputId}
          aria-describedby={descriptionIds}
          name={name}
          value={value}
          disabled={disabled}
          // @ts-expect-error Change is handled by onClick for browser support, see https://stackoverflow.com/a/5575369
          onClick={onChange}
          // Noop to silence React warning: https://github.com/facebook/react/issues/3070#issuecomment-73311114
          onChange={() => {}}
          className={clsx(
            classes.base,
            invalid && classes.invalid,
            utilityClasses.hideVisually,
          )}
          ref={ref}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={clsx(
            classes.label,
            classes[size],
            hasDescription && classes['has-description'],
          )}
        >
          {hasDescription ? (
            <Fragment>
              <span className={classes.title}>{label || children}</span>
              <span aria-hidden="true">{description}</span>
            </Fragment>
          ) : (
            label || children
          )}
        </label>
        {hasDescription && (
          <p id={descriptionId} className={utilityClasses.hideVisually}>
            {description}
          </p>
        )}
      </FieldWrapper>
    );
  },
);

Selector.displayName = 'Selector';
