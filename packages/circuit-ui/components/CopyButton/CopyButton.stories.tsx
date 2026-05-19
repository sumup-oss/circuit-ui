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
    onCopyLabel: { control: 'text' },
    copyLabel: { control: 'text' },
    copyVariant: {
      options: ['input', 'button', 'icon'],
      control: { type: 'select' },
    },
    disabled: { control: 'boolean' },
    hideLabel: { control: 'boolean' },
    text: { control: 'text' },
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
  copyLabel: 'Copy token',
  onCopyLabel: 'Token copied',
} satisfies CopyButtonProps;

export const Input = (args: CopyButtonProps) => <CopyButton {...args} />;

Input.args = inputArgs;

export const MaskedInput = (args: CopyButtonProps) => <CopyButton {...args} />;

MaskedInput.args = {
  ...inputArgs,
  text: 'sk_live_******',
};

export const LongValue = (args: CopyButtonProps) => <CopyButton {...args} />;

LongValue.args = {
  label: 'Webhook secret',
  value: 'whsec_4VbX8i2LwY7nQp3Rk5Tm9Uc1Fd6Hs0Za',
  copyLabel: 'Copy secret',
  onCopyLabel: 'Secret copied',
} satisfies CopyButtonProps;

export const FullButton = (args: CopyButtonProps) => <CopyButton {...args} />;

FullButton.args = {
  copyVariant: 'button',
  value: 'ref_1234567890',
  copyLabel: 'Copy reference',
  onCopyLabel: 'Reference copied',
} satisfies CopyButtonProps;

export const IconOnly = (args: CopyButtonProps) => <CopyButton {...args} />;

IconOnly.args = {
  copyVariant: 'icon',
  value: 'ref_1234567890',
  copyLabel: 'Copy reference',
  onCopyLabel: 'Reference copied',
} satisfies CopyButtonProps;

export const Disabled = (args: CopyButtonProps) => <CopyButton {...args} />;

Disabled.args = {
  ...inputArgs,
  disabled: true,
};

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

export const AllVariants = () => (
  <Stack vertical>
    <CopyButton {...inputArgs} />
    <CopyButton
      copyVariant="button"
      value="ref_1234567890"
      copyLabel="Copy reference"
      onCopyLabel="Reference copied"
    />
    <CopyButton
      copyVariant="icon"
      value="ref_1234567890"
      copyLabel="Copy reference"
      onCopyLabel="Reference copied"
    />
  </Stack>
);
