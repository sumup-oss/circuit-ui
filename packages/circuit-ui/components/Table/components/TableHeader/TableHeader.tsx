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

import { HTMLProps, FC } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

import { focusOutline, typography } from '../../../../styles/style-mixins';
import SortArrow from '../SortArrow';
import styled, { StyleProps } from '../../../../styles/styled';
import { SortParams } from '../../types';
import { ClickEvent } from '../../../../types/events';

export interface TableHeaderProps
  extends Omit<HTMLProps<HTMLTableHeaderCellElement>, 'onClick'> {
  /**
   * Aligns the content of the Header with text-align.
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Adds row or col styles based on the provided Scope.
   */
  scope?: 'col' | 'row';
  /**
   * Adds sticky style to the Header based on rowHeader definition.
   */
  fixed?: boolean;
  /**
   * Adds condensed style to the Header based on the table props.
   */
  condensed?: boolean;
  /**
   * Adds active styles to the Header if it is currently hovered by sort.
   */
  isHovered?: boolean;
  /**
   * Props related to table sorting. Defaults to not sortable.
   */
  onClick?: (
    event: ClickEvent<HTMLTableHeaderCellElement | HTMLButtonElement>,
  ) => void;
  /**
   * Props related to table sorting. Defaults to not sortable.
   */
  sortParams?: SortParams;
}

/**
 * <th> element styles.
 */
type ThElProps = Omit<TableHeaderProps, 'sortParams'> & {
  sortable: SortParams['sortable'];
  isSorted: SortParams['isSorted'];
};

const baseStyles = ({ theme, align }: StyleProps & ThElProps) => css`
  background-color: ${theme.colors.white};
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  padding: ${theme.spacings.giga};
  text-align: ${align};
  transition: background-color ${theme.transitions.default},
    color ${theme.transitions.default};
`;

const hoveredStyles = ({ theme, isHovered }: StyleProps & ThElProps) =>
  isHovered &&
  css`
    background-color: ${theme.colors.n100};
  `;

const colStyles = ({ theme, scope }: StyleProps & ThElProps) =>
  scope === 'col' &&
  css`
    ${typography('two')(theme)};
    color: ${theme.colors.n700};
    font-weight: ${theme.fontWeight.bold};
    padding: ${theme.spacings.byte} ${theme.spacings.giga};
    vertical-align: middle;
    white-space: nowrap;
  `;

const fixedStyles = ({ theme, fixed }: StyleProps & ThElProps) =>
  fixed &&
  css`
    ${theme.mq.untilMega} {
      left: 0;
      top: auto;
      position: absolute;
      width: 145px;
      overflow-wrap: break-word;
    }
  `;

const sortableStyles = ({ theme, sortable }: StyleProps & ThElProps) =>
  sortable &&
  css`
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
      ${focusOutline(theme)};
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

const sortableActiveStyles = ({ sortable, isSorted }: ThElProps) =>
  sortable &&
  isSorted &&
  css`
    & > button {
      opacity: 1;
    }
  `;

const condensedStyles = ({ condensed, theme }: StyleProps & ThElProps) =>
  condensed &&
  css`
    ${typography('two')(theme)};
    vertical-align: middle;
    padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  `;

const condensedColStyles = ({
  condensed,
  scope,
  theme,
}: StyleProps & ThElProps) =>
  condensed &&
  scope === 'col' &&
  css`
    padding: ${theme.spacings.byte} ${theme.spacings.mega};
  `;

const StyledHeader = styled('th', {
  shouldForwardProp: (prop) => isPropValid(prop),
})<ThElProps>(
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
 * TableHeader for the Table component. The Table handles rendering it.
 */
const TableHeader: FC<TableHeaderProps> = ({
  children,
  condensed,
  align = 'left',
  scope = 'col',
  fixed = false,
  isHovered = false,
  sortParams = { sortable: false },
  onClick,
  ...props
}) => {
  if (
    process.env.UNSAFE_DISABLE_ACCESSIBILITY_ERRORS !== 'true' &&
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    sortParams.sortable &&
    !sortParams.sortLabel
  ) {
    throw new Error(
      'The Table component is missing a `sortLabel` prop. This is an accessibility requirement. Omit the `sortable` prop if you intend to disable the row sorting functionality.',
    );
  }
  return (
    <StyledHeader
      condensed={condensed}
      align={align}
      scope={scope}
      fixed={fixed}
      isHovered={isHovered}
      sortable={sortParams.sortable}
      isSorted={!!sortParams.isSorted}
      aria-label={sortParams.sortLabel}
      aria-sort={
        sortParams.sortable ? sortParams.sortDirection || 'none' : undefined
      }
      onClick={onClick}
      {...props}
    >
      {sortParams.sortable && (
        <SortArrow
          label={sortParams.sortLabel}
          direction={sortParams.sortDirection}
          onClick={onClick}
        />
      )}
      {children}
    </StyledHeader>
  );
};

export default TableHeader;
