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
import { boolean, select } from '@storybook/addon-knobs';

import docs from './List.docs.mdx';
import { List } from './List';

export default {
  title: 'Typography/List',
  component: List,
  parameters: {
    docs: { page: docs },
    jest: ['List']
  }
};

const sizes: ['kilo', 'mega', 'giga'] = ['kilo', 'mega', 'giga'];
const variants: ['unordered', 'ordered'] = ['unordered', 'ordered'];

const ListItems = () => (
  <>
    <li>This is a list</li>
    <li>A very fine list</li>
  </>
);

export const Base = () => (
  <List
    size={select('Size', sizes, 'mega')}
    variant={boolean('Ordered', false) ? 'ordered' : 'unordered'}
  >
    <ListItems />
  </List>
);

export const Variant = () =>
  variants.map(variant => (
    <List key={variant} variant={variant}>
      <ListItems />
    </List>
  ));

export const Size = () =>
  sizes.map(size => (
    <List key={size} size={size}>
      <ListItems />
    </List>
  ));

export const Nested = () => (
  <List>
    <ListItems />
    <List>
      <li>Sometimes a nested list</li>
    </List>
  </List>
);
