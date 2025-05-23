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

/* eslint-disable @typescript-eslint/no-unsafe-call */

import { RuleTester } from '@typescript-eslint/rule-tester';

import { noRenamedComponents } from './index';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

// eslint-disable-next-line  @typescript-eslint/no-unsafe-member-access
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
    {
      name: 'similar component from another package',
      code: `
          import {Popover} from 'some-other-package';
   function Component() {
          return <Popover />
        }`,
    },
  ],
  invalid: [
    {
      name: 'matched component from Circuit UI',
      code: `
          import {Popover} from '@sumup-oss/circuit-ui';
   function Component() {
          return <Popover />
        }`,
      output: `
          import {ActionMenu} from '@sumup-oss/circuit-ui';
   function Component() {
          return <ActionMenu />
        }`,
      errors: [{ messageId: 'renamed' }, { messageId: 'renamed' }],
    },
    {
      name: 'matched component from Circuit UI',
      code: `import {PopoverProps} from '@sumup-oss/circuit-ui';`,
      output: `import {ActionMenuProps} from '@sumup-oss/circuit-ui';`,
      errors: [{ messageId: 'renamed' }],
    },
    {
      name: 'matched component from Circuit UI',
      code: `import {PopoverItemProps} from '@sumup-oss/circuit-ui';`,
      output: `import {ActionMenuItemProps} from '@sumup-oss/circuit-ui';`,
      errors: [{ messageId: 'renamed' }],
    },
    {
      name: 'matched renamed import from Circuit UI',
      code: `
          import {Popover as CircuitPopover} from '@sumup-oss/circuit-ui';
   function Component() {
          return <CircuitPopover />
        }`,
      output: `
          import {ActionMenu as CircuitPopover} from '@sumup-oss/circuit-ui';
   function Component() {
          return <CircuitPopover />
        }`,
      errors: [{ messageId: 'renamed' }],
    },
    {
      name: 'matched renamed import from Circuit UI',
      code: `
          import {PopoverProps as CircuitPopoverProps} from '@sumup-oss/circuit-ui';`,
      output: `
          import {ActionMenuProps as CircuitPopoverProps} from '@sumup-oss/circuit-ui';`,
      errors: [{ messageId: 'renamed' }],
    },
    {
      name: 'matched renamed import from Circuit UI',
      code: `
          import {PopoverItemProps as CircuitPopoverItemProps} from '@sumup-oss/circuit-ui';`,
      output: `
          import {ActionMenuItemProps as CircuitPopoverItemProps} from '@sumup-oss/circuit-ui';`,
      errors: [{ messageId: 'renamed' }],
    },
  ],
});
