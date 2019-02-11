import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Title from './components/Title';

const baseStyles = ({ theme }) => css`
  label: header;
  width: 100%;
  display: flex;
  align-items: center;
  height: 64px;
  min-height: 64px;
  background-color: ${theme.colors.n900};
  padding: ${theme.spacings.mega};
  ${theme.mq.mega`
    display: none;
  `}
`;

const Container = styled('div')(baseStyles);

const Header = ({ title, children }) => (
  <Container>
    {children}
    <Title>{title}</Title>
  </Container>
);

Header.propTypes = {
  /**
   * The page title for the Header.
   */
  title: PropTypes.string,
  /**
   * The child component of Header.
   */
  children: PropTypes.node
};

/**
 * @component
 */
export default Header;
