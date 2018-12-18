/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from './components';
import { childrenPropType } from '../../util/shared-prop-types';

import { disableVisually } from '../../styles/style-helpers';

export const COLLAPSED_NAV_WIDTH = 64;
export const FULL_NAV_WIDTH = 270;

export const MODE = {
  FULL: 'full',
  CONDENSED: 'condensed',
  HIDDEN: 'hidden'
};

const getDrawerContentStyles = ({ mode }) => css`
  width: ${mode === MODE.CONDENSED ? COLLAPSED_NAV_WIDTH : FULL_NAV_WIDTH}px;
  overflow: hidden;
  background-color: #212933;
  color: white;
  transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  height: ${window.innerHeight}px;
`;

const NavListItem = styled(({ icon, children, ...rest }) => (
  <ListItem {...rest} component="a">
    {!!icon && <ListItemIcon>{icon}</ListItemIcon>}
    <ListItemText>{children}</ListItemText>
  </ListItem>
))`
  color: white;

  &:hover:not([disabled]) {
    background-color: rgba(15, 19, 26, 0.5);
  }

  &[disabled] {
    ${disableVisually()};
  }
`;

const Container = styled(Drawer)`
  ${({ condensed }) => css`
    width: 0;
    width: ${condensed ? COLLAPSED_NAV_WIDTH : FULL_NAV_WIDTH}px;
    transition: width 0.3s ease-out;
    ${ListItemText} {
      ${condensed && 'display: none'};
    }
  `};
`;

const NavList = styled(List)`
  user-select: none;
  -ms-overflow-style: none;
  overflow-y: auto;
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  align-self: stretch;
  align-items: stretch;
  justify-content: flex-end;
`;

const SideNav = props => {
  const { variant, toggleMode, mode, header, footer, children } = props;
  const drawerContentStyles = getDrawerContentStyles(props);

  return (
    <Container
      condensed={mode === MODE.CONDENSED}
      onClose={() => toggleMode(MODE.HIDDEN)}
      open={mode !== MODE.HIDDEN}
      variant={variant}
      anchor="left"
      CardProps={{ className: drawerContentStyles }}
    >
      <div css="flex-shrink: 0">{header}</div>
      <NavList gutter={mode === MODE.FULL ? List.KILO : List.BYTE}>
        {children}
      </NavList>
      {!!footer && <FooterWrapper>{footer}</FooterWrapper>}
    </Container>
  );
};

SideNav.propTypes = {
  variant: PropTypes.oneOf(['permanent', 'temporary']).isRequired,
  toggleMode: PropTypes.func,
  mode: PropTypes.oneOf([MODE.FULL, MODE.CONDENSED, MODE.HIDDEN]).isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
  children: childrenPropType
};

SideNav.defaultProps = {
  toggleMode: () => {},
  header: null,
  footer: null,
  children: null
};

SideNav.Item = NavListItem;
SideNav.MODE = MODE;
SideNav.COLLAPSED_NAV_WIDTH = COLLAPSED_NAV_WIDTH;
SideNav.FULL_NAV_WIDTH = FULL_NAV_WIDTH;

export default SideNav;
