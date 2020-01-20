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
import { select, boolean, text } from '@storybook/addon-knobs/react';

import Heading from './Heading';
import docs from './Heading.docs.mdx';

const elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const sizes = [
  Heading.ZETTA,
  Heading.EXA,
  Heading.PETA,
  Heading.TERA,
  Heading.GIGA,
  Heading.MEGA,
  Heading.KILO
];

export default {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    docs: { page: docs },
    jest: ['Heading']
  }
};

export const base = () => (
  <Heading
    as={select('Element', elements, elements[0])}
    size={select('Size', sizes, sizes[0])}
    noMargin={boolean('No margin', false)}
  >
    {text('Text', 'This is a heading')}
  </Heading>
);

export const size = () =>
  sizes.map(s => (
    <Heading key={s} size={s}>
      This is a {s} heading
    </Heading>
  ));
