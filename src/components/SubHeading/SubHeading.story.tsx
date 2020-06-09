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
import { select, boolean, text } from '@storybook/addon-knobs';

import { SubHeading } from './SubHeading';
import docs from './SubHeading.docs.mdx';

const elements = ['h2', 'h3', 'h4', 'h5', 'h6'];
const sizes = ['mega', 'kilo'] as const;

export default {
  title: 'Typography/SubHeading',
  component: SubHeading,
  parameters: {
    docs: { page: docs },
    jest: ['SubHeading']
  }
};

export const base = () => (
  <SubHeading
    as={select('Element', elements, elements[0])}
    size={select('Size', sizes, sizes[0])}
    noMargin={boolean('No margin', false)}
  >
    {text('Text', 'This is a subheading')}
  </SubHeading>
);

export const size = () =>
  sizes.map(s => (
    <SubHeading key={s} size={s}>
      This is a {s} subheading.
    </SubHeading>
  ));
