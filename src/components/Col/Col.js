import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { getSpanStyles, getSkipStyles } from './utils';

const baseStyles = ({ theme, skip, span }) => css`
  label: col;

  box-sizing: border-box;
  float: left;

  &:nth-of-type(n) {
    background-color: ${theme.colors.y300};
  }

  &:nth-of-type(2n) {
    background-color: ${theme.colors.y100};
  }

  ${getSpanStyles(theme, span)};
  ${getSkipStyles(theme, skip)};
`;

/**
 * Describe your component here.
 */
const Col = styled('div')(baseStyles);

const sizingProp = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.number,
  PropTypes.string
]);

Col.propTypes = {
  /**
   * A consice description of the example prop.
   */
  skip: sizingProp,
  span: sizingProp
};

Col.defaultProps = {
  skip: 0,
  span: 1
};

/**
 * @component
 */
export default Col;
