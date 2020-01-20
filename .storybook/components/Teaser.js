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

import { theme as themes, Heading, Text, Card } from '../../src';

const Wrapper = styled(Card)(
  ({ theme }) => css`
    width: 100%;
    float: left;
    margin-top: ${theme.spacings.giga};

    ${theme.mq.mega} {
      width: calc(50% - ${theme.spacings.giga});
      margin-right: ${theme.spacings.giga};
    }
  `
);

const Teaser = ({ title, children, ...props }) => (
  <ThemeProvider theme={themes.circuit}>
    <Wrapper shadow={Card.DOUBLE}>
      <Heading as="h2" size={Heading.GIGA}>
        {title}
      </Heading>

      {children}
    </Wrapper>
  </ThemeProvider>
);

export default Teaser;
