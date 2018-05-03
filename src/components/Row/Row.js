import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { clearfix } from '../../styles/style-helpers';

const getBreakPointStyles = (breakpoint, theme) => {
  const config = theme.grid[breakpoint];

  if (!config) {
    return null;
  }

  return theme.mq[breakpoint]`
    &:not(:last-of-type) {
      margin-bottom: ${config.gutter};
    }
  `;
};

const baseStyles = ({ theme }) => css`
  label: row;

  border: 2px solid ${theme.colors.g500};
  ${clearfix};

  ${getBreakPointStyles('untilKilo', theme)};
  ${getBreakPointStyles('kilo', theme)};
  ${getBreakPointStyles('mega', theme)};
  ${getBreakPointStyles('giga', theme)};
  ${getBreakPointStyles('tera', theme)};
`;

/**
 * Describe your component here.
 */
const Row = styled('div')(baseStyles);

Row.propTypes = {
  /**
   * A consice description of the example prop.
   */
  example: PropTypes.string
};

Row.defaultProps = {};

/**
 * @component
 */
export default Row;
