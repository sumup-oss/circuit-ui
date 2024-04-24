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

'use client';

import { Component, createRef, HTMLAttributes, UIEvent } from 'react';
import { Hide, Settings, View } from '@sumup/icons';

import { isNil } from '../../util/type-check.js';
import { throttle } from '../../util/helpers.js';
import { clsx } from '../../styles/clsx.js';
// eslint-disable-next-line import/no-cycle
import { IconButton, Popover } from '../../index.js';

import TableHead from './components/TableHead/index.js';
import TableBody from './components/TableBody/index.js';
import { defaultSortBy, getSortDirection } from './utils.js';
import { Direction, Row, HeaderCell, RowCell } from './types.js';
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
  selectableColumns?: boolean;

  mandatorySelectedColumnIndices?: number[];
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
   * Specifies the row index which `initialSortDirection` will be applied to
   */
  initialSortedRow?: number;
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
  sortedRow?: number;
  rows?: Row[];
  sortHover?: number;
  sortDirection?: Direction;
  scrollTop?: number;
  tableBodyHeight?: string;
  hasExpandedColumnSelection?: boolean;
  selectedColumns?: number[];
};

/**
 * Table interface component. It handles rendering rows/headers properly
 */
class Table extends Component<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props);
    this.state = {
      sortedRow: this.props.initialSortedRow,
      rows: this.getInitialRows(
        this.props.rows,
        this.props.initialSortDirection,
        this.props.initialSortedRow,
      ),
      sortHover: undefined,
      sortDirection: this.props.initialSortDirection,
      scrollTop: undefined,
      tableBodyHeight: undefined,
      hasExpandedColumnSelection: false,
      selectedColumns: [...(this.props.headers || []).map((_, index) => index)],
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
      if (this.state.sortedRow && this.state.sortDirection) {
        const sortedRows = this.getSortedRows(
          this.state.sortDirection,
          this.state.sortedRow,
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
    const { sortedRow, sortDirection } = this.state;
    const isActive = i === sortedRow;
    const nextDirection = getSortDirection(isActive, sortDirection);
    const sortedRows = this.getSortedRows(nextDirection, i);

    this.updateSort(i, nextDirection, sortedRows);
  };

  getInitialRows = (
    rows: Row[],
    initialSortDirection?: Direction | undefined,
    initialSortedRow?: number | undefined,
  ): Row[] => {
    if (initialSortedRow && initialSortDirection) {
      return this.getSortedRows(initialSortDirection, initialSortedRow);
    }
    return rows;
  };

  getSortedRows = (sortDirection: Direction, sortedRow: number): Row[] => {
    const { rows, onSortBy } = this.props;
    return onSortBy
      ? onSortBy(sortedRow, rows, sortDirection)
      : defaultSortBy(sortedRow, rows, sortDirection);
  };

  updateSort = (i: number, nextDirection: Direction, sortedRows: Row[]): void =>
    this.setState({
      sortedRow: i,
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
      selectableColumns = false,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      mandatorySelectedColumnIndices = [],
      scrollable = false,
      onRowClick,
      rows: initialRows,
      onSortBy,
      className,
      ...props
    } = this.props;
    const {
      hasExpandedColumnSelection,
      sortDirection,
      sortHover,
      sortedRow,
      scrollTop,
      selectedColumns,
      tableBodyHeight,
      rows,
    } = this.state;

    const selectedHeaders =
      // @ts-expect-error ts misses optional chaining
      selectedColumns?.length > 0
        ? headers.filter((_, index) =>
            (selectedColumns as number[]).includes(index),
          )
        : headers;

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
              selectableColumns && classes['has-column-selector'],
            )}
          >
            <TableHead
              top={scrollTop}
              condensed={condensed}
              scrollable={scrollable}
              sortDirection={sortDirection}
              sortedRow={sortedRow}
              onSortBy={this.onSortBy}
              onSortEnter={this.onSortEnter}
              onSortLeave={this.onSortLeave}
              headers={selectedHeaders}
              rowHeaders={rowHeaders}
            />
            {selectableColumns && (
              <div style={{ position: 'absolute', right: 0, top: 0 }}>
                <Popover
                  isOpen={!!hasExpandedColumnSelection}
                  placement="bottom-end"
                  component={(componentProps) => (
                    <IconButton
                      icon={Settings}
                      size={'s'}
                      variant={'tertiary'}
                      {...componentProps}
                    >
                      Configure
                    </IconButton>
                  )}
                  onToggle={() => {
                    this.setState({
                      hasExpandedColumnSelection: !hasExpandedColumnSelection,
                    });
                  }}
                  actions={(headers || []).map((header, index) => {
                    const checked = selectedColumns?.includes(index);
                    return {
                      onClick: () => {
                        this.setState({
                          selectedColumns: checked
                            ? [
                                ...(selectedColumns || []).filter(
                                  (v) => v !== index,
                                ),
                              ]
                            : [...(selectedColumns || []), index],
                        });
                      },
                      icon: checked ? View : Hide,
                      // @ts-expect-error header children
                      children: String(header?.children ?? header),
                    };
                  })}
                />
              </div>
            )}
            <TableBody
              condensed={condensed}
              rows={
                // @ts-expect-error ts misses optional chaining
                selectedColumns?.length > 0 && rows?.length
                  ? rows.map((row) => {
                      let rowCells = row;
                      if ((row as { cells: RowCell[] })?.cells) {
                        rowCells = (row as { cells: RowCell[] }).cells;
                      }
                      return (rowCells as RowCell[]).filter((_, index) =>
                        (selectedColumns as number[]).includes(index),
                      );
                    })
                  : rows
              }
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
