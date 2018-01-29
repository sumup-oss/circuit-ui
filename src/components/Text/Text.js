import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

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
  font-size: ${theme.typography.text[size].fontSize};
  line-height: ${theme.typography.text[size].lineHeight};
`;

const Text = styled(HtmlElement)(baseStyles, sizeStyles);

/**
 * The Text component is used for long-form text. Typically with
 * <p>, <div>, <article>, or <section> elements.
 */

Text.propTypes = {
  /**
   * An ID rendered as data-selector attribute on the
   * component. Used for tracking and e2e testing.
   */
  selector: PropTypes.string.isRequired,
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
  element: PropTypes.string
};

Text.defaultProps = {
  element: 'p',
  size: 'mega',
  className: ''
};

export default Text;
