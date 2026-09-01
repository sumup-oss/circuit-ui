/**
 * Copyright 2025, SumUp Ltd.
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

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noRenamedComponents } from './index.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run('no-renamed-components', noRenamedComponents, {
  valid: [
    {
      name: 'different component from Circuit UI',
      code: `
          import {Button} from '@sumup-oss/circuit-ui';
   function Component() {
          return <Button />
        }`,
    },
  ],
  invalid: [
    {
      name: 'matched Badge component from Circuit UI',
      code: `
          import {Badge} from '@sumup-oss/circuit-ui';
   function Component() {
          return <Badge>1</Badge>
        }`,
      output: `
          import {Status} from '@sumup-oss/circuit-ui';
   function Component() {
          return <Status>1</Status>
        }`,
      errors: [
        { messageId: 'renamed' },
        { messageId: 'renamed' },
        { messageId: 'renamed' },
      ],
    },
    {
      name: 'matched BadgeProps from Circuit UI',
      code: `import {BadgeProps} from '@sumup-oss/circuit-ui';`,
      output: `import {StatusProps} from '@sumup-oss/circuit-ui';`,
      errors: [{ messageId: 'renamed' }],
    },
  ],
});
