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

import { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { TrackingElement } from '@sumup/collector';

import { useClickHandler } from '../../hooks/useClickHandler';

import Header from './components/Header';
import Footer from './components/Footer';
import NavList from './components/NavList';
import NavItem from './components/NavItem';
import Backdrop from './components/Backdrop';
import CloseButton from './components/CloseButton';
import Aggregator from './components/Aggregator';
import Separator from './components/Separator';

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

const Drawer = styled('nav')(baseStyles, openStyles);

const TRACKING_ELEMENT = 'sidebar';

const Sidebar = ({
  children,
  open,
  closeButtonLabel,
  onClose,
  tracking,
  ...props
}) => {
  const handleClose = useClickHandler(onClose, tracking, 'sidebar-close');

  return (
    <Fragment>
      <Drawer open={open} {...props}>
        <TrackingElement name={TRACKING_ELEMENT}>{children}</TrackingElement>
      </Drawer>
      <Backdrop
        visible={open}
        onClick={handleClose}
        data-testid="sidebar-backdrop"
      />
      <CloseButton
        visible={open}
        label={closeButtonLabel}
        onClick={handleClose}
        data-testid="sidebar-close-button"
      />
    </Fragment>
  );
};

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
   * Additional data that is dispatched with the close tracking event.
   */
  tracking: PropTypes.shape({
    label: PropTypes.string.isRequired,
    component: PropTypes.string,
    customParameters: PropTypes.object,
  }),
};

Sidebar.Header = Header;
Sidebar.Footer = Footer;
Sidebar.NavList = NavList;
Sidebar.NavItem = NavItem;
Sidebar.Aggregator = Aggregator;
Sidebar.Separator = Separator;

export default Sidebar;
