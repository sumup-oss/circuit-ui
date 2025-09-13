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
 

import { RuleTester } from '@typescript-eslint/rule-tester';

import { renamedPackageScope } from './index.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run('renamed-package-scope', renamedPackageScope, {
  valid: [
    {
      name: 'import from an unaffected @sumup package',
      code: `
        import { OIDCClient } from '@sumup/nanoauth';
        import { FormDataType } from '@sumup/circuit-ui-form';
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
    {
      name: 'dynamic import from the old package scope',
      code: `
        const components = await import('@sumup/circuit-ui');
      `,
      output: `
        const components = await import('@sumup-oss/circuit-ui');
      `,
      errors: [{ messageId: 'refactor' }],
    },
    {
      name: 'module mock of the old package scope',
      code: `
        jest.mock('@sumup/circuit-ui');

        jest.mock('@sumup/intl', () => ({
          ...jest.requireActual('@sumup/intl'),
          formatNumber: jest.fn(),
        }));
      `,
      output: `
        jest.mock('@sumup-oss/circuit-ui');

        jest.mock('@sumup-oss/intl', () => ({
          ...jest.requireActual('@sumup-oss/intl'),
          formatNumber: jest.fn(),
        }));
      `,
      errors: [
        { messageId: 'refactor' },
        { messageId: 'refactor' },
        { messageId: 'refactor' },
      ],
    },
    {
      name: 'module mock of the old package scope with type annotations',
      code: `
        vi.mock('@sumup/circuit-ui', () => ({
          ...vi.importActual<typeof import('@sumup/circuit-ui')>(
            '@sumup/circuit-ui',
          ),
          useCollapsible: vi.fn(),
        }));
      `,
      output: `
        vi.mock('@sumup-oss/circuit-ui', () => ({
          ...vi.importActual<typeof import('@sumup-oss/circuit-ui')>(
            '@sumup-oss/circuit-ui',
          ),
          useCollapsible: vi.fn(),
        }));
      `,
      errors: [
        { messageId: 'refactor' },
        { messageId: 'refactor' },
        { messageId: 'refactor' },
      ],
    },
  ],
});
