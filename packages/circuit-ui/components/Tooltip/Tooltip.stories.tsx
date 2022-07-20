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

import { Info } from '@sumup/icons';
import { Meta } from '@storybook/react';

import styled from '../../styles/styled';

import docs from './Tooltip.docs.mdx';
import { Tooltip, TooltipProps } from './Tooltip';

const TooltipContainer = styled('div')`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;

const storyMeta: Meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: { page: docs },
  },
  decorators: [
    (Story) => (
      <TooltipContainer>
        <Story />
      </TooltipContainer>
    ),
  ],
};

export default storyMeta;

const baseArgs: TooltipProps = {
  label: 'I am a teeny, tiny tooltip.',
  placement: 'bottom',
};

export const Base = (args) => (
  <Tooltip {...args}>
    <Info size="16" />
  </Tooltip>
);

Base.args = baseArgs;

export const Top = (args) => (
  <Tooltip {...args}>
    <Info size="16" />
  </Tooltip>
);

Top.args = { ...baseArgs, placement: 'top' };

export const Bottom = (args) => (
  <Tooltip {...args}>
    <Info size="16" />
  </Tooltip>
);

Bottom.args = { ...baseArgs, placement: 'bottom' };

export const Left = (args) => (
  <Tooltip {...args}>
    <Info size="16" />
  </Tooltip>
);

Left.args = { ...baseArgs, placement: 'left' };

export const Right = (args) => (
  <Tooltip {...args}>
    <Info size="16" />
  </Tooltip>
);

Right.args = { ...baseArgs, placement: 'right' };
