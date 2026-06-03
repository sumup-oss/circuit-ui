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

export type ColorScheme = 'light' | 'dark';

export type FontFace =
  // Custom font
  | {
      'font-family': string;
      'font-style': 'normal' | 'italic' | 'oblique';
      'font-weight': 'normal' | 'bold' | `${number}` | `${number} ${number}`;
      'font-variation-settings'?: string;
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
  | 'brand'
  | 'promo'
  | 'neutral'
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
