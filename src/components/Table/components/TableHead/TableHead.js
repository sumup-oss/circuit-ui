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
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import TableRow from '../TableRow';
import TableHeader from '../TableHeader';
import TableCell from '../TableCell';
import { mapCellProps, getCellChildren, RowPropType } from '../../utils';
import { ASCENDING, DESCENDING, TH_KEY_PREFIX } from '../../constants';

const fixedStyles = ({ scrollable, top, rowHeaders, theme }) =>
  scrollable &&
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

const TableHead = ({
  headers,
  rowHeaders,
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
      <TableRow header>
        {headers.map((header, i) => {
          const cellProps = mapCellProps(header);
          return (
            <Fragment key={`${TH_KEY_PREFIX}-${i}`}>
              <TableHeader
                {...cellProps}
                condensed={condensed}
                scrollable={scrollable}
                fixed={rowHeaders && i === 0}
                onClick={
                  cellProps.sortable ? onSortBy && (() => onSortBy(i)) : null
                }
                onMouseEnter={
                  cellProps.sortable
                    ? onSortEnter && (() => onSortEnter(i))
                    : null
                }
                onMouseLeave={
                  cellProps.sortable
                    ? onSortLeave && (() => onSortLeave(i))
                    : null
                }
                sortDirection={sortedRow === i ? sortDirection : null}
                isSorted={sortedRow === i}
              />
              {rowHeaders && i === 0 && (
                <TableCell
                  header
                  condensed={condensed}
                  scrollable={scrollable}
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

/**
 * @private TableHead for the Table component. The Table handlers rendering it
 */
TableHead.propTypes = {
  /**
   * An array of headers for the table. The Header can be a string or an object
   * with options described on TableHeader component
   */
  headers: PropTypes.arrayOf(RowPropType),
  /**
   * Enables/disables sticky columns on mobile
   */
  rowHeaders: PropTypes.bool,
  /**
   * @private Adds condensed styles the table head according to the table props.
   * Handled internally.
   */
  condensed: PropTypes.bool,
  /**
   * @private Adds scrollable styles the table head according to the table props.
   * Handled internally.
   */
  scrollable: PropTypes.bool,
  /**
   * @private The value used to make the thead fixed while scrolling.
   * Handled internally.
   */
  top: PropTypes.number,
  /**
   * @private sortBy handler
   */
  onSortBy: PropTypes.func,
  /**
   * @private The current sortDirection
   */
  sortDirection: PropTypes.oneOf([ASCENDING, DESCENDING]),
  /**
   * @private The current sorted row index
   */
  sortedRow: PropTypes.number,
  /**
   * @private sortEnter handler
   */
  onSortEnter: PropTypes.func,
  /**
   * @private sortLeave handler
   */
  onSortLeave: PropTypes.func,
};

TableHead.defaultProps = {
  headers: [],
  rowHeaders: false,
  sortDirection: null,
  sortedRow: null,
};

export default TableHead;
