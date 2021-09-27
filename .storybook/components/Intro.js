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
import { css, ThemeProvider } from '@emotion/react';
import { light } from '@sumup/design-tokens';
import { Body } from '@sumup/circuit-ui';

const StyledText = styled(Body)(
  ({ theme }) => css`
    line-height: 1.66 !important;
    font-size: 20px !important;
    color: ${theme.colors.n700};
    margin-bottom: ${theme.spacings.giga};

    * {
      line-height: 1.66 !important;
      font-size: 20px !important;
    }
  `,
);

const Intro = ({ children, ...props }) => (
  <ThemeProvider theme={light}>
    <StyledText {...props}>{children}</StyledText>
  </ThemeProvider>
);

export default Intro;
