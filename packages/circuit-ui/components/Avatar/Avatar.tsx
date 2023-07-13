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

import { ImgHTMLAttributes } from 'react';
import { Profile, Image as ImageIcon } from '@sumup/icons';

import { CircuitError } from '../../util/errors.js';
import { clsx } from '../../styles/clsx.js';

import classes from './Avatar.module.css';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * The source URL of the Avatar image.
   * Defaults to a placeholder illustration.
   */
  src?: string;
  /**
   * Alt text for the Avatar image. Set it to "" if the image is presentational.
   */
  alt: string;
  /**
   * The variant of the Avatar, either identity or object. Refer to the docs for usage guidelines.
   * The variant also changes which placeholder is rendered when the `src` prop is not provided.
   * Defaults to `object`.
   */
  variant?: 'object' | 'identity';
  /**
   * One of two available sizes for the Avatar, either giga or yotta.
   * Defaults to `yotta`.
   */
  size?: 'giga' | 'yotta';
  /**
   * A 1-2 letter representation of a person's identity, usually their abbreviated name.
   * Can only be used with the identity variant.
   */
  initials?: string;
}

const placeholders = {
  object: <ImageIcon />,
  identity: <Profile />,
};

/**
 * The Avatar component displays an identity or an object image.
 */
export const Avatar = ({
  src,
  alt = '', // This default should be removed in the next major
  variant = 'object',
  size = 'yotta',
  initials,
  className,
  ...props
}: AvatarProps): JSX.Element => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    variant === 'object' &&
    initials
  ) {
    throw new CircuitError(
      'Avatar',
      'The `initials` prop can only be used with the identity `variant`. Remove the `initials` prop or change the `variant` to identity.',
    );
  }

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    initials &&
    initials.length > 2
  ) {
    throw new CircuitError(
      'Avatar',
      `The \`initials\` prop is ${initials.length} characters long. Shorten it to 1-2 characters.`,
    );
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={clsx(
          classes.base,
          classes[size],
          variant === 'identity' && classes.identity,
          className,
        )}
        {...props}
      />
    );
  }

  const placeholder =
    variant === 'identity' && initials
      ? initials.slice(0, 2).toUpperCase()
      : placeholders[variant];

  return (
    <div
      {...(alt
        ? { 'role': 'img', 'aria-label': alt }
        : { 'aria-hidden': 'true' })}
      className={clsx(
        classes.base,
        classes[size],
        variant === 'identity' && classes.identity,
        className,
      )}
      {...props}
    >
      {placeholder}
    </div>
  );
};
