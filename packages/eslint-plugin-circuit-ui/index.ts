/**
 * Copyright 2023, SumUp Ltd.
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

import { componentLifecycleImports } from './component-lifecycle-imports';
import { noInvalidCustomProperties } from './no-invalid-custom-properties';
import { noDeprecatedCustomProperties } from './no-deprecated-custom-properties';
import { noDeprecatedComponents } from './no-deprecated-components';
import { noDeprecatedProps } from './no-deprecated-props';
import { noRenamedProps } from './no-renamed-props';
import { preferCustomProperties } from './prefer-custom-properties';
import { renamedPackageScope } from './renamed-package-scope';

/* eslint-disable */

export const rules = {
  'component-lifecycle-imports': componentLifecycleImports,
  'no-invalid-custom-properties': noInvalidCustomProperties,
  'no-deprecated-custom-properties': noDeprecatedCustomProperties,
  'no-deprecated-components': noDeprecatedComponents,
  'no-deprecated-props': noDeprecatedProps,
  'no-renamed-props': noRenamedProps,
  'prefer-custom-properties': preferCustomProperties,
  'renamed-package-scope': renamedPackageScope,
};
