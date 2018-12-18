import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

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
 * Margin helper component for default margin usage. The idea is to wrap your
 * visual components with this one in order to add top or bottom spacing based
 * on the theme variables.
 */
const Spacing = styled('div')`
  ${baseStyles};
  ${marginBottomStyles};
  ${marginTopStyles};
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
