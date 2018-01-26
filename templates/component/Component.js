import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  label: component;
`;

/**
 * Component component for forms.
 */
const Component = styled('element')(baseStyles);

Component.propTypes = {
  /**
   * An ID passed to the <input> element via a data attribute. This
   * is used as an identifier for analytics tracking and e2e testing.
   */
  selector: PropTypes.string
};

Component.defaultProps = {};

/**
 * @component
 */
export default Component;
