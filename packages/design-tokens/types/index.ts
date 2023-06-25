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

/**
 * @deprecated
 *
 * The Circuit UI theme is moving from color scales (e.g. `g900`) to semantic
 * colors (e.g. `fg-success`). This makes theme customizations easier and more
 * reliable, and enables theming for sub-brands or for supporting multiple
 * color modes. For detailed documentation on the new semantic colors, refer to
 * the [Figma documentation](https://www.figma.com/file/OgPQeoNZ2QoY7hZvy0ybk2/%F0%9F%8C%88-COLOR-TOKENS?node-id=913%3A3903&t=b9BsTOJnzKDomZ9E-4).
 *
 * Additionally, color tokens are moving from the JS theme (exported from
 * `@sumup/design-tokens`) to CSS custom properties, declared in
 * `@sumup/circuit-ui`'s `BaseStyles` component (v6.1+). For a list of all
 * available CSS custom properties, refer to the [Circuit UI theme documentation](https://circuit.sumup.com/?path=/docs/features-theme--docs).
 */
export type Colors = {
  /**
   * @deprecated
   */
  white: string;
  /**
   * @deprecated
   */
  black: string;
  // Neutrals
  /**
   * @deprecated
   */
  n100: string;
  /**
   * @deprecated
   */
  n200: string;
  /**
   * @deprecated
   */
  n300: string;
  /**
   * @deprecated
   */
  n500: string;
  /**
   * @deprecated
   */
  n700: string;
  /**
   * @deprecated
   */
  n800: string;
  /**
   * @deprecated
   */
  n900: string;
  // Blues
  /**
   * @deprecated
   */
  b100: string;
  /**
   * @deprecated
   */
  b200: string;
  /**
   * @deprecated
   */
  b300: string;
  /**
   * @deprecated
   */
  b400: string;
  /**
   * @deprecated
   */
  b500: string;
  /**
   * @deprecated
   */
  b700: string;
  /**
   * @deprecated
   */
  b900: string;
  // Greens
  /**
   * @deprecated
   */
  g100: string;
  /**
   * @deprecated
   */
  g200: string;
  /**
   * @deprecated
   */
  g300: string;
  /**
   * @deprecated
   */
  g500: string;
  /**
   * @deprecated
   */
  g700: string;
  /**
   * @deprecated
   */
  g900: string;
  // Violets
  /**
   * @deprecated
   */
  v100: string;
  /**
   * @deprecated
   */
  v200: string;
  /**
   * @deprecated
   */
  v300: string;
  /**
   * @deprecated
   */
  v500: string;
  /**
   * @deprecated
   */
  v700: string;
  /**
   * @deprecated
   */
  v900: string;
  // Oranges
  /**
   * @deprecated
   */
  o100: string;
  /**
   * @deprecated
   */
  o200: string;
  /**
   * @deprecated
   */
  o300: string;
  /**
   * @deprecated
   */
  o500: string;
  /**
   * @deprecated
   */
  o700: string;
  /**
   * @deprecated
   */
  o900: string;
  // Yellows
  /**
   * @deprecated
   */
  y100: string;
  /**
   * @deprecated
   */
  y200: string;
  /**
   * @deprecated
   */
  y300: string;
  /**
   * @deprecated
   */
  y500: string;
  /**
   * @deprecated
   */
  y700: string;
  /**
   * @deprecated
   */
  y900: string;
  // Reds
  /**
   * @deprecated
   */
  r100: string;
  /**
   * @deprecated
   */
  r200: string;
  /**
   * @deprecated
   */
  r300: string;
  /**
   * @deprecated
   */
  r500: string;
  /**
   * @deprecated
   */
  r700: string;
  /**
   * @deprecated
   */
  r900: string;
  // Primary
  /**
   * @deprecated
   */
  p100: string;
  /**
   * @deprecated
   */
  p200: string;
  /**
   * @deprecated
   */
  p300: string;
  /**
   * @deprecated
   */
  p400: string;
  /**
   * @deprecated
   */
  p500: string;
  /**
   * @deprecated
   */
  p700: string;
  /**
   * @deprecated
   */
  p900: string;
  // Misc
  /**
   * @deprecated
   */
  shadow: string;
  /**
   * @deprecated
   *
   * You should likely use `--cui-bg-overlay` instead.
   */
  overlay: string;
  /**
   * @deprecated
   *
   * You should likely use `--cui-bg-normal` instead.
   */
  bodyBg: string;
  /**
   * @deprecated
   *
   * You should likely use `--cui-fg-normal` instead.
   */
  bodyColor: string;
  /**
   * @deprecated
   */
  info: string;
  /**
   * @deprecated
   */
  confirm: string;
  /**
   * @deprecated
   */
  alert: string;
  /**
   * @deprecated
   */
  notify: string;
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
  tera: string;
};

