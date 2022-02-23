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

import { FC, Ref, HTMLAttributes, useContext } from 'react';
import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';
import { getTheme } from '../../styles/theme';
import ThemeContext from '../Theming/ThemeContext';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The padding of the Card.
   */
  spacing?: 'mega' | 'giga';
  /**
   * The ref to the HTML DOM element.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: Ref<any>;
}

const baseStyles = ({ theme, t }: StyleProps & { t?: 'light' | 'dark' }) => {
  const T = getTheme(t);
  return css`
    background-color: ${T.neutral.background.default.default};
    border-radius: ${theme.borderRadius.mega};
    border: ${theme.borderWidth.mega} solid ${T.neutral.border.default.default};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;
};

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
    padding: ${spacings[spacing]};
  `;
};

const StyledCard = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'spacing',
})<CardProps & { t?: 'light' | 'dark' }>(baseStyles, spacingStyles);

export const Card: FC<CardProps> = (props) => {
  const t = useContext(ThemeContext);
  return <StyledCard {...props} t={t} />;
};
