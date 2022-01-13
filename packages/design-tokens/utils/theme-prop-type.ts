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

import PropTypes, { Requireable, Validator } from 'prop-types';

import {
  Theme,
  Typography,
  Colors,
  Spacings,
  IconSizes,
  BorderRadius,
  BorderWidth,
  FontStack,
  FontWeight,
  Breakpoints,
  MediaQueries,
  Grid,
  Transitions,
  ZIndex,
} from '../types';

const typePropType = PropTypes.shape({
  fontSize: PropTypes.string,
  lineHeight: PropTypes.string,
} as { [key in keyof Typography]: Requireable<string> }).isRequired;

const gridPropType = PropTypes.shape({
  priority: PropTypes.number.isRequired,
  breakpoint: PropTypes.oneOf([
    'default',
    'untilKilo',
    'kilo',
    'mega',
    'giga',
    'tera',
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
    overlay: PropTypes.string.isRequired,
    bodyBg: PropTypes.string.isRequired,
    bodyColor: PropTypes.string.isRequired,
    danger: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired,
    warning: PropTypes.string.isRequired,
  } as { [key in keyof Colors]: Requireable<string>['isRequired'] }).isRequired,
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
  } as { [key in keyof Spacings]: Requireable<string>['isRequired'] })
    .isRequired,
  iconSizes: PropTypes.shape({
    kilo: PropTypes.string.isRequired,
    mega: PropTypes.string.isRequired,
    giga: PropTypes.string.isRequired,
    tera: PropTypes.string.isRequired,
  } as { [key in keyof IconSizes]: Requireable<string>['isRequired'] })
    .isRequired,
  borderRadius: PropTypes.shape({
    bit: PropTypes.string.isRequired,
    byte: PropTypes.string.isRequired,
    kilo: PropTypes.string.isRequired,
    mega: PropTypes.string.isRequired,
    circle: PropTypes.string.isRequired,
    pill: PropTypes.string.isRequired,
  } as { [key in keyof BorderRadius]: Requireable<string>['isRequired'] })
    .isRequired,
  borderWidth: PropTypes.shape({
    kilo: PropTypes.string.isRequired,
    mega: PropTypes.string.isRequired,
  } as { [key in keyof BorderWidth]: Requireable<string>['isRequired'] })
    .isRequired,
  typography: PropTypes.shape({
    headline: PropTypes.shape({
      one: typePropType,
      two: typePropType,
      three: typePropType,
      four: typePropType,
    }).isRequired,
    title: PropTypes.shape({
      one: typePropType,
      two: typePropType,
      three: typePropType,
      four: typePropType,
    }).isRequired,
    subHeadline: typePropType,
    body: PropTypes.shape({
      one: typePropType,
      two: typePropType,
    }).isRequired,
    bodyLarge: typePropType,
  }).isRequired,
  fontStack: PropTypes.shape({
    default: PropTypes.string,
    mono: PropTypes.string,
  } as { [key in keyof FontStack]: Requireable<string> }).isRequired,
  fontWeight: PropTypes.shape({
    regular: PropTypes.string.isRequired,
    bold: PropTypes.string.isRequired,
  } as { [key in keyof FontWeight]: Requireable<string>['isRequired'] })
    .isRequired,
  breakpoints: PropTypes.shape({
    untilKilo: PropTypes.string.isRequired,
    kilo: PropTypes.string.isRequired,
    kiloToMega: PropTypes.string.isRequired,
    mega: PropTypes.string.isRequired,
    untilMega: PropTypes.string.isRequired,
    megaToGiga: PropTypes.string.isRequired,
    giga: PropTypes.string.isRequired,
    untilGiga: PropTypes.string.isRequired,
    gigaToTera: PropTypes.string.isRequired,
    tera: PropTypes.string.isRequired,
    untilTera: PropTypes.string.isRequired,
  } as { [key in keyof Breakpoints]: Requireable<string>['isRequired'] })
    .isRequired,
  mq: PropTypes.shape({
    untilKilo: PropTypes.string.isRequired,
    kilo: PropTypes.string.isRequired,
    kiloToMega: PropTypes.string.isRequired,
    mega: PropTypes.string.isRequired,
    untilMega: PropTypes.string.isRequired,
    megaToGiga: PropTypes.string.isRequired,
    giga: PropTypes.string.isRequired,
    gigaToTera: PropTypes.string.isRequired,
    tera: PropTypes.string.isRequired,
    untilTera: PropTypes.string.isRequired,
  } as { [key in keyof MediaQueries]: Requireable<string>['isRequired'] })
    .isRequired,
  grid: PropTypes.shape({
    default: gridPropType,
    untilKilo: gridPropType,
    kilo: gridPropType,
    mega: gridPropType,
    giga: gridPropType,
    tera: gridPropType,
  } as { [key in keyof Grid]: Validator<unknown> }).isRequired,
  transitions: PropTypes.shape({
    default: PropTypes.string.isRequired,
    slow: PropTypes.string.isRequired,
  } as { [key in keyof Transitions]: Requireable<string>['isRequired'] })
    .isRequired,
  zIndex: PropTypes.shape({
    default: PropTypes.number.isRequired,
    absolute: PropTypes.number.isRequired,
    input: PropTypes.number.isRequired,
    popover: PropTypes.number.isRequired,
    tooltip: PropTypes.number.isRequired,
    header: PropTypes.number.isRequired,
    backdrop: PropTypes.number.isRequired,
    sidebar: PropTypes.number.isRequired,
    navigation: PropTypes.number.isRequired,
    modal: PropTypes.number.isRequired,
    toast: PropTypes.number.isRequired,
  } as { [key in keyof ZIndex]: Requireable<unknown> }).isRequired,
} as { [key in keyof Theme]: Requireable<unknown> });
