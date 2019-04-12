import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Title from './components/Title';

const baseStyles = ({ theme }) => css`
  label: header;
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 64px;
  background-color: ${theme.colors.n900};
  padding: ${theme.spacings.mega};
  z-index: ${theme.zIndex.header};
  position: sticky;
  top: 0;
  ${theme.mq.giga} {
    display: none;
  }
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

Header.defaultProps = {
  title: '',
  children: ''
};

/**
 * @component
 */
export default Header;
