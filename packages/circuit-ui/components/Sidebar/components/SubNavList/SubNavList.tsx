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

import { HTMLAttributes } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../../../styles/styled';
import {
  Child,
  getSelectedChildIndex,
  getSecondaryChildren,
  getChildrenLength,
} from '../../SidebarService';

// @ts-expect-error Wontfix: this component is deprecated.
export interface SubNavListProps extends HTMLAttributes<HTMLUListElement> {
  children?: Child | Child[];
  /**
   * If the SubNavList is currently visible
   */
  visible?: boolean;
}
const SUB_NAV_ITEM_HEIGHT = 32;

/* eslint-disable max-len */
const baseStyles = ({ theme }: StyleProps) => css`
  margin: -${theme.spacings.byte} 0 ${theme.spacings.byte} ${theme.spacings.tera};
  list-style: none;
  height: 0;
  position: absolute;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
`;
/* eslint-enable max-len */

const visibleStyles = ({
  theme,
  visible,
  children,
}: StyleProps & SubNavListProps) =>
  visible &&
  css`
    height: calc(${SUB_NAV_ITEM_HEIGHT}px * ${getChildrenLength(children)});
    position: relative;
    opacity: 1;
    visibility: inherit;
    transition: height ${theme.transitions.default},
      opacity ${theme.transitions.default} 100ms,
      visibility ${theme.transitions.default} 100ms;
  `;

const listStyles = ({ theme, children }: StyleProps & SubNavListProps) =>
  children &&
  css`
    &::before {
      content: '';
      width: 2px;
      background: ${theme.colors.n500};
      height: calc(${SUB_NAV_ITEM_HEIGHT}px * ${getChildrenLength(children)});
      position: absolute;
      top: 0;
      border-radius: 1px;
    }
  `;

const selectedItemStyles = ({
  theme,
  selectedChildIndex,
}: StyleProps & { selectedChildIndex: number }) =>
  selectedChildIndex &&
  selectedChildIndex >= 0 &&
  css`
    &::after {
      content: '';
      width: 2px;
      background: ${theme.colors.p500};
      height: ${SUB_NAV_ITEM_HEIGHT}px;
      border-radius: 1px;
      position: absolute;
      top: calc(${SUB_NAV_ITEM_HEIGHT}px * ${selectedChildIndex});
      transition: top ${theme.transitions.default};
    }
  `;

const SubNavigationContainer = styled.ul<
  SubNavListProps & { selectedChildIndex: number }
>(baseStyles, selectedItemStyles, listStyles, visibleStyles);

export function SubNavList({
  children,
  visible = false,
  ...props
}: SubNavListProps): JSX.Element {
  return (
    <SubNavigationContainer
      {...props}
      visible={visible}
      selectedChildIndex={getSelectedChildIndex(children)}
      // @ts-expect-error Wontfix: this component is deprecated.
      // eslint-disable-next-line react/no-children-prop
      children={getSecondaryChildren(children, visible)}
    />
  );
}
