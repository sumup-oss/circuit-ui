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

export default {
  title: 'Layout/Grid/Col',
  component: Col,
  parameters: {
    docs: { page: docs },
  },
};

const StyledCol = styled(Col)(
  ({ theme }) => css`
    background-color: ${theme.colors.b500};
    color: ${theme.colors.white};
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    height: 40px;
    padding: 10px;
  `,
);

StyledCol.defaultProps = {
  skip: '0',
};

export const col = () => (
  <div style={{ width: '100vw' }}>
    <StyledCol span="12">Column</StyledCol>
  </div>
);
