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

type Typography = {
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

type Transitions = {
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
 * Use the CSS custom properties from `@sumup-oss/design-tokens` instead.
 * Use the [`circuit-ui/prefer-custom-properties`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/prefer-custom-properties)
 * ESLint rule to automatically migrate your code.
 */
export interface Theme {
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

export type ColorScheme = 'light' | 'dark';

export type FontFace =
  // Custom font
  | {
      'font-family': string;
      'font-style': 'normal' | 'italic' | 'oblique';
      'font-weight': `${number}` | `${number} ${number}`;
      'font-display': 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
      'src': string;
      'unicode-range': string;
    }
  // Web safe fallback font
  | {
      'font-family': string;
      'src': `local(${string})`;
      'ascent-override'?: `${number}%`;
      'descent-override'?: `${number}%`;
      'line-gap-override'?: `${number}%`;
      'size-adjust'?: `${number}%`;
    };

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

type ColorUsage = 'fg' | 'bg' | 'border';
type ColorSentiment =
  | 'accent'
  | 'promo'
  | 'success'
  | 'warning'
  | 'danger'
  | 'on-strong';
type ColorVariant =
  | 'normal'
  | 'subtle'
  | 'highlight'
  | 'strong'
  | 'placeholder'
  | 'elevated'
  | 'overlay'
  | 'divider'
  | 'focus';
type ColorInteraction = 'hovered' | 'pressed' | 'disabled';

interface ColorToken extends BaseToken {
  type: 'color';
  // usage - sentiment - variant - interaction, with sentiment, variant and interaction being optional
  name:
    | `--cui-${ColorUsage}-${ColorSentiment | ColorVariant}`
    | `--cui-${ColorUsage}-${ColorVariant}-${ColorInteraction}`
    | `--cui-${ColorUsage}-${ColorSentiment}-${ColorVariant | ColorInteraction}`
    | `--cui-${ColorUsage}-${ColorSentiment}-${ColorVariant}-${ColorInteraction}`;
  value: Color;
}

type Color =
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
