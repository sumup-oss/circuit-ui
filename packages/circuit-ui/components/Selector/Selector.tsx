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
  Fragment,
  forwardRef,
  useId,
  type ComponentType,
  type InputHTMLAttributes,
} from 'react';

import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { FieldWrapper } from '../Field/index.js';
import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';
import { deprecate } from '../../util/logger.js';

import classes from './Selector.module.css';

export type SelectorSize =
  | 's'
  | 'm'
  | 'flexible'
  /**
   * @deprecated
   */
  | 'kilo'
  /**
   * @deprecated
   */
  | 'mega';

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
   * Display an icon in addition to the text to help to identify the option.
   */
  icon?: ComponentType<{ 'className': string; 'aria-hidden': 'true' }>;
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
   * Choose from 3 sizes. Default: 'm'.
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

const legacySizeMap: Record<string, 's' | 'm'> = {
  kilo: 's',
  mega: 'm',
};

export const Selector = forwardRef<HTMLInputElement, SelectorProps>(
  (
    {
      label,
      description,
      'icon': Icon,
      value,
      'id': customId,
      name,
      disabled,
      required,
      invalid,
      multiple,
      onChange,
      'aria-describedby': describedBy,
      className,
      style,
      'size': legacySize = 'm',
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

    if (process.env.NODE_ENV !== 'production' && legacySizeMap[legacySize]) {
      deprecate(
        'Selector',
        `The \`${legacySize}\` size has been deprecated. Use the \`${legacySizeMap[legacySize]}\` size instead.`,
      );
    }

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

    const size = legacySizeMap[legacySize] || legacySize;

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
          required={multiple ? undefined : required}
          // @ts-expect-error Change is handled by onClick for browser support, see https://stackoverflow.com/a/5575369
          onClick={onChange}
          // Noop to silence React warning: https://github.com/facebook/react/issues/3070#issuecomment-73311114
          onChange={() => {}}
          className={clsx(
            classes.base,
            invalid && classes.invalid,
            utilClasses.hideVisually,
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
          {Icon && <Icon className={classes.icon} aria-hidden="true" />}
          {hasDescription ? (
            <Fragment>
              <span className={classes.title}>{label || children}</span>
              <span className={classes.description} aria-hidden="true">
                {description}
              </span>
            </Fragment>
          ) : (
            label || children
          )}
        </label>
        {hasDescription && (
          <p id={descriptionId} className={utilClasses.hideVisually}>
            {description}
          </p>
        )}
      </FieldWrapper>
    );
  },
);

Selector.displayName = 'Selector';
