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

import styled, { StyleProps } from '../../styles/styled';

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
   */
  variant?: 'object' | 'identity';
  /**
   * One of two available sizes for the Avatar, either giga or yotta.
   */
  size?: 'giga' | 'yotta';
}

const avatarSizes = {
  yotta: '96px',
  giga: '48px',
};

const placeholders = {
  object:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 96 96"><path fill="white" d="M30 25c0-4.9706 4.0294-9 9-9s9 4.0294 9 9-4.0294 9-9 9-9-4.0294-9-9zM41.1571 60.5691L30.6742 48.3905c-1.6438-1.9097-4.6225-1.8422-6.1782.1399L8 69.5483v12.4515c0 3.3137 2.6863 6 6 6h5.9592l21.1979-27.4307zM70.4856 32.878c1.5553-2.002 4.5569-2.0705 6.202-.1417l11.312 13.2623v36c0 3.3137-2.6863 6-6 6H27.6611L70.4856 32.878z"/></svg>',
  identity:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 96 96"><path fill="white" d="M48 18c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14-6.268-14-14-14zM47.9998 88C61.53 88 73.4913 81.2822 80.73 71c-7.2387-10.2822-19.2-17-32.7303-17-13.5302 0-25.4914 6.7178-32.7302 17 7.2388 10.2822 19.2 17 32.7303 17z"/></svg>',
};

const baseStyles = ({
  theme,
  size,
}: Required<Pick<AvatarProps, 'size'>> & StyleProps) => css`
  display: block;
  width: ${avatarSizes[size]};
  height: ${avatarSizes[size]};
  box-shadow: 0 0 0 ${theme.borderWidth.kilo} rgba(0, 0, 0, 0.1);

  background-color: ${theme.colors.n300};
  object-fit: cover;
  object-position: center;
`;

const borderStyles = ({ theme, variant, size }: AvatarProps & StyleProps) => {
  let styles = css`
    border-radius: ${theme.borderRadius.kilo};
  `;
  if (variant === 'identity') {
    styles = css`
      border-radius: ${theme.borderRadius.circle};
    `;
  } else if (size === 'giga') {
    styles = css`
      border-radius: ${theme.borderRadius.byte};
    `;
  }
  return styles;
};

const StyledImage = styled('img', {
  shouldForwardProp: (prop) => isPropValid(prop),
})<AvatarProps>(baseStyles, borderStyles);

/**
 * The Avatar component displays an identity or an object image.
 */
export const Avatar = ({
  src,
  alt = '',
  variant = 'object',
  size = 'yotta',
  ...props
}: AvatarProps): JSX.Element => {
  const placeholder = `data:image/svg+xml;utf8,${placeholders[variant]}`;
  return (
    <StyledImage
      src={src || placeholder}
      alt={alt}
      variant={variant}
      size={size}
      {...props}
    />
  );
};
