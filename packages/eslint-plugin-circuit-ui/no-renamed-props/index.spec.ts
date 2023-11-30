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
      name: 'matched component with the old children prop',
      code: `
        function ComponentA() {
          return <Button>Add</Button>
        }

        function ComponentB() {
          return (
            <Button>
              Add
            </Button>
          )
        }

        function ComponentC() {
          return (
            <Button>
              {t('add')}
            </Button>
          )
        }

        function ComponentD() {
          return (
            <Button>
              <span>Add</span>
            </Button>
          )
        }

        function ComponentE() {
          return (
            <Button>
              <Plus /> Add
            </Button>
          )
        }
      `,
      output: `
        function ComponentA() {
          return <Button label="Add" />
        }

        function ComponentB() {
          return (
            <Button label="Add" />
          )
        }

        function ComponentC() {
          return (
            <Button label={t('add')} />
          )
        }

        function ComponentD() {
          return (
            <Button label={<span>Add</span>} />
          )
        }

        function ComponentE() {
          return (
            <Button>
              <Plus /> Add
            </Button>
          )
        }
      `,
      errors: [
        { messageId: 'propName' },
        { messageId: 'propName' },
        { messageId: 'propName' },
        { messageId: 'propName' },
        { messageId: 'propName' },
      ],
    },
    {
      name: 'matched IconButton component with the old children prop',
      code: `
        function ComponentA() {
          return <IconButton><Close /></IconButton>
        }

        function ComponentB() {
          return (
            <IconButton>
              <Close size="16" />
            </IconButton>
          )
        }

        function ComponentC() {
          return (
            <IconButton>
              Close <Close size="16" />
            </IconButton>
          )
        }

        function ComponentD() {
          return (
            <IconButton>
              <Close size="16" className="icon" />
            </IconButton>
          )
        }

        function ComponentE() {
          return (
            <IconButton>
              <span>x</span>
            </IconButton>
          )
        }
      `,
      output: `
        function ComponentA() {
          return <IconButton icon={Close} />
        }

        function ComponentB() {
          return (
            <IconButton icon={Close} />
          )
        }

        function ComponentC() {
          return (
            <IconButton>
              Close <Close size="16" />
            </IconButton>
          )
        }

        function ComponentD() {
          return (
            <IconButton>
              <Close size="16" className="icon" />
            </IconButton>
          )
        }

        function ComponentE() {
          return (
            <IconButton>
              <span>x</span>
            </IconButton>
          )
        }
      `,
      errors: [
        { messageId: 'propName' },
        { messageId: 'propName' },
        { messageId: 'propName' },
        { messageId: 'propName' },
        { messageId: 'propName' },
      ],
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
