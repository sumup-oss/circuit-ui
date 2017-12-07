import { includes } from 'lodash/fp';

export const getColorClass = color => {
  const safeColor = color.toLowerCase();
  const DEFAULT_COLOR = 'brand';
  const VALID_OPTIONS = ['highlight', 'warning', 'error', DEFAULT_COLOR];
  const colorModifier = includes(safeColor, VALID_OPTIONS)
    ? safeColor
    : DEFAULT_COLOR;
  return `price--${colorModifier}`;
};
