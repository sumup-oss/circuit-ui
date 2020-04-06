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
import { select, boolean } from '@storybook/addon-knobs';

import Text from '.';
import docs from './Text.docs.mdx';

const elements = ['p', 'article', 'div', 'span', 'strong', 'em'];
const sizes = [Text.KILO, Text.MEGA, Text.GIGA];

const content =
  'An electronic circuit is composed of individual electronic components, such as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires or traces through which electric current can flow.';

export default {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    docs: { page: docs },
    jest: ['Text']
  }
};

export const base = () => (
  <Text
    as={select('Element', elements, elements[0])}
    size={select('Size', sizes, sizes[0])}
    noMargin={boolean('No margin')}
    bold={boolean('Bold')}
    italic={boolean('Italic')}
    strike={boolean('Strike through')}
  >
    {content}
  </Text>
);

export const size = () =>
  sizes.map(s => (
    <Text key={s} size={s}>
      This is a {s} text. {content}
    </Text>
  ));

export const bold = () => <Text bold>{content}</Text>;

export const italic = () => <Text italic>{content}</Text>;

export const strike = () => <Text strike>{content}</Text>;

export const customElement = () => <Text as="span">{content}</Text>;
