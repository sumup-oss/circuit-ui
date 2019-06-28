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

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { withTheme } from 'emotion-theming';
import { sizes } from '../../../../styles/constants';
import {
  childrenPropType,
  themePropType
} from '../../../../util/shared-prop-types';

const { BYTE, KILO, MEGA, GIGA } = sizes;

const itemContainerActiveStyles = ({ theme, isActive }) =>
  isActive &&
  css`
    background-color: ${theme.colors.black};
  `;

const itemContainerBaseStyles = ({ theme, gutter }) => css`
  label: list-item__container;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-top: ${theme.spacings.bit};
  margin-bottom: ${theme.spacings.bit};
  padding: ${theme.spacings[gutter]};
  transition: background-color ${theme.transitions.default};
  text-decoration: none;
  border-radius: 4px;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

/**
 * Describe ListItem here.
 */
const ListItem = styled(props => {
  const {
    component: Component,
    children,
    isActive,
    theme,
    gutter,
    ...rest
  } = props;

  return <Component {...rest}>{children}</Component>;
})`
  ${itemContainerBaseStyles};
  ${itemContainerActiveStyles};
`;

ListItem.BYTE = BYTE;
ListItem.KILO = KILO;
ListItem.MEGA = MEGA;
ListItem.GIGA = GIGA;

ListItem.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object
  ]),
  /**
   * The label to show for this navigation item.
   */
  children: childrenPropType,
  /**
   * Whether to render the item with active styles.
   */
  isActive: PropTypes.bool,
  gutter: PropTypes.oneOf([
    ListItem.BYTE,
    ListItem.KILO,
    ListItem.MEGA,
    ListItem.GIGA
  ]),
  theme: themePropType.isRequired
};

ListItem.defaultProps = {
  component: 'li',
  isActive: false,
  children: null,
  gutter: ListItem.KILO
};

/**
 * @component
 */
export default withTheme(ListItem);
