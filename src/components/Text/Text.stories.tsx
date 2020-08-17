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

import docs from './Text.docs.mdx';
import { TextProps } from './Text';

import Text from '.';

const content =
  'An electronic circuit is composed of individual electronic components, such as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires or traces through which electric current can flow.';

export default {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    docs: { page: docs },
  },
};

export const Base = (args: TextProps) => <Text {...args}>{content}</Text>;

const sizes = ['kilo', 'mega', 'giga'] as const;

export const Sizes = (args: TextProps) =>
  sizes.map((s) => (
    <Text key={s} {...args} size={s}>
      This is a {s} text. {content}
    </Text>
  ));

export const Bold = (args: TextProps) => (
  <Text {...args} as="strong" bold>
    {content}
  </Text>
);

export const Italic = (args: TextProps) => (
  <Text {...args} as="em" italic>
    {content}
  </Text>
);

export const Strike = (args: TextProps) => (
  <Text {...args} as="s" strike>
    {content}
  </Text>
);
