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
import { userEvent } from '@storybook/test';
import { TransferOut, UploadCloud } from '@sumup/icons';

import { Stack } from '../../../../.storybook/components/index.js';
import Button, { IconButton } from '../Button/index.js';

import { Tooltip, TooltipProps, TooltipReferenceProps } from './Tooltip.js';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    // Account for the Tooltip's transition-delay
    chromatic: { delay: 700 },
  },
};

const descriptionProps = {
  label: 'This may take a few minutes',
  type: 'description',
  component: forwardRef<HTMLButtonElement, TooltipReferenceProps>(
    (props, ref) => (
      <Button {...props} icon={UploadCloud} ref={ref}>
        Upload
      </Button>
    ),
  ),
} as const;

const showTooltip = async () => {
  await userEvent.tab();
};

export const Base = (args: TooltipProps) => (
  <Stack>
    <Tooltip {...args} />
  </Stack>
);

Base.args = descriptionProps;
Base.play = showTooltip;

export const Types = (args: TooltipProps) => (
  <Stack>
    {/* The IconButton uses the Tooltip component under the hood */}
    <IconButton icon={TransferOut}>Transfer out</IconButton>
    <Tooltip {...args} {...descriptionProps} />
  </Stack>
);

Types.play = showTooltip;

export const Placements = (args: TooltipProps) => (
  <Stack>
    <Tooltip {...args} {...descriptionProps} placement="left" />
    <Tooltip {...args} {...descriptionProps} placement="bottom-start" />
    <Tooltip {...args} {...descriptionProps} placement="right-end" />
  </Stack>
);

Placements.play = showTooltip;
