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
  forwardRef,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from 'react';
import type { IconComponentType } from '@sumup/icons';

import type { ClickEvent } from '../../types/events.js';
import type { AsPropType } from '../../types/prop-types.js';
import { useComponents } from '../ComponentsContext/index.js';
import Spinner from '../Spinner/index.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import utilityClasses from '../../styles/utility.js';
import { clsx } from '../../styles/clsx.js';

import classes from './Button.module.css';

export interface BaseProps {
  'children': ReactNode;
  /**
   * Choose from 3 style variants. Default: 'secondary'.
   */
  'variant'?: 'primary' | 'secondary' | 'tertiary';
  /**
   * Choose from 2 sizes. Default: 'm'.
   */
  'size'?: 's' | 'm' | 'kilo' | 'giga';
  /**
   * Visually and functionally disable the button.
   */
  'disabled'?: boolean;
  /**
   * Change the color from accent to danger to signal to the user that the action
   * is irreversible or otherwise dangerous.
   */
  'destructive'?: boolean;
  /**
   * Stretch the button across the full width of its parent.
   */
  'stretch'?: boolean;
  /**
   * Display an icon in addition to the text to help to identify the action.
   */
  'icon'?: IconComponentType;
  /**
   * The HTML button type
   */
  'type'?: 'button' | 'submit' | 'reset' | undefined;
  /**
   * Function that's called when the button is clicked.
   */
  'onClick'?: (event: ClickEvent) => void;
  'data-testid'?: string;
  /**
   * Visually disables the button and shows a loading spinner.
   */
  'isLoading'?: boolean;
  /**
   * Visually hidden label to communicate the loading state to visually
   * impaired users.
   */
  'loadingLabel'?: string;
  /**
   * Render the Button using any element.
   */
  'as'?: AsPropType;
}

type LinkElProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;
type ButtonElProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export type ButtonProps = BaseProps & LinkElProps & ButtonElProps;

const legacySizeMap: Record<string, 's' | 'm'> = {
  kilo: 's',
  giga: 'm',
};

export function mapLegacyButtonSize(
  size: 's' | 'm' | 'kilo' | 'giga',
): 's' | 'm' {
  return legacySizeMap[size] || size;
}

/**
 * The Button component enables the user to perform an action or navigate
 * to a different screen.
 */
export const Button = forwardRef<any, ButtonProps>(
  (
    {
      children,
      disabled,
      destructive,
      variant = 'secondary',
      size: legacySize = 'm',
      stretch,
      isLoading,
      loadingLabel,
      className,
      icon: Icon,
      as,
      ...props
    },
    ref,
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      isLoading !== undefined &&
      !isSufficientlyLabelled(loadingLabel)
    ) {
      throw new AccessibilityError(
        'Button',
        "The `loadingLabel` prop is missing or invalid. Remove the `isLoading` prop if you don't intend to use the Button's loading state.",
      );
    }
    const { Link } = useComponents();

    const isLink = Boolean(props.href);

    const Element = as || (isLink ? Link : 'button');

    const size = mapLegacyButtonSize(legacySize);

    return (
      <Element
        {...props}
        {...(loadingLabel &&
          typeof isLoading === 'boolean' && {
            'aria-live': 'polite',
            'aria-busy': isLoading,
          })}
        {...(!isLink && {
          disabled: disabled || isLoading,
        })}
        className={clsx(
          classes.base,
          utilityClasses.focusVisible,
          classes[size],
          classes[variant],
          destructive && classes.destructive,
          stretch && classes.stretch,
          className,
        )}
        ref={ref}
      >
        <Spinner
          className={classes.spinner}
          size="byte"
          aria-hidden={!isLoading}
        >
          <span className={utilityClasses.hideVisually}>{loadingLabel}</span>
        </Spinner>
        <span className={classes.content}>
          {Icon && (
            <Icon
              className={classes.icon}
              size={size === 's' ? '16' : '24'}
              aria-hidden="true"
            />
          )}
          {children}
        </span>
      </Element>
    );
  },
);

Button.displayName = 'Button';
