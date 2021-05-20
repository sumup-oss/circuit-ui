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

import React, { useState } from 'react';
import { Zap } from '@sumup/icons';

import Button from '../Button';

import { Popover, PopoverItem } from './Popover';

export default {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    children: { control: 'text' },
  },
};

export const Base = (args) => <PopoverItem {...args} />;

Base.args = {
  onClick: () => alert('Hello'),
  href: 'https://sumup.com/',
  children: 'Label',
  icon: Zap,
};

export const Example = (args) => {
  const [isOpen, setOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null,
  );

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    console.log('Work please');
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button onClick={handleClick} ref={setReferenceElement}>
        Show popover
      </Button>
      <Popover
        handleClose={handleClose}
        {...args}
        isOpen={isOpen}
        referenceElement={referenceElement}
      />
    </>
  );
};

Example.args = {
  actions: [
    {
      onClick: () => alert('Hello'),
      href: 'https://sumup.com/',
      children: 'Label',
      icon: Zap,
    },
    {
      onClick: () => alert('Hello'),
      href: 'https://sumup.com/',
      children: 'Label',
      icon: Zap,
    },
    {
      onClick: () => alert('Hello'),
      children: 'Label',
      icon: Zap,
    },
    { type: 'divider' },
  ],
};
