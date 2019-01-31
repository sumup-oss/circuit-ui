import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import Header from './components/Header';
import NavList from './components/NavList';
import NavItem from './components/NavItem';

const baseStyles = ({ theme }) => css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 256px;
  background-color: ${theme.colors.n900};
`;

const Sidebar = styled('div')(baseStyles);

Sidebar.propTypes = {
  /**
   * The children component passed to the Sidebar
   */
  children: PropTypes.node,
  /**
   * Tells if the Sidebar is open
   */
  open: PropTypes.bool
};

Sidebar.Header = Header;
Sidebar.NavList = NavList;
Sidebar.NavItem = NavItem;

export default Sidebar;
