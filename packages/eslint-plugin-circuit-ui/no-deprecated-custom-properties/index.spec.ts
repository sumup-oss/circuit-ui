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

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noDeprecatedCustomProperties } from '.';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run(
  'no-deprecated-custom-properties',
  noDeprecatedCustomProperties,
  {
    valid: [
      {
        name: 'custom properties in a JS object',
        code: `
          const typography = {
            fontSize: "var(--cui-headline-l-font-size)",
            lineHeight: "var(--cui-headline-l-line-height)",
          }
        `,
      },
      {
        name: 'custom properties in a tagged template literal',
        code: `
          const styles = css\`
            font-size: var(--cui-headline-l-font-size);
            line-height: var(--cui-headline-l-line-height);
          \`;
        `,
      },
      {
        name: 'custom properties in inline styles',
        code: `
          function Component() {
            return (
              <p
                style="font-size:var(--cui-headline-l-font-size);line-height:var(--cui-headline-l-line-height);"
              >
                Success
              </p>
            );
          }
        `,
      },
    ],
    invalid: [
      {
        name: 'custom properties in a JS object',
        code: `
          const typography = {
            fontSize: "var(--cui-typography-headline-one-font-size)",
          }
        `,
        output: `
          const typography = {
            fontSize: "var(--cui-headline-l-font-size)",
          }
        `,
        errors: [
          {
            messageId: 'deprecated',
          },
        ],
      },
      {
        name: 'custom properties in a tagged template literal',
        code: `
          const styles = css\`
            font-size: var(--cui-typography-headline-one-font-size);
          \`;
        `,
        output: `
          const styles = css\`
            font-size: var(--cui-headline-l-font-size);
          \`;
        `,
        errors: [
          {
            messageId: 'deprecated',
          },
        ],
      },
      {
        name: 'custom properties in inline styles',
        code: `
          function Component() {
            return (
              <p
                style="font-size:var(--cui-typography-headline-one-font-size);"
              >
                Success
              </p>
            );
          }
        `,
        output: `
          function Component() {
            return (
              <p
                style="font-size:var(--cui-headline-l-font-size);"
              >
                Success
              </p>
            );
          }
        `,
        errors: [
          {
            messageId: 'deprecated',
          },
        ],
      },
    ],
  },
);
