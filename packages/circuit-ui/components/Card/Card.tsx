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

import { FC } from 'react';
import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';
import deprecate from '../../util/deprecate';

export interface CardProps {
  /**
   * @deprecated
   * The shadow variations have been replaced with a single outline.
   */
  shadow?: 'single' | 'double' | 'triple';
  /**
   * The padding of the Card.
   */
  spacing?: 'mega' | 'giga';
}

// FIXME: Replace border-radius with theme value in v3.
const baseStyles = ({ theme }: StyleProps) => css`
  label: card;
  background-color: ${theme.colors.white};
  border-radius: 16px;
  border: ${theme.borderWidth.mega} solid ${theme.colors.n200};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const shadowStyles = ({ shadow }: CardProps) => {
  if (shadow) {
    deprecate(
      'The `shadow` prop of the Card component has been deprecated.',
      'The shadow variations have been replaced with a single outline.',
    );
  }
  return null;
};

const spacingStyles = ({ theme, spacing = 'giga' }: StyleProps & CardProps) => {
  if (!spacing) {
    return null;
  }
  const spacings = {
    mega: `
      ${theme.spacings.mega} ${theme.spacings.mega}
    `,
    giga: `
      ${theme.spacings.mega} ${theme.spacings.giga}
    `,
  };
  return css`
    label: ${`card--spacing-${spacing}`};
    padding: ${spacings[spacing]};
  `;
};

export const Card: FC<CardProps> = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'spacing',
})<CardProps>(baseStyles, shadowStyles, spacingStyles);
