import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  label: component;
`;

/**
 * Describe your component here.
 */
const Component = styled('element')(baseStyles);

Component.propTypes = {
  /**
   * An ID rendered as data-selector attribute on the
   * component. Used for tracking and e2e testing.
   */
  selector: PropTypes.string.isRequired
};

Component.defaultProps = {};

/**
 * @component
 */
export default Component;
