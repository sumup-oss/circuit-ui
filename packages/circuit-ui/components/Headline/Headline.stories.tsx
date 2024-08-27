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

import { Headline, type HeadlineProps } from './Headline.js';

export default {
  title: 'Typography/Headline',
  component: Headline,
};

export const Base = (args: HeadlineProps) => (
  <Headline {...args}>This is a headline</Headline>
);

Base.args = {
  as: 'h2',
};

const sizes = ['l', 'm', 's'] as const;

export const Sizes = (args: HeadlineProps) =>
  sizes.map((size) => (
    <Headline key={size} {...args} size={size}>
      This is size {size}
    </Headline>
  ));

Sizes.args = {
  as: 'h2',
};
