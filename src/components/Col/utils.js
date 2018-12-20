import { css } from '@emotion/core';

import {
  isEqual,
  isString,
  clamp,
  toPairs,
  head,
  compose,
  curry,
  map,
  mapValues,
  values
} from '../../util/fp';
import { MIN_COL_SPAN, MAX_COL_WIDTH, DEFAULT_BREAKPOINT } from './constants';

export const isDefault = isEqual(DEFAULT_BREAKPOINT);

export const wrapStyles = (styles, breakpoint, theme) =>
  isDefault(breakpoint) ? css(styles) : `${theme.mq[breakpoint]} { ${styles} }`;

export const createSpanStyles = (grid, theme, span) => {
  if (!grid) {
    return null;
  }

  const { cols, breakpoint } = grid;
  const safeSpan = clamp(MIN_COL_SPAN, cols, span);

  const styles = `
    width: ${(MAX_COL_WIDTH / cols) * safeSpan}%;
  `;

  return wrapStyles(styles, breakpoint, theme);
};

export const createSkipStyles = (grid, theme, skip) => {
  if (!grid) {
    return null;
  }

  const { cols, breakpoint } = grid;
  const safeSkip = clamp(cols * -1, cols - 1, skip);

  const styles = `
    left: ${(MAX_COL_WIDTH / cols) * safeSkip}%;
    position: relative;
  `;

  return wrapStyles(styles, breakpoint, theme);
};

const createBreakpointStyles = curry((theme, current) => {
  const config = theme.grid[current.breakpoint];

  if (!config) {
    return null;
  }

  const styles = `
    padding-left: calc(${config.gutter} / 2);
    padding-right: calc(${config.gutter} / 2);
  `;

  return wrapStyles(styles, current.breakpoint, theme);
});

/**
 * Return the default styles for each breakpoint provided by the config
 */
export const getBreakPointStyles = theme =>
  compose(
    values,
    mapValues(createBreakpointStyles(theme))
  )(theme.grid);

/**
 * Sort the key/value based on the breakpoint priority
 * defined on the grid config.
 */
export const sortByPriority = curry((grid, iteratee) =>
  iteratee.sort((a, b) => grid[head(a)].priority >= grid[head(b)].priority)
);

/**
 * Map the provided key/value breakpoint into styles based on the grid/theme
 * config.
 */
export const mapBreakpoint = curry((fn, grid, theme, [key, value]) =>
  fn(grid[key], theme, value)
);

/**
 * Compose the breakpoints object into an array of styles.
 */
const composeBreakpoints = curry((fn, grid, theme, breakpoints) =>
  compose(
    map(mapBreakpoint(fn, grid, theme)),
    sortByPriority(grid),
    toPairs
  )(breakpoints)
);

/**
 * Return the styles of the span based on the provided value. If it is a string
 * returns a single style, otherwise composes the breakpoints into an array of
 * styles
 */
export const getSpanStyles = ({ grid, ...theme }, span) =>
  isString(span)
    ? createSpanStyles(grid.default, theme, span)
    : composeBreakpoints(createSpanStyles, grid, theme, span);

/**
 * Return the styles of the skip based on the provided value. If it is a string
 * returns a single style, otherwise composes the breakpoints into an array of
 * styles
 */
export const getSkipStyles = ({ grid, ...theme }, skip) =>
  isString(skip)
    ? createSkipStyles(grid.default, theme, skip)
    : composeBreakpoints(createSkipStyles, grid, theme, skip);
