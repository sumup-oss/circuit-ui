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

import React, { Fragment } from 'react';
import { css } from '@emotion/core';

import TableRow from '../TableRow';
import TableHeader from '../TableHeader';
import TableCell from '../TableCell';
import { mapCellProps, getCellChildren, getSortParams } from '../../utils';
import { Cell, Direction } from '../../types';
import styled, { StyleProps } from '../../../../styles/styled';

type ScrollableOptions =
  | {
      /**
       * Adds scrollable styles the table head according to the table props.
       */
      scrollable: true;
      /**
       * The value used to make the thead fixed while scrolling.
       */
      top: number;
    }
  | {
      scrollable?: boolean;
      top?: number;
    };

type TableHeadProps = ScrollableOptions & {
  /**
   * An array of header cells for the table.
   */
  headers?: Cell[];
  /**
   * Enables/disables sticky columns on mobile
   */
  rowHeaders?: boolean;
  /**
   * Adds condensed styles the table head according to the table props.
   */
  condensed?: boolean;
  /**
   * sortBy handler
   */
  onSortBy?: (i: number) => void;
  /**
   * The current sortDirection
   */
  sortDirection?: Direction;
  /**
   * The current sorted row index
   */
  sortedRow?: number;
  /**
   * sortEnter handler
   */
  onSortEnter?: (i: number) => void;
  /**
   * sortLeave handler
   */
  onSortLeave?: (i: number) => void;
};

type TheadElProps = Pick<TableHeadProps, 'scrollable' | 'top' | 'rowHeaders'>;

const fixedStyles = ({
  scrollable,
  top,
  rowHeaders,
  theme,
}: TheadElProps & StyleProps) =>
  scrollable &&
  top && // we need this check despite the TS types
  css`
    label: table-head--fixed;
    transform: translateY(${top}px);

    ${theme.mq.untilMega} {
      transform: ${rowHeaders ? 'unset' : `translateY(${top}px)`};
    }
  `;

const Thead = styled.thead<TheadElProps>`
  ${fixedStyles}
`;

/**
 * TableHead for the Table component. The Table handles rendering it.
 */
const TableHead = ({
  headers = [],
  rowHeaders = false,
  condensed,
  scrollable,
  top,
  onSortBy,
  sortDirection,
  sortedRow,
  onSortEnter,
  onSortLeave,
}: TableHeadProps): JSX.Element => (
  <Thead scrollable={scrollable} top={top} rowHeaders={rowHeaders}>
    {!!headers.length && (
      <TableRow>
        {headers.map((header, i) => {
          const cellProps = mapCellProps(header);
          const { sortable, sortLabel } = cellProps;
          const sortParams = getSortParams({
            rowIndex: i,
            sortable,
            sortDirection,
            sortLabel,
            sortedRow,
          });
          return (
            <Fragment key={`table-header-${i}`}>
              <TableHeader
                {...cellProps}
                condensed={condensed}
                fixed={rowHeaders && i === 0}
                onClick={
                  sortParams.sortable
                    ? onSortBy && (() => onSortBy(i))
                    : undefined
                }
                onMouseEnter={
                  sortParams.sortable
                    ? onSortEnter && (() => onSortEnter(i))
                    : undefined
                }
                onMouseLeave={
                  sortParams.sortable
                    ? onSortLeave && (() => onSortLeave(i))
                    : undefined
                }
                sortParams={sortParams}
              />
              {rowHeaders && i === 0 && (
                <TableCell
                  header
                  condensed={condensed}
                  role="presentation"
                  aria-hidden="true"
                >
                  {getCellChildren(header)}
                </TableCell>
              )}
            </Fragment>
          );
        })}
      </TableRow>
    )}
  </Thead>
);

export default TableHead;
