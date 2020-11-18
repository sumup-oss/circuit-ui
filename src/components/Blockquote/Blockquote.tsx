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

import React, { forwardRef } from 'react';
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';
import Text from '../Text';
import { TextProps } from '../Text/Text';

export interface BlockquoteProps extends TextProps {
  /**
   * A Circuit UI body text size.
   */
  size?: 'kilo' | 'mega' | 'giga';
  /**
   * The ref to the HTML DOM element.
   */
  ref?: React.Ref<HTMLQuoteElement>;
}

const baseStyles = ({ theme }: StyleProps) => css`
  label: blockquote;
  padding-left: ${theme.spacings.kilo};
  border-left: 2px solid ${theme.colors.p500};
`;

const gigaStyles = ({ theme, size = 'mega' }: StyleProps & BlockquoteProps) =>
  size === 'giga' &&
  css`
    label: blockquote--giga;
    padding-left: ${theme.spacings.mega};
    border-left: 3px solid ${theme.colors.p500};
  `;

const StyledText = styled(Text)<BlockquoteProps>(baseStyles, gigaStyles);

/**
 * Indented and italicised text to denote a quotation.
 */
export const Blockquote = forwardRef(
  (props: BlockquoteProps, ref: BlockquoteProps['ref']) => (
    <StyledText {...props} as="blockquote" italic ref={ref} />
  ),
);

Blockquote.displayName = 'Blockquote';
