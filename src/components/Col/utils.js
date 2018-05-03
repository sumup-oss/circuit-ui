import { css } from 'react-emotion';

import { isString, keys, clamp } from '../../util/fp';
import { MIN_COL_SPAN, MAX_COL_WIDTH } from './constants';

const isDefault = breakpoint => breakpoint === 'default';

const wrapStyles = (styles, breakpoint, theme) =>
  isDefault(breakpoint) ? css(styles) : theme.mq[breakpoint](styles);

const createSpanStyles = (grid, theme, span) => {
  if (!grid) {
    return null;
  }

  const { cols, breakpoint } = grid;
  const safeSpan = clamp(MIN_COL_SPAN, cols, span);

  const styles = `
    margin-left: calc(${grid.gutter} / 2);
    margin-right: calc(${grid.gutter} / 2);
    width: ${MAX_COL_WIDTH / cols * safeSpan}%;
    width: calc(${MAX_COL_WIDTH / cols * safeSpan}% - (${grid.gutter}));
  `;

  return isDefault(breakpoint) ? css(styles) : theme.mq[breakpoint](styles);
};

const createSkipStyles = (grid, theme, skip) => {
  if (!grid) {
    return null;
  }

  const { cols, breakpoint } = grid;
  const safeSkip = clamp(cols * -1, cols - 1, skip);

  const styles = `
    left: ${MAX_COL_WIDTH / cols * safeSkip}%;
    position: relative;
  `;

  return wrapStyles(styles, breakpoint, theme);
};

export const getSpanStyles = ({ grid, ...theme }, span) =>
  isString(span)
    ? createSpanStyles(grid.default, theme, span)
    : keys(span).map(key => createSpanStyles(grid[key], theme, span[key]));

export const getSkipStyles = ({ grid, ...theme }, skip) =>
  isString(skip)
    ? createSkipStyles(grid.default, theme, skip)
    : keys(skip).map(key => createSkipStyles(grid[key], theme, skip[key]));
