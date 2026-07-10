// temporarily placing elements of the old theme object here
// to be able to apply the eslint rule fixes related to breakpoints and media queries
//TODO remove on the next major

export type Breakpoints = {
  [key in Breakpoint]: string;
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

export type MediaQueries = {
  [key in Breakpoint]: string;
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
