import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

import { standard } from '../../themes';
import { typeMarginResets } from '../../styles/global-styles';

const baseStyles = ({ theme }) => css`
  label: body-text;
  font-weight: ${theme.fontWeight.regular};
  ${typeMarginResets};
`;

const sizeStyles = ({ theme, size }) => css`
  label: body-text--${size};
  font-size: ${theme.typography.body[size].fontSize};
  line-height: ${theme.typography.body[size].lineHeight};
`;

/**
 * The BodyText component is used for long-form text. Typically with
 * <p>, <div>, <article>, or <section> elements.
 */
const BodyText = ({
  element: Element,
  size,
  theme,
  children,
  className,
  ...props
}) => (
  <Element
    className={`${baseStyles({ theme })} ${sizeStyles({
      theme,
      size
    })} ${className}`}
    {...props}
  >
    {children}
  </Element>
);

BodyText.propTypes = {
  /**
   * Child nodes to be rendered.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  /**
   * A Circuit UI body text size.
   */
  size: PropTypes.oneOf(['kilo', 'mega', 'giga']),
  /**
   * Optional additional className string to overwrite styles.
   */
  className: PropTypes.string,
  /**
   * The HTML element to render.
   */
  element: PropTypes.string,
  /**
   * A Circuit UI theme object. Usually provided by a ThemeProvider.
   */
  theme: PropTypes.object
};

BodyText.defaultProps = {
  element: 'p',
  size: 'mega',
  className: '',
  theme: standard
};

export default BodyText;
