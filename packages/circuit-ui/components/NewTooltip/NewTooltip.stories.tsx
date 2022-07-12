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

import docs from './NewTooltip.docs.mdx';
import { NewTooltip as Tooltip, TooltipProps } from './NewTooltip';

export default {
  title: 'Components/NewTooltip',
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

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const baseArgs: TooltipProps = {
  text: 'I am a teeny, tiny tooltip.',
  placement: 'bottom',
  component: () => (
    <Button>
      <Info size="16" style={{ width: 'auto' }} />
    </Button>
  ),
};

export const Base = (args: TooltipProps) => (
  <TooltipContainer>
    <Tooltip {...args} />
  </TooltipContainer>
);

Base.args = baseArgs;

export const Top = (args) => (
  <TooltipContainer>
    <Tooltip {...args} />
  </TooltipContainer>
);

Top.args = { ...baseArgs, placement: 'top' };

export const Bottom = (args) => (
  <TooltipContainer>
    <Tooltip {...args} />
  </TooltipContainer>
);

Bottom.args = { ...baseArgs, placement: 'bottom' };

export const Left = (args) => (
  <TooltipContainer>
    <Tooltip {...args} />
  </TooltipContainer>
);

Left.args = { ...baseArgs, placement: 'left' };

export const Right = (args) => (
  <TooltipContainer>
    <Tooltip {...args} />
  </TooltipContainer>
);

Right.args = { ...baseArgs, placement: 'right' };
