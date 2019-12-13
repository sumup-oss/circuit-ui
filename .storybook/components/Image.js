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

import { theme as themes, Image as BaseImage } from '../../src';

const FULL_WIDTH = 'full-width';

// HACK to escape the content-width container.
const fullWidthStyles = ({ theme, variant }) =>
  variant === FULL_WIDTH &&
  css`
    margin-left: calc(-1 * (100vw - 100%) / 2);
    width: 100vw;
    max-width: 100vw;
  `;

const StyledImage = styled(BaseImage)(fullWidthStyles);

const Image = ({ children, ...props }) => (
  <ThemeProvider theme={themes.circuit}>
    <StyledImage {...props} />
  </ThemeProvider>
);

Image.FULL_WIDTH = FULL_WIDTH;

export default Image;
