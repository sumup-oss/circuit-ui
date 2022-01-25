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

import { Component, createRef, HTMLAttributes, UIEvent } from 'react';
import { css } from '@emotion/react';
import { isNil, throttle } from 'lodash/fp';

import styled, { StyleProps } from '../../styles/styled';

import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import { getSortDirection, ascendingSort, descendingSort } from './utils';
import { Direction, Row, Cell } from './types';

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * An array of header cells for the table.
   */
  headers?: Cell[];
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

/**
 * Table container styles.
 * The position: relative; container is necessary because ShadowContainer
 * is a position: absolute; element
 */
type TableContainerElProps = Pick<
  TableProps,
  'scrollable' | 'rowHeaders' | 'noShadow'
>;

const tableContainerBaseStyles = () => css`
  position: relative;
`;

const tableContainerScrollableStyles = ({
  scrollable,
  rowHeaders,
  theme,
}: TableContainerElProps & StyleProps) =>
  scrollable &&
  css`
    height: 100%;
    ${theme.mq.untilMega} {
      height: ${rowHeaders ? 'unset' : '100%'};
    }
  `;

const shadowStyles = ({
  theme,
  noShadow,
}: TableContainerElProps & StyleProps) =>
  !noShadow &&
  css`
    border: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  `;

const TableContainer = styled.div<TableContainerElProps>(
  tableContainerBaseStyles,
  tableContainerScrollableStyles,
  shadowStyles,
);

/**
 * Scroll container styles.
 */
type ScrollContainerElProps = Pick<TableProps, 'scrollable' | 'rowHeaders'> & {
  height?: string;
};

const containerStyles = ({
  theme,
  rowHeaders,
}: ScrollContainerElProps & StyleProps) =>
  rowHeaders &&
  css`
    border-radius: ${theme.borderRadius.bit};
    ${theme.mq.untilMega} {
      height: unset;
      margin-left: 145px;
      overflow-x: auto;
    }
  `;

const scrollableStyles = ({ scrollable, height }: ScrollContainerElProps) =>
  scrollable &&
  css`
    height: ${height || '100%'};
    overflow-y: auto;
  `;

const ScrollContainer = styled.div<ScrollContainerElProps>(
  containerStyles,
  scrollableStyles,
);

/**
 * Table styles.
 */
type TableElProps = Pick<TableProps, 'borderCollapsed' | 'rowHeaders'>;

const baseStyles = ({ theme }: StyleProps) => css`
  background-color: ${theme.colors.white};
  border-collapse: separate;
  width: 100%;
`;

const responsiveStyles = ({ theme, rowHeaders }: TableElProps & StyleProps) =>
  rowHeaders &&
  css`
    ${theme.mq.untilMega} {
      margin-left: -145px;
      width: calc(100% + 145px);

      &:after {
        content: '';
        background-image: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.12),
          transparent
        );
        height: 100%;
        left: 145px;
        position: absolute;
        top: 0;
        width: 6px;
      }
    }
  `;

const borderCollapsedStyles = ({ borderCollapsed }: TableElProps) =>
  borderCollapsed &&
  css`
    border-collapse: collapse;
  `;

const StyledTable = styled.table<TableElProps>(
  baseStyles,
  responsiveStyles,
  borderCollapsedStyles,
);

type TableState = {
  sortedRow?: number;
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
      throttle(1000, this.calculateTableBodyHeight),
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
      : this.defaultSortBy(sortedRow, rows, sortDirection);
  };

  updateSort = (i: number, nextDirection: Direction, sortedRows: Row[]): void =>
    this.setState({
      sortedRow: i,
      sortDirection: nextDirection,
      rows: sortedRows,
    });

  defaultSortBy = (i: number, rows: Row[], direction?: Direction): Row[] => {
    const sortFn = direction === 'ascending' ? ascendingSort : descendingSort;

    return [...rows].sort(sortFn(i));
  };

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
      ...props
    } = this.props;
    const {
      sortDirection,
      sortHover,
      sortedRow,
      scrollTop,
      tableBodyHeight,
      rows,
    } = this.state;

    return (
      <TableContainer
        ref={this.tableRef}
        scrollable={scrollable}
        rowHeaders={rowHeaders}
        noShadow={noShadow}
        {...props}
      >
        <ScrollContainer
          rowHeaders={rowHeaders}
          scrollable={scrollable}
          height={tableBodyHeight}
          onScroll={scrollable ? this.handleScroll : undefined}
        >
          <StyledTable
            rowHeaders={rowHeaders}
            borderCollapsed={borderCollapsed}
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
          </StyledTable>
        </ScrollContainer>
      </TableContainer>
    );
  }
}

export default Table;
