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

import { BodyLarge } from '../BodyLarge/BodyLarge.js';

import type { BodyProps } from './Body.js';

import { Body } from './index.js';

const content =
  'An electronic circuit is composed of individual electronic components, such as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires or traces through which electric current can flow.';

export default {
  title: 'Typography/Body',
  component: Body,
  subcomponents: { BodyLarge },
  argTypes: {
    as: { control: 'text' },
  },
};

export const Base = (args: BodyProps) => <Body {...args}>{content}</Body>;

const sizes = ['l', 'm', 's'] as const;

export const Sizes = (args: BodyProps) =>
  sizes.map((size) => (
    <Body key={size} {...args} size={size}>
      This is size {size}. {content}
    </Body>
  ));

const weights = ['regular', 'semibold', 'bold'] as const;

export const Weights = (args: BodyProps) =>
  weights.map((weight) => (
    <Body key={weight} {...args} weight={weight}>
      This is the {weight} weight. {content}
    </Body>
  ));

const decorations = ['italic', 'strikethrough'] as const;

export const Decorations = (args: BodyProps) =>
  decorations.map((decoration) => (
    <Body key={decoration} {...args} decoration={decoration}>
      {content}
    </Body>
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

export const Colors = (args: BodyProps) =>
  colors.map((color) => (
    <Body
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
    </Body>
  ));

const variants = ['highlight', 'quote', 'confirm', 'alert', 'subtle'] as const;

export const Variants = (args: BodyProps) =>
  variants.map((variant) => (
    // eslint-disable-next-line @sumup-oss/circuit-ui/no-deprecated-props
    <Body key={variant} {...args} variant={variant}>
      This is a {variant} body
    </Body>
  ));
