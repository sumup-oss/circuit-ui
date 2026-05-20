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

import { Confirm } from '@sumup-oss/icons';

import { Stack } from '../../../../.storybook/components/index.js';

import { Status, type StatusProps } from './Status.js';

export default {
  title: 'Components/Status',
  component: Status,
  tags: ['status:stable'],
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
  <Stack>
    <Status {...args} color="confirm">
      Confirm
    </Status>
    <Status {...args} color="neutral">
      Neutral
    </Status>
    <Status {...args} color="notify">
      Notify
    </Status>
    <Status {...args} color="alert">
      Alert
    </Status>
    <Status {...args} color="promo">
      Promo
    </Status>
    <Status {...args} color="special">
      Special
    </Status>
  </Stack>
);

export const Pill = (args: StatusProps) => (
  <Stack>
    <Status {...args} variant="pill" color="confirm">
      Confirm
    </Status>
    <Status {...args} variant="pill" color="neutral">
      Neutral
    </Status>
    <Status {...args} variant="pill" color="notify">
      Notify
    </Status>
    <Status {...args} variant="pill" color="alert">
      Alert
    </Status>
    <Status {...args} variant="pill" color="promo">
      Promo
    </Status>
    <Status {...args} variant="pill" color="special">
      Special
    </Status>
  </Stack>
);

export const Badge = (args: StatusProps) => (
  <Stack>
    <Status {...args} variant="badge" color="confirm">
      0
    </Status>
    <Status {...args} variant="badge" color="neutral">
      0
    </Status>
    <Status {...args} variant="badge" color="notify">
      123
    </Status>
    <Status {...args} variant="badge" color="alert">
      0
    </Status>
    <Status {...args} variant="badge" color="promo">
      0
    </Status>
    <Status {...args} variant="badge" color="special">
      0
    </Status>
  </Stack>
);

export const Dot = (args: StatusProps) => (
  <Stack>
    <Status {...args} variant="dot" color="confirm" />
    <Status {...args} variant="dot" color="neutral" />
    <Status {...args} variant="dot" color="notify" />
    <Status {...args} variant="dot" color="alert" />
    <Status {...args} variant="dot" color="promo" />
    <Status {...args} variant="dot" color="special" />
  </Stack>
);

export const Line = (args: StatusProps) => (
  <Stack>
    <Status {...args} variant="line" color="confirm" icon={Confirm}>
      Confirm
    </Status>
    <Status {...args} variant="line" color="neutral" icon={Confirm}>
      Neutral
    </Status>
    <Status {...args} variant="line" color="notify" icon={Confirm}>
      Notify
    </Status>
    <Status {...args} variant="line" color="alert" icon={Confirm}>
      Alert
    </Status>
    <Status {...args} variant="line" color="promo" icon={Confirm}>
      Promo
    </Status>
    <Status {...args} variant="line" color="special" icon={Confirm}>
      Special
    </Status>
  </Stack>
);
