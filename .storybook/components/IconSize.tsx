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

interface IconSizeProps {
  size: keyof Theme['iconSizes'];
}

const Box = styled.div<IconSizeProps>(
  ({ theme, size }) => css`
    width: ${theme.iconSizes[size]};
    height: ${theme.iconSizes[size]};
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

const IconSize = ({ size }: IconSizeProps) => (
  <ThemeProvider theme={light}>
    <Wrapper>
      <Box size={size} />
      <div>
        <Body as="span" css={spacing({ bottom: 'giga' })}>
          {size}
        </Body>
        <Body
          variant="subtle"
          size="two"
          as="span"
          css={spacing({ bottom: 'giga', left: 'kilo' })}
        >
          {light.iconSizes[size]}
        </Body>
      </div>
    </Wrapper>
  </ThemeProvider>
);

export default IconSize;
