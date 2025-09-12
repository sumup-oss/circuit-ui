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

import { noRenamedProps } from '.';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

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
    {
      name: 'matched component with the correct prop name nested in an element with the old prop name',
      code: `
        function Component() {
          return (
            <Box size="giga">
              <Button size="m" />
            </Box>
          )
        }
      `,
    },
    {
      name: 'matched IconButton component with the correct icon prop and label as children',
      code: `
        function Component() {
          return <IconButton icon={Close}>Close</IconButton>
        }
      `,
    },
    {
      name: 'matched Body component without the variant prop',
      code: `
        function Component() {
          return <Body>Lorem ipsum</Body>
        }
      `,
    },
    {
      name: 'matched Body component with variant="quote"',
      code: `
        function Component() {
          return (
            <Body variant="quote">Lorem ipsum</Body>
          )
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
    {
      name: 'matched IconButton component with the old children prop',
      code: `
        // icon component as child
        function ComponentA() {
          return <IconButton label="Close"><Close /></IconButton>
        }

        // icon component with size prop as child
        function ComponentB() {
          return (
            <IconButton label="Close">
              <Close size="16" />
            </IconButton>
          )
        }

        // icon component with size prop and text as children
        function ComponentC() {
          return (
            <IconButton label="Close">
              Close <Close size="16" />
            </IconButton>
          )
        }

        // icon component with size and className props as child
        function ComponentD() {
          return (
            <IconButton label="Close">
              <Close size="16" className="icon" />
            </IconButton>
          )
        }

        // span element as child
        function ComponentE() {
          return (
            <IconButton label="Close">
              <span>x</span>
            </IconButton>
          )
        }
        `,
      output: `
        // icon component as child
        function ComponentA() {
          return <IconButton label="Close" icon={Close} />
        }

        // icon component with size prop as child
        function ComponentB() {
          return (
            <IconButton label="Close" icon={Close} />
          )
        }

        // icon component with size prop and text as children
        function ComponentC() {
          return (
            <IconButton label="Close">
              Close <Close size="16" />
            </IconButton>
          )
        }

        // icon component with size and className props as child
        function ComponentD() {
          return (
            <IconButton label="Close">
              <Close size="16" className="icon" />
            </IconButton>
          )
        }

        // span element as child
        function ComponentE() {
          return (
            <IconButton label="Close">
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
        { messageId: 'propName' },
        { messageId: 'propName' },
        { messageId: 'propName' },
        { messageId: 'propName' },
        { messageId: 'propName' },
      ],
    },
    {
      name: 'matched IconButton component with the old label prop',
      code: `
        // label prop as string
        function ComponentA() {
          return <IconButton icon={Close} label="Close" />
        }

        // label prop as expression
        function ComponentB() {
          return (
            <IconButton icon={Close} label={t('close')} />
          )
        }

        // label prop as elements
        function ComponentC() {
          return (
            <IconButton icon={Close} label={<span>Close</span>} />
          )
        }

        // label prop as conditional
        function ComponentD() {
          return (
            <IconButton icon={Close} label={open ? 'Close' : 'Open'} />
          )
        }

        // label prop as variable
        function ComponentE() {
          return (
            <IconButton icon={Close} label={close} />
          )
        }
        `,
      output: `
        // label prop as string
        function ComponentA() {
          return <IconButton icon={Close}  >Close</IconButton>
        }

        // label prop as expression
        function ComponentB() {
          return (
            <IconButton icon={Close}  >{t('close')}</IconButton>
          )
        }

        // label prop as elements
        function ComponentC() {
          return (
            <IconButton icon={Close}  ><span>Close</span></IconButton>
          )
        }

        // label prop as conditional
        function ComponentD() {
          return (
            <IconButton icon={Close}  >{open ? 'Close' : 'Open'}</IconButton>
          )
        }

        // label prop as variable
        function ComponentE() {
          return (
            <IconButton icon={Close}  >{close}</IconButton>
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
      name: 'matched Body component with the old prop value',
      code: `
        function ComponentA() {
          return (
            <Body variant="highlight">Lorem ipsum</Body>
          )
        }

        function ComponentB() {
          return (
            <Body as="span" variant="highlight">Lorem ipsum</Body>
          )
        }

        function ComponentC() {
          return (
            <Body variant="alert">Lorem ipsum</Body>
          )
        }
      `,
      output: `
        function ComponentA() {
          return (
            <Body as="strong">Lorem ipsum</Body>
          )
        }

        function ComponentB() {
          return (
            <Body as="span" weight="semibold">Lorem ipsum</Body>
          )
        }

        function ComponentC() {
          return (
            <Body color="danger">Lorem ipsum</Body>
          )
        }
      `,
      errors: [
        { messageId: 'bodyVariant' },
        { messageId: 'bodyVariant' },
        { messageId: 'bodyVariant' },
      ],
    },
  ],
});
