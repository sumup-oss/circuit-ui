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
import { light } from '@sumup/design-tokens';

import { Text } from '../../src';

const Box = styled('div')`
  ${({ theme, size }) => css`
    width: ${theme.spacings.tera};
    height: ${theme.spacings.tera};
    border-radius: ${theme.borderRadius.mega};
    border: ${theme.borderWidth[size]} solid ${theme.colors.r500};
    background-color: ${theme.colors.r300};
    margin-right: ${theme.spacings.mega};
  `};
`;

const Wrapper = styled('div')`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-bottom: ${theme.spacings.mega};
  `};
`;

const BorderWidthSize = styled('span')`
  ${({ theme }) => css`
    color: ${theme.colors.n500};
  `};
`;

const BorderWidthName = styled(Text)`
  ${({ theme }) => css`
    margin-left: ${theme.spacings.kilo};
    color: ${theme.colors.n500};
  `};
`;

const BorderWidth = ({ size }) => (
  <ThemeProvider theme={light}>
    <Wrapper>
      <Box size={size} />
      <div>
        <Text as="span">{size}</Text>
        <BorderWidthSize>
          <BorderWidthName size={Text.KILO} as="span">
            {light.borderWidth[size]}
          </BorderWidthName>
        </BorderWidthSize>
      </div>
    </Wrapper>
  </ThemeProvider>
);

BorderWidth.propTypes = {
  // eslint-disable-next-line
  theme: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired
};

export default BorderWidth;
