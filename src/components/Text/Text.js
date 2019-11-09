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

import { css } from '@emotion/core';

import { sizes } from '../../styles/constants';

const { KILO, MEGA, GIGA } = sizes;

const mobileSizeMap = {
  [KILO]: KILO,
  [MEGA]: MEGA,
  [GIGA]: MEGA
};

export const baseStyles = ({ theme }) => css`
  label: text;
  font-weight: ${theme.fontWeight.regular};
  margin-bottom: ${theme.spacings.mega};
`;

export const sizeStyles = ({ theme, size }) => {
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

export const boldStyles = ({ theme, bold }) =>
  bold &&
  css`
    label: text--bold;
    font-weight: ${theme.fontWeight.bold};
  `;

export const italicStyles = ({ italic }) =>
  italic &&
  css`
    label: text--italic;
    font-style: italic;
  `;

export const strikeThroughStyles = ({ strike }) =>
  strike &&
  css`
    label: text--strike-through;
    text-decoration: line-through;
  `;

export const marginStyles = ({ noMargin }) =>
  noMargin &&
  css`
    label: text--no-margin;
    margin-bottom: 0;
  `;
