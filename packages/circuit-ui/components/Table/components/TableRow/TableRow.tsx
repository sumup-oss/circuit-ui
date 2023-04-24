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

import { FC, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { focusOutline } from '../../../../styles/style-mixins.js';
import { ClickEvent } from '../../../../types/events.js';

type TableRowProps = {
  onClick?: (event: ClickEvent<HTMLTableRowElement>) => void;
};

const baseStyles = () => css`
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
const clickableStyles = ({ onClick }: TableRowProps) =>
  onClick &&
  css`
    cursor: pointer;
    position: relative;

    &:focus {
      z-index: 1;
      transform: translate(0, 0);
      ${focusOutline()};
    }

    &:focus:not(:focus-visible) {
      box-shadow: none;
    }

    tbody &:focus,
    tbody &:hover {
      td,
      th {
        color: var(--cui-fg-accent-hovered);
        background-color: var(--cui-bg-normal-hovered);
      }
    }

    tbody &:active {
      td,
      th {
        color: var(--cui-fg-accent-pressed);
        background-color: var(--cui-bg-normal-pressed);
      }
    }
  `;

const Tr = styled.tr(baseStyles, clickableStyles);

/**
 * TableRow for the Table component. The Table handles rendering it.
 */
const TableRow: FC<PropsWithChildren<TableRowProps>> = ({
  onClick,
  ...props
}) => <Tr onClick={onClick} tabIndex={onClick ? 0 : undefined} {...props} />;
export default TableRow;
