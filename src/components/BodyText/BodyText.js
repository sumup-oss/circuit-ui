import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { standard } from '../../themes';
import { typeMarginResets } from '../../styles/global-styles';
import HtmlElement from '../HtmlElement/HtmlElement';
import { childrenPropType } from '../../util/shared-prop-types';

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

const BodyText = styled(HtmlElement)(baseStyles, sizeStyles);

/**
 * The BodyText component is used for long-form text. Typically with
 * <p>, <div>, <article>, or <section> elements.
 */

BodyText.propTypes = {
  /**
   * Child nodes to be rendered.
   */
  children: childrenPropType,
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
