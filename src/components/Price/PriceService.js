import { includes } from 'lodash/fp';

// eslint-disable-next-line import/prefer-default-export
export const getColorModifier = color => {
  const safeColor = color.toLowerCase();
  const DEFAULT_COLOR = 'brand';
  const VALID_OPTIONS = ['highlight', 'warning', 'error', DEFAULT_COLOR];
  const colorModifier = includes(safeColor, VALID_OPTIONS)
    ? safeColor
    : DEFAULT_COLOR;
  return `--${colorModifier}`;
};
