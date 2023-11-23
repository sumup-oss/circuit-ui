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
import { ArrowSlanted, Plus } from '@sumup/icons';

import { Stack } from '../../../../.storybook/components/index.js';
import ButtonGroup from '../ButtonGroup/index.js';
import IconButton from '../IconButton/index.js';
import CloseButton from '../CloseButton/index.js';

import { Button, ButtonProps } from './Button.js';

export default {
  title: 'Components/Button',
  component: Button,
  subcomponents: { IconButton, CloseButton, ButtonGroup },
  argTypes: {
    children: { control: 'text' },
  },
};

export const Base = (args: ButtonProps) => <Button {...args} />;

Base.args = {
  onClick: () => alert('Hello'),
  children: 'Say hello',
  disabled: false,
};

export const Variants = (args: ButtonProps) => (
  <Stack>
    <Button {...args} variant="primary">
      Primary
    </Button>
    <Button {...args} variant="secondary">
      Secondary
    </Button>
    <Button {...args} variant="tertiary">
      Tertiary
    </Button>
  </Stack>
);

export const Destructive = (args: ButtonProps) => (
  <Variants {...args} destructive />
);

export const Sizes = (args: ButtonProps) => (
  <Stack>
    <Button {...args} size="s">
      Small
    </Button>
    <Button {...args} size="m">
      Medium
    </Button>
  </Stack>
);

export const WithIcons = (args: ButtonProps) => (
  <Stack>
    <Button {...args} icon={Plus}>
      Add to cart
    </Button>
    <Button
      {...args}
      href="https://sumup.com/terms"
      target="_blank"
      navigationIcon={ArrowSlanted}
    >
      Terms & Conditions
    </Button>
  </Stack>
);

export const Loading = (args: ButtonProps) => {
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
  loadingLabel: 'Loading',
  isLoading: true,
};
