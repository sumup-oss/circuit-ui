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

import { ReactElement } from 'react';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../../../styles/styled.js';
import { ClickEvent } from '../../../../types/events.js';
import { EmotionAsPropType } from '../../../../types/prop-types.js';
import { useComponents } from '../../../ComponentsContext/index.js';
import { getIcon } from '../../SidebarService.jsx';
import { NavLabel } from '../NavLabel/index.js';

export interface NavItemProps {
  /**
   * The label of a NavItem
   */
  label?: string;
  /**
   * If the NavItem is a secondary navigation item
   */
  secondary?: boolean;
  /**
   * If the NavItem is visible (it can be hidden when secondary)
   */
  visible?: boolean;
  /**
   * The icon to be shown when the NavItem is not selected
   */
  defaultIcon?: ReactElement;
  /**
   * The icon to be shown when the NavItem is selected
   */
  selectedIcon?: ReactElement;
  /**
   * If the item is selected
   */
  selected?: boolean;
  /**
   * If the item is disabled
   */
  disabled?: boolean;
  /**
   * The onClick method to handle the click event on NavItems
   */
  onClick?: (event: ClickEvent) => void;
}

const baseStyles = ({ theme }: StyleProps) => css`
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

const secondaryStyles = ({ theme, secondary }: StyleProps & NavItemProps) =>
  secondary &&
  css`
    margin: 0px ${theme.spacings.giga};
    padding: ${theme.spacings.bit} 0px;
    transition: color ${theme.transitions.default},
      top ${theme.transitions.default};
  `;

const hoverStyles = ({
  theme,
  selected,
  disabled,
}: StyleProps & NavItemProps) =>
  !disabled &&
  !selected &&
  css`
    &:hover {
      color: ${theme.colors.n100};
    }
  `;

const selectedStyles = ({ theme, selected }: StyleProps & NavItemProps) =>
  selected &&
  css`
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.white};
  `;

const disabledStyles = ({ theme, disabled }: StyleProps & NavItemProps) =>
  disabled &&
  css`
    cursor: not-allowed;
    color: ${theme.colors.n500};
  `;

const NavLink = styled('a', {
  shouldForwardProp: isPropValid,
})(baseStyles, hoverStyles, selectedStyles, secondaryStyles, disabledStyles);

export function NavItem({
  label,
  secondary = false,
  visible = true,
  defaultIcon,
  selectedIcon,
  selected = false,
  disabled = false,
  onClick,
  ...props
}: NavItemProps): JSX.Element {
  const { Link } = useComponents();

  const icon = getIcon({ defaultIcon, selected, selectedIcon, disabled });

  return (
    <li
      css={css`
        /* the default display: list-item breaks spacing on Safari */
        display: block;
      `}
    >
      <NavLink
        as={Link as EmotionAsPropType}
        onClick={!disabled ? onClick : undefined}
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
}
