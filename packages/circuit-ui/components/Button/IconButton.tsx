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

import type {
  FocusEvent,
  FocusEventHandler,
  MouseEvent,
  MouseEventHandler,
} from 'react';
import type { IconComponentType } from '@sumup-oss/icons';

import { clsx } from '../../styles/clsx.js';
import { eachFn } from '../../util/helpers.js';
import { deprecate } from '../../util/logger.js';
import { Tooltip, type TooltipReferenceProps } from '../Tooltip/index.js';

import {
  BaseButton,
  legacyButtonSizeMap,
  type SharedButtonProps,
} from './base.js';
import classes from './IconButton.module.css';

export type IconButtonProps = SharedButtonProps & {
  /**
   * Communicates the action that will be performed when the user interacts
   * with the button. Use one strong, clear imperative verb and follow with a
   * one-word object if needed to clarify.
   * Used as the button's accessible name and displayed in a tooltip on
   * hover and keyboard focus.
   */
  children: string;
  /**
   * The icon provides context for the button, such as a “search” icon for a
   * search field submission.
   */
  icon: IconComponentType;
};

/**
 * The IconButton component enables the user to perform an action or navigate
 * to a different screen.
 */
export function IconButton({
  className,
  size: legacySize = 'm',
  ...props
}: IconButtonProps) {
  const size = legacyButtonSizeMap[legacySize] || legacySize;

  if (
    process.env.NODE_ENV !== 'production' &&
    legacyButtonSizeMap[legacySize]
  ) {
    deprecate(
      'IconButton',
      `The \`${legacySize}\` size has been deprecated. Use the \`${legacyButtonSizeMap[legacySize]}\` size instead.`,
    );
  }

  const renderReference = (tooltipProps: TooltipReferenceProps) => {
    const { onFocus, onBlur, onMouseEnter, onMouseLeave, ...restProps } =
      props as typeof props & {
        onFocus?: FocusEventHandler;
        onBlur?: FocusEventHandler;
        onMouseEnter?: MouseEventHandler;
        onMouseLeave?: MouseEventHandler;
      };

    return (
      <BaseButton
        {...restProps}
        {...tooltipProps}
        componentName="IconButton"
        size={size}
        onFocus={eachFn<[FocusEvent<Element>]>([onFocus, tooltipProps.onFocus])}
        onBlur={eachFn<[FocusEvent<Element>]>([onBlur, tooltipProps.onBlur])}
        onMouseEnter={eachFn<[MouseEvent<Element>]>([
          onMouseEnter,
          tooltipProps.onMouseEnter,
        ])}
        onMouseLeave={eachFn<[MouseEvent<Element>]>([
          onMouseLeave,
          tooltipProps.onMouseLeave,
        ])}
        className={clsx(
          classes.base,
          classes[size],
          tooltipProps.className,
          className,
        )}
      />
    );
  };

  const isDecorative =
    props['aria-hidden'] === true || props['aria-hidden'] === 'true';

  if (isDecorative) {
    return (
      <BaseButton
        {...props}
        componentName="IconButton"
        size={size}
        className={clsx(classes.base, classes[size], className)}
      />
    );
  }

  return (
    <Tooltip type="label" label={props.children} component={renderReference} />
  );
}
