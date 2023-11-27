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

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noRenamedProps } from '.';

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
ruleTester.run('no-renamed-props', noRenamedProps, {
  valid: [
    {
      name: 'matched component with the correct prop name',
      code: `
        function Component() {
          return <Toggle description="Description" />
        }
      `,
    },
    {
      name: 'matched component with the correct prop value',
      code: `
        function Component() {
          return <Badge variant="success" />
        }
      `,
    },
    {
      name: 'unrelated component with the old prop value',
      code: `
        function Component() {
          return <Button variant="confirm" />
        }
      `,
    },
  ],
  invalid: [
    {
      name: 'matched component with the old prop name',
      code: `
        function Component() {
          return <Toggle explanation="Description" />
        }
      `,
      output: `
        function Component() {
          return <Toggle description="Description" />
        }
      `,
      errors: [{ messageId: 'propName' }],
    },
    {
      name: 'matched component with deprecated children',
      code: `
        function Component() {
          return <Button>Add</Button>
        }
      `,
      output: `
        function Component() {
          return <Button label="Add" />
        }
      `,
      errors: [{ messageId: 'propName' }],
    },
    {
      name: 'matched component with deprecated child nodes',
      code: `
        function Component() {
          return <Button><span>Add</span></Button>
        }
      `,
      errors: [{ messageId: 'propName' }],
    },
    {
      name: 'matched component with the old prop value',
      code: `
        function Component() {
          return <Badge variant="confirm" />
        }
      `,
      output: `
        function Component() {
          return <Badge variant="success" />
        }
      `,
      errors: [{ messageId: 'propValue' }],
    },
    {
      name: 'matched component with the old prop value as an expression',
      code: `
        function Component() {
          return <Badge variant={'confirm'} />
        }
      `,
      output: `
        function Component() {
          return <Badge variant="success" />
        }
      `,
      errors: [{ messageId: 'propValue' }],
    },
    {
      name: 'matched function with the old prop value',
      code: `
        setToast({
          variant: 'notify',
          body: 'Your toast is burnt.',
        });
      `,
      output: `
        setToast({
          variant: 'warning',
          body: 'Your toast is burnt.',
        });
      `,
      errors: [{ messageId: 'propValue' }],
    },
  ],
});
