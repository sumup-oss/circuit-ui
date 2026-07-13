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

import {
  Confirm,
  Time,
  Notify,
  Alert,
  PaidOut,
  Sparkles,
} from '@sumup-oss/icons';

import { Stack, Matrix } from '../../../../.storybook/components/index.js';

import { Status, type StatusProps } from './Status.js';

export default {
  title: 'Components/Status',
  component: Status,
  tags: ['status:stable'],
  argTypes: {
    variant: {
      options: ['pill', 'badge', 'dot', 'line'],
      control: { type: 'radio' },
    },
    color: {
      options: ['confirm', 'neutral', 'notify', 'alert', 'promo', 'special'],
      control: { type: 'radio' },
    },
  },
};

export const Base = (args: StatusProps) => <Status {...args} />;

Base.args = {
  children: 'Status',
};

export const Variants = (args: StatusProps) => (
  <Stack>
    <Status {...args} variant="pill">
      Status
    </Status>
    <Status {...args} variant="badge">
      0
    </Status>
    <Status {...args} variant="dot" />
    <Status {...args} variant="line" icon={Confirm}>
      Status
    </Status>
  </Stack>
);

export const Colors = (args: StatusProps) => (
  <Matrix
    component={Status}
    args={args}
    vertical={{
      prop: 'variant',
      values: [
        { value: 'pill', args: { children: 'Status' } },
        { value: 'badge', args: { children: 0 } },
        { value: 'dot' },
        { value: 'line' },
      ],
    }}
    horizontal={{
      prop: 'color',
      values: [
        { value: 'confirm', args: { icon: Confirm, children: 'Confirm' } },
        { value: 'neutral', args: { icon: Notify, children: 'Neutral' } },
        { value: 'notify', args: { icon: Time, children: 'Notify' } },
        { value: 'alert', args: { icon: Alert, children: 'Alert' } },
        { value: 'promo', args: { icon: Sparkles, children: 'Promo' } },
        { value: 'special', args: { icon: PaidOut, children: 'Special' } },
      ],
    }}
  />
);
