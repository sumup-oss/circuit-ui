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
import { getSelectedChildIndex, getSecondaryChild } from './utils';
import { childrenPropType } from '../../../../util/shared-prop-types';

const SUB_NAV_ITEM_HEIGHT = 32;

/* eslint-disable max-len */
const baseStyles = ({ theme }) => css`
  label: sub-nav-list;
  margin: -${theme.spacings.byte} 0 ${theme.spacings.byte} ${theme.spacings.tera};
  list-style: none;
  height: 0;
  position: absolute;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
`;
/* eslint-enable max-len */

const visibleStyles = ({ theme, visible, children }) =>
  visible &&
  css`
    label: sub-nav-list--visible;
    height: calc(${SUB_NAV_ITEM_HEIGHT}px * ${children.length});
    position: relative;
    opacity: 1;
    visibility: visible;
    transition: height ${theme.transitions.default},
      opacity ${theme.transitions.default} 100ms,
      visibility ${theme.transitions.default} 100ms;
  `;

const listStyles = ({ theme, children }) =>
  children &&
  css`
    label: sub-nav-list__children;
    &::before {
      content: '';
      width: 2px;
      background: ${theme.colors.n700};
      height: calc(${SUB_NAV_ITEM_HEIGHT}px * ${children.length});
      position: absolute;
      top: 0;
      border-radius: ${theme.borderRadius.kilo};
    }
  `;

const selectedItemStyles = ({ theme, selectedChildIndex }) =>
  selectedChildIndex >= 0 &&
  css`
    label: sub-nav-list--selected;
    &::after {
      content: '';
      width: 2px;
      background: ${theme.colors.p500};
      height: ${SUB_NAV_ITEM_HEIGHT}px;
      border-radius: ${theme.borderRadius.kilo};
      position: absolute;
      top: calc(${SUB_NAV_ITEM_HEIGHT}px * ${selectedChildIndex});
      transition: top ${theme.transitions.default};
    }
  `;

const SubNavigationContainer = styled.ul(
  baseStyles,
  selectedItemStyles,
  listStyles,
  visibleStyles
);

const SubNavList = ({ children, visible }) => (
  <SubNavigationContainer
    visible={visible}
    selectedChildIndex={getSelectedChildIndex(children)}
  >
    {getSecondaryChild(children, visible)}
  </SubNavigationContainer>
);

SubNavList.propTypes = {
  /**
   * The children component passed to the SubNavList
   */
  children: childrenPropType,
  /**
   * If the SubNavList is currently visible
   */
  visible: PropTypes.bool
};

SubNavList.defaultProps = {
  children: null,
  visible: false
};

/**
 * @component
 */
export default SubNavList;
