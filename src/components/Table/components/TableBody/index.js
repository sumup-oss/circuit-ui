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

import TableRow from '../TableRow';
import TableHeader from '../TableHeader';
import TableCell from '../TableCell';
import { mapProps, getChildren, RowPropType } from '../../utils';
import { TR_KEY_PREFIX, TD_KEY_PREFIX } from '../../constants';

const getRowKey = index => `${TR_KEY_PREFIX}-${index}`;
const getCellKey = (rowIndex, cellIndex) =>
  `${TD_KEY_PREFIX}-${rowIndex}-${cellIndex}`;

const TableBody = ({ rows, rowHeaders, sortHover, onRowClick }) => (
  <tbody>
    {rows.map((row, rowIndex) => (
      // eslint-disable-next-line react/no-array-index-key
      <TableRow
        key={getRowKey(rowIndex)}
        onClick={onRowClick && (() => onRowClick(rowIndex))}
      >
        {row.map((cell, cellIndex) =>
          rowHeaders && cellIndex === 0 ? (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={getCellKey(rowIndex, cellIndex)}>
              <TableHeader
                fixed
                scope={TableHeader.ROW}
                isHovered={sortHover === cellIndex}
                {...mapProps(cell)}
              />
              <TableCell role="presentation" aria-hidden="true">
                {getChildren(cell)}
              </TableCell>
            </Fragment>
          ) : (
            <TableCell
              // eslint-disable-next-line react/no-array-index-key
              key={getCellKey(rowIndex, cellIndex)}
              isHovered={sortHover === cellIndex}
              {...mapProps(cell)}
            />
          )
        )}
      </TableRow>
    ))}
  </tbody>
);

/**
 * [PRIVATE] TableHead for the Table component. The Table handles rendering it
 */
TableBody.propTypes = {
  /**
   * An array of rows with cells for the table. The Cell can be a string
   * or an object with options described on TableHeader component
   */
  rows: PropTypes.arrayOf(PropTypes.arrayOf(RowPropType)),
  /**
   * Enables/disables sticky columns on mobile
   */
  rowHeaders: PropTypes.bool,
  /**
   * [PRIVATE] The current hovered sort cell index
   * Handled internally
   */
  sortHover: PropTypes.number,
  /**
   * onClick handler
   */
  onRowClick: PropTypes.func
};

TableBody.defaultProps = {
  rows: [],
  rowHeaders: false,
  sortHover: null,
  onRowClick: null
};

export default TableBody;
