import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { typeMarginResets } from '../../styles/global-styles';
import HtmlElement from '../HtmlElement/HtmlElement';
import { childrenPropType } from '../../util/shared-prop-types';

const baseStyles = ({ theme }) => css`
  label: heading;
  font-weight: ${theme.fontWeight.bold};
  ${typeMarginResets};
`;

const sizeStyles = ({ theme, size }) => css`
  label: heading--${size};
  font-size: ${theme.typography.headings[size].fontSize};
  line-height: ${theme.typography.headings[size].lineHeight};
`;

const Heading = styled(HtmlElement)`
  ${baseStyles} ${sizeStyles};
`;

Heading.propTypes = {
  /**
   * Child nodes to be rendered.
   */
  children: childrenPropType,
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
  className: ''
};

export default Heading;
