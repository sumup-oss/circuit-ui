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

import styled, { StyleProps } from '../../styles/styled';

type Variant = 'danger' | 'success' | 'warning';

export interface InlineMessageProps {
  /**
   * Indicates the color of the left border and text in the message.
   */
  variant: Variant;
  /**
   * Should correspond to the size provided to the surrounding Card component.
   */
  size?: 'mega' | 'giga';
  /**
   * Removes the default bottom margin from the text.
   */
  noMargin?: boolean;
}

const baseStyles = css`
  label: inline-message;
`;

const marginStyles = ({ noMargin }: InlineMessageProps) =>
  noMargin &&
  css`
    label: text--no-margin;
    margin-bottom: 0;
  `;

const createLeftBorderStyles = (variantName: Variant) => ({
  theme,
  size = 'giga',
  variant,
}: StyleProps & InlineMessageProps) => {
  const colors = {
    danger: theme.colors.danger,
    success: theme.colors.success,
    warning: theme.colors.warning,
  } as const;

  const textColors = {
    danger: theme.colors.danger,
    success: theme.colors.black,
    warning: theme.colors.black,
  } as const;

  return (
    variant === variantName &&
    css`
      label: ${`inline-message--${variant}`};
      color: ${textColors[variant]};
      position: relative;
      margin-bottom: ${theme.spacings.mega};

      &:before {
        display: inline-block;
        border-top-right-radius: ${theme.borderRadius[size]};
        border-bottom-right-radius: ${theme.borderRadius[size]};
        content: '';
        position: absolute;
        left: -${theme.spacings[size]};
        top: 0;
        height: 100%;
        background-color: ${colors[variant]};
        width: 3px;
      }
    `
  );
};

const successStyles = createLeftBorderStyles('success');
const warningStyles = createLeftBorderStyles('warning');
const dangerStyles = createLeftBorderStyles('danger');

/**
 * An inline message displayed inside a Card.
 */
export const InlineMessage = styled('p')<InlineMessageProps>(
  baseStyles,
  dangerStyles,
  successStyles,
  warningStyles,
  marginStyles,
);
