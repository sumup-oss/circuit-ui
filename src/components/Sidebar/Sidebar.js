import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import Header from './components/Header';
import NavList from './components/NavList';
import NavItem from './components/NavItem';
import Backdrop from './components/Backdrop';
import CloseButton from './components/CloseButton';

const SIDEBAR_WIDTH = 256;

const baseStyles = ({ theme }) => css`
  label: sidebar;
  height: 100%;
  min-width: ${SIDEBAR_WIDTH}px;
  background-color: ${theme.colors.n900};
  transition: transform ${theme.transitions.default};
  position: absolute;
  transform: translateX(-100%);
  z-index: ${theme.zIndex.sidebar};
  ${theme.mq.mega`
    transform: translateX(0);
    position: relative;
  `};
`;

const openStyles = ({ theme, open }) =>
  open &&
  css`
    label: sidebar--open;
    transform: translateX(0);
    ${theme.mq.mega`
      transform: translateX(0);
    `};
  `;

const Drawer = styled('div')(baseStyles, openStyles);

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
