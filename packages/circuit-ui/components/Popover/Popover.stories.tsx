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

import { action } from '@storybook/addon-actions';
import { Add, Edit, Delete } from '@sumup/icons';
import { useState, ReactNode } from 'react';

import Button from '../Button/index.js';

import { Popover, PopoverProps } from './Popover.js';

export default {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    children: { control: 'text' },
  },
};

const actions = [
  {
    onClick: action('Button Click'),
    children: 'Add',
    icon: Add,
  },
  {
    onClick: action('Button Click'),
    children: 'Edit',
    icon: Edit,
  },
  { type: 'divider' },
  {
    onClick: action('Button Click'),
    children: 'Delete',
    icon: Delete,
    destructive: true,
  },
];

// This wrapper is necessary because the Popover's floating element renders
// in a Portal, and Chromatic excludes it from screenshots by default.
function PopoverWrapper({ children }: { children: ReactNode }) {
  return <div style={{ width: 200, height: 250 }}>{children}</div>;
}

export const Base = (args: PopoverProps): JSX.Element => {
  const [isOpen, setOpen] = useState(true);

  return (
    <PopoverWrapper>
      <Popover
        {...args}
        isOpen={isOpen}
        onToggle={setOpen}
        component={(props) => (
          <Button size="s" variant="secondary" {...props}>
            Open popover
          </Button>
        )}
      />
    </PopoverWrapper>
  );
};

Base.args = {
  actions,
};

export const Offset = (args: PopoverProps): JSX.Element => {
  const [isOpen, setOpen] = useState(true);

  return (
    <PopoverWrapper>
      <Popover
        {...args}
        isOpen={isOpen}
        onToggle={setOpen}
        component={(props) => (
          <Button size="s" variant="secondary" {...props}>
            Open popover
          </Button>
        )}
      />
    </PopoverWrapper>
  );
};

Offset.args = {
  actions,
  offset: 20,
};
