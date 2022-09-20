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

import { Stack } from '../../../../.storybook/components';
import SelectorGroup from '../SelectorGroup';
import Body from '../Body';

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
  value: 'default',
};

export const Base = (args: SelectorProps) => (
  <Selector {...args}>Select me!</Selector>
);

Base.args = {
  ...baseArgs,
  name: 'base',
};

export const Selected = (args: SelectorProps) => (
  <Selector {...args}>I am selected!</Selector>
);

Selected.args = {
  ...baseArgs,
  name: 'selected',
  checked: true,
};

export const Disabled = (args: SelectorProps) => (
  <Selector {...args}>I cannot be selected</Selector>
);

Disabled.args = {
  ...baseArgs,
  name: 'disabled',
  disabled: true,
};

export const Sizes = (args: SelectorProps) => (
  <Stack>
    <Selector {...args} size="kilo">
      Kilo
    </Selector>
    <Selector {...args} size="mega">
      Mega
    </Selector>
    <Selector {...args} size="flexible">
      <Body variant="highlight">Flexible</Body>
      <Body>Hello World!</Body>
    </Selector>
  </Stack>
);

Sizes.args = { ...baseArgs, name: 'sizes' };
