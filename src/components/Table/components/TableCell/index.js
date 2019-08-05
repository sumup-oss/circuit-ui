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

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { directions } from '../../../../styles/constants';

const PRESENTATION = 'presentation';

const baseStyles = ({ theme, align }) => css`
  label: table-cell;
  background-color: ${theme.colors.white};
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  padding: ${theme.spacings.giga};
  text-align: ${align};
  transition: background-color ${theme.transitions.default};
  vertical-align: middle;
  white-space: nowrap;
`;

const presentationStyles = ({ theme, role, header }) =>
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
      white-space: unset;
      width: 145px;
    }
  `;

const hoverStyles = ({ theme, isHovered }) =>
  isHovered &&
  css`
    label: table-cell--hover;
    background-color: ${theme.colors.n100};
  `;

const condensedStyles = ({ condensed, theme }) =>
  condensed &&
  css`
    label: table-cell--condensed;
    padding: ${theme.spacings.kilo} ${theme.spacings.mega};
    ${theme.typography.text.kilo};
  `;

const condensedPresentationStyles = ({ role, header, condensed, theme }) =>
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
const TableCell = styled.td`
  ${baseStyles};
  ${condensedStyles};
  ${presentationStyles};
  ${hoverStyles};
  ${condensedPresentationStyles};
`;

TableCell.LEFT = directions.LEFT;
TableCell.RIGHT = directions.RIGHT;
TableCell.CENTER = directions.CENTER;

TableCell.propTypes = {
  /**
   * Aligns the content of the Cell with text-align
   */
  align: PropTypes.oneOf([TableCell.LEFT, TableCell.RIGHT, TableCell.CENTER]),
  /**
   * @private Add heading styles to placeholder Cell.
   * Handled internally
   */
  header: PropTypes.bool,
  /**
   * @private Adds active style to the Cell if it is currently hovered by
   * sort.
   * Handled internally
   */
  isHovered: PropTypes.bool
};

TableCell.defaultProps = {
  align: TableCell.LEFT,
  header: false,
  isHovered: false
};

export default TableCell;
