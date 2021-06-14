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
};

export const Base = (args: AvatarProps): JSX.Element => <Avatar {...args} />;
Base.args = {
  src: 'https://source.unsplash.com/EcWFOYOpkpY/200x200',
  variant: 'object',
  size: 'yotta',
  alt: 'A cup of coffee on a table',
};

export const ObjectVariant = (): JSX.Element => (
  <Stack>
    <Avatar
      src="https://source.unsplash.com/EcWFOYOpkpY/200x200"
      variant="object"
      alt="A cup of coffee on a table"
    />
    <Avatar variant="object" alt="A cup of coffee on a table" />
  </Stack>
);

export const IdentityVariant = (): JSX.Element => (
  <Stack>
    <Avatar
      src="https://source.unsplash.com/ZDgrqccUn88/200x200"
      variant="identity"
      alt="A portrait of a grey cat"
    />
    <Avatar variant="identity" alt="" />
  </Stack>
);

export const Sizes = (): JSX.Element => (
  <Stack>
    <Stack>
      <Avatar
        src="https://source.unsplash.com/EcWFOYOpkpY/200x200"
        variant="object"
        size="yotta"
        alt="A cup of coffee on a table"
      />
      <Avatar
        src="https://source.unsplash.com/EcWFOYOpkpY/200x200"
        variant="object"
        size="giga"
        alt="A cup of coffee on a table"
      />
    </Stack>
    <Stack>
      <Avatar
        src="https://source.unsplash.com/ZDgrqccUn88/200x200"
        variant="identity"
        size="yotta"
        alt="A portrait of a grey cat"
      />
      <Avatar
        src="https://source.unsplash.com/ZDgrqccUn88/200x200"
        variant="identity"
        size="giga"
        alt="A portrait of a grey cat"
      />
    </Stack>
  </Stack>
);
