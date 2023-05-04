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
import { Body, spacing } from '../../packages/circuit-ui/index.js';

interface SpacingProps {
  spacingName: keyof Theme['spacings'];
}

const Box = styled.div<SpacingProps>(
  ({ theme, spacingName }) => css`
    width: ${theme.spacings[spacingName]};
    height: ${theme.spacings[spacingName]};
    background-color: var(--cui-bg-accent-strong);
    margin-right: ${theme.spacings.mega};
  `,
);

const Wrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    margin-bottom: ${theme.spacings.mega};
  `,
);

const Spacing = ({ spacingName }: SpacingProps) => (
  <ThemeProvider theme={light}>
    <Wrapper>
      <Box spacingName={spacingName} />
      <div>
        <Body as="span" css={spacing({ bottom: 'giga' })}>
          {spacingName}
        </Body>
        <Body
          size="two"
          as="span"
          variant="subtle"
          css={spacing({ left: 'kilo', bottom: 'giga' })}
        >
          {light.spacings[spacingName]}
        </Body>
      </div>
    </Wrapper>
  </ThemeProvider>
);

export default Spacing;
