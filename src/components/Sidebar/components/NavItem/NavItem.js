import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import hasSelectedChild from './utils';
import SubNavList from '../SubNavList';

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

const secondaryStyles = ({ theme, secondary }) =>
  secondary &&
  css`
    label: nav-item--secondary;
    margin: 0px ${theme.spacings.giga};
    padding: ${theme.spacings.bit} 0px;
  `;

const hoverStyles = ({ theme, selected }) =>
  !selected &&
  css`
    label: nav-item--hover;
    &:hover {
      color: ${theme.colors.n300};
      fill: ${theme.colors.n300};
    }
  `;

const activeStyles = ({ theme, selected }) =>
  selected &&
  css`
    label: nav-item--active;
    color: ${theme.colors.n100};
    font-weight: ${theme.fontWeight.bold};
  `;

const ListItem = styled('li')(
  baseStyles,
  hoverStyles,
  activeStyles,
  secondaryStyles
);

const labelWrapperStyles = ({ theme }) => css`
  label: nav-item__label-wrapper;
  margin-left: ${theme.spacings.kilo};
`;

const LabelWrapper = styled('div')(labelWrapperStyles);

const NavItem = ({
  children,
  label,
  secondary,
  defaultIcon,
  selectedIcon,
  selected,
  onClick
}) => {
  const isSelected = selected || hasSelectedChild(children);

  return (
    <Fragment>
      <ListItem selected={isSelected} secondary={secondary} onClick={onClick}>
        {defaultIcon && selectedIcon && isSelected ? selectedIcon : defaultIcon}
        {secondary ? label : <LabelWrapper>{label}</LabelWrapper>}
      </ListItem>
      {children && isSelected && <SubNavList>{children}</SubNavList>}
    </Fragment>
  );
};

NavItem.propTypes = {
  /**
   * The children component passed to the NavItem
   */
  children: PropTypes.node,
  /**
   * The children component passed to the NavItem
   */
  label: PropTypes.string,
  /**
   * If the NavItem is a secondary navigation item
   */
  secondary: PropTypes.bool,
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

NavItem.defaultProps = {
  children: '',
  label: '',
  secondary: false,
  defaultIcon: '',
  selectedIcon: '',
  selected: false,
  onClick: null
};

export default NavItem;
