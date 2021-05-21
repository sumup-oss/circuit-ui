/**
 * Copyright 2021, SumUp Ltd.
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

import React from 'react';

import { Stack } from '../../../../.storybook/components';

import { Avatar, AvatarProps } from './Avatar';
import docs from './Avatar.docs.mdx';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: { page: docs },
  },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    variant: { control: { type: 'radio', options: ['object', 'identity'] } },
    size: { control: { type: 'radio', options: ['yotta', 'giga'] } },
  },
};

export const base = (args: AvatarProps): JSX.Element => <Avatar {...args} />;
base.args = {
  src: 'https://picsum.photos/id/63/200',
  variant: 'object',
  size: 'yotta',
};

export const object = (): JSX.Element => (
  <Stack>
    <Avatar src="https://picsum.photos/id/63/200" variant="object" />
    <Avatar variant="object" />
  </Stack>
);

export const identity = (): JSX.Element => (
  <Stack>
    <Avatar
      src="https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png"
      variant="identity"
    />
    <Avatar variant="identity" />
  </Stack>
);

export const sizes = (): JSX.Element => (
  <Stack>
    <Stack>
      <Avatar
        src="https://picsum.photos/id/63/200"
        variant="object"
        size="yotta"
      />
      <Avatar
        src="https://picsum.photos/id/63/200"
        variant="object"
        size="giga"
      />
    </Stack>
    <Stack>
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png"
        variant="identity"
        size="yotta"
      />
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png"
        variant="identity"
        size="giga"
      />
    </Stack>
  </Stack>
);
