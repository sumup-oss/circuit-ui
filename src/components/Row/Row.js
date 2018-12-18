import styled from '@emotion/styled';
import { css } from 'emotion';

import { clearfix } from '../../styles/style-helpers';

const getBreakPointStyles = (theme, breakpoint) => {
  const config = theme.grid[breakpoint];

  if (!config) {
    return null;
  }

  return theme.mq[breakpoint]`
    margin-left: calc(-${config.gutter} / 2);
    margin-right: calc(-${config.gutter} / 2);
  `;
};

const baseStyles = ({ theme }) => css`
  label: row;

  position: relative;
  ${clearfix};

  ${getBreakPointStyles(theme, 'untilKilo')};
  ${getBreakPointStyles(theme, 'kilo')};
  ${getBreakPointStyles(theme, 'mega')};
  ${getBreakPointStyles(theme, 'giga')};
  ${getBreakPointStyles(theme, 'tera')};
`;

/**
 * Row wrapping for the Col component.
 */
const Row = styled('div')(baseStyles);

/**
 * @component
 */
export default Row;
