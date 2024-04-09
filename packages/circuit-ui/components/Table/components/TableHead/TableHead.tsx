/**
 * Copyright 2024, SumUp Ltd.
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

'use client';

import { Fragment } from 'react';

import TableRow from '../TableRow/index.js';
import TableHeader from '../TableHeader/index.js';
import { mapCellProps, getSortParams } from '../../utils.js';
import { Direction, HeaderCell } from '../../types.js';
import { clsx } from '../../../../styles/clsx.js';

import classes from './TableHead.module.css';

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
  headers?: HeaderCell[];
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
   * The current sorted column index
   */
  sortedColumn?: number;
  /**
   * sortEnter handler
   */
  onSortEnter?: (i: number) => void;
  /**
   * sortLeave handler
   */
  onSortLeave?: (i: number) => void;
};

/**
 * TableHead for the Table component. The Table handles rendering it.
 */
export function TableHead({
  headers = [],
  rowHeaders = false,
  condensed,
  scrollable,
  top,
  onSortBy,
  sortDirection,
  sortedColumn,
  onSortEnter,
  onSortLeave,
}: TableHeadProps) {
  return (
    <thead
      className={clsx(
        scrollable && classes.fixed,
        rowHeaders && classes['row-headers'],
      )}
      style={{ '--table-head-top': `${top || 0}px` }}
    >
      {!!headers.length && (
        <TableRow>
          {headers.map((header, i) => {
            const cellProps = mapCellProps(header);
            const { sortable, sortLabel } = cellProps;
            const sortParams = getSortParams({
              columnIndex: i,
              sortable,
              sortDirection,
              sortLabel,
              sortedColumn,
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
              </Fragment>
            );
          })}
        </TableRow>
      )}
    </thead>
  );
}
