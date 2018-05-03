import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const getBreakPointStyles = (breakpoint, theme) => {
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

  border: 2px solid ${theme.colors.r500};
  margin: auto;

  ${getBreakPointStyles('untilKilo', theme)};
  ${getBreakPointStyles('kilo', theme)};
  ${getBreakPointStyles('mega', theme)};
  ${getBreakPointStyles('giga', theme)};
  ${getBreakPointStyles('tera', theme)};
`;

/**
 * A basic 12-column grid component.
 */
const Grid = styled('div')(baseStyles);

Grid.propTypes = {
  /**
   * A consice description of the example prop.
   */
  example: PropTypes.string
};

Grid.defaultProps = {};

/**
 * @component
 */
export default Grid;
