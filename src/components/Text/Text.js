import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import HtmlElement from '../HtmlElement/HtmlElement';
import { childrenPropType } from '../../util/shared-prop-types';
import { KILO, MEGA, GIGA } from '../../util/sizes';

const baseStyles = ({ theme }) => css`
  label: body-text;
  font-weight: ${theme.fontWeight.regular};
`;

const sizeStyles = ({ theme, size }) => css`
  label: body-text--${size};
  font-size: ${theme.typography.text[size].fontSize};
  line-height: ${theme.typography.text[size].lineHeight};
`;

const marginStyles = ({ theme, withMargin }) =>
  withMargin &&
  css`
    label: body-text--with-margin;
    margin-bottom: ${theme.spacings.mega};
  `;

/**
 * The Text component is used for long-form text. Typically with
 * <p>, <div>, <article>, or <section> elements. Capable of rendering
 * using different HTML tags.
 */
const Text = styled(HtmlElement)(baseStyles, sizeStyles, marginStyles);

Text.KILO = KILO;
Text.MEGA = MEGA;
Text.GIGA = GIGA;

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
  size: PropTypes.oneOf([KILO, MEGA, GIGA]),
  /**
   * Optional additional className string to overwrite styles.
   */
  className: PropTypes.string,
  /**
   * Adds bottom margin to the text.
   */
  withMargin: PropTypes.bool,
  /**
   * The HTML element to render.
   */
  element: PropTypes.string
};

Text.defaultProps = {
  element: 'p',
  size: MEGA,
  className: '',
  withMargin: false
};

export default Text;
