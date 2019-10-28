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

import styled from '@emotion/styled';
import { css } from '@emotion/core';

import {
  Grid as OriginalGrid,
  Row as OriginalRow,
  Col as OriginalCol
} from '../../src';

export const Grid = styled(OriginalGrid)`
  ${({ theme }) => css`
    background-color: ${theme.colors.n100};
  `};
`;

export const Row = styled(OriginalRow)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `};
`;

export const Col = styled(OriginalCol)`
  ${({ theme }) => css`
    &:nth-of-type(n) {
      background-color: ${theme.colors.b500};
    }

    &:nth-of-type(2n) {
      background-color: ${theme.colors.b300};
    }
    color: ${theme.colors.white};
    text-align: center;
  `};
`;
