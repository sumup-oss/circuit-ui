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

import { ClipboardText, type ClipboardTextProps } from './ClipboardText.js';

export default {
  title: 'Forms/ClipboardText',
  component: ClipboardText,
  tags: ['status:experimental'],
  argTypes: {
    copyLabel: { control: 'text' },
    readOnly: { control: 'boolean' },
    copiedLabel: { control: 'text' },
    text: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'ClipboardText displays a value in an input-like field and provides a built-in copy action.',
      },
    },
  },
};

export const Base = (args: ClipboardTextProps) => <ClipboardText {...args} />;

Base.args = {
  label: 'API token',
  value: 'sk_live_1234567890',
  copyLabel: 'Copy token',
};

export const MaskedValue = (args: ClipboardTextProps) => (
  <ClipboardText {...args} />
);

MaskedValue.args = {
  label: 'API token',
  value: 'sk_live_1234567890',
  text: 'sk_live_******',
  copyLabel: 'Copy token',
};

export const LongValue = (args: ClipboardTextProps) => (
  <ClipboardText {...args} />
);

LongValue.args = {
  label: 'Webhook secret',
  value: 'whsec_4VbX8i2LwY7nQp3Rk5Tm9Uc1Fd6Hs0Za',
  copyLabel: 'Copy secret',
};
