/**
 * Copyright 2024, SumUp Ltd.
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

import type { CompactProps } from './Compact.js';

import { Compact } from './index.js';

const content =
  'An electronic circuit is composed of individual electronic components, such as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires or traces through which electric current can flow.';

export default {
  title: 'Typography/Compact',
  component: Compact,
  argTypes: {
    as: { control: 'text' },
  },
};

export const Base = (args: CompactProps) => (
  <Compact {...args}>{content}</Compact>
);

const sizes = ['l', 'm', 's'] as const;

export const Sizes = (args: CompactProps) =>
  sizes.map((size) => (
    <Compact key={size} {...args} size={size}>
      This is size {size}. {content}
    </Compact>
  ));

const weights = ['regular', 'bold'] as const;

export const Weights = (args: CompactProps) =>
  weights.map((weight) => (
    <Compact key={weight} {...args} weight={weight}>
      This is the {weight} weight. {content}
    </Compact>
  ));

const colors = [
  'normal',
  'subtle',
  'placeholder',
  'on-strong',
  'on-strong-subtle',
  'accent',
  'success',
  'warning',
  'danger',
  'promo',
] as const;

export const Colors = (args: CompactProps) =>
  colors.map((color) => (
    <Compact
      key={color}
      {...args}
      color={color}
      style={
        color.includes('on-strong')
          ? { background: 'var(--cui-bg-strong)' }
          : {}
      }
    >
      This is the {color} color. {content}
    </Compact>
  ));
