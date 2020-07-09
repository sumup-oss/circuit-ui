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
import { select, boolean } from '@storybook/addon-knobs/react';

import Button from '../Button';
import Card from '../Card';

import Popover from './Popover';

const positions = ['top', 'bottom', 'left', 'right'];
const alignments = ['start', 'end', 'center'];

export default {
  title: 'Components/Popover',
  component: Popover,
};

const PopoverWithState = (props) => {
  const [open, setOpen] = useState(false);

  const { closeOnButtonClick, ...restProps } = props;

  return (
    <Popover
      isOpen={open}
      {...restProps}
      renderPopover={() => <Card>Popover Content</Card>}
      renderReference={() => (
        <Button size="kilo" onClick={() => setOpen((prev) => !prev)}>
          {open ? 'Hide' : 'Show'}
        </Button>
      )}
      onReferenceClickClose={() => closeOnButtonClick && setOpen(false)}
      onOutsideClickClose={() => setOpen(false)}
    />
  );
};

export const base = () => (
  <PopoverWithState
    position={select('position', positions, 'bottom')}
    align={select('align', alignments, 'start')}
    closeOnButtonClick={boolean('closeOnButton', false)}
  />
);
