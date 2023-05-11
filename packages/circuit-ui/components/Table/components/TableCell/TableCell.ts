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

import { css } from '@emotion/react';

import styled, { StyleProps } from '../../../../styles/styled';
import { typography } from '../../../../styles/style-mixins';

const PRESENTATION = 'presentation';

export type TableCellProps = {
  /**
   * Aligns the content of the Cell with text-align.
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Adds heading styles to placeholder Cell.
   */
  header?: boolean;
  /**
   * Adds active style to the Cell if it is currently hovered by sort.
   */
  isHovered?: boolean;
  condensed?: boolean;
  sortable?: boolean;
  role?: 'presentation';
};

const baseStyles = ({
  theme,
  align = 'left',
}: TableCellProps & StyleProps) => css`
  background-color: var(--cui-bg-normal);
  border-bottom: ${theme.borderWidth.kilo} solid var(--cui-border-divider);
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
    display: none;

    ${header &&
    css`
      ${typography('two')(theme)};
      font-weight: ${theme.fontWeight.bold};
      padding: ${theme.spacings.byte} ${theme.spacings.giga};
      white-space: nowrap;
    `}

    ${theme.mq.untilMega} {
      display: table-cell;
      min-width: 145px;
      max-width: 145px;
      width: 145px;
    }
  `;

const hoverStyles = ({ isHovered = false }: TableCellProps) =>
  isHovered &&
  css`
    background-color: var(--cui-bg-normal-hovered);
  `;

const condensedStyles = ({ condensed, theme }: TableCellProps & StyleProps) =>
  condensed &&
  css`
    padding: ${theme.spacings.kilo} ${theme.spacings.mega}
      ${theme.spacings.kilo} ${theme.spacings.giga};
    ${typography('two')(theme)};
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
    padding: ${theme.spacings.kilo} ${theme.spacings.mega}
      ${theme.spacings.kilo} ${theme.spacings.giga};
    ${typography('two')(theme)};

    ${header &&
    css`
      padding: ${theme.spacings.byte} ${theme.spacings.mega}
        ${theme.spacings.byte} ${theme.spacings.giga};
    `}
  `;

/**
 * TableCell for the Table component. The Table handles rendering it.
 */
const TableCell = styled.td<TableCellProps>(
  baseStyles,
  condensedStyles,
  presentationStyles,
  hoverStyles,
  condensedPresentationStyles,
);

export default TableCell;
