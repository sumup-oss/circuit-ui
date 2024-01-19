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

import { forwardRef } from 'react';
import { within, userEvent } from '@storybook/testing-library';

import Button from '../Button/index.js';

import { Tooltip, TooltipProps, TooltipReferenceProps } from './Tooltip.js';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    // Account for the Tooltip's transition-delay
    chromatic: { delay: 700 },
  },
};

const Reference = forwardRef<HTMLButtonElement, TooltipReferenceProps>(
  (props, ref) => (
    <Button {...props} ref={ref} size="s" disabled>
      Submit
    </Button>
  ),
);

export const Base = (args: TooltipProps) => (
  <Tooltip {...args} component={Reference} />
);

Base.args = {
  label: 'Please fill out all fields',
};

Base.play = async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
  const canvas = within(canvasElement);
  const reference = canvas.getByRole('button');

  await userEvent.hover(reference);
};
