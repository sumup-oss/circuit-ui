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
import { light, Theme } from '@sumup/design-tokens';
import { Body } from '@sumup/circuit-ui';

type StyleProps = { theme: Theme };
type SwatchProps = { colorName: keyof Theme['colors'] };

const SWATCH_WIDTH = '99px';
const SWATCH_HEIGHT = '99px';

const ColorWrapper = styled.div`
  ${({ theme }: StyleProps) => css`
    display: inline-block;
    margin-right: ${theme.spacings.kilo};
    margin-bottom: ${theme.spacings.kilo};
    border-bottom-left-radius: ${theme.borderRadius.byte};
    border-bottom-right-radius: ${theme.borderRadius.byte};
  `};
`;

const Color = styled.div`
  ${({ theme, colorName }: StyleProps & SwatchProps) => css`
    width: ${SWATCH_WIDTH};
    height: ${SWATCH_HEIGHT};
    border-radius: ${theme.borderRadius.mega};
    background-color: ${theme.colors[colorName]};
  `};
`;

const ColorName = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  `};
`;

function Swatch({ colorName }: SwatchProps): JSX.Element {
  return (
    <ThemeProvider theme={light}>
      <ColorWrapper>
        <Color colorName={colorName} />
        <ColorName>
          <Body variant="highlight" size="two">
            {colorName}
          </Body>
          <Body variant="subtle" size="two">
            {light.colors[colorName]}
          </Body>
        </ColorName>
      </ColorWrapper>
    </ThemeProvider>
  );
}

export default Swatch;
