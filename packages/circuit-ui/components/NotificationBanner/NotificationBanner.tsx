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
  type MouseEvent,
  type KeyboardEvent,
  type RefObject,
  type HTMLAttributes,
} from 'react';

import Button, { type ButtonProps } from '../Button/index.js';
import Headline from '../Headline/index.js';
import Body from '../Body/index.js';
import Image, { type ImageProps } from '../Image/index.js';
import CloseButton from '../CloseButton/index.js';
import { useAnimation } from '../../hooks/useAnimation/index.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { clsx } from '../../styles/clsx.js';
import { deprecate } from '../../util/logger.js';

import classes from './NotificationBanner.module.css';

type Action = Omit<ButtonProps, 'size'>;

type NotificationVariant = 'system' | 'promotional';

const DEFAULT_HEIGHT = 'auto';

type CloseProps =
  | {
      /**
       * Renders a close button in the top right corner and calls the provided
       * function when the button is clicked.
       */
      onClose: (event: MouseEvent | KeyboardEvent) => void;
      /**
       * Text label for the close button for screen readers.
       * Important for accessibility.
       */
      closeButtonLabel: string;
    }
  | { onClose?: never; closeButtonLabel?: never };

interface NotificationImageProps extends ImageProps {
  /**
   * Align the image to one side of its container. Default: `center`.
   */
  align?: 'top' | 'left' | 'bottom' | 'right' | 'center';
}

interface BaseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'action'> {
  /**
   * Use the `system` variant for system notification use cases, otherwise,
   * use the `promotional` variant for promotional notification use cases.
   */
  variant?: NotificationVariant;
  /**
   * Optional image to communicate message. The image container width is
   * adjustable.
   */
  image?: NotificationImageProps;
  /**
   * Optional notification headline to communicate a message.
   */
  headline?: string;
  /**
   * Optional notification body to communicate a message.
   */
  body?: string;
  /**
   * A notification action to allow users to directly follow up on the
   * communicated content. It can be a `primary` or `tertiary` button.
   */
  action: Action;
  /**
   * Whether the NotificationBanner is visible.
   */
  isVisible?: boolean;
}

export type NotificationBannerProps = BaseProps & CloseProps;

function NotificationImage({
  align = 'center',
  width = 200,
  className,
  ...props
}: NotificationImageProps) {
  return (
    <Image
      {...props}
      className={clsx(classes.image, className)}
      style={{
        '--notification-image-align': align,
        '--notification-image-width': `${width}px`,
      }}
    />
  );
}

/**
 * The NotificationBanner displays a notification with text, a call-to-action,
 * and optionally an image.
 */
export const NotificationBanner = forwardRef<
  HTMLDivElement,
  NotificationBannerProps
>(
  (
    {
      headline,
      body,
      action,
      variant = 'system',
      image,
      onClose,
      closeButtonLabel,
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
        duration: 200,
        onStart: () => {
          setHeight(getHeight(contentElement));
          // Delaying the state update until the next animation frame ensures
          // that browsers render the new height before the animation starts.
          window.requestAnimationFrame(() => {
            setOpen(isVisible);
          });
        },
        onEnd: () => {
          setHeight(DEFAULT_HEIGHT);
        },
      });
    }, [isVisible, setAnimating]);

    if (
      process.env.NODE_ENV !== 'production' &&
      action.variant === 'tertiary'
    ) {
      deprecate(
        'NotificationBanner',
        "The action's `tertiary` variant has been deprecated. Use the `primary` size instead.",
      );
    }

    return (
      <div
        ref={applyMultipleRefs(ref, contentElement)}
        style={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? height : 0,
          visibility: isOpen ? 'visible' : 'hidden',
        }}
        className={clsx(classes.base, classes[variant], className)}
        {...props}
      >
        <div className={classes.content}>
          <Headline as="h2" className={classes.headline}>
            {headline}
          </Headline>
          {body && <Body className={classes.body}>{body}</Body>}
          <Button
            {...action}
            variant={action.variant === 'tertiary' ? 'secondary' : 'primary'}
            className={clsx(action.className, classes.button)}
            size="s"
          />
        </div>
        {image?.src && <NotificationImage {...image} />}
        {onClose && closeButtonLabel && (
          <CloseButton className={classes.close} size="s" onClick={onClose}>
            {closeButtonLabel}
          </CloseButton>
        )}
      </div>
    );
  },
);

export function getHeight(element: RefObject<HTMLElement>): string {
  if (!element || !element.current) {
    return DEFAULT_HEIGHT;
  }
  return `${element.current.scrollHeight}px`;
}
