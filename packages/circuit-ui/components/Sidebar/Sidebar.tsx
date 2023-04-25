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

import { Fragment, ReactNode } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';

import { Aggregator } from './components/Aggregator';
import { Backdrop } from './components/Backdrop';
import { CloseButton } from './components/CloseButton';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { NavItem } from './components/NavItem';
import { NavList } from './components/NavList';
import { Separator } from './components/Separator';

export interface SidebarProps {
  /**
   * The children component passed to the Sidebar
   */
  children: ReactNode;
  /**
   * Determines whether the Sidebar is open
   */
  open: boolean;
  /**
   * Accessibility label for the CloseButton
   */
  closeButtonLabel: string;
  /**
   * A function to handle the sidebar close
   */
  onClose: () => void;
}

const SIDEBAR_WIDTH = 256;

const baseStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: ${SIDEBAR_WIDTH}px;
  background-color: ${theme.colors.n900};
  transition: transform ${theme.transitions.default};
  position: absolute;
  transform: translateX(-100%);
  z-index: ${theme.zIndex.navigation};
  ${theme.mq.giga} {
    transform: translateX(0);
    position: relative;
  }
`;

const openStyles = ({ theme, isOpen }: StyleProps & { isOpen: boolean }) =>
  isOpen &&
  css`
    transform: translateX(0);
    ${theme.mq.giga} {
      transform: translateX(0);
    }
  `;

const Drawer = styled('nav')(baseStyles, openStyles);

export function Sidebar({
  children,
  open,
  closeButtonLabel,
  onClose,
  ...props
}: SidebarProps) {
  return (
    <Fragment>
      <Drawer isOpen={open} {...props}>
        {children}
      </Drawer>
      <Backdrop
        visible={open}
        onClick={onClose}
        data-testid="sidebar-backdrop"
      />
      <CloseButton
        visible={open}
        label={closeButtonLabel}
        onClick={onClose}
        data-testid="sidebar-close-button"
      />
    </Fragment>
  );
}

Sidebar.Header = Header;
Sidebar.Footer = Footer;
Sidebar.NavList = NavList;
Sidebar.NavItem = NavItem;
Sidebar.Aggregator = Aggregator;
Sidebar.Separator = Separator;
