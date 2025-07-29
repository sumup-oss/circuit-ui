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
/* eslint-disable @sumup-oss/circuit-ui/no-deprecated-custom-properties */

import { testRule } from '../setupTests.js';

import { noDeprecatedCustomProperties, ruleName, messages } from './index.js';

testRule({
  plugins: [noDeprecatedCustomProperties],
  ruleName,
  config: true,
  fix: false,

  accept: [
    {
      code: `.class {
        font-size: var(--cui-headline-l-font-size);
      }`,
      description: 'Allow valid custom properties',
    },
    {
      code: `.class {
        margin-bottom: calc(var(--cui-spacings-bit) - var(--cui-headline-l-line-height));
      }`,
      description: 'Allow valid custom properties in complex style rules',
    },
  ],

  reject: [
    {
      code: `.class {
        font-size: var(--cui-typography-headline-one-font-size);
      }`,
      fixed: `.class {
        font-size: var(--cui-headline-l-font-size);
      }`,
      description: 'Disallow deprecated custom properties',
      message: messages.deprecated(
        '--cui-typography-headline-one-font-size',
        '--cui-headline-l-font-size',
      ),
      line: 2,
      column: 9,
      endLine: 2,
      endColumn: 65,
    },
    {
      code: `.class {
        margin-bottom: calc(var(--cui-spacings-bit) - var(--cui-typography-headline-one-line-height));
      }`,
      fixed: `.class {
        margin-bottom: calc(var(--cui-spacings-bit) - var(--cui-headline-l-line-height));
      }`,
      description:
        'Disallow deprecated custom properties in complex style rules',
      message: messages.deprecated(
        '--cui-typography-headline-one-line-height',
        '--cui-headline-l-line-height',
      ),
      line: 2,
      column: 9,
      endLine: 2,
      endColumn: 103,
    },
    {
      code: `.class {
        margin-bottom: calc(var(--cui-spacings-bit) - var(--cui-typography-headline-one-line-height) - var(--cui-typography-headline-two-line-height));
      }`,
      fixed: `.class {
        margin-bottom: calc(var(--cui-spacings-bit) - var(--cui-headline-l-line-height) - var(--cui-headline-m-line-height));
      }`,
      description:
        'Disallow multiple deprecated custom properties in complex style rules',
      warnings: [
        {
          message: messages.deprecated(
            '--cui-typography-headline-one-line-height',
            '--cui-headline-l-line-height',
          ),
          line: 2,
          column: 9,
          endLine: 2,
          endColumn: 152,
        },
        {
          message: messages.deprecated(
            '--cui-typography-headline-two-line-height',
            '--cui-headline-m-line-height',
          ),
          line: 2,
          column: 9,
          endLine: 2,
          endColumn: 152,
        },
      ],
    },
  ],
});
