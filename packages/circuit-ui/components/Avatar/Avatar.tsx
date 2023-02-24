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
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';
import { Profile } from '@sumup/icons';

import styled, { StyleProps } from '../../styles/styled';
import { CircuitError } from '../../util/errors';

type AvatarSize = 'giga' | 'yotta';
type AvatarVariant = 'object' | 'identity';

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
  variant?: AvatarVariant;
  /**
   * One of two available sizes for the Avatar, either giga or yotta.
   * Defaults to `yotta`.
   */
  size?: AvatarSize;
  /**
   * A 1-2 letter representation of a person's identity, usually their abbreviated name.
   * Can only be used with the identity variant.
   */
  initials?: string;
}

const avatarSizes = {
  yotta: '96px',
  giga: '48px',
};

const placeholders = {
  object: (
    // TODO: this icon should be designed for a viewBox of `0 0 24 24`
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 96 96">
      <path
        fill="currentColor"
        d="M30 25c0-4.9706 4.0294-9 9-9s9 4.0294 9 9-4.0294 9-9 9-9-4.0294-9-9zM41.1571 60.5691L30.6742 48.3905c-1.6438-1.9097-4.6225-1.8422-6.1782.1399L8 69.5483v12.4515c0 3.3137 2.6863 6 6 6h5.9592l21.1979-27.4307zM70.4856 32.878c1.5553-2.002 4.5569-2.0705 6.202-.1417l11.312 13.2623v36c0 3.3137-2.6863 6-6 6H27.6611L70.4856 32.878z"
      />
    </svg>
  ),
  identity: <Profile />,
};

type StyledProps = {
  size: AvatarSize;
  variant: AvatarVariant;
};

const baseStyles = ({ theme, size }: StyledProps & StyleProps) => css`
  width: ${avatarSizes[size]};
  height: ${avatarSizes[size]};
  box-shadow: 0 0 0 ${theme.borderWidth.kilo} var(--cui-border-subtle);
  background-color: var(--cui-bg-subtle);
`;

const imageStyles = () => css`
  display: block;
  object-fit: cover;
  object-position: center;
`;

const borderRadiusStyles = ({
  theme,
  variant,
  size,
}: StyledProps & StyleProps) => {
  if (variant === 'identity') {
    return css`
      border-radius: ${theme.borderRadius.circle};
    `;
  }

  if (size === 'giga') {
    return css`
      border-radius: ${theme.borderRadius.byte};
    `;
  }

  return css`
    border-radius: ${theme.borderRadius.kilo};
  `;
};

const Image = styled('img', {
  shouldForwardProp: (prop) => isPropValid(prop),
})<StyledProps>(baseStyles, borderRadiusStyles, imageStyles);

const placeholderStyles = ({ theme, size }: StyledProps & StyleProps) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cui-fg-placeholder);
  /* Initials */
  font-size: calc(${avatarSizes[size]} / 2);
  font-weight: ${theme.fontWeight.bold};
  user-select: none;

  /* Illustration */
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Placeholder = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop),
})<StyledProps>(baseStyles, borderRadiusStyles, placeholderStyles);

/**
 * The Avatar component displays an identity or an object image.
 */
export const Avatar = ({
  src,
  alt,
  variant = 'object',
  size = 'yotta',
  initials,
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
      <Image src={src} alt={alt} variant={variant} size={size} {...props} />
    );
  }

  const placeholder =
    variant === 'identity' && initials
      ? initials.slice(0, 2).toUpperCase()
      : placeholders[variant];

  return (
    <Placeholder
      {...(alt
        ? { 'role': 'img', 'aria-label': alt }
        : { 'aria-hidden': 'true' })}
      size={size}
      variant={variant}
      {...props}
    >
      {placeholder}
    </Placeholder>
  );
};
