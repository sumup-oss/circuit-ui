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

import type { NumeralProps } from './Numeral.js';

import { Numeral } from './index.js';

const content = '$ 1,009.95';

export default {
  title: 'Typography/Numeral',
  component: Numeral,
  tags: ['status:stable'],
  argTypes: {
    as: { control: 'text' },
  },
};

export const Base = (args: NumeralProps) => (
  <Numeral {...args}>{content}</Numeral>
);

const sizes = ['l', 'm', 's'] as const;

export const Sizes = (args: NumeralProps) =>
  sizes.map((size) => (
    <Numeral key={size} {...args} size={size}>
      {content} in size {size}
    </Numeral>
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

export const Colors = (args: NumeralProps) =>
  colors.map((color) => (
    <Numeral
      key={color}
      {...args}
      color={color}
      style={
        color.includes('on-strong')
          ? { background: 'var(--cui-bg-strong)' }
          : {}
      }
    >
      {content} in the {color} color.
    </Numeral>
  ));
