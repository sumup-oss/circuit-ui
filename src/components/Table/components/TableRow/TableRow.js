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
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { isEnter, isSpacebar } from '../../../../util/key-codes';
import { focusOutline } from '../../../../styles/style-helpers';

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

const clickableStyles = ({ theme, onClick }) =>
  onClick &&
  css`
    label: table-row--clickable;
    cursor: pointer;
    position: relative;

    &:focus::after {
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

const TableRow = ({ onClick, ...props }) => {
  const handleKeyDown = event => {
    if (isEnter(event) || isSpacebar(event)) {
      onClick();
    }
  };
  return (
    <Tr
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : null}
      tabIndex={onClick ? '0' : undefined}
      {...props}
    />
  );
};

export default TableRow;
