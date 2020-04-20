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

const white = '#FFFFFF';
const black = '#0F131A';

const neutrals = {
  n100: '#FAFBFC',
  n200: '#EEF0F2',
  n300: '#D8DDE1',
  n500: '#9DA7B1',
  n700: '#5C656F',
  n800: '#323E49',
  n900: '#212933',
};

const blues = {
  b100: '#EDF4FC',
  b200: '#DAEAFF',
  b300: '#AFD0FE',
  b400: '#7FB5FF',
  b500: '#3388FF',
  b700: '#1760CE',
  b900: '#003C8B',
};

const greens = {
  g100: '#E4EABB',
  g200: '#D4DB8F',
  g300: '#BED630',
  g500: '#8CC13F',
  g700: '#47995A',
  g900: '#356560',
};

const violets = {
  v100: '#E9CFF2',
  v200: '#D7A9DC',
  v300: '#C781C9',
  v500: '#B54DB3',
  v700: '#8928A2',
  v900: '#5F1D6B',
};

const oranges = {
  o100: '#EFD0BB',
  o200: '#F7B97C',
  o300: '#F7941D',
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
  r500: '#DB4D4D',
  r700: '#B22828',
  r900: '#7F1818',
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
  shadow: '#0C0F14',
  bodyBg: neutrals.n900,
  bodyColor: white,
  danger: reds.r500,
  success: greens.g700,
  warning: yellows.y500,
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
