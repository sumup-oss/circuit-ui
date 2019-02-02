import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import Header from './components/Header';
import NavList from './components/NavList';
import NavItem from './components/NavItem';
import Backdrop from './components/Backdrop';
import CloseButton from './components/CloseButton';

const SIDEBAR_WIDTH = 256;

const baseStyles = ({ theme, open }) => css`
  label: sidebar;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${SIDEBAR_WIDTH}px;
  background-color: ${theme.colors.n900};
  transition: transform ${theme.transitions.default};
  position: absolute;
  transform: translateX(${open ? 0 : `-${SIDEBAR_WIDTH}px`});
  z-index: 1;
  ${theme.mq.mega`
    transform: translateX(0);
    position: relative;
  `};
`;

const Drawer = styled('div')(baseStyles);

const Sidebar = ({ children, open, closeButtonLabel, onClose }) => (
  <Fragment>
    <Drawer open={open}>{children}</Drawer>
    <Backdrop visible={open} />
    <CloseButton
      visible={open}
      closeButtonLabel={closeButtonLabel}
      onClick={onClose}
    />
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
   * Accessibility label for the CloseButton
   */
  closeButtonLabel: PropTypes.string.isRequired,
  /**
   * A function to handle the sidebar close
   */
  onClose: PropTypes.func
};

Sidebar.Header = Header;
Sidebar.NavList = NavList;
Sidebar.NavItem = NavItem;

export default Sidebar;
