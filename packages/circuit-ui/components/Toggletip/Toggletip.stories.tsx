/**
 * Copyright 2024, SumUp Ltd.
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

import { forwardRef, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { userEvent, within } from '@storybook/test';
import { Info } from '@sumup/icons';

import Button from '../Button/index.js';

import {
  Toggletip,
  type ToggletipProps,
  type ToggletipReferenceProps,
} from './Toggletip.js';

export default {
  title: 'Components/Toggletip',
  component: Toggletip,
};

const Reference = forwardRef<HTMLButtonElement, ToggletipReferenceProps>(
  (props, ref) => (
    <Button {...props} ref={ref} icon={Info}>
      Info
    </Button>
  ),
);

const showToggletip = async ({
  canvasElement,
}: {
  canvasElement: HTMLCanvasElement;
}) => {
  const canvas = within(canvasElement);
  const referenceEl = canvas.getByRole('button');

  await userEvent.click(referenceEl);
};

export const Base = (args: ToggletipProps) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Toggletip
      {...args}
      isOpen={isOpen}
      onToggle={setOpen}
      component={Reference}
    />
  );
};

Base.args = {
  headline: 'Tutorial',
  body: "We'll show you how to use this exiting new feature.",
  action: {
    children: 'Start tour',
    onClick: action('Start tour'),
  },
};

Base.play = showToggletip;
