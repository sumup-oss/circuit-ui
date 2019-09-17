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

import SortArrow from '../SortArrow';
import { directions } from '../../../../styles/constants';
import { childrenPropType } from '../../../../util/shared-prop-types';
import { ASCENDING, DESCENDING, COL, ROW } from '../../constants';

const getAriaSort = (sortable, sortDirection) =>
  sortable ? sortDirection || 'none' : null;

const baseStyles = ({ theme, align }) => css`
  label: table-header;
  background-color: ${theme.colors.white};
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  padding: ${theme.spacings.giga};
  text-align: ${align};
  transition: background-color ${theme.transitions.default},
    color ${theme.transitions.default};
  white-space: nowrap;
`;

const hoveredStyles = ({ theme, isHovered }) =>
  isHovered &&
  css`
    label: table-cell--hover;
    background-color: ${theme.colors.n100};
  `;

const colStyles = ({ theme, scope }) =>
  scope === COL &&
  css`
    label: table-header--col;
    color: ${theme.colors.n700};
    font-size: ${theme.typography.text.kilo.fontSize};
    font-weight: ${theme.fontWeight.bold};
    padding: ${theme.spacings.byte} ${theme.spacings.giga};
    vertical-align: middle;
  `;

const fixedStyles = ({ theme, fixed }) =>
  fixed &&
  css`
    label: table-header--fixed;
    ${theme.mq.untilMega} {
      left: 0;
      top: auto;
      position: absolute;
      width: 145px;
      white-space: unset;
    }
  `;

const sortableStyles = ({ theme, sortable }) =>
  sortable &&
  css`
    label: table-header--sortable;
    cursor: pointer;
    position: relative;
    user-select: none;

    &:hover {
      background-color: ${theme.colors.n100};
      color: ${theme.colors.b500};

      & > span {
        opacity: 1;
      }
    }
  `;

const sortableActiveStyles = ({ sortable, isSorted }) =>
  sortable &&
  isSorted &&
  css`
    & > span {
      opacity: 1;
    }
  `;

const condensedStyles = ({ condensed, theme }) =>
  condensed &&
  css`
    label: table-header--condensed;
    vertical-align: middle;
    ${theme.typography.text.kilo};
    padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  `;

const condensedColStyles = ({ condensed, scope, theme }) =>
  condensed &&
  scope === COL &&
  css`
    label: table-header-condensed--col;
    padding: ${theme.spacings.byte} ${theme.spacings.mega};
  `;

const StyledHeader = styled.th`
  ${baseStyles};
  ${hoveredStyles};
  ${fixedStyles};
  ${colStyles};
  ${sortableStyles};
  ${sortableActiveStyles};
  ${condensedStyles};
  ${condensedColStyles};
`;

/**
 * TableHeader component for the Table. You shouldn't import this component
 * directly, the Table handles it
 */
const TableHeader = ({
  sortable,
  children,
  sortDirection,
  condensed,
  ...rest
}) => (
  <StyledHeader
    sortable={sortable}
    condensed={condensed}
    aria-sort={getAriaSort(sortable, sortDirection)}
    {...rest}
  >
    {sortable && <SortArrow condensed={condensed} direction={sortDirection} />}
    {children}
  </StyledHeader>
);

TableHeader.LEFT = directions.LEFT;
TableHeader.RIGHT = directions.RIGHT;
TableHeader.CENTER = directions.CENTER;
TableHeader.COL = COL;
TableHeader.ROW = ROW;

TableHeader.propTypes = {
  /**
   * Aligns the content of the Header with text-align
   */
  align: PropTypes.oneOf([
    TableHeader.LEFT,
    TableHeader.RIGHT,
    TableHeader.CENTER
  ]),
  /**
   * @private Adds ROL or COL styles based on the provided Scope.
   * Handled internally
   */
  scope: PropTypes.oneOf([TableHeader.COL, TableHeader.ROW]),
  /**
   * @private Adds sticky style to the Header based on rowHeader definition.
   * Handled internally
   */
  fixed: PropTypes.bool,
  /**
   * @private Adds condensed style to the Header based on the table props.
   * Handled internally
   */
  condensed: PropTypes.bool,
  /**
   * Defines whether or not the Header is sortable
   */
  sortable: PropTypes.bool,
  /**
   * @private Adds active style to the Header if it is currently hovered by
   * sort.
   * Handled internally
   */
  isHovered: PropTypes.bool,
  children: childrenPropType,
  sortDirection: PropTypes.oneOf([ASCENDING, DESCENDING]),
  /**
   * @private Adds sorted style to the Header if it is currently sorted
   * Handled internally
   */
  isSorted: PropTypes.bool
};

TableHeader.defaultProps = {
  align: TableHeader.LEFT,
  scope: TableHeader.COL,
  fixed: false,
  sortable: false,
  isHovered: false,
  children: null,
  sortDirection: null,
  isSorted: false,
  'data-testid': 'table-header'
};

export default TableHeader;
