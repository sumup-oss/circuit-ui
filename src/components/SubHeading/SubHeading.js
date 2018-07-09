import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import HtmlElement from '../HtmlElement';
import { childrenPropType } from '../../util/shared-prop-types';
import { sizes } from '../../styles/constants';

const { KILO, MEGA } = sizes;

const baseStyles = ({ theme }) => css`
  label: sub-heading;
  text-transform: uppercase;
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacings.kilo};
`;

const sizeStyles = ({ theme, size }) => css`
  label: sub-heading--${size};
  font-size: ${theme.typography.subHeadings[size].fontSize};
  line-height: ${theme.typography.subHeadings[size].lineHeight};
`;

const noMarginStyles = ({ noMargin }) =>
  noMargin &&
  css`
    label: sub-heading--no-margin;
    margin-bottom: 0;
  `;

const SubHeadingElement = styled(HtmlElement)(
  baseStyles,
  sizeStyles,
  noMarginStyles
);

/**
 * A flexible subheading component capable of rendering using any HTML heading
 * tag, except h1.
 */

const SubHeading = props => (
  <SubHeadingElement {...props} blacklist={{ noMargin: true }} />
);

SubHeading.KILO = KILO;
SubHeading.MEGA = MEGA;

SubHeading.propTypes = {
  /**
   * Child nodes to be rendered.
   */
  children: childrenPropType,
  /**
   * A Circuit UI sub-heading size.
   */
  size: PropTypes.oneOf([SubHeading.KILO, SubHeading.MEGA]),
  /**
   * Optional additional className string to overwrite styles.
   */
  className: PropTypes.string,
  /**
   * Removes the default bottom margin from the subheading.
   */
  noMargin: PropTypes.bool,
  /**
   * The HTML heading element to render.
   */
  element: PropTypes.oneOf(['h2', 'h3', 'h4', 'h5', 'h6'])
};

SubHeading.defaultProps = {
  element: 'h3',
  size: SubHeading.KILO,
  className: '',
  noMargin: false,
  children: null
};

/**
 * @component
 */
export default SubHeading;
