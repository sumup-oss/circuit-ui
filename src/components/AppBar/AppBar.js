import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Title from './components/Title';
import HamburgerButton from './components/HamburgerButton';

const baseStyles = ({ theme }) => css`
  label: appbar;
  width: 100%;
  display: flex;
  align-items: center;
  height: 64px;
  background-color: ${theme.colors.n900};
  padding: ${theme.spacings.mega};
  ${theme.mq.mega`
    display: none;
  `}
`;

const Container = styled('div')(baseStyles);

const AppBar = ({ title, hamburgerButtonLabel, onHamburgerClick }) => (
  <Container>
    <HamburgerButton
      hamburgerButtonLabel={hamburgerButtonLabel}
      onClick={onHamburgerClick}
    />
    <Title>{title}</Title>
  </Container>
);

AppBar.propTypes = {
  /**
   * The page title for the AppBar
   */
  title: PropTypes.string,
  /**
   * The accessibility label for the HamburguerButton
   */
  hamburgerButtonLabel: PropTypes.string,
  /**
   * Handler function for HamburgerButton click events
   */
  onHamburgerClick: PropTypes.func
};

/**
 * @component
 */
export default AppBar;
