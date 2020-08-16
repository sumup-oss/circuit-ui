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

import { Heading, HeadingProps } from './Heading';
import docs from './Heading.docs.mdx';

export default {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    docs: { page: docs },
  },
};

export const Base = (args: HeadingProps) => (
  <Heading {...args}>This is a heading</Heading>
);

const sizes = ['zetta', 'exa', 'peta', 'tera', 'giga', 'mega', 'kilo'] as const;

export const Sizes = (args: HeadingProps) =>
  sizes.map((s) => (
    <Heading key={s} {...args} size={s}>
      This is a {s} heading
    </Heading>
  ));
