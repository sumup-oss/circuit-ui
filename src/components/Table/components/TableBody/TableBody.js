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

import {
  mapRowProps,
  mapCellProps,
  getCellChildren,
  RowPropType,
} from '../../utils';
import { TR_KEY_PREFIX, TD_KEY_PREFIX } from '../../constants';
import TableRow from '../TableRow';
import TableHeader from '../TableHeader';
import TableCell from '../TableCell';

const getRowKey = (index) => `${TR_KEY_PREFIX}-${index}`;
const getCellKey = (rowIndex, cellIndex) =>
  `${TD_KEY_PREFIX}-${rowIndex}-${cellIndex}`;

const TableBody = ({ rows, condensed, rowHeaders, sortHover, onRowClick }) => (
  <tbody>
    {rows.map((row, rowIndex) => {
      const { cells, ...props } = mapRowProps(row);
      return (
        <TableRow
          key={getRowKey(rowIndex)}
          data-testid="table-row"
          onClick={onRowClick ? () => onRowClick(rowIndex) : null}
          {...props}
        >
          {cells.map((cell, cellIndex) =>
            rowHeaders && cellIndex === 0 ? (
              <Fragment key={getCellKey(rowIndex, cellIndex)}>
                <TableHeader
                  fixed
                  condensed={condensed}
                  scope={'row'}
                  isHovered={sortHover === cellIndex}
                  {...mapCellProps(cell)}
                />
                <TableCell
                  role="presentation"
                  condensed={condensed}
                  aria-hidden="true"
                >
                  {getCellChildren(cell)}
                </TableCell>
              </Fragment>
            ) : (
              <TableCell
                key={getCellKey(rowIndex, cellIndex)}
                condensed={condensed}
                isHovered={sortHover === cellIndex}
                {...mapCellProps(cell)}
              />
            ),
          )}
        </TableRow>
      );
    })}
  </tbody>
);

/**
 * @private TableHead for the Table component. The Table handles rendering it
 */
TableBody.propTypes = {
  /**
   *(An array of rows or object with children) containing cells for the table. The Cell can be a string
   * or an object with options described on TableHeader component
   */
  rows: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({ cells: PropTypes.arrayOf(RowPropType) }),
      PropTypes.arrayOf(RowPropType),
    ]),
  ),
  /**
   * Enables/disables sticky columns on mobile
   */
  rowHeaders: PropTypes.bool,
  /**
   * @private The current hovered sort cell index
   * Handled internally
   */
  sortHover: PropTypes.number,
  /**
   * @private Adds condensed styles to the table.
   * Handled internally
   */
  condensed: PropTypes.bool,
  /**
   * onClick handler
   */
  onRowClick: PropTypes.func,
};

TableBody.defaultProps = {
  rows: [],
  rowHeaders: false,
  sortHover: null,
  onRowClick: null,
};

export default TableBody;
