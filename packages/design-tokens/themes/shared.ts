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

import { createMediaQueries } from '../utils/media-queries';
import {
  Spacings,
  IconSizes,
  BorderRadius,
  BorderWidth,
  FontStack,
  FontWeight,
  Grid,
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
  tera: '48px',
};

export const borderRadius: BorderRadius = {
  bit: '4px',
  byte: '8px',
  kilo: '12px',
  mega: '16px',
  circle: '100%',
  pill: '999999px', // HACK: By providing a very large absolute size, the browser picks the maximum size in one dimension.
};

export const borderWidth: BorderWidth = {
  kilo: '1px',
  mega: '2px',
};

export const typography = {
  headline: {
    one: {
      fontSize: '32px',
      lineHeight: '36px',
    },
    two: {
      fontSize: '24px',
      lineHeight: '28px',
    },
    three: {
      fontSize: '20px',
      lineHeight: '24px',
    },
    four: {
      fontSize: '18px',
      lineHeight: '24px',
    },
  },
  title: {
    one: {
      fontSize: '120px',
      lineHeight: '120px',
    },
    two: {
      fontSize: '96px',
      lineHeight: '96px',
    },
    three: {
      fontSize: '64px',
      lineHeight: '64px',
    },
    four: {
      fontSize: '56px',
      lineHeight: '56px',
    },
  },
  subHeadline: {
    fontSize: '14px',
    lineHeight: '20px',
  },
  body: {
    one: {
      fontSize: '16px',
      lineHeight: '24px',
    },
    two: {
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
  bodyLarge: {
    fontSize: '20px',
    lineHeight: '20px',
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
    breakpoint: 'untilKilo',
    cols: 12,
    maxWidth: '400px',
    gutter: spacings.byte,
  },
  kilo: {
    priority: 2,
    breakpoint: 'kilo',
    cols: 12,
    maxWidth: '600px',
    gutter: spacings.mega,
  },
  mega: {
    priority: 3,
    breakpoint: 'mega',
    cols: 12,
    maxWidth: '760px',
    gutter: spacings.giga,
  },
  giga: {
    priority: 4,
    breakpoint: 'giga',
    cols: 12,
    maxWidth: '880px',
    gutter: spacings.giga,
  },
  tera: {
    priority: 5,
    breakpoint: 'tera',
    cols: 12,
    maxWidth: '1200px',
    gutter: spacings.giga,
  },
};

export const breakpoints: Breakpoints = {
  untilKilo: '(max-width: 479px)',
  kilo: '(min-width: 480px)',
  kiloToMega: '(min-width: 480px) and (max-width: 767px)',
  mega: '(min-width: 768px)',
  untilMega: '(max-width: 767px)',
  megaToGiga: '(min-width: 768px) and (max-width: 959px)',
  giga: '(min-width: 960px)',
  untilGiga: '(max-width: 959px)',
  gigaToTera: '(min-width: 960px) and (max-width: 1279px)',
  tera: '(min-width: 1280px)',
  untilTera: '(max-width: 1279px)',
};

export const mq: MediaQueries = createMediaQueries(breakpoints);

export const transitions = {
  default: '120ms ease-in-out',
  slow: '300ms ease-in-out',
};

export const zIndex: ZIndex = {
  default: 0,
  absolute: 1,
  input: 20,
  popover: 30,
  tooltip: 40,
  header: 600,
  backdrop: 700,
  /**
   * @deprecated Use `theme.zIndex.navigation` instead.
   */
  sidebar: 800,
  navigation: 800,
  modal: 1000,
};
