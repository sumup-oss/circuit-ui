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

/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import { Stack } from '../../../../../.storybook/components/index';
import styled from '../../../styles/styled';
import { modes } from '../../../../../.storybook/modes';

import { InlineElements } from './InlineElements';

export default {
  title: 'Layout/InlineElements',
  component: InlineElements,
  parameters: {
    controls: { hideNoControlsWarning: true },
    chromatic: {
      modes: {
        mobile: modes.smallMobile,
        desktop: modes.desktop,
      },
    },
  },
};

const Box = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  height: 48px;
  padding: 12px;

  &:nth-of-type(n) {
    background-color: var(--cui-bg-highlight);
  }

  &:nth-of-type(2n) {
    background-color: var(--cui-bg-subtle);
  }
`;

const inlineElementsStyles = css`
  width: 95vw;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid magenta;
`;

export const Base = () => (
  <Stack vertical>
    <InlineElements css={inlineElementsStyles}>
      <Box />
      <Box />
    </InlineElements>
    <InlineElements css={inlineElementsStyles}>
      <Box />
      <Box />
      <Box />
    </InlineElements>
    <InlineElements css={inlineElementsStyles} ratios={[2, 1]}>
      <Box>2x</Box>
      <Box>1x</Box>
    </InlineElements>
  </Stack>
);

export const InlineOnMobile = () => (
  <Stack vertical>
    <InlineElements css={inlineElementsStyles} inlineMobile>
      <Box />
      <Box />
    </InlineElements>
    <InlineElements css={inlineElementsStyles} inlineMobile>
      <Box />
      <Box />
      <Box />
    </InlineElements>
    <InlineElements css={inlineElementsStyles} inlineMobile ratios={[2, 1]}>
      <Box>2x</Box>
      <Box>1x</Box>
    </InlineElements>
  </Stack>
);
