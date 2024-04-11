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

import { Component, createRef, HTMLAttributes, UIEvent } from 'react';

import { isNil } from '../../util/type-check.js';
import { throttle } from '../../util/helpers.js';
import { clsx } from '../../styles/clsx.js';

import TableHead from './components/TableHead/index.js';
import TableBody from './components/TableBody/index.js';
import { defaultSortBy, getSortDirection } from './utils.js';
import { Direction, Row, HeaderCell } from './types.js';
import classes from './Table.module.css';

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * An array of header cells for the table.
   */
  headers?: HeaderCell[];
  /**
   * An array of rows or an object with children containing an array of cells
   * for the table.
   */
  rows: Row[];
  /**
   * Enables/disables sticky columns on mobile. Defaults to true.
   */
  rowHeaders?: boolean;
  /**
   * Removes the default box-shadow from the table.
   */
  noShadow?: boolean;
  /**
   * Toggles condensed styles on the Table.
   */
  condensed?: boolean;
  /**
   * Toggles vertical scroll on the Table body.
   */
  scrollable?: boolean;
  /**
   * Custom onSortBy function for the onSort handler.
   * The signature is (index, currentRows, nextDirection) and it should return
   * an array of rows
   */
  onSortBy?: (
    index: number,
    currentRows: Row[],
    nextDirection?: Direction,
  ) => Row[];
  /**
   * Specifies the initial sort order of the table
   */
  initialSortDirection?: 'ascending' | 'descending';
  /**
   * Specifies the wrongly-named column index which `initialSortDirection` will be applied to
   */
  /**
   * @deprecated
   */
  initialSortedRow?: number;
  /**
   * Specifies the column index which `initialSortDirection` will be applied to
   */
  initialSortedColumn?: number;
  /**
   * Click handler for the row
   * The signature is (index)
   */
  onRowClick?: (rowIndex: number) => void;
  /**
   * Collapses the table cells.
   */
  borderCollapsed?: boolean;
}

type TableState = {
  sortedColumn?: number;
  rows?: Row[];
  sortHover?: number;
  sortDirection?: Direction;
  scrollTop?: number;
  tableBodyHeight?: string;
};

/**
 * Table interface component. It handles rendering rows/headers properly
 */
class Table extends Component<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props);
    if (this.props.initialSortedRow) {
      console.warn(
        'The prop initialSortedRow is deprecated and will be removed in a future version of circuit UI. Please use initialSortedColumn instead.',
      );
    }
    this.state = {
      sortedColumn:
        this.props.initialSortedColumn || this.props.initialSortedRow,
      rows: this.getInitialRows(
        this.props.rows,
        this.props.initialSortDirection,
        this.props.initialSortedColumn || this.props.initialSortedRow,
      ),
      sortHover: undefined,
      sortDirection: this.props.initialSortDirection,
      scrollTop: undefined,
      tableBodyHeight: undefined,
    };
  }

  private tableRef = createRef<HTMLDivElement>();

  componentDidMount(): void {
    if (this.props.scrollable) {
      this.addVerticalScroll();
    }
  }

  componentDidUpdate(prevProps: TableProps): void {
    if (this.props.rows !== prevProps.rows) {
      // Preserve existing sorting
      if (this.state.sortedColumn && this.state.sortDirection) {
        const sortedRows = this.getSortedRows(
          this.state.sortDirection,
          this.state.sortedColumn,
        );
        this.setState({ rows: sortedRows });
        return;
      }

      this.setState({ rows: this.props.rows });
    }

    if (!prevProps.scrollable && this.props.scrollable) {
      this.addVerticalScroll();
    }

    if (prevProps.scrollable && !this.props.scrollable) {
      this.removeVerticalScroll();
    }
  }

  componentWillUnmount(): void {
    if (this.props.scrollable) {
      this.removeVerticalScroll();
    }
  }

  addVerticalScroll = (): void => {
    this.calculateTableBodyHeight();

    window.addEventListener(
      'resize',
      throttle(this.calculateTableBodyHeight, 1000),
    );
  };

  removeVerticalScroll = (): void => {
    window.removeEventListener('resize', this.calculateTableBodyHeight);
  };

  calculateTableBodyHeight = (): void => {
    this.setState({
      tableBodyHeight:
        isNil(this.tableRef.current) ||
        isNil(this.tableRef.current.parentElement)
          ? 'unset'
          : `${this.tableRef.current.parentElement.offsetHeight}px`,
    });
  };

  onSortEnter = (i: number): void => this.setState({ sortHover: i });

  onSortLeave = (): void => this.setState({ sortHover: undefined });

  onSortBy = (i: number): void => {
    const { sortedColumn, sortDirection } = this.state;
    const isActive = i === sortedColumn;
    const nextDirection = getSortDirection(isActive, sortDirection);
    const sortedRows = this.getSortedRows(nextDirection, i);

    this.updateSort(i, nextDirection, sortedRows);
  };

  getInitialRows = (
    rows: Row[],
    initialSortDirection?: Direction | undefined,
    initialSortedColumn?: number | undefined,
  ): Row[] =>
    initialSortedColumn && initialSortDirection
      ? this.getSortedRows(initialSortDirection, initialSortedColumn)
      : rows;

  getSortedRows = (sortDirection: Direction, sortedRow: number): Row[] => {
    const { rows, onSortBy } = this.props;
    return onSortBy
      ? onSortBy(sortedRow, rows, sortDirection)
      : defaultSortBy(sortedRow, rows, sortDirection);
  };

  updateSort = (i: number, nextDirection: Direction, sortedRows: Row[]): void =>
    this.setState({
      sortedColumn: i,
      sortDirection: nextDirection,
      rows: sortedRows,
    });

  handleScroll = (e: UIEvent<HTMLDivElement>): void => {
    this.setState({ scrollTop: e.currentTarget.scrollTop });
  };

  render(): JSX.Element {
    const {
      rowHeaders = true,
      headers = [],
      noShadow = false,
      borderCollapsed = false,
      condensed = false,
      scrollable = false,
      onRowClick,
      rows: initialRows,
      onSortBy,
      className,
      ...props
    } = this.props;
    const {
      sortDirection,
      sortHover,
      sortedColumn,
      scrollTop,
      tableBodyHeight,
      rows,
    } = this.state;

    return (
      <div
        className={clsx(
          classes.container,
          scrollable && classes.scrollable,
          !noShadow && classes.border,
          className,
        )}
        ref={this.tableRef}
        {...props}
      >
        <div
          className={clsx(
            classes['scroll-container'],
            rowHeaders && classes['row-headers'],
          )}
          style={{ '--table-height': tableBodyHeight || '100%' }}
          onScroll={scrollable ? this.handleScroll : undefined}
        >
          <table
            className={clsx(
              classes.base,
              borderCollapsed && classes['border-collapse'],
            )}
          >
            <TableHead
              top={scrollTop}
              condensed={condensed}
              scrollable={scrollable}
              sortDirection={sortDirection}
              sortedColumn={sortedColumn}
              onSortBy={this.onSortBy}
              onSortEnter={this.onSortEnter}
              onSortLeave={this.onSortLeave}
              headers={headers}
              rowHeaders={rowHeaders}
            />
            <TableBody
              condensed={condensed}
              rows={rows}
              rowHeaders={rowHeaders}
              sortHover={sortHover}
              onRowClick={onRowClick}
            />
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
