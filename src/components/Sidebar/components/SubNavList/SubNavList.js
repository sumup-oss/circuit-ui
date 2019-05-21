import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import getSelectedChildIndex from './utils';
import { childrenPropType } from '../../../../util/shared-prop-types';

const SUB_NAV_ITEM_HEIGHT = 32;

/* eslint-disable max-len */
const baseStyles = ({ theme }) => css`
  label: sub-nav-list;
  margin: -${theme.spacings.byte} 0 ${theme.spacings.byte} ${theme.spacings.peta};
  list-style: none;
  height: auto;
  position: relative;
`;
/* eslint-enable max-len */

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
  listStyles
);

const SubNavList = ({ children }) => (
  <SubNavigationContainer selectedChildIndex={getSelectedChildIndex(children)}>
    {children}
  </SubNavigationContainer>
);

SubNavList.propTypes = {
  /**
   * The children component passed to the SubNavList
   */
  children: childrenPropType
};

SubNavList.defaultProps = {
  children: null
};

/**
 * @component
 */
export default SubNavList;
