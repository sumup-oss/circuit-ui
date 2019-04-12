import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const baseStyles = ({ theme }) => css`
  label: sidebar-header;
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: flex-start;
  height: 64px;
  width: 100%;
  padding: ${theme.spacings.giga};
  background-color: ${theme.colors.bodyColor};
  color: ${theme.colors.n100};
`;

const Header = styled('div')(baseStyles);

Header.propTypes = {
  /**
   * The children component passed to the Sidebar
   */
  children: PropTypes.node
};

export default Header;
