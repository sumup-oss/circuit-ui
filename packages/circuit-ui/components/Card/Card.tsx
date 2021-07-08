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

import { FC, Ref } from 'react';
import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';

export interface CardProps {
  /**
   * The padding of the Card.
   */
  spacing?: 'mega' | 'giga';
  ref: Ref<HTMLDivElement>;
}

const baseStyles = ({ theme }: StyleProps) => css`
  label: card;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.mega};
  border: ${theme.borderWidth.mega} solid ${theme.colors.n200};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const spacingStyles = ({ theme, spacing = 'giga' }: StyleProps & CardProps) => {
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
})<CardProps>(baseStyles, spacingStyles);
