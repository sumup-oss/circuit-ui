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
import List from './List';

const sizes = [List.KILO, List.MEGA, List.GIGA];

export default {
  title: 'Components/List',
  component: List,
  parameters: {
    docs: { page: docs },
    jest: ['List']
  }
};

const ListItems = () => (
  <>
    <li>This is a list</li>
    <li>A very fine list</li>
  </>
);

export const base = () => (
  <List
    size={select('Size', sizes, sizes[0])}
    ordered={boolean('Ordered', false)}
  >
    <ListItems />
  </List>
);

export const ordered = () => (
  <List size={select('Size', sizes, sizes[0])} ordered>
    <ListItems />
  </List>
);

export const size = () => (
  <>
    <List size={sizes[0]}>
      <ListItems />
    </List>
    <List size={sizes[1]}>
      <ListItems />
    </List>
    <List size={sizes[2]}>
      <ListItems />
    </List>
  </>
);

export const nested = () => (
  <List>
    <ListItems />
    <List>
      <li>Sometimes a nested list</li>
    </List>
  </List>
);
