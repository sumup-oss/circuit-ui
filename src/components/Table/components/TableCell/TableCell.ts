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

import { FC } from 'react';
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../../../styles/styled';

const PRESENTATION = 'presentation';

type TableCellProps = {
  /**
   * Aligns the content of the Cell with text-align
   */
  align?: 'left' | 'right' | 'center';
  /**
   * @private Add heading styles to placeholder Cell.
   * Handled internally
   */
  header?: boolean;
  /**
   * @private Adds active style to the Cell if it is currently hovered by
   * sort.
   * Handled internally
   */
  isHovered?: boolean;
  condensed?: boolean;
  sortable?: boolean;
  role?: 'presentation';
  ['data-testid']: string;
};

const baseStyles = ({
  theme,
  align = 'left',
}: TableCellProps & StyleProps) => css`
  label: table-cell;
  background-color: ${theme.colors.white};
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  padding: ${theme.spacings.giga};
  text-align: ${align};
  transition: background-color ${theme.transitions.default};
  vertical-align: middle;
  overflow-wrap: break-word;
`;

const presentationStyles = ({
  theme,
  role,
  header = false,
}: TableCellProps & StyleProps) =>
  role === PRESENTATION &&
  css`
    label: table-cell--presentation;
    display: none;

    ${header &&
    css`
      font-size: ${theme.typography.text.kilo.fontSize};
      font-weight: ${theme.fontWeight.bold};
      padding: ${theme.spacings.byte} ${theme.spacings.giga};
    `}

    ${theme.mq.untilMega} {
      display: table-cell;
      min-width: 145px;
      max-width: 145px;
      width: 145px;
    }
  `;

const hoverStyles = ({
  theme,
  isHovered = false,
}: TableCellProps & StyleProps) =>
  isHovered &&
  css`
    label: table-cell--hover;
    background-color: ${theme.colors.n100};
  `;

const condensedStyles = ({ condensed, theme }: TableCellProps & StyleProps) =>
  condensed &&
  css`
    label: table-cell--condensed;
    padding: ${theme.spacings.kilo} ${theme.spacings.mega};
    ${theme.typography.text.kilo};
  `;

const condensedPresentationStyles = ({
  role,
  header = false,
  condensed,
  theme,
}: TableCellProps & StyleProps) =>
  condensed &&
  role === PRESENTATION &&
  css`
    label: table-cell-presentation--condensed;
    padding: ${theme.spacings.kilo} ${theme.spacings.mega};
    ${theme.typography.text.kilo};
    ${header &&
    css`
      padding: ${theme.spacings.byte} ${theme.spacings.mega};
    `}
  `;

/**
 * TableCell component for the Table. You shouldn't import this component
 * directly, the Table handles it
 */
const TableCell: FC<TableCellProps> = styled.td`
  ${baseStyles};
  ${condensedStyles};
  ${presentationStyles};
  ${hoverStyles};
  ${condensedPresentationStyles};
`;

TableCell.defaultProps = {
  'data-testid': 'table-cell',
};

export default TableCell;
