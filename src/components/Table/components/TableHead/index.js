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
import { noop } from 'lodash/fp';

import TableRow from '../TableRow';
import TableHeader from '../TableHeader';
import TableCell from '../TableCell';
import { mapCellProps, getCellChildren, RowPropType } from '../../utils';
import { ASCENDING, DESCENDING, TH_KEY_PREFIX } from '../../constants';

const TableHead = ({
  headers,
  rowHeaders,
  condensed,
  onSortBy,
  sortDirection,
  sortedRow,
  onSortEnter,
  onSortLeave
}) => (
  <thead>
    {!!headers.length && (
      <TableRow header>
        {headers.map((header, i) => {
          const cellProps = mapCellProps(header);
          return (
            <Fragment key={`${TH_KEY_PREFIX}-${i}`}>
              <TableHeader
                {...cellProps}
                condensed={condensed}
                fixed={rowHeaders && i === 0}
                // eslint-disable-next-line react/prop-types
                onClick={cellProps.sortable ? () => onSortBy(i) : null}
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
                  condensed={condensed}
                  role="presentation"
                  aria-hidden="true"
                  header
                >
                  {getCellChildren(header)}
                </TableCell>
              )}
            </Fragment>
          );
        })}
      </TableRow>
    )}
  </thead>
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
   * @private Adds condensed styles the table according to the table props.
   * Handled internally.
   */
  condensed: PropTypes.bool,
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
  onSortLeave: PropTypes.func
};

TableHead.defaultProps = {
  headers: [],
  rowHeaders: false,
  onSortBy: noop,
  sortDirection: null,
  sortedRow: null,
  onSortEnter: null,
  onSortLeave: null
};

export default TableHead;
