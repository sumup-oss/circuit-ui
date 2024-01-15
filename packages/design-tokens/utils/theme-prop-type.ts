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

import type {
  Theme,
  Typography,
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
} from '../types/index.js';

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

/**
 * @deprecated
 *
 * Use the CSS custom properties from `@sumup/design-tokens` instead.
 * Use the [`circuit-ui/prefer-custom-properties`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/prefer-custom-properties)
 * ESLint rule to automatically migrate your code.
 */
export const themePropType = PropTypes.shape({
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
    navigation: PropTypes.number.isRequired,
    modal: PropTypes.number.isRequired,
    toast: PropTypes.number.isRequired,
  } as { [key in keyof ZIndex]: Requireable<unknown> }).isRequired,
} as { [key in keyof Theme]: Requireable<unknown> });
