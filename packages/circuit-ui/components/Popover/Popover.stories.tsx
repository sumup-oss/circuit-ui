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

import React, { useState, useRef } from 'react';
import { action } from '@storybook/addon-actions';
import {
  More,
  ThumbUp,
  Zap,
  CirclePlus,
  PenStroke,
  Share,
  Bin,
} from '@sumup/icons';

import Button from '../Button';
import IconButton from '../IconButton';

import { Popover, PopoverItem } from './Popover';
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
export const PopoverBase = (args) => {
  const triggerRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  return (
    <>
      <Button size="kilo" variant="primary" ref={triggerRef} icon={ThumbUp}>
        Button
      </Button>
      <Popover {...args} isOpen={true} triggerRef={triggerRef} />
    </>
  );
};

PopoverBase.args = {
  actions: [
    {
      onClick: action('Button Click'),
      href: '',
      children: 'Label',
      icon: Zap,
    },
    {
      onClick: action('Button Click'),
      href: 'https://sumup.com/',
      children: 'Label',
      icon: Zap,
    },
    { type: 'divider' },
    {
      onClick: action('Button Click'),
      children: 'Label',
      icon: Zap,
      destructive: true,
    },
  ],
};

export const PopoverInteractive = (args) => {
  const [isOpen, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        size="kilo"
        onClick={handleClick}
        label="IconButton"
        ref={triggerRef}
      >
        <More />
      </IconButton>
      <Popover
        {...args}
        onClose={onClose}
        isOpen={isOpen}
        triggerRef={triggerRef}
      />
    </>
  );
};

PopoverInteractive.args = {
  actions: [
    {
      onClick: action('Button Click'),
      href: '',
      children: 'Add',
      icon: CirclePlus,
    },
    {
      onClick: action('Button Click'),
      href: 'https://sumup.com/',
      children: 'Edit',
      icon: PenStroke,
    },
    {
      onClick: action('Button Click'),
      href: 'https://sumup.com/',
      children: 'Upload',
      icon: Share,
    },
    { type: 'divider' },
    {
      onClick: action('Button Click'),
      children: 'Delete',
      icon: Bin,
      destructive: true,
    },
  ],
};

export const PopoverItemBase = (args) => <PopoverItem {...args} />;

PopoverItemBase.args = {
  onClick: action('Button Click'),
  href: 'https://sumup.com/',
  children: 'Label',
  icon: Zap,
};
