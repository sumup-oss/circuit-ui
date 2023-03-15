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
});

ruleTester.run('no-invalid-custom-properties', noInvalidCustomProperties, {
  valid: [
    {
      name: 'Custom properties in JS object',
      code: `
        const COLOR_MAP = {
          default: "var(--cui-fg-normal)",
          active: "var(--cui-fg-normal-pressed)",
        }
      `,
    },
    {
      name: 'THIS SHOULD NOT BE VALID (valid name with trailing [\\w]+)',
      code: `
        const color = "var(--cui-fg-normallllllllllllll)";
      `,
    },
  ],
  invalid: [
    {
      code: `
        const COLOR_MAP = {
          default: "var(--cui-fg-norml)",
          active: "var(--cui-fg-normal-active)",
        }
      `,
      errors: [
        {
          messageId: 'invalid', // first occurrence: typo
        },
        {
          messageId: 'invalid', // second occurrence: should be `--cui-fg-normal-pressed`
        },
      ],
    },
    {
      code: `
        const COLOR_MAP = {
          default: "var(--cui-fg-norml)",
          active: "var(--cui-fg-normal-active)",
        }
      `,
      errors: [
        {
          messageId: 'invalid', // first occurrence: typo
        },
        {
          messageId: 'invalid', // second occurrence: should be `--cui-fg-normal-pressed`
        },
      ],
    },
  ],
});
