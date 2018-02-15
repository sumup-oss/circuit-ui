import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import HtmlElement from '../HtmlElement/HtmlElement';
import { childrenPropType } from '../../util/shared-prop-types';
import { sizes } from '../../styles/constants';

const { KILO, MEGA, GIGA } = sizes;

const baseStyles = ({ theme }) => css`
  label: text;
  font-weight: ${theme.fontWeight.regular};
`;

const sizeStyles = ({ theme, size }) => css`
  label: text--${size};
  font-size: ${theme.typography.text[size].fontSize};
  line-height: ${theme.typography.text[size].lineHeight};
`;

const marginStyles = ({ theme, margin }) =>
  margin &&
  css`
    label: text--with-margin;
    margin-bottom: ${theme.spacings.mega};
  `;

const TextElement = styled(HtmlElement)(baseStyles, sizeStyles, marginStyles);

/**
 * The Text component is used for long-form text. Typically with
 * <p>, <div>, <article>, or <section> elements. Capable of rendering
 * using different HTML tags.
 */
const Text = props => <TextElement {...props} blacklist={{ margin: true }} />;

Text.KILO = KILO;
Text.MEGA = MEGA;
Text.GIGA = GIGA;

Text.propTypes = {
  /**
   * Child nodes to be rendered.
   */
  children: childrenPropType,
  /**
   * A Circuit UI body text size.
   */
  size: PropTypes.oneOf([Text.KILO, Text.MEGA, Text.GIGA]),
  /**
   * Optional additional className string to overwrite styles.
   */
  className: PropTypes.string,
  /**
   * Adds bottom margin to the text.
   */
  margin: PropTypes.bool,
  /**
   * The HTML element to render.
   */
  element: PropTypes.string
};

Text.defaultProps = {
  element: 'p',
  size: Text.MEGA,
  className: '',
  margin: true,
  children: null
};

/**
 * @component
 */
export default Text;
