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

import { Stack } from '../../../../.storybook/components/index.js';

import { Avatar, AvatarProps } from './Avatar.js';

export default {
  title: 'Components/Avatar',
  component: Avatar,
};

export const Base = (args: AvatarProps): JSX.Element => <Avatar {...args} />;

Base.args = {
  src: '/images/illustration-coffee.jpg',
  variant: 'object',
  size: 'm',
  alt: 'A cup of coffee on a table',
};

export const ObjectVariant = (): JSX.Element => (
  <Stack>
    <Avatar
      src="/images/illustration-coffee.jpg"
      variant="object"
      alt="A cup of coffee on a table"
    />
    <Avatar variant="object" alt="A cup of coffee on a table" />
  </Stack>
);

export const IdentityVariant = (): JSX.Element => (
  <Stack>
    <Avatar
      src="/images/illustration-cat.jpg"
      variant="identity"
      alt="A portrait of a grey cat"
    />
    <Avatar variant="identity" alt="" />
    <Avatar variant="identity" alt="John Dorian" initials="JD" />
  </Stack>
);

export const Sizes = (): JSX.Element => (
  <Stack>
    <Stack>
      <Avatar
        src="/images/illustration-coffee.jpg"
        variant="object"
        size="m"
        alt="A cup of coffee on a table"
      />
      <Avatar
        src="/images/illustration-coffee.jpg"
        variant="object"
        size="s"
        alt="A cup of coffee on a table"
      />
    </Stack>
    <Stack>
      <Avatar
        src="/images/illustration-cat.jpg"
        variant="identity"
        size="m"
        alt="A portrait of a grey cat"
      />
      <Avatar
        src="/images/illustration-cat.jpg"
        variant="identity"
        size="s"
        alt="A portrait of a grey cat"
      />
    </Stack>
    <Stack>
      <Avatar variant="identity" alt="John Dorian" initials="JD" size="m" />
      <Avatar variant="identity" alt="John Dorian" initials="JD" size="s" />
    </Stack>
  </Stack>
);
