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

import type { FC, ReactNode, SVGProps } from 'react';

import type { ClickEvent } from '../../types/events.js';
import { Image, type ImageProps } from '../Image/index.js';
import { Headline } from '../Headline/index.js';
import { Body } from '../Body/index.js';
import type { ButtonProps } from '../Button/index.js';
import { ButtonGroup, type ButtonGroupProps } from '../ButtonGroup/index.js';
import { Dialog, type DialogProps } from '../Dialog/index.js';
import { clsx } from '../../styles/clsx.js';

import classes from './NotificationModal.module.css';

export type NotificationModalProps = Omit<DialogProps, 'children'> & {
  /**
   * An optional image to illustrate the notification. Supports either
   * passing an image source to `image.src` or an SVG component to
   * `image.svg`. Pass an empty string as alt text if the image is
   * [decorative](https://www.w3.org/WAI/tutorials/images/decorative/),
   * or a localized description if the image is [informative](https://www.w3.org/WAI/tutorials/images/informative/).
   */
  image?: ImageProps | { svg: FC<SVGProps<SVGSVGElement>>; alt: string };
  /**
   * The notification's headline.
   */
  headline: string;
  /**
   * Optional body copy for notification details.
   */
  body?: string | ReactNode;
  /**
   * Action buttons to allow users to act on the notification.
   */
  actions: ButtonGroupProps['actions'];
};

function NotificationImage({ image }: Pick<NotificationModalProps, 'image'>) {
  if (!image) {
    return null;
  }

  if ('svg' in image) {
    const Svg = image.svg;
    const isDecorative = !image.alt;
    return (
      <div className={classes.image}>
        <Svg
          {...(isDecorative
            ? { 'aria-hidden': true }
            : { 'aria-label': image.alt, 'role': 'img' })}
        />
      </div>
    );
  }

  return <Image {...image} className={classes.image} />;
}

export const NotificationModal = ({
  image,
  headline,
  body,
  actions,
  onClose,
  closeButtonLabel,
  preventClose = false,
  className,
  ...props
}: NotificationModalProps) => {
  const dialogProps = {
    className: clsx(classes.centered, className, classes.base),
    closeButtonLabel,
    preventClose,
    onClose,
    ...props,
  };

  function wrapOnClick(onClick?: ButtonProps['onClick']) {
    return (event: ClickEvent) => {
      onClose?.();
      onClick?.(event);
    };
  }

  return (
    <Dialog {...dialogProps}>
      {() => (
        <>
          <NotificationImage image={image} />
          <Headline as="h2" size="s" className={classes.headline}>
            {headline}
          </Headline>
          {body && <Body>{body}</Body>}
          {actions && (
            <ButtonGroup
              actions={{
                primary: {
                  ...actions.primary,
                  onClick: wrapOnClick(actions.primary.onClick),
                },
                secondary: actions.secondary && {
                  ...actions.secondary,
                  onClick: wrapOnClick(actions.secondary.onClick),
                },
              }}
              className={classes.buttons}
            />
          )}
        </>
      )}
    </Dialog>
  );
};
