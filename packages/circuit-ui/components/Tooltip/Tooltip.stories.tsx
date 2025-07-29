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

import { userEvent } from 'storybook/test';
import { TransferOut, UploadCloud } from '@sumup-oss/icons';

import { Stack } from '../../../../.storybook/components/index.js';
import { Button, IconButton } from '../Button/index.js';

import {
  Tooltip,
  type TooltipProps,
  type TooltipReferenceProps,
} from './Tooltip.js';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['status:stable'],
  parameters: {
    // Account for the Tooltip's transition-delay
    chromatic: { delay: 700 },
  },
};

const descriptionProps = {
  label: 'This may take a few minutes',
  type: 'description',
  component: (props: TooltipReferenceProps) => (
    <Button {...props} icon={UploadCloud}>
      Upload
    </Button>
  ),
} as const;

const showTooltip = async () => {
  await userEvent.tab();
};

export const Base = (args: TooltipProps) => (
  <Stack>
    <Tooltip
      {...args}
      component={(props) => (
        <Button {...props} icon={UploadCloud}>
          Upload
        </Button>
      )}
    />
  </Stack>
);

Base.args = {
  label: 'This may take a few minutes',
  type: 'description',
};
Base.play = showTooltip;

export const Types = (args: TooltipProps) => (
  <Stack>
    <Tooltip
      {...args}
      type="label"
      label="Transfer out"
      component={(props) => (
        <IconButton {...props} icon={TransferOut} title={undefined}>
          Transfer out
        </IconButton>
      )}
    />
    <Tooltip
      {...args}
      type="description"
      label="This may take a few minutes"
      component={(props) => (
        <Button {...props} icon={UploadCloud}>
          Upload
        </Button>
      )}
    />
  </Stack>
);

Types.play = showTooltip;

export const Placements = (args: TooltipProps) => (
  <Stack>
    <Tooltip {...args} placement="left" />
    <Tooltip {...args} placement="bottom-start" />
    <Tooltip {...args} placement="right-end" />
  </Stack>
);

Placements.args = descriptionProps;
Placements.play = showTooltip;
