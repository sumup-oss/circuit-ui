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

import { ESLintUtils } from '@typescript-eslint/utils';

import { noInvalidCustomProperties } from '.';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('no-invalid-custom-properties', noInvalidCustomProperties, {
  valid: [
    {
      name: 'custom properties in a JS object',
      code: `
        const COLOR_MAP = {
          default: "var(--cui-fg-normal)",
          active: "var(--cui-fg-normal-pressed)",
        }
      `,
    },
    {
      name: 'custom properties in a tagged template literal',
      code: `
        const styles = css\`
          color: var(--cui-fg-normal);
          background-color: var(--cui-fg-normal-pressed);
        \`;
      `,
    },
    {
      name: 'custom properties in inline styles',
      code: `
        function Component() {
          return (
            <p
              style="color:var(--cui-fg-normal);background-color:var(--cui-fg-normal-pressed);"
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
        const COLOR_MAP = {
          default: "var(--cui-fg-norml)",
          active: "var(--cui-fg-normal-pressedd)",
        }
      `,
      errors: [
        {
          messageId: 'invalid',
        },
        {
          messageId: 'invalid',
        },
      ],
    },
    {
      name: 'custom properties in a tagged template literal',
      code: `
        const styles = css\`
          color: var(--cui-fg-norml);
          background-color: var(--cui-fg-normal-pressedd);
        \`;
      `,
      errors: [
        {
          messageId: 'invalid',
        },
        {
          messageId: 'invalid',
        },
      ],
    },
    {
      name: 'custom properties in inline styles',
      code: `
        function Component() {
          return (
            <p
              style="color:var(--cui-fg-norml);background-color:var(--cui-fg-normal-pressedd);"
            >
              Success
            </p>
          );
        }
      `,
      errors: [
        {
          messageId: 'invalid',
        },
        {
          messageId: 'invalid',
        },
      ],
    },
  ],
});
