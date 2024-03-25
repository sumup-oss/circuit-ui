/**
 * Copyright 2021, SumUp Ltd.
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
  ReactNode,
  forwardRef,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  HTMLAttributes,
} from 'react';
import { ChevronRight, IconComponentType } from '@sumup/icons';

import type { ClickEvent } from '../../types/events.js';
import type { AsPropType } from '../../types/prop-types.js';
import { isFunction, isString } from '../../util/type-check.js';
import { CircuitError } from '../../util/errors.js';
import { useComponents } from '../ComponentsContext/index.js';
import Body from '../Body/index.js';
import { clsx } from '../../styles/clsx.js';

import classes from './ListItem.module.css';

type Variant = 'action' | 'navigation';

export interface BaseProps {
  /**
   * Choose between 'action' and 'navigation' variant. Default: 'action'.
   * The `navigation` variant renders a chevron in the trailing section.
   */
  variant?: Variant;
  /**
   * Display a leading component.
   * Pass an icon from `@sumup/icons` or a custom component.
   */
  leadingComponent?: IconComponentType | ReactNode;
  /**
   * Display a main label.
   */
  label: ReactNode;
  /**
   * Display a details line below the main label.
   */
  details?: ReactNode;
  /**
   * Display a trailing label.
   * If using the `navigation` variant, the chevron icon will be center aligned with this label.
   */
  trailingLabel?: string | ReactNode;
  /**
   * Display a trailing details label.
   */
  trailingDetails?: string | ReactNode;
  /**
   * Display a custom trailing component.
   * If using the `navigation` variant, the chevron icon will be center aligned with this component.
   */
  trailingComponent?: ReactNode;
  /**
   * Visually mark the list item as selected.
   */
  selected?: boolean;
  /**
   * Visually and functionally disable the list item.
   */
  disabled?: boolean;
  /**
   * Function that is called when the list item is clicked.
   */
  onClick?: (event: ClickEvent) => void;
  /**
   * Link to another part of the application or external page.
   */
  href?: string;
}

type DivElProps = Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>;
type LinkElProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;
type ButtonElProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export type ListItemProps = BaseProps &
  DivElProps &
  LinkElProps &
  ButtonElProps;

/**
 * The ListItem component enables the user to render a list item with various
 * textual and visual elements.
 */
export const ListItem = forwardRef<
  HTMLDivElement & HTMLAnchorElement & HTMLButtonElement,
  ListItemProps
>(
  (
    {
      variant = 'action',
      leadingComponent: LeadingComponent,
      label,
      details,
      trailingLabel,
      trailingDetails,
      trailingComponent,
      className,
      selected,
      ...props
    },
    ref,
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test'
    ) {
      if (trailingDetails && !trailingLabel) {
        throw new CircuitError(
          'ListItem',
          'Using `trailingDetails` without `trailingLabel` is not supported. Use a custom `trailingComponent` if necessary.',
        );
      }
      if (trailingComponent && trailingLabel) {
        throw new CircuitError(
          'ListItem',
          'Using `trailingLabel` and `trailingComponent` at the same time is not supported. Add a label to the custom `trailingComponent` if necessary.',
        );
      }
    }

    const { Link } = useComponents();
    let Element: AsPropType = 'div';
    if (props.href) {
      Element = Link as AsPropType;
    } else if (props.onClick) {
      Element = 'button';
    }

    const isNavigation = variant === 'navigation';
    const hasTrailing = !!trailingLabel || !!trailingComponent;
    const shouldRenderTrailingContainer = hasTrailing || isNavigation;

    return (
      <Element
        {...props}
        aria-current={props.onClick || props.href ? selected : undefined}
        className={clsx(
          classes.base,
          isNavigation && classes.navigation,
          className,
        )}
        ref={ref}
      >
        {LeadingComponent && (
          <div className={classes.leading}>
            {isFunction(LeadingComponent) ? (
              <LeadingComponent size="24" aria-hidden="true" />
            ) : (
              LeadingComponent
            )}
          </div>
        )}
        <div className={classes.content}>
          <div className={classes.main}>
            {isString(label) ? (
              <Body size="one" className={classes.label}>
                {label}
              </Body>
            ) : (
              label
            )}
            {details && (
              <div className={classes.details}>
                {isString(details) ? (
                  <Body size="two" variant="subtle">
                    {details}
                  </Body>
                ) : (
                  details
                )}
              </div>
            )}
          </div>
          {shouldRenderTrailingContainer && (
            <div
              className={clsx(
                classes.trailing,
                Boolean(trailingLabel) && classes['has-label'],
              )}
            >
              <div className={classes.chevron}>
                {isString(trailingLabel) ? (
                  <Body size="one" variant="highlight">
                    {trailingLabel}
                  </Body>
                ) : (
                  trailingLabel
                )}
                {trailingComponent}
                {isNavigation && <ChevronRight size="16" aria-hidden="true" />}
              </div>
              {trailingDetails && (
                <div className={classes.details}>
                  {isString(trailingDetails) ? (
                    <Body size="two" variant="subtle">
                      {trailingDetails}
                    </Body>
                  ) : (
                    trailingDetails
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Element>
    );
  },
);

ListItem.displayName = 'ListItem';