export type BorderRadius = {
  bit: string;
  byte: string;
  kilo: string;
  mega: string;
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

type Breakpoint =
  | 'untilKilo'
  | 'kilo'
  | 'kiloToMega'
  | 'mega'
  | 'untilMega'
  | 'megaToGiga'
  | 'giga'
  | 'untilGiga'
  | 'gigaToTera'
  | 'tera'
  | 'untilTera';

type GridBreakpoint =
  | 'default'
  | 'untilKilo'
  | 'kilo'
  | 'mega'
  | 'giga'
  | 'tera';

export type Breakpoints = {
  [key in Breakpoint]: string;
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
  input: number;
  popover: number;
  tooltip: number;
  header: number;
  backdrop: number;
  navigation: number;
  modal: number;
  toast: number;
};

/**
 * @deprecated
 *
 * Use the CSS custom properties from `@sumup/design-tokens` instead.
 * Use the [`circuit-ui/prefer-custom-properties`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/prefer-custom-properties)
 * ESLint rule to automatically migrate your code.
 */
export interface Theme {
  /**
   * @deprecated
   *
   * The Circuit UI theme is moving from color scales (e.g. `g900`) to semantic
   * colors (e.g. `fg-success`). This makes theme customizations easier and more
   * reliable, and enables theming for sub-brands or for supporting multiple
   * color modes. For detailed documentation on the new semantic colors, refer to
   * the [Figma documentation](https://www.figma.com/file/OgPQeoNZ2QoY7hZvy0ybk2/%F0%9F%8C%88-COLOR-TOKENS?node-id=913%3A3903&t=b9BsTOJnzKDomZ9E-4).
   *
   * Additionally, color tokens are moving from the JS theme (exported from
   * `@sumup/design-tokens`) to CSS custom properties, declared in
   * `@sumup/circuit-ui`'s `BaseStyles` component (v6.1+). For a list of all
   * available CSS custom properties, refer to the [Circuit UI theme documentation](https://circuit.sumup.com/?path=/docs/features-theme--docs).
   */
  colors: Colors;
  spacings: Spacings;
  iconSizes: IconSizes;
  borderRadius: BorderRadius;
  borderWidth: BorderWidth;
  typography: {
    headline: {
      one: Typography;
      two: Typography;
      three: Typography;
      four: Typography;
    };
    title: {
      one: Typography;
      two: Typography;
      three: Typography;
      four: Typography;
    };
    subHeadline: Typography;
    body: {
      one: Typography;
      two: Typography;
    };
    bodyLarge: Typography;
  };
  fontStack: FontStack;
  fontWeight: FontWeight;
  breakpoints: Breakpoints;
  mq: MediaQueries;
  grid: Grid;
  transitions: Transitions;
  zIndex: ZIndex;
}

/**
 * The token definitions below are loosely based on
 * https://github.com/design-tokens/community-group
 */

export type TokenName = `--cui-${string}`;

export type TokenType = Token['type'];

export type Token =
  | ColorToken
  | DimensionToken
  | DurationToken
  | FontFamilyToken
  | FontWeightToken
  | NumberToken;

interface BaseToken {
  name: TokenName;
  description?: string;
  type: string;
  value: unknown;
}

interface ColorToken extends BaseToken {
  type: 'color';
  value: Color;
}

export type Color =
  | `#${string}`
  | `rgb(${number},${number},${number})`
  | `rgb(${number},${number},${number},${number})`
  | `rgba(${number},${number},${number},${number})`;

interface DimensionToken extends BaseToken {
  type: 'dimension';
  value: Dimension;
}

type Dimension = `${number}rem` | `${number}px` | `${number}%`;

interface DurationToken extends BaseToken {
  type: 'duration';
  value: Duration;
}

type Duration = `${number}ms` | `${number}ms ${string}`;

interface FontFamilyToken extends BaseToken {
  type: 'fontFamily';
  value: string | string[];
}

interface FontWeightToken extends BaseToken {
  type: 'fontWeight';
  value: string | number;
}

interface NumberToken extends BaseToken {
  type: 'number';
  value: number;
}
