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
import { Headline, Card, spacing } from '@sumup/circuit-ui';

// HACK: This prevents the cards from awkwardly wrapping if one of them
//       only has one line of text.
const CARD_HEIGHT = '185px';

const Wrapper = styled(Card)(
  ({ theme }) => css`
    width: 100%;
    float: left;
    margin-top: ${theme.spacings.giga};

    ${theme.mq.mega} {
      width: calc(50% - ${theme.spacings.giga});
      margin-right: ${theme.spacings.giga};
      min-height: ${CARD_HEIGHT};
    }

    *:last-child {
      margin-bottom: 0;
    }
  `,
);

const Teaser = ({ title, children }) => (
  <ThemeProvider theme={light}>
    <Wrapper>
      <Headline as="h2" size="three" css={spacing({ bottom: 'giga' })}>
        {title}
      </Headline>

      {children}
    </Wrapper>
  </ThemeProvider>
);

export default Teaser;
