import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const baseStyles = ({ theme }) => css`
  label: nav-label;
  margin-left: ${theme.spacings.kilo};
`;

const secondaryStyles = ({ theme, secondary }) =>
  secondary &&
  css`
    label: nav-label--secondary;
    margin-left: 0px;
    margin-top: -${theme.spacings.kilo};
    transition: margin-top ${theme.transitions.slow};
  `;

const secondaryVisibleStyles = ({ secondary, visible }) =>
  secondary &&
  visible &&
  css`
    label: nav-label--secondary--visible;
    margin-top: 0px;
  `;

const NavLabel = styled.div(
  baseStyles,
  secondaryStyles,
  secondaryVisibleStyles
);

NavLabel.propTypes = {
  /**
   * If the Label is secondary and smaller margin
   */
  secondary: PropTypes.bool,
  /**
   * If the Label is visible (it can be hidden when secondary)
   */
  visible: PropTypes.bool
};

/**
 * @component
 */
export default NavLabel;
