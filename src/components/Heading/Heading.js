import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import HtmlElement from '../HtmlElement/HtmlElement';
import { childrenPropType } from '../../util/shared-prop-types';
import { KILO, MEGA, GIGA, TERA, PETA, EXA, ZETTA } from '../../util/sizes';

const baseStyles = ({ theme }) => css`
  label: heading;
  font-weight: ${theme.fontWeight.bold};
`;

const sizeStyles = ({ theme, size }) => css`
  label: heading--${size};
  font-size: ${theme.typography.headings[size].fontSize};
  line-height: ${theme.typography.headings[size].lineHeight};
`;

const marginStyles = ({ theme, margin }) =>
  margin &&
  css`
    label: heading--no-margin;
    margin-bottom: ${theme.spacings.giga};
  `;

const HeadingElement = styled(HtmlElement)(
  baseStyles,
  sizeStyles,
  marginStyles
);

/**
 * A heading flexible heading component capable of rendering using
 * different HTML tags.
 */
const Heading = props => (
  <HeadingElement {...props} blacklist={{ margin: true }} />
);

Heading.KILO = KILO;
Heading.MEGA = MEGA;
Heading.GIGA = GIGA;
Heading.TERA = TERA;
Heading.PETA = PETA;
Heading.EXA = EXA;
Heading.ZETTA = ZETTA;

Heading.propTypes = {
  /**
   * Child nodes to be rendered.
   */
  children: childrenPropType,
  /**
   * A Circuit UI heading size.
   */
  size: PropTypes.oneOf([
    Heading.KILO,
    Heading.MEGA,
    Heading.GIGA,
    Heading.TERA,
    Heading.PETA,
    Heading.EXA,
    Heading.ZETTA
  ]),
  /**
   * Optional additional className string to overwrite styles.
   */
  className: PropTypes.string,
  /**
   * Adds bottom margin to the heading.
   */
  margin: PropTypes.bool,
  /**
   * The HTML heading element to render.
   */
  element: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
};

Heading.defaultProps = {
  element: 'h2',
  size: Heading.PETA,
  className: '',
  margin: true,
  children: null
};

export default Heading;
