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
import { ThumbUp } from '@sumup/icons';

import docs from './Button.docs.mdx';
import Button from '.';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: { page: docs }
  }
};

export const Primary = () => (
  <Button
    variant={select('Variant', ['primary', 'secondary', 'tertiary'], 'primary')}
    size={select('Size', ['kilo', 'mega'], 'mega')}
    href={boolean('Link', false) ? '#' : undefined}
    target={boolean('Link', false) ? '_blank' : undefined}
    stretch={boolean('Stretched', false)}
    disabled={boolean('Disabled', false)}
  >
    {text('Button Label', 'Button')}
  </Button>
);

export const Secondary = () => (
  <Button variant="secondary">
    {text('Button Label', 'Secondary Button')}
  </Button>
);

export const Tertiary = () => (
  <Button variant="tertiary">{text('Button Label', 'Tertiary Button')}</Button>
);

export const Sizes = () => (
  <>
    <Button size="kilo">Button kilo</Button>
    <Button size="mega">Button mega</Button>
  </>
);

export const WithIcon = () => (
  <Button
    icon={ThumbUp}
    variant={select('Variant', ['primary', 'secondary', 'tertiary'], 'primary')}
    size={select('Size', ['kilo', 'mega'], 'mega')}
  >
    Like
  </Button>
);
