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
import { Download } from '@sumup/icons';

import docs from '../Button/Button.docs.mdx';
import { IconButton } from './IconButton';

export default {
  title: 'Components/Button/IconButton',
  component: IconButton,
  parameters: {
    docs: { page: docs }
  }
};

export const Base = () => (
  <IconButton
    label={text('Label', 'Download')}
    variant={select('Variant', ['primary', 'secondary', 'tertiary'], 'primary')}
    size={select('Size', ['kilo', 'mega'], 'mega')}
    stretch={boolean('Stretched', false)}
    disabled={boolean('Disabled', false)}
  >
    <Download />
  </IconButton>
);
