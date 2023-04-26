/**
 * Copyright 2020, SumUp Ltd.
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

import _styled from '@emotion/styled';
import type { CreateStyled } from '@emotion/styled';
import { Theme } from '@sumup/design-tokens';

// HACK: Emotion.js doesn't properly expose ESM files. This workaround is needed
// to make the default export work.
// See https://github.com/emotion-js/emotion/issues/2730#issuecomment-1298407552
// eslint-disable-next-line
const styled = (_styled.default || _styled) as CreateStyled;

export default styled;

export interface StyleProps {
  theme: Theme;
}

export type NoTheme = Record<string, unknown>;
