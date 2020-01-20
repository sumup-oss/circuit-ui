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
import { ThemeProvider } from 'emotion-theming';

import { theme as themes, Text } from '../../src';

const StyledText = styled(Text)(
  ({ theme }) => css`
    line-height: 1.66 !important;
    font-size: 20px !important;
    color: ${theme.colors.n700};
    margin-bottom: ${theme.spacings.giga};
  `
);

const Intro = ({ children, ...props }) => (
  <ThemeProvider theme={themes.circuit}>
    <StyledText size={Text.GIGA} {...props}>
      {children}
    </StyledText>
  </ThemeProvider>
);

Intro.KILO = Text.KILO;
Intro.MEGA = Text.MEGA;
Intro.GIGA = Text.GIGA;

export default Intro;
