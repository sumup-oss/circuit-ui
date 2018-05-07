import styled, { css } from 'react-emotion';

const getBreakPointStyles = (theme, breakpoint) => {
  const config = theme.grid[breakpoint];

  if (!config) {
    return null;
  }

  return theme.mq[breakpoint]`
    max-width: ${config.maxWidth};
    padding: 0 ${config.padding};

    &:not(:last-of-type) {
      margin-bottom: ${config.padding};
    }
  `;
};

const baseStyles = ({ theme }) => css`
  label: grid;

  margin: 0 auto;

  ${getBreakPointStyles(theme, 'untilKilo')};
  ${getBreakPointStyles(theme, 'kilo')};
  ${getBreakPointStyles(theme, 'mega')};
  ${getBreakPointStyles(theme, 'giga')};
  ${getBreakPointStyles(theme, 'tera')};
`;

/**
 * A basic 12-column grid component.
 */
const Grid = styled('div')(baseStyles);

/**
 * @component
 */
export default Grid;
