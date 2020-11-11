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

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { findByText, fireEvent, getByText } from '@testing-library/dom';

import Button from '../Button';
import Card from '../Card';

import Popover from './Popover';

const interactionTasks = [
  {
    name: 'Open popover',
    description:
      'Click the popover and wait until the popover content is shown.',
    run: async ({ container }) => {
      fireEvent.click(getByText(container, 'Show'));
      await findByText(container, 'Popover Content', undefined, {
        timeout: 20000,
      });
    },
  },
];

export default {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    performance: {
      interactions: interactionTasks,
    },
  },
};

export const Base = (args) => {
  const [open, setOpen] = useState(false);

  const { closeOnButtonClick, ...props } = args;

  return (
    <Popover
      isOpen={open}
      {...props}
      renderPopover={() => <Card>Popover Content</Card>}
      renderReference={() => (
        <Button size="kilo" onClick={() => setOpen((prev) => !prev)}>
          {open ? 'Hide' : 'Show'}
        </Button>
      )}
      onReferenceClickClose={() => {
        if (closeOnButtonClick) {
          setOpen(false);
        }
      }}
      onOutsideClickClose={() => setOpen(false)}
    />
  );
};

Base.args = {
  position: 'bottom',
  align: 'start',
  closeOnButtonClick: false,
};
