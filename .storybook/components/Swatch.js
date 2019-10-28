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
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import { theme as themes, Text, styleHelpers } from '../../src';

const SWATCH_HEIGHT = '150px';
const SWATCH_WIDTH = '135px';

const Color = styled('div')`
  ${({ theme, colorName }) => css`
    width: ${SWATCH_HEIGHT};
    height: ${SWATCH_WIDTH};
    border-top-left-radius: ${theme.borderRadius.giga};
    border-top-right-radius: ${theme.borderRadius.giga};
    background-color: ${theme.colors[colorName]};
    display: inline-block;
  `};
`;

const ColorName = styled('div')`
  ${({ theme, colorName }) => css`
    display: flex;
    justify-content: space-between;
    padding: ${theme.spacings.mega};
    content: '${colorName}';
  `};
`;

const ColorHex = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.n500};
  `};
`;

const ColorWrapper = styled('div')`
  ${({ theme }) => css`
    display: inline-block;
    margin-right: ${theme.spacings.mega};
    margin-bottom: ${theme.spacings.mega};
    border-bottom-left-radius: ${theme.borderRadius.giga};
    border-bottom-right-radius: ${theme.borderRadius.giga};
    ${styleHelpers.shadowSingle({ theme })};
  `};
`;

const Swatch = ({ colorName }) => (
  <ThemeProvider theme={themes.circuit}>
    <ColorWrapper>
      <Color colorName={colorName} />
      <ColorName>
        <ColorHex as="span" size="kilo" noMargin>
          {themes.circuit.colors[colorName]}
        </ColorHex>
        <Text bold as="span" size="kilo" noMargin>
          {colorName}
        </Text>
      </ColorName>
    </ColorWrapper>
  </ThemeProvider>
);

Swatch.propTypes = {
  // eslint-disable-next-line
  theme: PropTypes.object.isRequired,
  colorName: PropTypes.string.isRequired
};

export default Swatch;
