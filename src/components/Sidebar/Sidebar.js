import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import Header from './components/Header';
import NavList from './components/NavList';
import NavItem from './components/NavItem';
import Backdrop from './components/Backdrop';
import CloseButton from './components/CloseButton';

const baseStyles = ({ theme, open }) => css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 256px;
  background-color: ${theme.colors.n900};
  transition: left 150ms ease-in-out;
  position: absolute;
  left: ${open ? 0 : '-256px'};
  z-index: 1;
  ${theme.mq.mega`
    left: 0;
    position: relative;
  `};
`;

const Drawer = styled('div')(baseStyles);

const Sidebar = ({ children, open, onClose }) => (
  <Fragment>
    <Drawer open={open}>{children}</Drawer>
    <Backdrop visible={open} />
    <CloseButton visible={open} onClick={onClose} />
  </Fragment>
);

Sidebar.propTypes = {
  /**
   * The children component passed to the Sidebar
   */
  children: PropTypes.node,
  /**
   * Tells if the Sidebar is open
   */
  open: PropTypes.bool,
  /**
   * A function to handle the sidebar close
   */
  onClose: PropTypes.func
};

Sidebar.Header = Header;
Sidebar.NavList = NavList;
Sidebar.NavItem = NavItem;

export default Sidebar;
