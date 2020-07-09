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

import Col from '../Col';

import Row from './Row';

export default {
  title: 'Layout/Grid/Row',
  component: Row,
};

const StyledCol = styled(Col)(
  ({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    height: 40px;
    padding: 10px;
    &:nth-of-type(n) {
      background-color: ${theme.colors.b500};
    }

    &:nth-of-type(2n) {
      background-color: ${theme.colors.b300};
    }
  `,
);

StyledCol.defaultProps = {
  skip: '0',
};

const StyledRow = styled(Row)(
  ({ theme }) => css`
    border: 2px solid ${theme.colors.y100};
    margin-bottom: 8px;
  `,
);

export const base = () => (
  <StyledRow>
    <StyledCol span="4">Col 4</StyledCol>
    <StyledCol span="4">Col 4</StyledCol>
    <StyledCol span="4">Col 4</StyledCol>
  </StyledRow>
);
