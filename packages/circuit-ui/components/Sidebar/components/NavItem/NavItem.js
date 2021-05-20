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

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

import { useClickHandler } from '../../../../hooks/useClickHandler';
import { useComponents } from '../../../ComponentsContext';
import NavLabel from '../NavLabel';

import { getIcon } from './utils';

const baseStyles = ({ theme }) => css`
  label: nav-item;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: auto;
  margin: ${theme.spacings.mega};
  padding: ${theme.spacings.bit};
  cursor: pointer;
  color: ${theme.colors.n300};
  text-decoration: none;
  transition: color ${theme.transitions.default};
`;

const secondaryStyles = ({ theme, secondary }) =>
  secondary &&
  css`
    label: nav-item--secondary;
    margin: 0px ${theme.spacings.giga};
    padding: ${theme.spacings.bit} 0px;
    transition: color ${theme.transitions.default},
      top ${theme.transitions.default};
  `;

const hoverStyles = ({ theme, selected, disabled }) =>
  !disabled &&
  !selected &&
  css`
    label: nav-item--hover;
    &:hover {
      color: ${theme.colors.n100};
    }
  `;

const selectedStyles = ({ theme, selected }) =>
  selected &&
  css`
    label: nav-item--active;
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.white};
  `;

const disabledStyles = ({ theme, disabled }) =>
  disabled &&
  css`
    label: nav-item--disabled;
    cursor: not-allowed;
    color: ${theme.colors.n500};
  `;

const NavLink = styled('a', {
  shouldForwardProp: isPropValid,
})(baseStyles, hoverStyles, selectedStyles, secondaryStyles, disabledStyles);

const NavItem = ({
  label,
  secondary,
  visible,
  defaultIcon,
  selectedIcon,
  selected,
  disabled,
  onClick,
  tracking,
  ...props
}) => {
  const { Link } = useComponents();
  const handleClick = useClickHandler(onClick, tracking, 'sidebar-nav-item');

  const icon = getIcon({ defaultIcon, selected, selectedIcon, disabled });

  return (
    <li
      css={css`
        /* the default display: list-item breaks spacing on Safari */
        display: block;
      `}
    >
      <NavLink
        as={Link}
        onClick={disabled ? null : handleClick}
        selected={selected}
        secondary={secondary}
        visible={visible}
        disabled={disabled}
        {...props}
      >
        {icon}
        <NavLabel secondary={secondary} visible={visible}>
          {label}
        </NavLabel>
      </NavLink>
    </li>
  );
};

NavItem.propTypes = {
  /**
   * The label of a NavItem
   */
  label: PropTypes.string,
  /**
   * If the NavItem is a secondary navigation item
   */
  secondary: PropTypes.bool,
  /**
   * If the NavItem is visible (it can be hidden when secondary)
   */
  visible: PropTypes.bool,
  /**
   * The icon to be shown when the NavItem is not selected
   */
  defaultIcon: PropTypes.node,
  /**
   * The icon to be shown when the NavItem is selected
   */
  selectedIcon: PropTypes.node,
  /**
   * If the item is selected
   */
  selected: PropTypes.bool,
  /**
   * If the item is disabled
   */
  disabled: PropTypes.bool,
  /**
   * The onClick method to handle the click event on NavItems
   */
  onClick: PropTypes.func,
  /**
   * Additional data that is dispatched with click tracking event.
   */
  tracking: PropTypes.shape({
    label: PropTypes.string.isRequired,
    component: PropTypes.string,
    customParameters: PropTypes.object,
  }),
};

NavItem.defaultProps = {
  label: '',
  secondary: false,
  visible: true,
  defaultIcon: '',
  selectedIcon: '',
  selected: false,
  disabled: false,
  onClick: null,
};

export default NavItem;
