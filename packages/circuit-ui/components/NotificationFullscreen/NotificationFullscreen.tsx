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

import { FC, HTMLAttributes, ReactNode, SVGProps, forwardRef } from 'react';

import Body from '../Body/index.js';
import Headline from '../Headline/index.js';
import ButtonGroup, { ButtonGroupProps } from '../ButtonGroup/index.js';
import Image, { ImageProps } from '../Image/index.js';
import { isString } from '../../util/type-check.js';
import { clsx } from '../../styles/clsx.js';

import classes from './NotificationFullscreen.module.css';

export interface NotificationFullscreenProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * An image to illustrate the notification. Supports either passing an image
   * source to `image.src` or an SVG component to `image.svg`. Pass an empty
   * string as alt text if the image is decorative, or a localized description
   * if the image is informative.
   */
  image: ImageProps | { svg: FC<SVGProps<SVGSVGElement>>; alt: string };
  /**
   * The notification's headline. Renders an `h2` element by default. If
   * appropriate, pass an object with `as: 'h1'` to render an `h1` element.
   */
  headline:
    | string
    | {
        as: 'h1' | 'h2';
        label: string;
      };
  /**
   * Optional body copy for notification details.
   */
  body?: string | ReactNode;
  /**
   * Optional action buttons to allow users to act on the notification.
   */
  actions?: ButtonGroupProps['actions'];
}

function NotificationImage(image: NotificationFullscreenProps['image']) {
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

/**
 * The `NotificationFullscreen` component provides important information or
 * feedback as part of a process flow.
 */
export const NotificationFullscreen = forwardRef<
  HTMLDivElement,
  NotificationFullscreenProps
>(({ image, headline, body, actions, className, ...props }, ref) => {
  const headlineLabel = isString(headline) ? headline : headline.label;
  const headlineElement = isString(headline) ? 'h2' : headline.as;
  return (
    <div ref={ref} className={clsx(classes.base, className)} {...props}>
      <NotificationImage {...image} />
      <Headline className={classes.headline} size="two" as={headlineElement}>
        {headlineLabel}
      </Headline>
      {body && <Body className={classes.body}>{body}</Body>}
      {actions && <ButtonGroup actions={actions} className={classes.buttons} />}
    </div>
  );
});
