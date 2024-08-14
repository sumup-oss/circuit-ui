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
/* eslint-disable @sumup-oss/circuit-ui/no-invalid-custom-properties */

import { RuleTester } from '@typescript-eslint/rule-tester';

import { renamedPackageScope } from '.';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
ruleTester.run('renamed-package-scope', renamedPackageScope, {
  valid: [
    {
      name: 'import from an unaffected @sumup package',
      code: `
        import { RangePicker } from '@sumup/intl';
      `,
    },
    {
      name: 'import from the new package scope',
      code: `
        import { Input } from '@sumup-oss/circuit-ui/legacy';
      `,
    },
  ],
  invalid: [
    {
      name: 'import from the old package scope',
      code: `
        import { Input } from '@sumup/circuit-ui';
      `,
      output: `
        import { Input } from '@sumup-oss/circuit-ui';
      `,
      errors: [{ messageId: 'refactor' }],
    },
    {
      name: 'subpath import from the old package scope',
      code: `
        import { Input } from '@sumup/circuit-ui/legacy';
      `,
      output: `
        import { Input } from '@sumup-oss/circuit-ui/legacy';
      `,
      errors: [{ messageId: 'refactor' }],
    },
    {
      name: 'file import from the old package scope',
      code: `
        import '@sumup/design-tokens/light.css';
      `,
      output: `
        import '@sumup-oss/design-tokens/light.css';
      `,
      errors: [{ messageId: 'refactor' }],
    },
  ],
});
