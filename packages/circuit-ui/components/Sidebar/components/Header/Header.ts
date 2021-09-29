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

import { css } from '@emotion/react';

import styled, { StyleProps } from '../../../../styles/styled';

const baseStyles = ({ theme }: StyleProps) => css`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: flex-start;
  min-height: 64px;
  width: 100%;
  padding: ${theme.spacings.mega};
  background-color: ${theme.colors.black};
  color: ${theme.colors.n100};
`;

export const Header = styled('header')(baseStyles);
