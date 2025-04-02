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

'use client';

import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
  useId,
} from 'react';

import type { ReturnType } from '../../types/return-type.js';
import type { ClickEvent } from '../../types/events.js';
import type { AsPropType } from '../../types/prop-types.js';
import { Body, type BodyProps } from '../Body/Body.js';
import { useComponents } from '../ComponentsContext/index.js';
import { idx } from '../../util/idx.js';
import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';

import classes from './Anchor.module.css';

export interface BaseProps extends Omit<BodyProps, 'color'> {
  children: ReactNode;
  /**
   * Function that's called when the button is clicked.
   */
  onClick?: (event: ClickEvent) => void;
  /**
   * The ref to the HTML DOM element, it can be a button an anchor or a span, typed as any for now because of complex js manipulation with styled components
   */
  ref?: Ref<any>;
  /**
   * Short label to describe that the link leads to an external page or opens in a new tab.
   */
  externalLabel?: string;
}
type LinkElProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'onClick' | 'color'
>;
type ButtonElProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'color'
>;

export type AnchorProps = BaseProps & LinkElProps & ButtonElProps;

/**
 * The Anchor is used to display a link or button that visually looks like
 * a hyperlink. Based on the Body component, so it also supports its props.
 */
export const Anchor = forwardRef(
  (
    {
      className,
      externalLabel,
      'aria-describedby': descriptionId,
      children,
      ...props
    }: AnchorProps,
    ref?: BaseProps['ref'],
  ): ReturnType => {
    const components = useComponents();
    const Link = components.Link as AsPropType;
    const isExternalLink =
      props.rel === 'external' || props.target === '_blank';
    const externalLabelId = useId();
    const descriptionIds = idx(
      externalLabel && isExternalLink && externalLabelId,
      descriptionId,
    );

    if (!props.href && !props.onClick) {
      return (
        <Body as="span" {...props} ref={ref}>
          {children}
        </Body>
      );
    }

    if (props.href) {
      return (
        <Body
          {...props}
          aria-describedby={descriptionIds}
          className={clsx(classes.base, utilClasses.focusVisible, className)}
          as={Link}
          ref={ref}
        >
          {children}
          {isExternalLink && externalLabel && (
            <span
              aria-hidden={true}
              id={externalLabelId}
              className={utilClasses.hideVisually}
            >
              {externalLabel}
            </span>
          )}
        </Body>
      );
    }

    return (
      <Body
        as="button"
        {...props}
        aria-describedby={descriptionIds}
        className={clsx(classes.base, utilClasses.focusVisible, className)}
        ref={ref}
      >
        {children}
        {isExternalLink && externalLabel && (
          <span
            aria-hidden={true}
            id={externalLabelId}
            className={utilClasses.hideVisually}
          >
            {externalLabel}
          </span>
        )}
      </Body>
    );
  },
);

Anchor.displayName = 'Anchor';
