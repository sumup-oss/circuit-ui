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

import { componentLifecycleImports } from './index.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run('component-lifecycle-imports', componentLifecycleImports, {
  valid: [
    {
      name: 'matching component import from unrelated package',
      code: `
        import { RangePicker } from 'material-ui';
      `,
    },
    {
      name: 'matching import from correct package',
      code: `
        import { RangePicker } from '@sumup-oss/circuit-ui/legacy';
      `,
    },
    {
      name: 'unrelated import from matching package',
      code: `
        import { Button } from '@sumup-oss/circuit-ui';
      `,
    },
    {
      name: 'unrelated import with matching local name',
      code: `
        import { Button as RangePicker } from '@sumup-oss/circuit-ui';
      `,
    },
  ],
  invalid: [
    {
      name: '[Legacy] single import with single match',
      code: `
        import { RangePicker } from '@sumup-oss/circuit-ui';
      `,
      output: `
        import { RangePicker } from '@sumup-oss/circuit-ui/legacy';
      `,
      errors: [{ messageId: 'refactor' }],
    },
    {
      name: '[Legacy] single import with single match with local name',
      code: `
        import { RangePicker as RangeInput } from '@sumup-oss/circuit-ui';
      `,
      output: `
        import { RangePicker as RangeInput } from '@sumup-oss/circuit-ui/legacy';
      `,
      errors: [{ messageId: 'refactor' }],
    },
    {
      name: '[Legacy] multiple imports with single match',
      code: `
        import { RangePicker, Button } from '@sumup-oss/circuit-ui';
      `,
      output: `
        import { Button } from '@sumup-oss/circuit-ui';import { RangePicker } from '@sumup-oss/circuit-ui/legacy';
      `,
      errors: [{ messageId: 'refactor' }],
    },
    {
      name: '[Legacy] multiple imports with multiple matches',
      code: `
        import { RangePicker, RangePickerController } from '@sumup-oss/circuit-ui';
      `,
      output: [
        `
        import { RangePickerController } from '@sumup-oss/circuit-ui';import { RangePicker } from '@sumup-oss/circuit-ui/legacy';
      `,
        `
        import { RangePickerController } from '@sumup-oss/circuit-ui/legacy';import { RangePicker } from '@sumup-oss/circuit-ui/legacy';
      `,
      ],
      errors: [{ messageId: 'refactor' }, { messageId: 'refactor' }],
    },
    {
      name: '[Legacy] single type import with single match',
      code: `
        import type { RangePickerProps } from '@sumup-oss/circuit-ui';
      `,
      output: `
        import type { RangePickerProps } from '@sumup-oss/circuit-ui/legacy';
      `,
      errors: [{ messageId: 'refactor' }],
    },
    {
      name: '[Experimental] single import with single match',
      code: `
        import { Calendar } from '@sumup-oss/circuit-ui/experimental';
      `,
      output: `
        import { Calendar } from '@sumup-oss/circuit-ui';
      `,
      errors: [{ messageId: 'refactor' }],
    },
  ],
});
