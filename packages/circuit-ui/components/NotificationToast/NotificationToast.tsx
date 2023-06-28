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

import { HTMLAttributes, RefObject, useEffect, useRef, useState } from 'react';

import { useAnimation } from '../../hooks/useAnimation/index.js';
import Body from '../Body/index.js';
import CloseButton from '../CloseButton/index.js';
import { ClickEvent } from '../../types/events.js';
import { BaseToastProps, createUseToast } from '../ToastContext/index.js';
import utilityClasses from '../../styles/utility.js';
import { clsx } from '../../styles/clsx.js';
import {
  NOTIFICATION_ICONS,
  NotificationVariant,
} from '../Notification/constants.js';

import classes from './NotificationToast.module.css';

const TRANSITION_DURATION = 200;
const DEFAULT_HEIGHT = 'auto';

export type NotificationToastProps = HTMLAttributes<HTMLDivElement> &
  BaseToastProps & {
    /**
     * The toast's variant. Default: `info`.
     */
    variant?: NotificationVariant;
    /**
     * An optional headline for structured toast content.
     */
    headline?: string;
    /**
     * The toast's body copy.
     */
    body: string;
    /**
     * Whether the notification toast is visible.
     */
    isVisible: boolean;
    /**
     * An optional callback that is called when the toast is dismissed,
     * manually or after a timeout.
     */
    onClose?: (event: ClickEvent) => void;
    /**
     * A text replacement for the icon in the context of the toast, if its body
     * copy isn't self-explanatory. Defaults to an empty string.
     */
    iconLabel?: string;
  };

export function NotificationToast({
  variant = 'info',
  body,
  headline,
  onClose,
  iconLabel = '',
  isVisible,
  duration, // this is the auto-dismiss duration, not the animation duration. We shouldn't pass it to the wrapper along with ...props
  className,
  ...props
}: NotificationToastProps): JSX.Element {
  const contentElement = useRef(null);
  const [isOpen, setOpen] = useState(false);
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
      ref={contentElement}
      style={{
        opacity: isOpen ? 1 : 0,
        height: isOpen ? height : 0,
        visibility: isOpen ? 'visible' : 'hidden',
      }}
      className={clsx(classes.base, classes[variant], className)}
      {...props}
    >
      <div className={classes.wrapper}>
        <div className={classes.icon}>
          <Icon role="presentation" />
        </div>
        <span className={utilityClasses.hideVisually}>{iconLabel}</span>
        <div className={classes.content}>
          {headline && (
            <Body variant={'highlight'} as="h3">
              {headline}
            </Body>
          )}
          <Body>{body}</Body>
        </div>

        <CloseButton
          className={classes.close}
          label="-" // We need to pass a label here to prevent CloseButton from throwing an error
          aria-hidden="true"
          size="kilo"
          onClick={onClose}
          tabIndex={-1}
        />
      </div>
    </div>
  );
}

NotificationToast.TRANSITION_DURATION = TRANSITION_DURATION;

export function getHeight(element: RefObject<HTMLElement>): string {
  if (!element || !element.current) {
    return DEFAULT_HEIGHT;
  }
  return `${element.current.scrollHeight}px`;
}

export const useNotificationToast = createUseToast(NotificationToast);
