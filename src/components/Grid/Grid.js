import styled from '@emotion/styled';
import { css } from '@emotion/core';

const getBreakPointStyles = (theme, breakpoint) => {
  const config = theme.grid[breakpoint];

  if (!config) {
    return null;
  }

  return `${theme.mq[breakpoint]} {
    max-width: ${config.maxWidth};
    padding-left: calc(${config.gutter} / 2);
    padding-right: calc(${config.gutter} / 2);
  }`;
};

const baseStyles = ({ theme }) => css`
  label: grid;

  margin: 0 auto;
  width: 100%;

  ${getBreakPointStyles(theme, 'untilKilo')};
  ${getBreakPointStyles(theme, 'kilo')};
  ${getBreakPointStyles(theme, 'mega')};
  ${getBreakPointStyles(theme, 'giga')};
  ${getBreakPointStyles(theme, 'afterTera')};
`;

/**
 * A basic 12-column grid component.
 */
const Grid = styled('div')(baseStyles);

/**
 * @component
 */
export default Grid;
