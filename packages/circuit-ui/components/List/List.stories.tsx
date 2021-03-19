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

import docs from './List.docs.mdx';
import { List, ListProps } from './List';

export default {
  title: 'Typography/List',
  component: List,
  parameters: {
    docs: { page: docs },
  },
};

const ListItems = () => (
  <>
    <li>This is a list</li>
    <li>A very fine list</li>
  </>
);

export const Base = (args: ListProps) => (
  <List {...args} noMargin>
    <ListItems />
  </List>
);

const variants = ['unordered', 'ordered'] as const;

export const Variants = (args: ListProps) =>
  variants.map((variant) => (
    <List key={variant} {...args} variant={variant} noMargin>
      <ListItems />
    </List>
  ));

const sizes = ['kilo', 'mega', 'giga'] as const;

export const Sizes = (args: ListProps) =>
  sizes.map((size) => (
    <List key={size} {...args} size={size} noMargin>
      <ListItems />
    </List>
  ));

export const Nested = (args: ListProps) => (
  <List {...args} noMargin>
    <ListItems />
    <List {...args}>
      <li>Sometimes a nested list</li>
    </List>
  </List>
);
