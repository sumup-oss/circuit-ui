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

import Tooltip from './Tooltip';

const DummyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-eye"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const TooltipContainer = styled('div')`
  position: relative;
  line-height: 0;

  div {
    visibility: visible;
    opacity: 1;
  }
`;

export default {
  title: 'Components|Tooltip',

  parameters: {
    component: Tooltip,
    jest: ['Tooltip']
  }
};

export const topLeft = () => (
  <TooltipContainer>
    <Tooltip position={Tooltip.TOP} align={Tooltip.LEFT}>
      I am a teeny, tiny tooltip.
    </Tooltip>
    <DummyIcon />
  </TooltipContainer>
);

topLeft.story = {
  name: 'Top left'
};

export const rightCenter = () => (
  <TooltipContainer>
    <Tooltip position={Tooltip.RIGHT} align={Tooltip.CENTER}>
      I am a teeny, tiny tooltip.
    </Tooltip>
    <DummyIcon />
  </TooltipContainer>
);

rightCenter.story = {
  name: 'Right center'
};

export const bottomRight = () => (
  <TooltipContainer>
    <Tooltip position={Tooltip.BOTTOM} align={Tooltip.RIGHT}>
      I am a teeny, tiny tooltip.
    </Tooltip>
    <DummyIcon />
  </TooltipContainer>
);

bottomRight.story = {
  name: 'Bottom right'
};

export const leftCenter = () => (
  <TooltipContainer>
    <Tooltip position={Tooltip.LEFT} align={Tooltip.CENTER}>
      I am a teeny, tiny tooltip.
    </Tooltip>
    <DummyIcon />
  </TooltipContainer>
);

leftCenter.story = {
  name: 'Left center'
};
