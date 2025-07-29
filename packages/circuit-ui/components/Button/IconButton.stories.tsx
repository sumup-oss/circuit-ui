/**
 * Copyright 2019, SumUp Ltd.
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

import { useEffect, useState } from 'react';
import { Plus } from '@sumup-oss/icons';

import { Stack } from '../../../../.storybook/components/index.js';

import { IconButton, type IconButtonProps } from './IconButton.js';

export default {
  title: 'Components/Button/IconButton',
  component: IconButton,
};

export const Base = (args: IconButtonProps) => (
  <IconButton {...args} icon={args.icon} />
);

Base.args = {
  children: 'Add',
  icon: Plus,
};

export const Variants = (args: IconButtonProps) => (
  <Stack>
    <IconButton {...args} icon={args.icon} variant="primary">
      Primary
    </IconButton>
    <IconButton {...args} icon={args.icon} variant="secondary">
      Secondary
    </IconButton>
    <IconButton {...args} icon={args.icon} variant="tertiary">
      Tertiary
    </IconButton>
  </Stack>
);

Variants.args = {
  icon: Plus,
};

export const Sizes = (args: IconButtonProps) => (
  <Stack>
    <IconButton {...args} icon={args.icon} size="s">
      Small
    </IconButton>
    <IconButton {...args} icon={args.icon} size="m">
      Medium
    </IconButton>
  </Stack>
);

Sizes.args = {
  icon: Plus,
};

export const Loading = (args: IconButtonProps) => {
  const [isLoading, setLoading] = useState(args.isLoading);

  const handleClick = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (!isLoading) {
      return undefined;
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  return <Variants {...args} isLoading={isLoading} onClick={handleClick} />;
};

Loading.args = {
  isLoading: true,
  icon: Plus,
};
