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

import { mapRowProps, mapCellProps } from '../../utils';
import { Row } from '../../types';
import TableRow from '../TableRow';
import TableHeader from '../TableHeader';
import TableCell from '../TableCell';

type TableBodyProps = {
  /**
   * An array of rows or an object with children containing an array of cells
   * for the table.
   */
  rows?: Row[];
  /**
   * Enables/disables sticky columns on mobile.
   */
  rowHeaders?: boolean;
  /**
   * The current hovered sort cell index.
   */
  sortHover?: number;
  /**
   * Adds condensed styles to the table.
   */
  condensed?: boolean;
  /**
   * A function to call when the row is clicked.
   */
  onRowClick?: (rowIndex: number) => void;
};

/**
 * TableBody for the Table component. The Table handles rendering it.
 */
const TableBody = ({
  rows = [],
  condensed,
  rowHeaders = false,
  sortHover,
  onRowClick,
}: TableBodyProps): JSX.Element => (
  <tbody>
    {rows.map((row, rowIndex) => {
      const { cells, ...props } = mapRowProps(row);
      return (
        <TableRow
          key={`table-row-${rowIndex}`}
          onClick={onRowClick ? () => onRowClick(rowIndex) : undefined}
          {...props}
        >
          {cells.map((cell, cellIndex) =>
            rowHeaders && cellIndex === 0 ? (
              <TableHeader
                key={`table-cell-${rowIndex}-${cellIndex}`}
                fixed
                condensed={condensed}
                scope="row"
                isHovered={sortHover === cellIndex}
                sortParams={{ sortable: false }}
                {...mapCellProps(cell)}
              />
            ) : (
              <TableCell
                key={`table-cell-${rowIndex}-${cellIndex}`}
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

export default TableBody;
