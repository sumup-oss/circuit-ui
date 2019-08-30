/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Header from './components/Header';
import Footer from './components/Footer';
import NavList from './components/NavList';
import NavItem from './components/NavItem';
import Backdrop from './components/Backdrop';
import CloseButton from './components/CloseButton';
import Aggregator from './components/Aggregator';

const SIDEBAR_WIDTH = 256;

const baseStyles = ({ theme }) => css`
  label: sidebar;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: ${SIDEBAR_WIDTH}px;
  background-color: ${theme.colors.n900};
  transition: transform ${theme.transitions.default};
  position: absolute;
  transform: translateX(-100%);
  z-index: ${theme.zIndex.sidebar};
  ${theme.mq.giga} {
    transform: translateX(0);
    position: relative;
  }
`;

const openStyles = ({ theme, open }) =>
  open &&
  css`
    label: sidebar--open;
    transform: translateX(0);
    ${theme.mq.giga} {
      transform: translateX(0);
    }
  `;

const Drawer = styled('div')(baseStyles, openStyles);

const Sidebar = ({ children, open, closeButtonLabel, onClose, className }) => (
  <Fragment>
    <Drawer open={open} className={className}>
      {children}
    </Drawer>
    <Backdrop visible={open} onClick={onClose} />
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
  onClose: PropTypes.func,
  /**
   * A className to allow custom styles with Emotion's css prop
   */
  className: PropTypes.string
};

Sidebar.defaultProps = {
  children: '',
  open: false,
  onClose: null
};

Sidebar.Header = Header;
Sidebar.Footer = Footer;
Sidebar.NavList = NavList;
Sidebar.NavItem = NavItem;
Sidebar.Aggregator = Aggregator;

export default Sidebar;
