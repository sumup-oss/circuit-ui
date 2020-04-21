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

import { createMediaQueries } from '../utils';

import {
  Spacings,
  IconSizes,
  BorderRadius,
  BorderWidth,
  FontStack,
  FontWeight,
  Grid,
  Breakpoint,
  Breakpoints,
  MediaQueries,
  ZIndex,
} from '../types';

export const spacings: Spacings = {
  bit: '4px',
  byte: '8px',
  kilo: '12px',
  mega: '16px',
  giga: '24px',
  tera: '32px',
  peta: '40px',
  exa: '48px',
  zetta: '56px',
};

export const iconSizes: IconSizes = {
  kilo: '16px',
  mega: '24px',
  giga: '32px',
};

export const borderRadius: BorderRadius = {
  kilo: '1px',
  mega: '4px',
  giga: '5px',
  circle: '100%',
  pill: '999999px', // HACK: By providing a very large absolut size, the browser picks the maximum size in one dimension.
};

export const borderWidth: BorderWidth = {
  kilo: '1px',
  mega: '2px',
};

export const typography = {
  headings: {
    kilo: {
      fontSize: '17px',
      lineHeight: '24px',
    },
    mega: {
      fontSize: '19px',
      lineHeight: '24px',
    },
    giga: {
      fontSize: '22px',
      lineHeight: '24px',
    },
    tera: {
      fontSize: '24px',
      lineHeight: '32px',
    },
    peta: {
      fontSize: '28px',
      lineHeight: '32px',
    },
    exa: {
      fontSize: '36px',
      lineHeight: '44px',
    },
    zetta: {
      fontSize: '42px',
      lineHeight: '48px',
    },
  },
  subHeadings: {
    kilo: {
      fontSize: '12px',
      lineHeight: '20px',
    },
    mega: {
      fontSize: '14px',
      lineHeight: '18px',
    },
  },
  text: {
    kilo: {
      fontSize: '13px',
      lineHeight: '20px',
    },
    mega: {
      fontSize: '16px',
      lineHeight: '24px',
    },
    giga: {
      fontSize: '18px',
      lineHeight: '28px',
    },
  },
};

export const fontStack: FontStack = {
  default:
    'aktiv-grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  mono: 'Consolas, monaco, monospace',
};

export const fontWeight: FontWeight = {
  regular: '400',
  bold: '700',
};

export const grid: Grid = {
  default: {
    priority: 0,
    breakpoint: 'default',
    cols: 12,
    maxWidth: '880px',
    gutter: spacings.mega,
  },
  untilKilo: {
    priority: 1,
    breakpoint: Breakpoint.untilKilo,
    cols: 12,
    maxWidth: '400px',
    gutter: spacings.byte,
  },
  kilo: {
    priority: 2,
    breakpoint: Breakpoint.kilo,
    cols: 12,
    maxWidth: '600px',
    gutter: spacings.mega,
  },
  mega: {
    priority: 3,
    breakpoint: Breakpoint.mega,
    cols: 12,
    maxWidth: '760px',
    gutter: spacings.giga,
  },
  giga: {
    priority: 4,
    breakpoint: Breakpoint.giga,
    cols: 12,
    maxWidth: '880px',
    gutter: spacings.giga,
  },
  tera: {
    priority: 5,
    breakpoint: Breakpoint.tera,
    cols: 12,
    maxWidth: '1200px',
    gutter: spacings.giga,
  },
};

export const breakpoints: Breakpoints = {
  untilKilo: '(max-width: 479px)',
  kilo: 480,
  kiloToMega: '(min-width: 480px) and (max-width: 767px)',
  mega: 768,
  untilMega: '(max-width: 767px)',
  megaToGiga: '(min-width: 768px) and (max-width: 959px)',
  giga: 960,
  gigaToTera: '(min-width: 960px) and (max-width: 1279px)',
  tera: 1280,
};

export const mq: MediaQueries = createMediaQueries(breakpoints);

export const transitions = {
  default: '200ms ease-in-out',
  slow: '300ms ease-in-out',
};

export const zIndex: ZIndex = {
  default: 0,
  absolute: 1,
  drawer: 10,
  select: 20,
  popover: 30,
  tooltip: 31,
  header: 600,
  backdrop: 700,
  sidebar: 800,
  modal: 1000,
};
