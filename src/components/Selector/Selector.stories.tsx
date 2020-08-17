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

import SelectorGroup from '../SelectorGroup';

import docs from './Selector.docs.mdx';
import { Selector, SelectorProps } from './Selector';

export default {
  title: 'Forms/Selector',
  component: Selector,
  subcomponents: { SelectorGroup },
  parameters: {
    docs: { page: docs },
  },
};

const baseArgs = {
  name: 'selector',
  value: 'default',
};

export const Base = (args: SelectorProps) => (
  <Selector {...args}>Select me!</Selector>
);

Base.args = baseArgs;

export const Selected = (args: SelectorProps) => (
  <Selector {...args}>I am selected!</Selector>
);

Selected.args = { ...baseArgs, checked: true };

export const Disabled = (args: SelectorProps) => (
  <Selector {...args}>I cannot be selected</Selector>
);

Disabled.args = { ...baseArgs, disabled: true };
