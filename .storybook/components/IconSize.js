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

import { theme as themes, Text } from '../../src';

const Box = styled('div')`
  ${({ theme, size }) => css`
    width: ${theme.iconSizes[size]};
    height: ${theme.iconSizes[size]};
    border-radius: ${theme.borderRadius.kilo};
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

const IconSizeSize = styled('span')`
  ${({ theme }) => css`
    color: ${theme.colors.n500};
  `};
`;

const IconSizeName = styled(Text)`
  ${({ theme }) => css`
    margin-left: ${theme.spacings.kilo};
    color: ${theme.colors.n500};
  `};
`;

const IconSize = ({ size }) => (
  <ThemeProvider theme={themes.circuit}>
    <Wrapper>
      <Box size={size} />
      <div>
        <Text as="span">{size}</Text>
        <IconSizeSize>
          <IconSizeName size={Text.KILO} as="span">
            {themes.circuit.iconSizes[size]}
          </IconSizeName>
        </IconSizeSize>
      </div>
    </Wrapper>
  </ThemeProvider>
);

IconSize.propTypes = {
  size: PropTypes.string.isRequired
};

export default IconSize;
