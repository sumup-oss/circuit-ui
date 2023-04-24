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

import { Fragment } from 'react';

import Body from '../Body/index.js';
import { spacing } from '../../styles/style-mixins.js';

import { List, ListProps } from './List.jsx';

export default {
  title: 'Typography/List',
  component: List,
};

const ListItems = () => (
  <Fragment>
    <li>This is a list</li>
    <li>A very fine list</li>
  </Fragment>
);

export const Base = (args: ListProps) => (
  <List {...args}>
    <ListItems />
  </List>
);

const variants: ListProps['variant'][] = ['unordered', 'ordered'];

export const Variants = (args: ListProps) =>
  variants.map((variant) => (
    <List
      key={variant}
      {...args}
      variant={variant}
      css={spacing({ bottom: 'giga' })}
    >
      <ListItems />
    </List>
  ));

const sizes: ListProps['size'][] = ['one', 'two'];

export const Sizes = (args: ListProps) =>
  sizes.map((size) => (
    <>
      <Body size={size} css={spacing({ bottom: 'mega' })}>
        Use List size {size} with Body {size} text.
      </Body>
      <List key={size} {...args} size={size} css={spacing({ bottom: 'giga' })}>
        <ListItems />
      </List>
    </>
  ));

export const Nested = (args: ListProps) => (
  <List {...args}>
    <li>
      This is a list
      <List {...args}>
        <li>Sometimes a nested list</li>
      </List>
    </li>
    <li>And the list goes on</li>
  </List>
);
