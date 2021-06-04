/**
 * Copyright 2020, SumUp Ltd.
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

import { Colors } from '../types';

export const type = 'light';

const white = '#FFF';
const black = '#000';

// NOTE: The neutral color names & values don't match up with what's in Figma.
// Fixing this would be a big breaking change, so we're leaving it as is.
const neutrals = {
  n100: '#F5F5F5',
  n200: '#E6E6E6',
  n300: '#CCC',
  n500: '#999',
  n700: '#666',
  n800: '#333',
  n900: '#1A1A1A',
};

const blues = {
  b100: '#F0F6FF',
  b200: '#DAEAFF',
  b300: '#AFD0FE',
  b400: '#7FB5FF',
  b500: '#3063E9',
  b700: '#234BC3',
  b900: '#1A368E',
};

const greens = {
  g100: '#E4EABB',
  g200: '#D4DB8F',
  g300: '#BED630',
  g500: '#8CC13F',
  g700: '#138849',
  g900: '#356560',
};

const violets = {
  v100: '#E9CFF2',
  v200: '#D7A9DC',
  v300: '#C781C9',
  v500: '#CA58FF',
  v700: '#8928A2',
  v900: '#5F1D6B',
};

const oranges = {
  o100: '#EFD0BB',
  o200: '#F7B97C',
  o300: '#ED7000',
  o500: '#CE6C0B',
  o700: '#8E4503',
  o900: '#66391B',
};

const yellows = {
  y100: '#F2E9C7',
  y200: '#EDDD8E',
  y300: '#F6CC1B',
  y500: '#D8A413',
  y700: '#AD7A14',
  y900: '#725514',
};

const reds = {
  r100: '#F4CBCB',
  r200: '#EDA2A2',
  r300: '#EA7A7A',
  r500: '#D23F47',
  r700: '#B22426',
  r900: '#941618',
};

const primary = {
  p100: blues.b100,
  p200: blues.b200,
  p300: blues.b300,
  p400: blues.b400,
  p500: blues.b500,
  p700: blues.b700,
  p900: blues.b900,
};

const misc = {
  shadow: 'rgba(12, 15, 20, 0.07)',
  overlay: 'rgba(0, 0, 0, 0.4)',
  bodyBg: white,
  bodyColor: neutrals.n900,
  danger: '#D23F47',
  success: '#138849',
  warning: '#F5C625',
};

export const colors: Colors = {
  white,
  black,
  ...neutrals,
  ...blues,
  ...greens,
  ...yellows,
  ...reds,
  ...oranges,
  ...violets,
  ...primary,
  ...misc,
};

export * from './shared';
