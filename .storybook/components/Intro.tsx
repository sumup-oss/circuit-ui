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

import { ThemeProvider } from '@emotion/react';
import { BodyLarge, spacing } from '@sumup/circuit-ui';
import { light } from '@sumup/design-tokens';

import type { BodyLargeProps } from '@sumup/circuit-ui';

function Intro({
  children,
}: {
  children: BodyLargeProps['children'];
}): JSX.Element {
  return (
    <ThemeProvider theme={light}>
      <BodyLarge variant="subtle" css={spacing({ bottom: 'giga' })}>
        {children}
      </BodyLarge>
    </ThemeProvider>
  );
}

export default Intro;
