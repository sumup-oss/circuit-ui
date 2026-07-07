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

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noDeprecatedProps } from './index.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run('no-deprecated-props', noDeprecatedProps, {
  valid: [
    {
      name: 'Body without any deprecated prop values',
      code: `
        function Component() {
          return <Body />
        }
      `,
    },
    {
      name: 'Body with a valid size value',
      code: `
        function Component() {
          return <Body size="m" />
        }
      `,
    },
    {
      name: 'Body with a valid decoration value',
      code: `
        function Component() {
          return <Body decoration="strikethrough" />
        }
      `,
    },
    {
      name: 'Toggle without any deprecated props',
      code: `
        function Component() {
          return <Toggle label="label" checked onChange={() => {}} />
        }
      `,
    },
  ],
  invalid: [
    {
      name: 'Body with the deprecated variant prop',
      code: `
        function Component() {
          return <Body variant="alert" />
        }
      `,
      errors: [{ messageId: 'deprecated' }],
    },
    {
      name: 'Body with deprecated size "one"',
      code: `
        function Component() {
          return <Body size="one" />
        }
      `,
      errors: [{ messageId: 'deprecatedValue' }],
    },
    {
      name: 'Body with deprecated size "two"',
      code: `
        function Component() {
          return <Body size="two" />
        }
      `,
      errors: [{ messageId: 'deprecatedValue' }],
    },
    {
      name: 'Body with deprecated size "one" as JSX expression',
      code: `
        function Component() {
          return <Body size={'one'} />
        }
      `,
      errors: [{ messageId: 'deprecatedValue' }],
    },
    {
      name: 'Body with deprecated decoration "italic"',
      code: `
        function Component() {
          return <Body decoration="italic" />
        }
      `,
      errors: [{ messageId: 'deprecatedValue' }],
    },
    {
      name: 'Numeral with deprecated decoration "italic"',
      code: `
        function Component() {
          return <Numeral decoration="italic" />
        }
      `,
      errors: [{ messageId: 'deprecatedValue' }],
    },
    {
      name: 'Toggle with the deprecated checkedLabel prop',
      code: `
        function Component() {
          return <Toggle label="label" checkedLabel="on" />
        }
      `,
      errors: [{ messageId: 'deprecated' }],
    },
    {
      name: 'Toggle with the deprecated uncheckedLabel prop',
      code: `
        function Component() {
          return <Toggle label="label" uncheckedLabel="off" />
        }
      `,
      errors: [{ messageId: 'deprecated' }],
    },
  ],
});
