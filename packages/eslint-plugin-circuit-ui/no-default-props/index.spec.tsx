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
      name: 'ignores components imported from another package',
      code: `
        import { Button } from 'some-other-package';

        function Component() {
          return <Button size="m" variant="secondary" />;
        }
      `,
    },
    {
      name: 'ignores non-default values',
      code: `
        import { Button } from '@sumup-oss/circuit-ui';

        function Component() {
          return <Button size="s" variant="primary">Submit</Button>;
        }
      `,
    },
    {
      name: 'keeps Body as when variant changes the rendered element',
      code: `
        import { Body } from '@sumup-oss/circuit-ui';

        function Component() {
          return <Body as="p" variant="highlight">Hello</Body>;
        }
      `,
    },
    {
      name: 'keeps Body weight when the as prop changes the default weight',
      code: `
        import { Body } from '@sumup-oss/circuit-ui';

        function Component() {
          return <Body as="strong" weight="regular">Hello</Body>;
        }
      `,
    },
    {
      name: 'keeps Body defaults when sibling props are dynamic',
      code: `
        import { Body } from '@sumup-oss/circuit-ui';

        function Component({ as, variant }) {
          return (
            <>
              <Body as="p" variant={variant}>Hello</Body>
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
          return <Button>Submit</Button>;
        }
      `,
      errors: [{ messageId: 'redundant' }, { messageId: 'redundant' }],
    },
    {
      name: 'removes aliased component defaults',
      code: `
        import { IconButton as ActionButton } from '@sumup-oss/circuit-ui';

        function Component() {
          return <ActionButton size="m" variant="secondary" icon={More}>More</ActionButton>;
        }
      `,
      output: `
        import { IconButton as ActionButton } from '@sumup-oss/circuit-ui';

        function Component() {
          return <ActionButton icon={More}>More</ActionButton>;
        }
      `,
      errors: [{ messageId: 'redundant' }, { messageId: 'redundant' }],
    },
    {
      name: 'removes conditional Body defaults when safe',
      code: `
        import { Body } from '@sumup-oss/circuit-ui';

        function Component() {
          return (
            <>
              <Body as="p" weight="regular" size="m" color="normal">Hello</Body>
              <Body weight="regular">World</Body>
            </>
          );
        }
      `,
      output: `
        import { Body } from '@sumup-oss/circuit-ui';

        function Component() {
          return (
            <>
              <Body>Hello</Body>
              <Body>World</Body>
            </>
          );
        }
      `,
      errors: [
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
      ],
    },
    {
      name: 'removes boolean and numeric defaults',
      code: `
        import { Toggletip, Tooltip } from '@sumup-oss/circuit-ui';

        function Component() {
          return (
            <>
              <Toggletip
                component={Reference}
                body="Help"
                defaultOpen={false}
                placement="top"
                offset={12}
                strategy="fixed"
              />
              <Tooltip component={Reference} label="Help" type="label" placement="top" />
            </>
          );
        }
      `,
      output: `
        import { Toggletip, Tooltip } from '@sumup-oss/circuit-ui';

        function Component() {
          return (
            <>
              <Toggletip
                component={Reference}
                body="Help"
              />
              <Tooltip component={Reference} label="Help" type="label" />
            </>
          );
        }
      `,
      errors: [
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
      ],
    },
    {
      name: 'removes defaults from several supported components',
      code: `
        import {
          Avatar,
          Badge,
          ButtonGroup,
          Card,
          Compact,
          Numeral,
        } from '@sumup-oss/circuit-ui';

        function Component() {
          return (
            <>
              <Avatar size="m" alt="" />
              <Badge as="div" variant="neutral">1</Badge>
              <ButtonGroup align="center" size="m" />
              <Card as="div" spacing="giga" />
              <Compact as="p" size="m" weight="regular" color="normal">Text</Compact>
              <Numeral as="p" size="m" color="normal">42</Numeral>
            </>
          );
        }
      `,
      output: `
        import {
          Avatar,
          Badge,
          ButtonGroup,
          Card,
          Compact,
          Numeral,
        } from '@sumup-oss/circuit-ui';

        function Component() {
          return (
            <>
              <Avatar alt="" />
              <Badge>1</Badge>
              <ButtonGroup />
              <Card />
              <Compact>Text</Compact>
              <Numeral>42</Numeral>
            </>
          );
        }
      `,
      errors: [
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
      ],
    },
    {
      name: 'removes defaults from additional simple public props',
      code: `
        import {
          Display,
          Headline,
          List,
          ListItemGroup,
          Modal,
          NotificationInline,
          NotificationToast,
          Popover,
          ProgressBar,
          Spinner,
          Timestamp,
        } from '@sumup-oss/circuit-ui';

        function Component() {
          return (
            <>
              <Display as="h1" size="m" weight="bold">Title</Display>
              <Headline as="h2" size="m">Headline</Headline>
              <List variant="unordered" size="m" />
              <ListItemGroup variant="inset" items={items} label="Group" />
              <Modal open variant="contextual" preventClose={false}>Content</Modal>
              <NotificationInline variant="info" body="Inline" />
              <NotificationToast variant="info" body="Toast" isVisible />
              <Popover isOpen onToggle={setOpen} component={Reference} placement="bottom">
                Content
              </Popover>
              <ProgressBar label="Loading" size="m" />
              <Spinner size="m" />
              <Timestamp
                datetime="2026-01-01T00:00:00.000+00:00[UTC]"
                variant="auto"
                formatStyle="long"
                includeTime={false}
              />
            </>
          );
        }
      `,
      output: `
        import {
          Display,
          Headline,
          List,
          ListItemGroup,
          Modal,
          NotificationInline,
          NotificationToast,
          Popover,
          ProgressBar,
          Spinner,
          Timestamp,
        } from '@sumup-oss/circuit-ui';

        function Component() {
          return (
            <>
              <Display as="h1">Title</Display>
              <Headline as="h2">Headline</Headline>
              <List />
              <ListItemGroup items={items} label="Group" />
              <Modal open>Content</Modal>
              <NotificationInline body="Inline" />
              <NotificationToast body="Toast" isVisible />
              <Popover isOpen onToggle={setOpen} component={Reference}>
                Content
              </Popover>
              <ProgressBar label="Loading" />
              <Spinner />
              <Timestamp
                datetime="2026-01-01T00:00:00.000+00:00[UTC]"
              />
            </>
          );
        }
      `,
      errors: [
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
        { messageId: 'redundant' },
      ],
    },
  ],
});
