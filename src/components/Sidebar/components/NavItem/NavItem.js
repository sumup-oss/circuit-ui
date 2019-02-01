import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: auto;
  margin: ${theme.spacings.mega};
  padding: ${theme.spacings.bit};
  cursor: pointer;
  color: ${theme.colors.n500};
`;

const hoverStyles = ({ theme, selected }) => css`
  @media (hover: hover) {
    &:hover {
      color: ${!selected && theme.colors.n300};
    }
  }
`;

const activeStyles = ({ theme, selected }) => css`
  color: ${selected && theme.colors.n100};
  font-weight: ${selected && theme.fontWeight.bold};
  &:active {
    color: ${theme.colors.n100};
    font-weight: ${theme.fontWeight.bold};
  }
`;

const iconWrapperStyles = ({ theme }) => css`
  margin-right: ${theme.spacings.kilo};
`;

const ListItem = styled('li')(baseStyles, hoverStyles, activeStyles);
const IconWrapper = styled('div')(iconWrapperStyles);

const NavItem = ({ children, icon, selected, onClick }) => (
  <ListItem selected={selected} onClick={onClick}>
    {icon && <IconWrapper>{icon}</IconWrapper>}
    {children}
  </ListItem>
);

NavItem.propTypes = {
  /**
   * The children component passed to the Sidebar
   */
  children: PropTypes.node,
  /**
   * The icon to be shown befor the Item title
   */
  icon: PropTypes.node,
  /**
   * Tells if the item is selected
   */
  selected: PropTypes.bool,
  /**
   * The onClick method to handle the click event on NavItems
   */
  onClick: PropTypes.func
};

export default NavItem;
