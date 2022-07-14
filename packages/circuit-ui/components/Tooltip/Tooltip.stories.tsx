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

import React from 'react';
import styled from '@emotion/styled';
import { Info } from '@sumup/icons';

import docs from './Tooltip.docs.mdx';
import { Tooltip, TooltipProps } from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: { page: docs },
  },
};

const TooltipContainer = styled('div')`
  display: flex;
  height: 200px;
  align-items: center;
  justify-content: center;
`;

const baseArgs: Partial<TooltipProps> = {
  text: 'I am a teeny, tiny tooltip.',
  placement: 'bottom',
};

export const Base = (args: TooltipProps) => (
  <TooltipContainer>
    <Tooltip {...args}>
      <Info size="16" style={{ width: 'auto' }} />
    </Tooltip>
  </TooltipContainer>
);

Base.args = baseArgs;

export const Top = (args) => (
  <TooltipContainer>
    <Tooltip {...args}>
      <Info size="16" style={{ width: 'auto' }} />
    </Tooltip>
  </TooltipContainer>
);

Top.args = { ...baseArgs, placement: 'top' };

export const Bottom = (args) => (
  <TooltipContainer>
    <Tooltip {...args}>
      <Info size="16" style={{ width: 'auto' }} />
    </Tooltip>
  </TooltipContainer>
);

Bottom.args = { ...baseArgs, placement: 'bottom' };

export const Left = (args) => (
  <TooltipContainer>
    <Tooltip {...args}>
      <Info size="16" style={{ width: 'auto' }} />
    </Tooltip>
  </TooltipContainer>
);

Left.args = { ...baseArgs, placement: 'left' };

export const Right = (args) => (
  <TooltipContainer>
    <Tooltip {...args}>
      <Info size="16" style={{ width: 'auto' }} />
    </Tooltip>
  </TooltipContainer>
);

Right.args = { ...baseArgs, placement: 'right' };
