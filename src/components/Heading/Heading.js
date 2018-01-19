import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

import { standard } from '../../themes';
import { typeMarginResets } from '../../styles/global-styles';

const baseStyles = ({ theme }) => css`
  label: heading;
  font-weight: ${theme.fontWeight.bold};
  ${typeMarginResets};
`;

const sizeStyles = ({ theme, size }) => css`
  label: heading--${size};
  font-size: ${theme.type.headings[size].fontSize};
  line-height: ${theme.type.headings[size].lineHeight};
`;

const Heading = ({
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

Heading.propTypes = {
  /**
   * Child nodes to be rendered.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  /**
   * A Circuit UI heading size.
   */
  size: PropTypes.oneOf([
    'kilo',
    'mega',
    'giga',
    'tera',
    'peta',
    'exa',
    'zetta'
  ]),
  /**
   * Optional additional className string to overwrite styles.
   */
  className: PropTypes.string,
  /**
   * The HTML heading element to render.
   */
  element: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  /**
   * A Circuit UI theme object. Usually provided by a ThemeProvider.
   */
  theme: PropTypes.object
};

Heading.defaultProps = {
  element: 'h2',
  size: 'peta',
  className: '',
  theme: standard
};

export default Heading;
