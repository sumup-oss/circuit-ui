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
import { CircleInfo } from '@sumup/icons';

import docs from './Tooltip.docs.mdx';
import Tooltip from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: { page: docs },
  },
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

const TooltipWithContainer = (props) => (
  <TooltipContainer>
    <Tooltip {...props}>I am a teeny, tiny tooltip.</Tooltip>
    <CircleInfo />
  </TooltipContainer>
);

export const base = () => (
  <TooltipWithContainer position={'right'} align={'center'} />
);

export const topLeft = () => (
  <TooltipWithContainer position={'top'} align={'left'} />
);

export const bottomRight = () => (
  <TooltipWithContainer position={'bottom'} align={'right'} />
);

export const leftCenter = () => (
  <TooltipWithContainer position={'left'} align={'center'} />
);
