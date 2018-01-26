import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { typeMarginResets } from '../../styles/global-styles';
import HtmlElement from '../HtmlElement/HtmlElement';
import { childrenPropType } from '../../util/shared-prop-types';

const baseStyles = ({ theme }) => css`
  label: sub-heading;
  text-transform: uppercase;
  font-weight: ${theme.fontWeight.bold};
  ${typeMarginResets};
`;

const sizeStyles = ({ theme, size }) => css`
  label: sub-heading--${size};
  font-size: ${theme.typography.subHeadings[size].fontSize};
  line-height: ${theme.typography.subHeadings[size].lineHeight};
`;

const SubHeading = styled(HtmlElement)(baseStyles, sizeStyles);

SubHeading.propTypes = {
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
   * A Circuit UI sub-heading size.
   */
  size: PropTypes.oneOf(['kilo', 'mega']),
  /**
   * Optional additional className string to overwrite styles.
   */
  className: PropTypes.string,
  /**
   * The HTML heading element to render.
   */
  element: PropTypes.oneOf(['h2', 'h3', 'h4', 'h5', 'h6'])
};

SubHeading.defaultProps = {
  element: 'h3',
  size: 'kilo',
  className: ''
};

export default SubHeading;
