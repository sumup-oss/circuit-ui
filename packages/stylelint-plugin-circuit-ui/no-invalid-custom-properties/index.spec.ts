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

// We disable the rule in this file because we explicitly test invalid cases
/* eslint-disable @sumup/circuit-ui/no-invalid-custom-properties */

import { testRule } from '../setupTests.js';

import { noInvalidCustomProperties, ruleName, messages } from './index.js';

testRule({
  plugins: [noInvalidCustomProperties],
  ruleName,
  config: true,
  fix: false,

  accept: [
    {
      code: `.class {
        color: var(--fg-normal);
      }`,
      description: 'Allow custom properties that do not start with "--cui-"',
    },
    {
      code: `.class {
        color: var(--cui-fg-normal);
      }`,
      description: 'Allow valid custom properties prefixed with "--cui-"',
    },
    {
      code: `.class {
        background: linear-gradient(var(--cui-bg-normal), var(--cui-bg-highlight));
      }`,
      description:
        'Allow valid custom properties prefixed with "--cui-" in complex style rules',
    },
  ],

  reject: [
    {
      code: `.class {
        color: var(--cui-invalid);
      }`,
      description: 'Disallow invalid custom properties prefixed with "--cui-"',
      message: messages.invalid('--cui-invalid'),
      line: 2,
      column: 9,
      endLine: 2,
      endColumn: 35,
    },
    {
      code: `.class {
        background: linear-gradient(var(--cui-bg-normal), var(--cui-invalid));
      }`,
      description:
        'Disallow invalid custom properties prefixed with "--cui-" in complex style rules',
      message: messages.invalid('--cui-invalid'),
      line: 2,
      column: 9,
      endLine: 2,
      endColumn: 79,
    },
    {
      code: `.class {
        background: linear-gradient(var(--cui-invalid), var(--cui-bg-invalid));
      }`,
      description:
        'Disallow multiple invalid custom properties prefixed with "--cui-" in complex style rules',
      message: messages.invalid('--cui-invalid'),
      line: 2,
      column: 9,
      endLine: 2,
      endColumn: 80,
    },
  ],
});
