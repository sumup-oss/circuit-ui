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

import type { Theme } from './types/index.js';
import * as legacy from './themes/legacy/light.js';

export { schema } from './themes/schema.js';

/**
 * @deprecated
 *
 * Use the CSS custom properties from `@sumup-oss/design-tokens` instead.
 * Use the [`circuit-ui/prefer-custom-properties`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/prefer-custom-properties)
 * ESLint rule to automatically migrate your code.
 */
// HACK: Copy the theme, otherwise, it gets exported as 'module'.
const light: Theme = { ...legacy };

export type { Theme };
export { light };
