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
import { Add, Edit, Delete } from '@sumup-oss/icons';
import { useState, type ReactNode } from 'react';

import { Button } from '../Button/index.js';

import { type Action, Popover, type PopoverProps } from './Popover.js';

export default {
  title: 'Components/Popover',
  component: Popover,
  tags: ['status:stable'],
  argTypes: {
    children: { control: 'text' },
  },
};

const actions: Action[] = [
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

function PopoverWrapper({ children }: { children: ReactNode }) {
  return <div style={{ width: 200, height: 250 }}>{children}</div>;
}

const popoverContent = 'Hello 👋';

export const Base = (args: PopoverProps) => {
  const [isOpen, setOpen] = useState(true);

  return (
    <PopoverWrapper>
      <Popover
        {...args}
        isOpen={isOpen}
        fallbackPlacements={['bottom']}
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
  children: popoverContent,
};

export const WithActions = (args: PopoverProps) => {
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

WithActions.args = {
  actions,
};

export const Offset = (args: PopoverProps) => {
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
