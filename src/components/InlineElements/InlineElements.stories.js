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

import React from 'react';
import styled from '@emotion/styled';

import InlineElements from './InlineElements';

const Box = styled('div')`
  height: 42px;

  &:nth-of-type(n) {
    background-color: yellow;
  }

  &:nth-of-type(2n) {
    background-color: red;
  }
`;

const Container = styled('div')({
  width: '95vw',
  maxWidth: '600px',
  margin: '0 auto',
  border: '1px solid green',
  padding: '12px',
});

export default {
  title: 'Layout/InlineElements',
  component: InlineElements,
};

export const twoInlineElements = () => (
  <Container>
    <InlineElements>
      <Box />
      <Box />
    </InlineElements>
  </Container>
);

export const threeInlineElements = () => (
  <Container>
    <InlineElements>
      <Box />
      <Box />
      <Box />
    </InlineElements>
  </Container>
);

export const threeInlineElementsInlineOnMobile = () => (
  <Container>
    <InlineElements inlineMobile>
      <Box />
      <Box />
      <Box />
    </InlineElements>
  </Container>
);

export const twoInlineElementsWithRatios = () => (
  <Container>
    <InlineElements ratios={[2, 1]}>
      <Box>2x</Box>
      <Box>1x</Box>
    </InlineElements>
  </Container>
);

export const twoInlineElementsWithRatiosInlineOnMobile = () => (
  <Container>
    <InlineElements ratios={[3, 1]} inlineMobile>
      <Box>2x</Box>
      <Box>1x</Box>
    </InlineElements>
  </Container>
);
