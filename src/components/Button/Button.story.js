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

import React, { Fragment } from 'react';
import { select, boolean, text } from '@storybook/addon-knobs/react';

import docs from './Button.docs.mdx';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: { page: docs },
    jest: ['Button']
  }
};

export const base = () => (
  <Button
    primary={boolean('Primary', false)}
    disabled={boolean('Disabled', false)}
    secondary={boolean('Secondary', false)}
    href={boolean('Link', false) ? '#' : undefined}
    target={boolean('Link', false) ? '_blank' : undefined}
    stretch={boolean('Stretched', false)}
    size={select('Size', [Button.KILO, Button.MEGA, Button.GIGA], Button.KILO)}
  >
    {text('Button Label', 'Button')}
  </Button>
);

export const primary = () => (
  <Button primary>{text('Button Label', 'Primary Button')}</Button>
);

export const secondary = () => (
  <Button secondary>{text('Button Label', 'Secondary Button')}</Button>
);

export const plain = () => (
  <Button plain href={boolean('href', false) ? 'http://sumup.com' : null}>
    {text('Button Label', 'Plain Button')}
  </Button>
);

export const size = () => (
  <Fragment>
    <Button size={Button.KILO}>Button kilo</Button>
    <Button size={Button.MEGA}>Button mega</Button>
    <Button size={Button.GIGA}>Button giga</Button>
  </Fragment>
);
