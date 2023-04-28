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

import { Selector, SelectorProps } from './Selector';

export default {
  title: 'Forms/Selector',
  component: Selector,
  subcomponents: { SelectorGroup },
};

const baseArgs = {
  value: 'default',
};

export const Base = (args: SelectorProps) => <Selector {...args} />;

Base.args = {
  ...baseArgs,
  name: 'base',
  label: 'Select me!',
};

export const Selected = (args: SelectorProps) => <Selector {...args} />;

Selected.args = {
  ...baseArgs,
  name: 'selected',
  label: 'I am selected!',
  checked: true,
};

export const Disabled = (args: SelectorProps) => <Selector {...args} />;

Disabled.args = {
  ...baseArgs,
  name: 'disabled',
  label: 'I cannot be selected',
  disabled: true,
};

export const Sizes = (args: SelectorProps) => (
  <Stack>
    <Selector {...args} label="Kilo" size="kilo" />
    <Selector {...args} label="Mega" size="mega" />
    <Selector
      {...args}
      label="Flexible"
      description="I adapt my width"
      size="flexible"
    />
  </Stack>
);

Sizes.args = { ...baseArgs, name: 'sizes' };
