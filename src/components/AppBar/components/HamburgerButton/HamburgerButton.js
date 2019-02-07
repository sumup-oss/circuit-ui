import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { hideVisually } from 'polished';
import HamburgerIcon from './hamburger.svg';

const baseStyles = ({ theme }) => css`
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  border: ${theme.borderWidth.kilo} solid ${theme.colors.n700};
  border-radius: 50%;
  background-color: ${theme.colors.n900};
  cursor: pointer;
`;

const AccessibilityLabel = styled.span`
  ${hideVisually()};
`;

const Button = styled('button')(baseStyles);

const HamburgerButton = ({ hamburgerButtonLabel, onClick }) => (
  <Button onClick={onClick}>
    <AccessibilityLabel data-selector="accessibility-label">
      {hamburgerButtonLabel}
    </AccessibilityLabel>
    <HamburgerIcon />
  </Button>
);

HamburgerButton.propTypes = {
  /**
   * The onClick event handler
   */
  onClick: PropTypes.func,
  /**
   * The accessibility label for the HamburguerButton
   */
  hamburgerButtonLabel: PropTypes.string
};

/**
 * @component
 */
export default HamburgerButton;
