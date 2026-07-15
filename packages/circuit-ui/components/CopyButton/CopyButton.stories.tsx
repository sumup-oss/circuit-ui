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

import { Stack } from '../../../../.storybook/components/index.js';
import { ToastProvider } from '../ToastContext/index.js';

import { CopyButton, type CopyButtonProps } from './CopyButton.js';

export default {
  title: 'Components/CopyButton',
  component: CopyButton,
  tags: ['status:experimental'],
  decorators: [
    (Story: () => JSX.Element) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  argTypes: {
    // Copy action
    value: {
      control: 'text',
      table: {
        category: 'Copy action',
      },
    },
    copyLabel: {
      control: 'text',
      table: {
        category: 'Copy action',
      },
    },
    successLabel: {
      control: 'text',
      table: {
        category: 'Copy action',
      },
    },
    onCopy: {
      table: {
        category: 'Copy action',
      },
    },
    // Variant
    copyVariant: {
      options: ['input', 'button', 'icon-button'],
      control: { type: 'select' },
      table: {
        category: 'Variant',
      },
    },
    // Input
    visibleValue: {
      control: 'text',
      table: {
        category: 'Input',
      },
    },
    label: {
      table: {
        category: 'Input',
      },
    },
    hideLabel: {
      control: 'boolean',
      table: {
        category: 'Input',
      },
    },
    invalid: {
      control: 'boolean',
      table: {
        category: 'Input',
      },
    },
    hasWarning: {
      control: 'boolean',
      table: {
        category: 'Input',
      },
    },
    validationHint: {
      control: 'text',
      table: {
        category: 'Input',
      },
    },
    // Button
    size: {
      control: 'select',
      table: {
        category: 'Button',
      },
    },
    stretch: {
      control: 'boolean',
      table: {
        category: 'Button',
      },
    },
    // State
    disabled: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'CopyButton copies a value to the clipboard and can render as a read-only input, a button, or an icon button.',
      },
    },
  },
};

const inputArgs = {
  label: 'API token',
  value: 'sk_live_1234567890',
  copyLabel: 'Copy API token',
  successLabel: 'Token copied',
} satisfies CopyButtonProps;

export const Base = (args: CopyButtonProps) => <CopyButton {...args} />;

Base.args = inputArgs;

Base.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const MaskedInput = (args: CopyButtonProps) => <CopyButton {...args} />;

MaskedInput.args = {
  ...inputArgs,
  visibleValue: 'sk_live_******',
};

export const LongValue = (args: CopyButtonProps) => <CopyButton {...args} />;

LongValue.args = {
  label: 'Webhook secret',
  value: 'whsec_4VbX8i2LwY7nQp3Rk5Tm9Uc1Fd6Hs0Za',
  copyLabel: 'Copy secret',
  successLabel: 'Secret copied',
} satisfies CopyButtonProps;

LongValue.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Disabled = () => (
  <Stack vertical>
    <CopyButton {...inputArgs} disabled />
    <CopyButton
      copyVariant="button"
      value="ref_1234567890"
      copyLabel="Copy reference"
      successLabel="Reference copied"
      disabled
    />
    <CopyButton
      copyVariant="icon-button"
      value="ref_1234567890"
      copyLabel="Copy reference"
      successLabel="Reference copied"
      disabled
    />
  </Stack>
);

export const ValidationStates = (args: CopyButtonProps) => (
  <Stack>
    <CopyButton
      {...args}
      label="Invalid token"
      validationHint="This token has expired."
      invalid
    />
    <CopyButton
      {...args}
      label="Warning token"
      validationHint="This token will expire soon."
      hasWarning
    />
  </Stack>
);

ValidationStates.args = inputArgs;

export const Variants = () => (
  <Stack vertical>
    <CopyButton {...inputArgs} />
    <CopyButton
      copyVariant="button"
      value="ref_1234567890"
      copyLabel="Copy reference"
      successLabel="Reference copied"
    />
    <CopyButton
      copyVariant="icon-button"
      value="ref_1234567890"
      copyLabel="Copy reference"
      successLabel="Reference copied"
    />
  </Stack>
);
