import { createMediaQueries } from '../styles/style-helpers';

const white = '#FFFFFF';
const black = '#0F131A';

const neutrals = {
  n100: '#FAFBFC',
  n300: '#D8DDE1',
  n500: '#9DA7B1',
  n700: '#5C656F',
  n900: '#212933'
};

const blues = {
  b100: '#DAEAFF',
  b300: '#7FB5FF',
  b500: '#3388FF',
  b700: '#2567D8',
  b900: '#1641AC'
};

const greens = {
  g100: '#C6E5CB',
  g300: '#97E2A3',
  g500: '#62DE76',
  g700: '#49B85B',
  g900: '#2F903E'
};

const yellows = {
  y100: '#F2E5CB',
  y300: '#F7DA9F',
  y500: '#FFC859',
  y700: '#D4A546',
  y900: '#AB8433'
};

const reds = {
  r100: '#FFE6E1',
  r300: '#FFAF9F',
  r500: '#FF7559',
  r700: '#D55A41',
  r900: '#A73D28'
};

const primary = {
  p100: blues.b100,
  p300: blues.b300,
  p500: blues.b500,
  p700: blues.b700,
  p900: blues.b900
};

const misc = {
  shadow: '#0C0F14',
  bodyBg: neutrals.n100,
  bodyColor: black,
  danger: reds.r500,
  success: greens.g700,
  warning: yellows.y700
};

export const colors = {
  white,
  black,
  ...neutrals,
  ...blues,
  ...greens,
  ...yellows,
  ...reds,
  ...primary,
  ...misc
};

export const spacings = {
  bit: '4px',
  byte: '8px',
  kilo: '12px',
  mega: '16px',
  giga: '24px',
  tera: '32px',
  peta: '40px',
  exa: '48px',
  zetta: '56px'
};

export const iconSizes = {
  byte: '14px',
  kilo: '16px',
  mega: '24px'
};

export const borderRadius = {
  kilo: '1px',
  mega: '4px',
  giga: '5px'
};

export const borderWidth = {
  kilo: '1px',
  mega: '2px'
};

export const typography = {
  headings: {
    kilo: {
      fontSize: '17px',
      lineHeight: '24px'
    },
    mega: {
      fontSize: '19px',
      lineHeight: '24px'
    },
    giga: {
      fontSize: '22px',
      lineHeight: '24px'
    },
    tera: {
      fontSize: '24px',
      lineHeight: '32px'
    },
    peta: {
      fontSize: '28px',
      lineHeight: '32px'
    },
    exa: {
      fontSize: '36px',
      lineHeight: '44px'
    },
    zetta: {
      fontSize: '42px',
      lineHeight: '48px'
    }
  },
  subHeadings: {
    kilo: {
      fontSize: '12px',
      lineHeight: '20px'
    },
    mega: {
      fontSize: '14px',
      lineHeight: '18px'
    }
  },
  text: {
    kilo: {
      fontSize: '13px',
      lineHeight: '20px'
    },
    mega: {
      fontSize: '15px',
      lineHeight: '24px'
    },
    giga: {
      fontSize: '18px',
      lineHeight: '28px'
    }
  }
};

export const fontStack = {
  default: 'aktiv-grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI"',
  mono: 'Consolas, monaco, monospace'
};

export const fontWeight = {
  regular: '400',
  bold: '700'
};

export const grid = {
  default: {
    priority: 0,
    breakpoint: 'default',
    cols: 12,
    maxWidth: '880px',
    gutter: spacings.mega
  },
  untilKilo: {
    priority: 1,
    breakpoint: 'untilKilo',
    cols: 12,
    maxWidth: '400px',
    gutter: spacings.byte
  },
  kilo: {
    priority: 2,
    breakpoint: 'kilo',
    cols: 12,
    maxWidth: '600px',
    gutter: spacings.mega
  },
  mega: {
    priority: 3,
    breakpoint: 'mega',
    cols: 12,
    maxWidth: '760px',
    gutter: spacings.giga
  },
  giga: {
    priority: 4,
    breakpoint: 'giga',
    cols: 12,
    maxWidth: '880px',
    gutter: spacings.giga
  }
};

const breakpoints = {
  untilKilo: '(max-width: 479px)',
  kilo: 480,
  kiloToMega: '(min-width: 480px) and (max-width: 767px)',
  mega: 768,
  megaToGiga: '(min-width: 768px) and (max-width: 959px)',
  giga: 960,
  gigaToTera: '(min-width: 960px) and (max-width: 1279px)',
  tera: 1280
};

export const mq = createMediaQueries(breakpoints);

export const transitions = {
  default: `200ms ease-in-out`
};
