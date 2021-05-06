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

import { HTMLAttributes } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';

export interface AvatarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
  /**
   * Image to render
   */
  imageUrl?: string;
  /**
   * Shape of the Avatar
   */
  variant?: 'square' | 'round';
  /**
   * Size of the Avatar
   */
  size?: 'small' | 'large';
  /**
   * Alternative DOM element to render
   */
  as?: 'label';
  /**
   * htmlFor when the element is a label
   * TODO the element should extend either a div or a label
   */
  htmlFor?: string;
}

const avatarSizes = {
  large: '96px',
  small: '48px',
};

const placeholders = {
  round:
    "<svg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M48 18C40.268 18 34 24.268 34 32C34 39.732 40.268 46 48 46C55.732 46 62 39.732 62 32C62 24.268 55.732 18 48 18Z' fill='white'/><path d='M47.9998 88C61.53 88 73.4913 81.2822 80.73 71C73.4913 60.7178 61.53 54 47.9997 54C34.4695 54 22.5083 60.7178 15.2695 71C22.5083 81.2822 34.4695 88 47.9998 88Z' fill='white'/></svg>",
  square:
    "<svg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M30 25C30 20.0294 34.0294 16 39 16C43.9706 16 48 20.0294 48 25C48 29.9706 43.9706 34 39 34C34.0294 34 30 29.9706 30 25Z' fill='white'/><path d='M41.1571 60.5691L30.6742 48.3905C29.0304 46.4808 26.0517 46.5483 24.496 48.5304L8 69.5483V81.9998C8 85.3135 10.6863 87.9998 14 87.9998H19.9592L41.1571 60.5691Z' fill='white'/><path d='M70.4856 32.878C72.0409 30.876 75.0425 30.8075 76.6876 32.7363L87.9996 45.9986V81.9986C87.9996 85.3123 85.3133 87.9986 81.9996 87.9986H27.6611L70.4856 32.878Z' fill='white'/></svg>",
};

const baseStyles = ({
  theme,
  imageUrl,
  variant = 'square',
  size = 'large',
}: AvatarProps & StyleProps) => css`
  display: block;
  width: ${avatarSizes[size]};
  height: ${avatarSizes[size]};
  box-shadow: inset 0 0 0 ${theme.borderWidth.kilo} rgba(0, 0, 0, 0.1);
  border-radius: ${variant === 'round'
    ? theme.borderRadius.circle
    : theme.borderRadius.tera};
  border: none;
  background-color: ${theme.colors.n300};
  background-size: cover;
  background-position: center;
  background-image: url('data:image/svg+xml;utf8,${placeholders[variant]}');

  ${imageUrl &&
  css`
    background-image: url(${imageUrl});
  `};
`;

/**
 * The Avatar component.
 */
export const Avatar = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop),
})<AvatarProps>(baseStyles);
