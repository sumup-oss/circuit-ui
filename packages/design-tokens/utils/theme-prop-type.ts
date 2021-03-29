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

import PropTypes from 'prop-types';

const typePropType = PropTypes.shape({
  fontSize: PropTypes.string,
  lineHeight: PropTypes.string,
}).isRequired;

const breakpointPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]).isRequired;

const gridPropType = PropTypes.shape({
  priority: PropTypes.number.isRequired,
  breakpoint: PropTypes.oneOf([
    'untilKilo',
    'kilo',
    'kiloToMega',
    'mega',
    'untilMega',
    'megaToGiga',
    'giga',
    'gigaToTera',
    'tera',
    'default',
  ]).isRequired,
  cols: PropTypes.number.isRequired,
  maxWidth: PropTypes.string.isRequired,
  gutter: PropTypes.string.isRequired,
}).isRequired;

export const themePropType = PropTypes.shape({
  colors: PropTypes.shape({
    white: PropTypes.string.isRequired,
    black: PropTypes.string.isRequired,
    // Neutrals
    n100: PropTypes.string.isRequired,
    n200: PropTypes.string.isRequired,
    n300: PropTypes.string.isRequired,
    n500: PropTypes.string.isRequired,
    n700: PropTypes.string.isRequired,
    n800: PropTypes.string.isRequired,
    n900: PropTypes.string.isRequired,
    // Blues
    b100: PropTypes.string.isRequired,
    b200: PropTypes.string.isRequired,
    b300: PropTypes.string.isRequired,
    b400: PropTypes.string.isRequired,
    b500: PropTypes.string.isRequired,
    b700: PropTypes.string.isRequired,
    b900: PropTypes.string.isRequired,
    // Greens
    g100: PropTypes.string.isRequired,
    g200: PropTypes.string.isRequired,
    g300: PropTypes.string.isRequired,
    g500: PropTypes.string.isRequired,
    g700: PropTypes.string.isRequired,
    g900: PropTypes.string.isRequired,
    // Violets
    v100: PropTypes.string.isRequired,
    v200: PropTypes.string.isRequired,
    v300: PropTypes.string.isRequired,
    v500: PropTypes.string.isRequired,
    v700: PropTypes.string.isRequired,
    v900: PropTypes.string.isRequired,
    // Oranges
    o100: PropTypes.string.isRequired,
    o200: PropTypes.string.isRequired,
    o300: PropTypes.string.isRequired,
    o500: PropTypes.string.isRequired,
    o700: PropTypes.string.isRequired,
    o900: PropTypes.string.isRequired,
    // Yellows
    y100: PropTypes.string.isRequired,
    y200: PropTypes.string.isRequired,
    y300: PropTypes.string.isRequired,
    y500: PropTypes.string.isRequired,
    y700: PropTypes.string.isRequired,
    y900: PropTypes.string.isRequired,
    // Reds
    r100: PropTypes.string.isRequired,
    r200: PropTypes.string.isRequired,
    r300: PropTypes.string.isRequired,
    r500: PropTypes.string.isRequired,
    r700: PropTypes.string.isRequired,
    r900: PropTypes.string.isRequired,
    // Primary
    p100: PropTypes.string.isRequired,
    p200: PropTypes.string.isRequired,
    p300: PropTypes.string.isRequired,
    p400: PropTypes.string.isRequired,
    p500: PropTypes.string.isRequired,
    p700: PropTypes.string.isRequired,
    p900: PropTypes.string.isRequired,
    // Misc
    shadow: PropTypes.string.isRequired,
    bodyBg: PropTypes.string.isRequired,
    bodyColor: PropTypes.string.isRequired,
  }).isRequired,
  spacings: PropTypes.shape({
    bit: PropTypes.string.isRequired,
    byte: PropTypes.string.isRequired,
    kilo: PropTypes.string.isRequired,
    mega: PropTypes.string.isRequired,
    giga: PropTypes.string.isRequired,
    tera: PropTypes.string.isRequired,
    peta: PropTypes.string.isRequired,
    exa: PropTypes.string.isRequired,
    zetta: PropTypes.string.isRequired,
  }).isRequired,
  iconSizes: PropTypes.shape({
    kilo: PropTypes.string.isRequired,
    mega: PropTypes.string.isRequired,
    giga: PropTypes.string.isRequired,
  }).isRequired,
  borderRadius: PropTypes.shape({
    kilo: PropTypes.string.isRequired,
    mega: PropTypes.string.isRequired,
    giga: PropTypes.string.isRequired,
    tera: PropTypes.string.isRequired,
    circle: PropTypes.string.isRequired,
    pill: PropTypes.string.isRequired,
  }).isRequired,
  borderWidth: PropTypes.shape({
    kilo: PropTypes.string.isRequired,
    mega: PropTypes.string.isRequired,
  }).isRequired,
  typography: PropTypes.shape({
    headings: PropTypes.shape({
      kilo: typePropType,
      mega: typePropType,
      giga: typePropType,
      tera: typePropType,
      peta: typePropType,
      exa: typePropType,
      zetta: typePropType,
    }).isRequired,
    subHeadings: PropTypes.shape({
      kilo: typePropType,
      mega: typePropType,
    }).isRequired,
    text: PropTypes.shape({
      kilo: typePropType,
      mega: typePropType,
      giga: typePropType,
    }).isRequired,
  }).isRequired,
  fontStack: PropTypes.shape({
    default: PropTypes.string,
    mono: PropTypes.string,
  }).isRequired,
  fontWeight: PropTypes.shape({
    regular: PropTypes.string.isRequired,
    bold: PropTypes.string.isRequired,
  }).isRequired,
  breakpoint: PropTypes.shape({
    untilKilo: breakpointPropType,
    kilo: breakpointPropType,
    kiloToMega: breakpointPropType,
    mega: breakpointPropType,
    untilMega: breakpointPropType,
    megaToGiga: breakpointPropType,
    giga: breakpointPropType,
    gigaToTera: breakpointPropType,
    tera: breakpointPropType,
  }).isRequired,
  mx: PropTypes.shape({
    untilKilo: PropTypes.string.isRequired,
    kilo: PropTypes.string.isRequired,
    kiloToMega: PropTypes.string.isRequired,
    mega: PropTypes.string.isRequired,
    untilMega: PropTypes.string.isRequired,
    megaToGiga: PropTypes.string.isRequired,
    giga: PropTypes.string.isRequired,
    gigaToTera: PropTypes.string.isRequired,
    tera: PropTypes.string.isRequired,
  }).isRequired,
  grid: PropTypes.shape({
    default: gridPropType,
    untilKilo: gridPropType,
    kilo: gridPropType,
    mega: gridPropType,
    giga: gridPropType,
    tera: gridPropType,
  }).isRequired,
  transitions: PropTypes.shape({
    default: PropTypes.string.isRequired,
    slow: PropTypes.string.isRequired,
  }).isRequired,
  zIndex: PropTypes.shape({
    default: PropTypes.number.isRequired,
    absolute: PropTypes.number.isRequired,
    drawer: PropTypes.number.isRequired,
    // @deprecated use input value instead
    select: PropTypes.number.isRequired,
    input: PropTypes.number.isRequired,
    popover: PropTypes.number.isRequired,
    tooltip: PropTypes.number.isRequired,
    header: PropTypes.number.isRequired,
    backdrop: PropTypes.number.isRequired,
    sidebar: PropTypes.number.isRequired,
    modal: PropTypes.number.isRequired,
  }).isRequired,
});
