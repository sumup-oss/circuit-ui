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

/** @jsx jsx */
import { FC, MouseEvent, KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';

import { focusOutline } from '../../../../styles/style-mixins';
import { StyleProps } from '../../../../styles/styled';

type TableRowProps = {
  onClick?: (
    event: MouseEvent<HTMLTableRowElement> | KeyboardEvent<HTMLTableRowElement>,
  ) => void;
};

const baseStyles = () => css`
  label: table-row;
  vertical-align: middle;

  tbody & {
    &:last-child {
      th,
      td {
        border-bottom: none;
      }
    }
  }
`;

// Chrome doesn't respect position: relative; on table elements
// so the transform property is used to create a separate stacking context
// which is needed to show the focus outline above the other table rows.
const clickableStyles = ({ theme, onClick }: StyleProps & TableRowProps) =>
  onClick &&
  css`
    label: table-row--clickable;
    cursor: pointer;
    position: relative;

    &:focus {
      z-index: 1;
      transform: translate(0, 0);
      ${focusOutline({ theme })};
    }

    tbody & {
      &:focus,
      &:hover {
        td,
        th {
          color: ${theme.colors.p500};
          background-color: ${theme.colors.n100};
        }
      }
    }
  `;

const Tr = styled.tr(baseStyles, clickableStyles);

const TableRow: FC<TableRowProps> = ({ onClick, ...props }) => (
  <Tr onClick={onClick} tabIndex={onClick ? 0 : undefined} {...props} />
);
export default TableRow;
