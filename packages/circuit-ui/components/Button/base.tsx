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
  forwardRef,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';
import type { IconComponentType } from '@sumup-oss/icons';

import type { ClickEvent } from '../../types/events.js';
import type { AsPropType } from '../../types/prop-types.js';
import { useComponents } from '../ComponentsContext/index.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { utilClasses } from '../../styles/utility.js';
import { clsx } from '../../styles/clsx.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';
import type { Locale } from '../../util/i18n.js';

import classes from './base.module.css';
import { translations } from './translations/index.js';

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
    /**
     * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
     * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
     * When passing an array, the first supported locale is used.
     * Defaults to `navigator.language` in supported environments.
     */
    locale?: Locale;
  };

type CreateButtonComponentProps = SharedButtonProps & {
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
      locale,
      ...sharedProps
    } = useI18n(mapProps(props as Props), translations);

    const components = useComponents();
    const Link = components.Link as AsPropType;

    const isLink = Boolean(sharedProps.href);

    const Element = as || (isLink ? Link : 'button');

    const leadingIconSize = size === 's' ? '16' : '24';
    const trailingIconSize = '16';

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
        {...(isDisabled && {
          'aria-disabled': true,
        })}
        onClick={isDisabled ? onDisabledClick : onClick}
        className={clsx(
          classes.base,
          classes[variant],
          classes[size],
          destructive && classes.destructive,
          utilClasses.focusVisible,
          className,
        )}
        ref={ref}
      >
        <span className={classes.loader} aria-hidden={!isLoading}>
          <span className={classes.dot} />
          <span className={classes.dot} />
          <span className={classes.dot} />
          <span className={utilClasses.hideVisually}>{loadingLabel}</span>
        </span>
        <span className={classes.content}>
          {LeadingIcon && (
            <LeadingIcon
              aria-hidden="true"
              className={classes['leading-icon']}
              size={leadingIconSize}
              width={leadingIconSize}
              height={leadingIconSize}
            />
          )}
          <span className={classes.label}>{children}</span>
          {TrailingIcon && (
            <TrailingIcon
              aria-hidden="true"
              className={classes['trailing-icon']}
              size={trailingIconSize}
              width={trailingIconSize}
              height={trailingIconSize}
            />
          )}
        </span>
      </Element>
    );
  });

  Button.displayName = componentName;

  return Button;
}
