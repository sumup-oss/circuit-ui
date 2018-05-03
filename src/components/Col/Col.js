import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { findLast, identity, isArray, slice, flow, map } from '../../util/fp';

const getValueForBreakpoint = (prop, breakpointIndex) => {
  if (!isArray(prop)) {
    return prop;
  }

  return flow(slice(0, breakpointIndex + 1), findLast(identity))(prop);
};

const createConfigStyles = (config, skip, span, theme) => {
  const { cols, breakpoint } = config;

  // Values in percent
  const TOTAL_MARGIN = 15;
  const TOTAL_COL_WIDTH = 100 - TOTAL_MARGIN;
  const rightMargin = TOTAL_MARGIN / (cols - 1);
  const columnWidth = TOTAL_COL_WIDTH / cols;
  const colWidth = span * columnWidth + (span - 1) * rightMargin;
  const skipWidth = skip * columnWidth + skip * rightMargin;

  return theme.mq[breakpoint]`
    width: ${colWidth}%;
    margin-left: ${skipWidth}%;

    &:not(:last-of-type) {
      margin-right: ${rightMargin}%;
    }
  `;
};

const getBreakpointStyles = ({ grid, ...theme }, skip, span) =>
  map((config, ind) => {
    debugger
    const safeSkip = getValueForBreakpoint(skip, ind);
    const safeSpan = getValueForBreakpoint(span, ind);
    return createConfigStyles(config, safeSkip, safeSpan, theme);
  }, grid);

const baseStyles = ({ theme, skip, span }) => css`
  label: col;

  float: left;
  min-height: 50vh;

  &:nth-of-type(n) {
    background-color: ${theme.colors.y300};
  }

  &:nth-of-type(2n) {
    background-color: ${theme.colors.y100};
  }

  ${getBreakpointStyles(theme, skip, span)};
`;

/**
 * Describe your component here.
 */
const Col = styled('div')(baseStyles);

Col.propTypes = {
  /**
   * A consice description of the example prop.
   */
  skip: PropTypes.number,
  span: PropTypes.number
};

Col.defaultProps = {
  skip: 0,
  span: 1
};

/**
 * @component
 */
export default Col;
