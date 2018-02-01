import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { typeMarginResets } from '../../styles/global-styles';
import HtmlElement from '../HtmlElement/HtmlElement';
import { childrenPropType } from '../../util/shared-prop-types';
import { KILO, MEGA, GIGA, TERA, PETA, EXA, ZETTA } from '../../util/sizes';

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

/**
 * A heading flexible heading component capable of rendering using
 * different HTML tags.
 */
const Heading = styled(HtmlElement)`
  ${baseStyles} ${sizeStyles};
`;

Text.KILO = KILO;
Text.MEGA = MEGA;
Text.GIGA = GIGA;
Text.TERA = TERA;
Text.PETA = PETA;
Text.EXA = EXA;
Text.ZETTA = ZETTA;

Heading.propTypes = {
  /**
   * Child nodes to be rendered.
   */
  children: childrenPropType,
  /**
   * A Circuit UI heading size.
   */
  size: PropTypes.oneOf([KILO, MEGA, GIGA, TERA, PETA, EXA, ZETTA]),
  /**
   * An ID rendered as data-selector attribute on the
   * component. Used for tracking and e2e testing.
   */
  selector: PropTypes.string.isRequired,
  /**
   * Optional additional className string to overwrite styles.
   */
  className: PropTypes.string,
  /**
   * The HTML heading element to render.
   */
  element: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
};

Heading.defaultProps = {
  element: 'h2',
  size: PETA,
  className: ''
};

export default Heading;
