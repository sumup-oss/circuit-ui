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

enum Breakpoint {
  untilKilo = 'untilKilo',
  kilo = 'kilo',
  kiloToMega = 'kiloToMega',
  mega = 'mega',
  untilMega = 'untilMega',
  megaToGiga = 'megaToGiga',
  giga = 'giga',
  gigaToTera = 'gigaToTera',
  tera = 'tera',
  afterTera = 'afterTera'
}

type Typography = {
  fontSize: string;
  lineHeight: string;
};

export interface Theme {
  colors: {
    white: string;
    black: string;
    // Neutrals
    n100: string;
    n300: string;
    n500: string;
    n700: string;
    n900: string;
    // Blues
    b100: string;
    b300: string;
    b500: string;
    b700: string;
    b900: string;
    // Greens
    g100: string;
    g300: string;
    g500: string;
    g700: string;
    g900: string;
    // Yellows
    y100: string;
    y300: string;
    y500: string;
    y700: string;
    y900: string;
    // Reds
    r100: string;
    r300: string;
    r500: string;
    r700: string;
    r900: string;
    // Primary
    p100: string;
    p300: string;
    p500: string;
    p700: string;
    p900: string;
    // Misc
    shadow: string;
    bodyBg: string;
    bodyColor: string;
    danger: string;
    success: string;
    warning: string;
  };
  spacings: {
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
  iconSizes: {
    kilo: string;
    mega: string;
    giga: string;
  };
  borderRadius: {
    kilo: string;
    mega: string;
    giga: string;
  };
  borderWidth: {
    kilo: string;
    mega: string;
  };
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
  fontStack: {
    default: string;
    mono: string;
  };
  fontWeight: {
    regular: string;
    bold: string;
  };
  breakpoints: {
    [key in Breakpoint]: string | number;
  };
  mq: {
    [key in Breakpoint]: string;
  };
  grid: {
    [key in Breakpoint | 'default']: {
      priority: number;
      breakpoint: Breakpoint;
      cols: number;
      maxWidth: string;
      gutter: string;
    };
  };
  transitions: {
    default: string;
    slow: string;
  };
  zIndex: {
    default: number;
    absolute: number;
    drawer: number;
    select: number;
    popover: number;
    tooltip: number;
    header: number;
    backdrop: number;
    sidebar: number;
    modal: number;
  };
}
