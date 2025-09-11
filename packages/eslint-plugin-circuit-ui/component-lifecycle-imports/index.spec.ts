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

import { componentLifecycleImports } from '.';

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
ruleTester.run('component-lifecycle-imports', componentLifecycleImports, {
  valid: [
    {
      name: 'matching component import from unrelated package',
      code: `
        import { Timestamp } from 'material-ui';
      `,
    },
    {
      name: 'matching import from correct package',
      code: `
        import { Timestamp } from '@sumup-oss/circuit-ui';
      `,
    },
    {
      name: 'unrelated import from matching package',
      code: `
        import { Button } from '@sumup-oss/circuit-ui/experimental';
      `,
    },
    {
      name: 'unrelated import with matching local name',
      code: `
        import { Button as Timestamp } from '@sumup-oss/circuit-ui';
      `,
    },
  ],
  invalid: [
    {
      name: 'single import with single match',
      code: `
        import { Timestamp } from '@sumup-oss/circuit-ui/experimental';
      `,
      output: `
        import { Timestamp } from '@sumup-oss/circuit-ui';
      `,
      errors: [{ messageId: 'refactor' }],
    },
    {
      name: 'single import with single match with local name',
      code: `
        import { Timestamp as DateTimestamp } from '@sumup-oss/circuit-ui/experimental';
      `,
      output: `
        import { Timestamp as DateTimestamp } from '@sumup-oss/circuit-ui';
      `,
      errors: [{ messageId: 'refactor' }],
    },
    {
      name: 'multiple imports with single match',
      code: `
        import { Timestamp, Button } from '@sumup-oss/circuit-ui/experimental';
      `,
      output: `
        import { Button } from '@sumup-oss/circuit-ui/experimental';import { Timestamp } from '@sumup-oss/circuit-ui';
      `,
      errors: [{ messageId: 'refactor' }],
    },
    {
      name: 'multiple imports with multiple matches',
      code: `
        import { Timestamp, TimestampProps } from '@sumup-oss/circuit-ui/experimental';
      `,
      // The other component will be migrated on the second pass.
      output: `
        import { TimestampProps } from '@sumup-oss/circuit-ui/experimental';import { Timestamp } from '@sumup-oss/circuit-ui';
      `,
      errors: [{ messageId: 'refactor' }, { messageId: 'refactor' }],
    },
    {
      name: 'single type import with single match',
      code: `
        import type { TimestampProps } from '@sumup-oss/circuit-ui/experimental';
      `,
      output: `
        import type { TimestampProps } from '@sumup-oss/circuit-ui';
      `,
      errors: [{ messageId: 'refactor' }],
    },
  ],
});
