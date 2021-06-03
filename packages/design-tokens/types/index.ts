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

export type Colors = {
  white: string;
  black: string;
  // Neutrals
  n100: string;
  n200: string;
  n300: string;
  n500: string;
  n700: string;
  n800: string;
  n900: string;
  // Blues
  b100: string;
  b200: string;
  b300: string;
  b400: string;
  b500: string;
  b700: string;
  b900: string;
  // Greens
  g100: string;
  g200: string;
  g300: string;
  g500: string;
  g700: string;
  g900: string;
  // Violets
  v100: string;
  v200: string;
  v300: string;
  v500: string;
  v700: string;
  v900: string;
  // Oranges
  o100: string;
  o200: string;
  o300: string;
  o500: string;
  o700: string;
  o900: string;
  // Yellows
  y100: string;
  y200: string;
  y300: string;
  y500: string;
  y700: string;
  y900: string;
  // Reds
  r100: string;
  r200: string;
  r300: string;
  r500: string;
  r700: string;
  r900: string;
  // Primary
  p100: string;
  p200: string;
  p300: string;
  p400: string;
  p500: string;
  p700: string;
  p900: string;
  // Misc
  shadow: string;
  overlay: string;
  bodyBg: string;
  bodyColor: string;
  danger: string;
  success: string;
  warning: string;
};

export type Spacings = {
  bit: string;
  byte: string;
  kilo: string;
  mega: string;
  giga: string;
  tera: string;
  peta: string;
  exa: string;
  zetta: string;
};

export type IconSizes = {
  kilo: string;
  mega: string;
  giga: string;
};

export type BorderRadius = {
  kilo: string;
  mega: string;
  giga: string;
  tera: string;
  peta: string;
  circle: string;
  pill: string;
};

export type BorderWidth = {
  kilo: string;
  mega: string;
};

export type Typography = {
  fontSize: string;
  lineHeight: string;
};

export type FontStack = {
  default: string;
  mono: string;
};

export type FontWeight = {
  regular: string;
  bold: string;
};

export enum Breakpoint {
  untilKilo = 'untilKilo',
  kilo = 'kilo',
  kiloToMega = 'kiloToMega',
  mega = 'mega',
  untilMega = 'untilMega',
  megaToGiga = 'megaToGiga',
  giga = 'giga',
  gigaToTera = 'gigaToTera',
  tera = 'tera',
}

export enum GridBreakpoint {
  default = 'default',
  untilKilo = 'untilKilo',
  kilo = 'kilo',
  mega = 'mega',
  giga = 'giga',
  tera = 'tera',
}

export type Breakpoints = {
  [key in Breakpoint]: string | number;
};

export type MediaQueries = {
  [key in Breakpoint]: string;
};

export type Grid = {
  [key in GridBreakpoint]: {
    priority: number;
    breakpoint: Breakpoint | 'default';
    cols: number;
    maxWidth: string;
    gutter: string;
  };
};

export type Transitions = {
  default: string;
  slow: string;
};

export type ZIndex = {
  default: number;
  absolute: number;
  /**
   * @deprecated
   */
  drawer: number;
  /**
   * @deprecated use input value instead
   */
  select: number;
  input: number;
  popover: number;
  tooltip: number;
  header: number;
  backdrop: number;
  sidebar: number;
  modal: number;
};

export interface Theme {
  colors: Colors;
  spacings: Spacings;
  iconSizes: IconSizes;
  borderRadius: BorderRadius;
  borderWidth: BorderWidth;
  typography: {
    headings: {
      kilo: Typography;
      mega: Typography;
      giga: Typography;
      tera: Typography;
      peta: Typography;
      exa: Typography;
      zetta: Typography;
    };
    subHeadings: {
      kilo: Typography;
      mega: Typography;
    };
    text: {
      kilo: Typography;
      mega: Typography;
      giga: Typography;
    };
  };
  fontStack: FontStack;
  fontWeight: FontWeight;
  breakpoints: Breakpoints;
  mq: MediaQueries;
  grid: Grid;
  transitions: Transitions;
  zIndex: ZIndex;
}
