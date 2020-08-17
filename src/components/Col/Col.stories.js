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
import { css } from '@emotion/core';

import docs from '../Grid/Grid.docs.mdx';

import Col from './Col';

const colControl = {
  control: {
    type: 'range',
    min: 0,
    max: 12,
    step: 1,
  },
};

export default {
  title: 'Layout/Grid/Col',
  component: Col,
  parameters: {
    layout: 'fullscreen',
    docs: { page: docs },
  },
  argTypes: {
    span: colControl,
    skip: colControl,
  },
};

const StyledCol = styled(Col)(
  ({ theme }) => css`
    background-color: ${theme.colors.n300};
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    height: 48px;
    padding: 12px;
  `,
);

export const Base = (args) => (
  <StyledCol span={args.span.toString()} skip={args.skip.toString()}>
    Column
  </StyledCol>
);

Base.args = {
  span: '12',
  skip: 0,
};
