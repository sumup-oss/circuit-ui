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
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type RefAttributes,
  type RefObject,
} from 'react';

import { useAnimation } from '../../hooks/useAnimation/index.js';
import { Body } from '../Body/index.js';
import { CloseButton } from '../CloseButton/index.js';
import { Anchor, type AnchorProps } from '../Anchor/index.js';
import type { ClickEvent } from '../../types/events.js';
import { isString } from '../../util/type-check.js';
import {
  NOTIFICATION_ICONS,
  type NotificationVariant,
} from '../Notification/constants.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';

import classes from './NotificationInline.module.css';

const TRANSITION_DURATION = 200;
const DEFAULT_HEIGHT = 'auto';

type Action = AnchorProps;

type CloseProps =
  | {
      /**
       * Renders a close button in the top right corner and calls the provided function
       * when the button is clicked.
       */
      onClose: (event: ClickEvent) => void;
      /**
       * Text label for the close button for screen readers.
       * Important for accessibility.
       */
      closeButtonLabel: string;
    }
  | { onClose?: never; closeButtonLabel?: never };

export type BaseProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The notification's variant. Defaults to `info`.
   */
  variant?: NotificationVariant;
  /**
   * An optional headline for structured content. Can be a string (an `h3`
   * heading label) or object containing a label and heading level.
   */
  headline?:
    | string
    | {
        as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        label: string;
      };
  /**
   * The notification's body copy.
   */
  body: string;
  /**
   * An optional call-to-action button.
   */
  action?: Action;
  /**
   * Whether the notification is visible.
   */
  isVisible?: boolean;
  /**
   * A text replacement for the icon in the context of the notification, if its
   * body copy isn't self-explanatory. Defaults to an empty string.
   */
  iconLabel?: string;
};

export type NotificationInlineProps = BaseProps & CloseProps;

type NotificationInlineComponent = ForwardRefExoticComponent<
  NotificationInlineProps & RefAttributes<HTMLDivElement>
> & { TIMEOUT: number };

export const NotificationInline = forwardRef<
  HTMLDivElement,
  NotificationInlineProps
>(
  (
    {
      variant = 'info',
      body,
      headline,
      action,
      onClose,
      closeButtonLabel,
      iconLabel = '',
      isVisible = true,
      className,
      ...props
    },
    ref,
  ) => {
    const contentElement = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(isVisible);
    const [height, setHeight] = useState(getHeight(contentElement));
    const [, setAnimating] = useAnimation();

    useEffect(() => {
      setAnimating({
        duration: TRANSITION_DURATION,
        onStart: () => {
          setHeight(getHeight(contentElement));
          // Delaying the state update until the next animation frame ensures that
          // the browsers renders the new height before the animation starts.
          window.requestAnimationFrame(() => {
            setOpen(isVisible);
          });
        },
        onEnd: () => {
          setHeight(DEFAULT_HEIGHT);
        },
      });
    }, [isVisible, setAnimating]);

    const Icon = NOTIFICATION_ICONS[variant];

    return (
      <div
        ref={applyMultipleRefs(ref, contentElement)}
        style={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? height : 0,
          visibility: isOpen ? 'visible' : 'hidden',
        }}
        className={clsx(classes.base, className)}
        {...props}
      >
        <div className={clsx(classes.wrapper, classes[variant])}>
          <div className={classes.icon}>
            <Icon aria-hidden="true" />
          </div>
          <span className={utilClasses.hideVisually}>{iconLabel}</span>
          <div className={classes.content}>
            {headline && (
              <Body
                weight="semibold"
                as={isString(headline) ? 'h3' : headline.as}
              >
                {isString(headline) ? headline : headline.label}
              </Body>
            )}
            <Body>{body}</Body>
            {action && (
              <Anchor
                {...action}
                className={clsx(action.className, classes.action)}
                weight="bold"
              />
            )}
          </div>

          {onClose && closeButtonLabel && (
            <CloseButton className={classes.close} size="s" onClick={onClose}>
              {closeButtonLabel}
            </CloseButton>
          )}
        </div>
      </div>
    );
  },
) as NotificationInlineComponent;

NotificationInline.TIMEOUT = TRANSITION_DURATION;

export function getHeight(element: RefObject<HTMLElement | null>): string {
  if (!element || !element.current) {
    return DEFAULT_HEIGHT;
  }
  return `${element.current.scrollHeight}px`;
}
