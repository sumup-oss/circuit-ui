import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = () => css`
  label: spacing;
`;

const marginBottomStyles = ({ theme, bottom }) =>
  bottom &&
  css`
    label: spacing--margin-bottom;
    margin-bottom: ${theme.spacings.giga};
  `;

const marginTopStyles = ({ theme, top }) =>
  top &&
  css`
    label: spacing--margin-top;
    margin-top: ${theme.spacings.giga};
  `;

/**
 * Margin helper
 */
const Spacing = styled('div')`
  ${baseStyles}
  ${marginBottomStyles}
  ${marginTopStyles}
`;

Spacing.propTypes = {
  /**
   * Adds bottom margin to component
   */
  bottom: PropTypes.bool,
  /**
   * Adds top margin to component
   */
  top: PropTypes.bool
};

Spacing.defaultProps = {
  bottom: false,
  top: false
};

/**
 * @component
 */
export default Spacing;
