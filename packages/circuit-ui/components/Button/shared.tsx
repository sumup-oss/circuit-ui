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
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';
import type { IconComponentType } from '@sumup/icons';

import type { ClickEvent } from '../../types/events.js';
import type { AsPropType } from '../../types/prop-types.js';
import { useComponents } from '../ComponentsContext/index.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import utilityClasses from '../../styles/utility.js';
import { clsx } from '../../styles/clsx.js';

import classes from './shared.module.css';

type LinkElProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;
type ButtonElProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export type SharedButtonProps = LinkElProps &
  ButtonElProps & {
    /**
     * Choose from 3 style variants. Default: 'secondary'.
     */
    'variant'?: 'primary' | 'secondary' | 'tertiary';
    /**
     * Choose from 2 sizes. Default: 'm'.
     */
    'size'?:
      | 's'
      | 'm'
      /**
       * @deprecated
       */
      | 'kilo'
      /**
       * @deprecated
       */
      | 'giga';
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
  };

export type CreateButtonComponentProps = SharedButtonProps & {
  /**
   * Communicates the action that will be performed when the user interacts
   * with the button. Use one strong, clear imperative verb and follow with a
   * one-word object if needed to clarify.
   */
  children: ReactNode;
  /**
   * Choose from 2 sizes. Default: 'm'.
   */
  size?: 's' | 'm';
  /**
   * An icon provides additional context for the button, such as a “search”
   * icon next to the label for a search field submission.
   */
  icon?: IconComponentType;
  /**
   * A navigation icon hints that the button will perform an unexpected action,
   * such as opening a dropdown or navigating the user to a new tab, so make
   * sure you use them only when necessary. Navigation icons are not an
   * alternative to leading icons and should not be used to provide additional
   * context for the button.
   */
  navigationIcon?: IconComponentType;
};

export const legacyButtonSizeMap: Record<string, 's' | 'm'> = {
  kilo: 's',
  giga: 'm',
};

export function createButtonComponent<Props>(
  componentName: string,
  // TODO: Refactor to `mapClassName` once the deprecations have been removed.
  mapProps: (props: Props) => CreateButtonComponentProps,
) {
  const Button = forwardRef<any, Props>((props, ref) => {
    const {
      children,
      onClick,
      disabled,
      destructive,
      size = 'm',
      variant = 'secondary',
      isLoading,
      loadingLabel,
      className,
      icon: LeadingIcon,
      navigationIcon: TrailingIcon,
      as,
      ...sharedProps
    } = mapProps(props);

    const { Link } = useComponents();

    const isLink = Boolean(sharedProps.href);

    const Element = as || (isLink ? Link : 'button');

    const iconSize = size === 's' ? '16' : '24';

    const hasLoadingState = typeof isLoading !== 'undefined';

    const isDisabled = Boolean(disabled || isLoading);
    const onDisabledClick = (event: ClickEvent) => {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    };

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      hasLoadingState &&
      !isSufficientlyLabelled(loadingLabel)
    ) {
      throw new AccessibilityError(
        componentName,
        "The `loadingLabel` prop is missing or invalid. Remove the `isLoading` prop if you don't intend to use the Button's loading state.",
      );
    }

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !isSufficientlyLabelled(children as string, sharedProps)
    ) {
      throw new AccessibilityError(
        componentName,
        'The `children` prop is missing or invalid.',
      );
    }

    return (
      <Element
        {...sharedProps}
        {...(hasLoadingState && {
          'aria-live': 'polite',
          'aria-busy': Boolean(isLoading),
        })}
        // TODO: Remove in the next major version
        {...(!isLink && {
          disabled: isDisabled,
        })}
        {...(isDisabled && {
          'aria-disabled': true,
        })}
        onClick={isDisabled ? onDisabledClick : onClick}
        className={clsx(
          classes.base,
          classes[variant],
          classes[size],
          destructive && classes.destructive,
          utilityClasses.focusVisible,
          className,
        )}
        ref={ref}
      >
        <span className={classes.loader} aria-hidden={!isLoading}>
          <span className={classes.dot} />
          <span className={classes.dot} />
          <span className={classes.dot} />
          <span className={utilityClasses.hideVisually}>{loadingLabel}</span>
        </span>
        <span className={classes.content}>
          {LeadingIcon && (
            <LeadingIcon
              className={classes.icon}
              aria-hidden="true"
              size={iconSize}
              width={iconSize}
              height={iconSize}
            />
          )}
          <span className={classes.label}>{children}</span>
          {TrailingIcon && (
            <TrailingIcon
              className={classes.icon}
              aria-hidden="true"
              size={iconSize}
              width={iconSize}
              height={iconSize}
            />
          )}
        </span>
      </Element>
    );
  });

  Button.displayName = componentName;

  return Button;
}
