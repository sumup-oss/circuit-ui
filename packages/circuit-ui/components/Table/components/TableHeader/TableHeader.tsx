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

import React, { HTMLProps, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

import { focusOutline } from '../../../../styles/style-mixins';
import { isFunction } from '../../../../util/type-check';
import SortArrow from '../SortArrow';
import styled, { StyleProps } from '../../../../styles/styled';

export interface TableHeaderProps
  extends HTMLProps<HTMLTableHeaderCellElement> {
  /**
   * Aligns the content of the Header with text-align
   */
  align?: 'left' | 'right' | 'center';
  /**
   * @private Adds row or col styles based on the provided Scope.
   * Handled internally
   */
  scope?: 'col' | 'row';
  /**
   * @private Adds sticky style to the Header based on rowHeader definition.
   * Handled internally
   */
  fixed?: boolean;
  /**
   * @private Adds condensed style to the Header based on the table props.
   * Handled internally
   */
  condensed?: boolean;
  /**
   * Defines whether or not the Header is sortable
   */
  sortable?: boolean;
  /**
   * Visually hidden label for the sort button for visually impaired users.
   * When passed as a function, it is called with the sort `{ direction }`.
   */
  sortLabel?:
    | string
    | (({ direction }: { direction?: 'ascending' | 'descending' }) => string);
  /**
   * @private Adds active style to the Header if it is currently hovered by
   * sort.
   * Handled internally
   */
  isHovered?: boolean;
  sortDirection?: 'ascending' | 'descending';
  /**
   * @private Adds sorted style to the Header if it is currently sorted
   * Handled internally
   */
  isSorted?: boolean;
  onClick?: (
    event:
      | MouseEvent<HTMLTableHeaderCellElement | HTMLButtonElement>
      | KeyboardEvent<HTMLTableHeaderCellElement | HTMLButtonElement>,
  ) => void;
  /**
   * @private A testid for selecting table cells in tests. Handled internally.
   */
  ['data-testid']?: string;
  children: ReactNode;
}

const getAriaSort = (
  sortable: boolean,
  sortDirection?: 'ascending' | 'descending',
) => (sortable ? sortDirection || 'none' : undefined);

const getLabelSort = (
  sortable?: boolean,
  sortDirection?: 'ascending' | 'descending',
  sortLabel?:
    | string
    | (({ direction }: { direction?: 'ascending' | 'descending' }) => string),
) => {
  if (!sortable) {
    return undefined;
  }
  return isFunction(sortLabel)
    ? sortLabel({ direction: sortDirection })
    : sortLabel;
};

const baseStyles = ({ theme, align }: StyleProps & StyledHeaderProps) => css`
  label: table-header;
  background-color: ${theme.colors.white};
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  padding: ${theme.spacings.giga};
  text-align: ${align};
  transition: background-color ${theme.transitions.default},
    color ${theme.transitions.default};
`;

const hoveredStyles = ({ theme, isHovered }: StyleProps & StyledHeaderProps) =>
  isHovered &&
  css`
    label: table-cell--hover;
    background-color: ${theme.colors.n100};
  `;

const colStyles = ({ theme, scope }: StyleProps & StyledHeaderProps) =>
  scope === 'col' &&
  css`
    label: table-header--col;
    color: ${theme.colors.n700};
    font-size: ${theme.typography.text.kilo.fontSize};
    font-weight: ${theme.fontWeight.bold};
    padding: ${theme.spacings.byte} ${theme.spacings.giga};
    vertical-align: middle;
  `;

const fixedStyles = ({ theme, fixed }: StyleProps & StyledHeaderProps) =>
  fixed &&
  css`
    label: table-header--fixed;
    ${theme.mq.untilMega} {
      left: 0;
      top: auto;
      position: absolute;
      width: 145px;
      overflow-wrap: break-word;
    }
  `;

const sortableStyles = ({ theme, sortable }: StyleProps & StyledHeaderProps) =>
  sortable &&
  css`
    label: table-header--sortable;
    cursor: pointer;
    position: relative;
    user-select: none;

    &:focus-within::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      ${focusOutline({ theme })};
    }

    &:focus-within,
    &:hover {
      background-color: ${theme.colors.n100};
      color: ${theme.colors.b500};

      & > button {
        opacity: 1;
      }
    }
  `;

const sortableActiveStyles = ({
  sortable,
  isSorted,
}: StyleProps & StyledHeaderProps) =>
  sortable &&
  isSorted &&
  css`
    & > button {
      opacity: 1;
    }
  `;

const condensedStyles = ({
  condensed,
  theme,
}: StyleProps & StyledHeaderProps) =>
  condensed &&
  css`
    label: table-header--condensed;
    vertical-align: middle;
    ${theme.typography.text.kilo};
    padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  `;

const condensedColStyles = ({
  condensed,
  scope,
  theme,
}: StyleProps & StyledHeaderProps) =>
  condensed &&
  scope === 'col' &&
  css`
    label: table-header-condensed--col;
    padding: ${theme.spacings.byte} ${theme.spacings.mega};
  `;

type StyledHeaderProps = Omit<TableHeaderProps, 'sortDirection' | 'sortLabel'>;

const StyledHeader = styled('th', {
  shouldForwardProp: (prop) => isPropValid(prop),
})<StyledHeaderProps>(
  baseStyles,
  hoveredStyles,
  fixedStyles,
  colStyles,
  sortableStyles,
  sortableActiveStyles,
  condensedStyles,
  condensedColStyles,
);

/**
 * TableHeader component for the Table. You shouldn't import this component
 * directly, the Table handles it
 */
const TableHeader: React.FC<TableHeaderProps> = ({
  sortLabel,
  sortable = false,
  children,
  sortDirection,
  condensed,
  onClick,
  align = 'left',
  scope = 'col',
  fixed = false,
  isHovered = false,
  isSorted = false,
  ...props
}) => {
  const label = getLabelSort(sortable, sortDirection, sortLabel);
  return (
    <StyledHeader
      sortable={sortable}
      condensed={condensed}
      aria-sort={getAriaSort(sortable, sortDirection)}
      aria-label={label}
      onClick={onClick}
      align={align}
      scope={scope}
      fixed={fixed}
      isHovered={isHovered}
      isSorted={isSorted}
      data-testid="table-header"
      {...props}
    >
      {sortable && (
        <SortArrow label={label} direction={sortDirection} onClick={onClick} />
      )}
      {children}
    </StyledHeader>
  );
};

export default TableHeader;
