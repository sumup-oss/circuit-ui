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

/** @jsx jsx */
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';

import { StyleProps } from '../../styles/styled';

import { InlineElements } from './InlineElements';

export default {
  title: 'Layout/InlineElements',
  component: InlineElements,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Box = styled('div')`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  height: 48px;
  padding: 12px;

  &:nth-of-type(n) {
    background-color: ${({ theme }: StyleProps) => theme.colors.n300};
  }

  &:nth-of-type(2n) {
    background-color: ${({ theme }: StyleProps) => theme.colors.n100};
  }
`;

const inlineElementsStyles = css`
  width: 95vw;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid magenta;
`;

export const TwoInlineElements = () => (
  <InlineElements css={inlineElementsStyles}>
    <Box />
    <Box />
  </InlineElements>
);

export const ThreeInlineElements = () => (
  <InlineElements css={inlineElementsStyles}>
    <Box />
    <Box />
    <Box />
  </InlineElements>
);

export const ThreeInlineElementsInlineOnMobile = () => (
  <InlineElements css={inlineElementsStyles} inlineMobile>
    <Box />
    <Box />
    <Box />
  </InlineElements>
);

export const TwoInlineElementsWithRatios = () => (
  <InlineElements css={inlineElementsStyles} ratios={[2, 1]}>
    <Box>2x</Box>
    <Box>1x</Box>
  </InlineElements>
);

export const TwoInlineElementsWithRatiosInlineOnMobile = () => (
  <InlineElements css={inlineElementsStyles} ratios={[2, 1]} inlineMobile>
    <Box>2x</Box>
    <Box>1x</Box>
  </InlineElements>
);
