import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from 'emotion';

import { getSpanStyles, getSkipStyles, getBreakPointStyles } from './utils';

const baseStyles = ({ theme, skip, span }) => css`
  label: col;

  box-sizing: border-box;
  float: left;

  ${getBreakPointStyles(theme)};
  ${getSpanStyles(theme, span)};
  ${getSkipStyles(theme, skip)};
`;

/**
 * Content wrapping for the Grid component. Allows sizing based on provided
 * props.
 */
const Col = styled('div')(baseStyles);

const sizingProp = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.number,
  PropTypes.string
]);

Col.propTypes = {
  /**
   * The amount to skip for a column. If the value is a number/string it will
   * be applied with no media query. If the value is an object it will apply
   * each value based on the key breakpoint, IE:
   * { untilKilo: 6 } will create a style for the untilKilo media query with a
   * skip of 6 columns. Accepts negative values as well.
   */
  skip: sizingProp,
  /**
   * The amount to span for a column. If the value is a number/string it will
   * be applied with no media query. If the value is an object it will apply
   * each value based on the key breakpoint, IE:
   * { untilKilo: 6 } will create a style for the untilKilo media query with a
   * span of 6 columns.
   */
  span: sizingProp
};

Col.defaultProps = {
  skip: '0',
  span: '0'
};

/**
 * @component
 */
export default Col;
