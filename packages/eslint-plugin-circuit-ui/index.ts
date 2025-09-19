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

import pkg from './package.json' with { type: 'json' };

import { componentLifecycleImports } from './component-lifecycle-imports/index.js';
import { noInvalidCustomProperties } from './no-invalid-custom-properties/index.js';
import { noDeprecatedCustomProperties } from './no-deprecated-custom-properties/index.js';
import { noDeprecatedProps } from './no-deprecated-props/index.js';
import { noRenamedProps } from './no-renamed-props/index.js';
import { preferCustomProperties } from './prefer-custom-properties/index.js';
import { noRenamedComponents } from './no-renamed-components/index.js';

export const rules = {
  'component-lifecycle-imports': componentLifecycleImports,
  'no-invalid-custom-properties': noInvalidCustomProperties,
  'no-deprecated-custom-properties': noDeprecatedCustomProperties,
  'no-deprecated-props': noDeprecatedProps,
  'no-renamed-props': noRenamedProps,
  'prefer-custom-properties': preferCustomProperties,
  'no-renamed-components': noRenamedComponents,
};

const namespace = 'circuit-ui';

const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
    namespace,
  },
  configs: {},
  rules,
};

// Assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
  recommended: {
    name: 'circuit-ui/recommended',
    plugins: { 'circuit-ui': plugin },
    rules: Object.entries(rules).reduce(
      (acc, [name, rule]) => {
        if (rule.meta.docs?.recommended) {
          acc[`${namespace}/${name}`] = 'error';
        }
        return acc;
      },
      {} as Record<string, string>,
    ),
  },
});

// biome-ignore lint/style/noDefaultExport: Recommended by ESLint
export default plugin;
