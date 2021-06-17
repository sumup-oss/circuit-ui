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
  const [isOpen, setOpen] = useState(false);
  const referenceElement = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        size="kilo"
        variant="tertiary"
        onClick={handleClick}
        ref={referenceElement}
        icon={ThumbUp}
      >
        Button
      </Button>
      <Popover
        {...args}
        onClose={onClose}
        isOpen={isOpen}
        referenceElement={referenceElement}
      />
    </>
  );
};

PopoverBase.args = {
  actions: [
    {
      onClick: () => alert('Hello'),
      href: '',
      children: 'Label',
      icon: Zap,
    },
    {
      onClick: () => alert('Hello'),
      href: 'https://sumup.com/',
      children: 'Label',
      icon: Zap,
    },
    { type: 'divider' },
    {
      onClick: () => alert('Hello'),
      children: 'Label',
      icon: Zap,
      destructive: true,
    },
  ],
};

export const PopoverIconTrigger = (args) => {
  const [isOpen, setOpen] = useState(false);
  const referenceElement = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

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
        ref={referenceElement}
      >
        <More />
      </IconButton>
      <Popover
        {...args}
        onClose={onClose}
        isOpen={isOpen}
        referenceElement={referenceElement}
      />
    </>
  );
};

PopoverIconTrigger.args = {
  actions: [
    {
      onClick: () => alert('Hello'),
      href: '',
      children: 'Add',
      icon: CirclePlus,
    },
    {
      onClick: () => alert('Hello'),
      href: 'https://sumup.com/',
      children: 'Edit',
      icon: PenStroke,
    },
    {
      onClick: () => alert('Hello'),
      href: 'https://sumup.com/',
      children: 'Upload',
      icon: Share,
    },
    { type: 'divider' },
    {
      onClick: () => alert('Hello'),
      children: 'Delete',
      icon: Bin,
      destructive: true,
    },
  ],
};

export const PopoverItemBase = (args) => <PopoverItem {...args} />;

PopoverItemBase.args = {
  onClick: () => alert('Hello'),
  href: 'https://sumup.com/',
  children: 'Label',
  icon: Zap,
};
