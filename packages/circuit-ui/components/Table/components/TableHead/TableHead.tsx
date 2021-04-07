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
import { mapCellProps, getCellChildren } from '../../utils';
import { Cell, Direction } from '../../types';
import { TH_KEY_PREFIX } from '../../constants';
import styled, { StyleProps } from '../../../../styles/styled';

type ScrollableOptions =
  | {
      /**
       * @private Adds scrollable styles the table head according to the table props.
       * Handled internally.
       */
      scrollable: true;
      /**
       * @private The value used to make the thead fixed while scrolling.
       * Handled internally.
       */
      top: number;
    }
  | {
      scrollable?: boolean;
      top?: number;
    };

type TableHeadProps = ScrollableOptions & {
  /**
   * An array of headers for the table. The Header can be a string or an object
   * with options described on TableHeader component
   */
  headers?: Cell[];
  /**
   * Enables/disables sticky columns on mobile
   */
  rowHeaders?: boolean;
  /**
   * @private Adds condensed styles the table head according to the table props.
   * Handled internally.
   */
  condensed?: boolean;
  /**
   * @private sortBy handler
   */
  onSortBy?: (i: number) => void;
  /**
   * @private The current sortDirection
   */
  sortDirection?: Direction;
  /**
   * @private The current sorted row index
   */
  sortedRow?: number;
  /**
   * @private sortEnter handler
   */
  onSortEnter?: (i: number) => void;
  /**
   * @private sortLeave handler
   */
  onSortLeave?: (i: number) => void;
};

const fixedStyles = ({
  scrollable,
  top,
  rowHeaders,
  theme,
}: StyleProps & TableHeadProps) =>
  scrollable &&
  top && // we need this check despite the TS types
  css`
    label: table-head--fixed;
    transform: translateY(${top}px);

    ${theme.mq.untilMega} {
      transform: ${rowHeaders ? 'unset' : `translateY(${top}px)`};
    }
  `;

const Thead = styled.thead`
  ${fixedStyles}
`;

const TableHead: React.FC<TableHeadProps> = ({
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
}) => (
  <Thead scrollable={scrollable} top={top} rowHeaders={rowHeaders}>
    {!!headers.length && (
      <TableRow>
        {headers.map((header, i) => {
          const cellProps = mapCellProps(header);
          return (
            <Fragment key={`${TH_KEY_PREFIX}-${i}`}>
              <TableHeader
                {...cellProps}
                condensed={condensed}
                fixed={rowHeaders && i === 0}
                onClick={
                  cellProps.sortable
                    ? onSortBy && (() => onSortBy(i))
                    : undefined
                }
                onMouseEnter={
                  cellProps.sortable
                    ? onSortEnter && (() => onSortEnter(i))
                    : undefined
                }
                onMouseLeave={
                  cellProps.sortable
                    ? onSortLeave && (() => onSortLeave(i))
                    : undefined
                }
                sortDirection={sortedRow === i ? sortDirection : undefined}
                isSorted={sortedRow === i}
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
