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

import { SubHeading, SubHeadingProps } from './SubHeading';
import docs from './SubHeading.docs.mdx';

export default {
  title: 'Typography/SubHeading',
  component: SubHeading,
  parameters: {
    docs: { page: docs },
  },
};

export const Base = (args: SubHeadingProps) => (
  <SubHeading {...args}>This is a subheading</SubHeading>
);

const sizes = ['mega', 'kilo'] as const;

export const Sizes = (args: SubHeadingProps) =>
  sizes.map((s) => (
    <SubHeading key={s} {...args} size={s}>
      This is a {s} subheading.
    </SubHeading>
  ));
