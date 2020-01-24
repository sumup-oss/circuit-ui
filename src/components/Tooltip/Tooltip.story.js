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

import docs from './Tooltip.docs.mdx';
import Tooltip from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: { page: docs },
    jest: ['Tooltip']
  }
};

const Icon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const TooltipContainer = styled('div')`
  position: relative;
  line-height: 0;
  margin: 1rem;

  div {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipWithContainer = props => (
  <TooltipContainer>
    <Tooltip {...props}>I am a teeny, tiny tooltip.</Tooltip>
    <Icon />
  </TooltipContainer>
);

export const base = () => (
  <TooltipWithContainer position={Tooltip.RIGHT} align={Tooltip.CENTER} />
);

export const topLeft = () => (
  <TooltipWithContainer position={Tooltip.TOP} align={Tooltip.LEFT} />
);

export const bottomRight = () => (
  <TooltipWithContainer position={Tooltip.BOTTOM} align={Tooltip.RIGHT} />
);

export const leftCenter = () => (
  <TooltipWithContainer position={Tooltip.LEFT} align={Tooltip.CENTER} />
);
