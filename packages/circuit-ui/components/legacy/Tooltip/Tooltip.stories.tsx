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

import { Stack } from '../../../../../.storybook/components/index.js';
import styled from '../../../styles/styled.js';

import { Tooltip, TooltipProps } from './Tooltip.js';

export default {
  title: 'Components/Tooltip/Legacy',
  component: Tooltip,
};

const TooltipContainer = styled('div')`
  position: relative;
  line-height: 0;
  margin: 1rem;

  div {
    visibility: visible;
    opacity: 1;
  }
`;

export const Base = (args: TooltipProps) => (
  <Stack>
    <TooltipContainer>
      <Tooltip {...args}>I am a teeny, tiny tooltip.</Tooltip>
      <Info size="16" />
    </TooltipContainer>
  </Stack>
);

Base.args = {
  position: 'right',
  align: 'center',
};

export const Positions = () => (
  <Stack>
    <TooltipContainer>
      <Tooltip position="left" align="center">
        Left center
      </Tooltip>
      <Info size="16" />
    </TooltipContainer>
    <TooltipContainer>
      <Tooltip position="top" align="left">
        Top left
      </Tooltip>
      <Info size="16" />
    </TooltipContainer>
    <TooltipContainer>
      <Tooltip position="bottom" align="right">
        Bottom right
      </Tooltip>
      <Info size="16" />
    </TooltipContainer>
  </Stack>
);
