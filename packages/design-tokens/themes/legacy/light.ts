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

import type {
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
} from '../../types/index.js';

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
      fontSize: '2rem',
      lineHeight: '2.25rem',
    },
    two: {
      fontSize: '1.5rem',
      lineHeight: '1.625rem',
    },
    three: {
      fontSize: '1.125rem',
      lineHeight: '1.375rem',
    },
    four: {
      fontSize: '1.125rem',
      lineHeight: '1.375rem',
    },
  },
  title: {
    one: {
      fontSize: '4rem',
      lineHeight: '4.5rem',
    },
    two: {
      fontSize: '3rem',
      lineHeight: '3.5rem',
    },
    three: {
      fontSize: '3rem',
      lineHeight: '3.5rem',
    },
    four: {
      fontSize: '2.5rem',
      lineHeight: '2.875rem',
    },
  },
  subHeadline: {
    fontSize: '1.125rem',
    lineHeight: '1.375rem',
  },
  body: {
    one: {
      fontSize: '1rem',
      lineHeight: '1.375rem',
    },
    two: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
  },
  bodyLarge: {
    fontSize: '1.25rem',
    lineHeight: '1.5rem',
  },
};

export const fontStack: FontStack = {
  default:
    '"Inter", Helvetica, Arial, system-ui, sans-serif, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  mono: 'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace',
};

export const fontWeight: FontWeight = {
  regular: '375',
  bold: '630',
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

export const mq: MediaQueries = {
  untilKilo: '@media (max-width: 479px)',
  kilo: '@media (min-width: 480px)',
  kiloToMega: '@media (min-width: 480px) and (max-width: 767px)',
  mega: '@media (min-width: 768px)',
  untilMega: '@media (max-width: 767px)',
  megaToGiga: '@media (min-width: 768px) and (max-width: 959px)',
  giga: '@media (min-width: 960px)',
  untilGiga: '@media (max-width: 959px)',
  gigaToTera: '@media (min-width: 960px) and (max-width: 1279px)',
  tera: '@media (min-width: 1280px)',
  untilTera: '@media (max-width: 1279px)',
};

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
  navigation: 800,
  modal: 1000,
  toast: 1100,
};
