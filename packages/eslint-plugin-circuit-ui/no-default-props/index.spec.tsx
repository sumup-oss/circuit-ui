/**
 * Copyright 2026, SumUp Ltd.
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

import { noDefaultProps } from './index.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run('no-default-props', noDefaultProps, {
  valid: [
    {
      name: 'keeps conditional defaults when sibling props affect semantics',
      code: `
        import { Body } from '@sumup-oss/circuit-ui';

        function Component({ as, variant }) {
          return (
            <>
              <Body as="p" variant={variant}>Hello</Body>
              <Body as="strong" weight="regular">Strong</Body>
              <Body as={as} weight="regular">World</Body>
            </>
          );
        }
      `,
    },
  ],
  invalid: [
    {
      name: 'removes simple default props from a button',
      code: `
        import { Button } from '@sumup-oss/circuit-ui';

        function Component() {
          return <Button size="m" variant="secondary">Submit</Button>;
        }
      `,
      output: `
        import { Button } from '@sumup-oss/circuit-ui';

        function Component() {
          return <Button  >Submit</Button>;
        }
      `,
      errors: [
        {
          messageId: 'redundant',
        },
        {
          messageId: 'redundant',
        },
      ],
    },
    {
      name: 'removes conditional Body defaults when safe',
      code: `
        import { Body } from '@sumup-oss/circuit-ui';

        function Component() {
          return (
            <Body as="p" weight="regular" size="m" color="normal">Hello</Body>
          );
        }
      `,
      output: `
        import { Body } from '@sumup-oss/circuit-ui';

        function Component() {
          return (
            <Body    >Hello</Body>
          );
        }
      `,
      errors: [
        {
          messageId: 'redundant',
        },
        {
          messageId: 'redundant',
        },
        {
          messageId: 'redundant',
        },
        {
          messageId: 'redundant',
        },
      ],
    },
  ],
});
