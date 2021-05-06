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
  title: `Avatar`,
  component: Avatar,
  parameters: {
    docs: { page: docs },
  },
  argTypes: {
    imageUrl: { control: 'text' },
    variant: { control: { type: 'radio', options: ['square', 'round'] } },
    size: { control: { type: 'radio', options: ['large', 'small'] } },
  },
};

export const base = (args: AvatarProps): JSX.Element => <Avatar {...args} />;
base.args = {
  imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png',
  variant: 'round',
  size: 'large',
};

export const sizes = (): JSX.Element => (
  <Stack>
    <Avatar
      size="large"
      variant="round"
      imageUrl="https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png"
    />
    <Avatar
      size="small"
      variant="round"
      imageUrl="https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png"
    />
  </Stack>
);

export const identity = (): JSX.Element => (
  <Stack>
    <Avatar
      variant="round"
      imageUrl="https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png"
    />
    <Avatar variant="round" />
  </Stack>
);

export const object = (): JSX.Element => (
  <Stack>
    <Avatar
      variant="square"
      imageUrl="https://source.unsplash.com/EcWFOYOpkpY"
    />
    <Avatar variant="square" />
  </Stack>
);
