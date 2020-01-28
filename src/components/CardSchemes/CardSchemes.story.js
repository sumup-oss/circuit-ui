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
import { keys } from 'lodash/fp';
import { array, select } from '@storybook/addon-knobs';

// eslint-disable-next-line max-len
import schemeMap from './card-scheme-icons';

import docs from './CardSchemes.docs.mdx';
import CardSchemes from './CardSchemes';

const iconIds = keys(schemeMap);
const iconSizes = [
  CardSchemes.BYTE,
  CardSchemes.KILO,
  CardSchemes.MEGA,
  CardSchemes.GIGA
];

export default {
  title: 'Icons/CardSchemes',
  component: CardSchemes,
  parameters: {
    docs: { page: docs },
    jest: ['CardSchemes']
  }
};

export const base = () => (
  <CardSchemes
    size={select('Schemes Size', iconSizes, iconSizes[CardSchemes.GIGA])}
    iconIds={array('Card schemes', iconIds)}
  />
);
