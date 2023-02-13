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

import { useCallback } from 'react';

import {
  mapCellProps,
  useExpandableTableOptions,
} from '../../utils';
import { Direction, OnSortBy, Row } from '../../types';
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
  /**
   * The current sortDirection
   */
  sortDirection?: Direction;
  /**
   * The current sorted row index
   */
  sortedRow?: number;
  /**
   * custom sort function
   */
  onSortBy?: OnSortBy;
};

/**
 * TableBody for the Table component. The Table handles rendering it.
 */
const TableBody = ({
  rows = [],
  condensed,
  rowHeaders = false,
  sortHover,
  sortDirection,
  sortedRow,
  onSortBy,
  onRowClick,
}: TableBodyProps): JSX.Element => {
  const { data, toggleState, expandableState, toggleRow } =
    useExpandableTableOptions(rows, sortDirection, sortedRow, onSortBy);

  const onTableRowClick = useCallback(
    (index: number, key: string) => {
      toggleRow(key, index);
      if (onRowClick) {
        onRowClick(index);
      }
    },
    [toggleRow, onRowClick],
  );

  return (
    <tbody>
      {data.map((row, rowIndex) => {
        const { cells, isChild, key, ...props } = row;
        const isExpandable = expandableState[key];
        const isOpen = toggleState[key];
        return (
          <TableRow
            isChild={isChild}
            key={key}
            onClick={() => onTableRowClick(rowIndex, key)}
            {...props}
          >
            {cells.map((cell, cellIndex) =>
              rowHeaders && cellIndex === 0 ? (
                <TableHeader
                key={`table-cell-${rowIndex}-${cellIndex}`}
                    fixed
                    condensed={condensed}
                    scope="row"
                    isOpen={isOpen}
                    onChevronToggle={() => onTableRowClick(rowIndex, key)}
                    isExpandable={isExpandable}
                    isHovered={sortHover === cellIndex}
                    sortParams={{ sortable: false }}
                    {...mapCellProps(cell)}
                  />
              ) : (
                <TableCell
                  key={`${key}-table-cell-${rowIndex}-${cellIndex}`}
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
};

export default TableBody;
