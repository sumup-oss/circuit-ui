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

/* eslint-disable react/display-name */

import { action } from '@storybook/addon-actions';
import { CirclePlus, PenStroke, Bin } from '@sumup/icons';
import { JSXElement } from 'jscodeshift';
import { useState } from 'react';

import Button from '../Button';

import { Popover, PopoverProps } from './Popover';
import docs from './Popover.docs.mdx';

export default {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    docs: { page: docs },
  },
  argTypes: {
    children: { control: 'text' },
  },
};

const actions = [
  {
    onClick: action('Button Click'),
    children: 'Add',
    icon: CirclePlus,
  },
  {
    onClick: action('Button Click'),
    children: 'Edit',
    icon: PenStroke,
  },
  { type: 'divider' },
  {
    onClick: action('Button Click'),
    children: 'Delete',
    icon: Bin,
    destructive: true,
  },
];

export const Base = (args: PopoverProps): JSXElement => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Popover
      {...args}
      isOpen={isOpen}
      toggleOpen={handleClick}
      component={(props) => (
        <Button size="kilo" variant="primary" {...props}>
          Open popover
        </Button>
      )}
    />
  );
};

Base.args = {
  actions,
};
