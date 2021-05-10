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
    variant: { control: { type: 'radio', options: ['business', 'person'] } },
    size: { control: { type: 'radio', options: ['yotta', 'giga'] } },
  },
};

export const base = (args: AvatarProps): JSX.Element => <Avatar {...args} />;
base.args = {
  src: 'https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png',
  alt: '',
  variant: 'person',
  size: 'yotta',
};

export const sizes = (): JSX.Element => (
  <Stack>
    <Avatar
      size="yotta"
      variant="person"
      src="https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png"
      alt=""
    />
    <Avatar
      size="giga"
      variant="person"
      src="https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png"
      alt=""
    />
  </Stack>
);

export const identity = (): JSX.Element => (
  <Stack>
    <Avatar
      variant="person"
      src="https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png"
      alt=""
    />
    <Avatar variant="person" src="" alt="" />
  </Stack>
);

export const object = (): JSX.Element => (
  <Stack>
    <Avatar
      variant="business"
      src="https://source.unsplash.com/EcWFOYOpkpY"
      alt=""
    />
    <Avatar variant="business" src="" alt="" />
  </Stack>
);
