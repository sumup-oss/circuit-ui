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

import { FC, HTMLProps } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';

type Size = 'kilo' | 'mega' | 'giga';

export interface TextProps
  extends Omit<HTMLProps<HTMLParagraphElement>, 'size'> {
  /**
   * Choose from 3 font sizes.
   */
  size?: Size;
  /**
   * Remove the default margin below the text.
   */
  noMargin?: boolean;
  /**
   * Turn the text bold.
   */
  bold?: boolean;
  /**
   * Turn the text italic.
   */
  italic?: boolean;
  /**
   * Add a line through the text.
   */
  strike?: boolean;
  /**
   * Render the text using any HTML element.
   */
  as?: string;
  /**
   * The ref to the HTML DOM element.
   */
  ref?: React.Ref<any>;
}

const baseStyles = ({ theme }: StyleProps) => css`
  label: text;
  font-weight: ${theme.fontWeight.regular};
  margin-bottom: ${theme.spacings.mega};
`;

const mobileSizeMap: { [key in Size]: Size } = {
  kilo: 'kilo',
  mega: 'mega',
  giga: 'mega',
};

const sizeStyles = ({ theme, size = 'mega' }: TextProps & StyleProps) => {
  if (!size) {
    return null;
  }

  return css`
    label: ${`text--${size}`};
    font-size: ${theme.typography.text[mobileSizeMap[size]].fontSize};
    line-height: ${theme.typography.text[mobileSizeMap[size]].lineHeight};

    ${theme.mq.kilo} {
      font-size: ${theme.typography.text[size].fontSize};
      line-height: ${theme.typography.text[size].lineHeight};
    }
  `;
};

const boldStyles = ({ theme, bold }: TextProps & StyleProps) =>
  bold &&
  css`
    label: text--bold;
    font-weight: ${theme.fontWeight.bold};
  `;

const italicStyles = ({ italic }: TextProps & StyleProps) =>
  italic &&
  css`
    label: text--italic;
    font-style: italic;
  `;

const strikeThroughStyles = ({ strike }: TextProps & StyleProps) =>
  strike &&
  css`
    label: text--strike-through;
    text-decoration: line-through;
  `;

const marginStyles = ({ noMargin }: TextProps & StyleProps) =>
  noMargin &&
  css`
    label: text--no-margin;
    margin-bottom: 0;
  `;

/**
 * The Text component is used to present the core textual content
 * to our users.
 */
export const Text: FC<TextProps> = styled('p', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'size',
})<TextProps>(
  baseStyles,
  sizeStyles,
  marginStyles,
  boldStyles,
  italicStyles,
  strikeThroughStyles,
);
