import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  label: nav-item;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: auto;
  margin: ${theme.spacings.mega};
  padding: ${theme.spacings.bit};
  cursor: pointer;
  color: ${theme.colors.n500};
  fill: ${theme.colors.n500};
`;

const hoverStyles = ({ theme, selected }) =>
  !selected &&
  css`
    label: nav-item__hover;
    &:hover {
      color: ${theme.colors.n300};
      fill: ${theme.colors.n300};
    }
  `;

const activeStyles = ({ theme, selected }) =>
  selected &&
  css`
    label: nav-item__active;
    color: ${theme.colors.n100};
    font-weight: ${theme.fontWeight.bold};
  `;

const ListItem = styled('li')(baseStyles, hoverStyles, activeStyles);

const labelWrapperStyles = ({ theme }) => css`
  margin-left: ${theme.spacings.kilo};
`;

const LabelWrapper = styled('div')(labelWrapperStyles);

const NavItem = ({
  children,
  defaultIcon,
  selectedIcon,
  selected,
  onClick
}) => (
  <ListItem selected={selected} onClick={onClick}>
    {defaultIcon && selectedIcon && selected ? selectedIcon : defaultIcon}
    <LabelWrapper>{children}</LabelWrapper>
  </ListItem>
);

NavItem.propTypes = {
  /**
   * The children component passed to the Sidebar
   */
  children: PropTypes.node,
  /**
   * The icon to be shown when the NavItem is not selected
   */
  defaultIcon: PropTypes.node,
  /**
   * The icon to be shown when the NavItem is selected
   */
  selectedIcon: PropTypes.node,
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
