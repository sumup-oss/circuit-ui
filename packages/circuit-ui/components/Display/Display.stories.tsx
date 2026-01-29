/**
 * Copyright 2021, SumUp Ltd.
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

import { Display, type DisplayProps } from './Display.jsx';

export default {
  title: 'Typography/Display',
  component: Display,
  tags: ['status:stable'],
};

export const Base = (args: DisplayProps) => (
  <Display {...args}>This is a Display</Display>
);

Base.args = {
  as: 'h1',
};

const sizes = ['l', 'm', 's'] as const;

export const Sizes = (args: DisplayProps) =>
  sizes.map((size) => (
    <Display key={size} {...args} size={size}>
      This is size {size}
    </Display>
  ));

Sizes.args = {
  as: 'h1',
};
