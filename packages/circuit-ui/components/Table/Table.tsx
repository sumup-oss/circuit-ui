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

import styled, { StyleProps } from '../../styles/styled';
import { isNil } from '../../util/type-check';
import { throttle } from '../../util/helpers';

import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import { getSortDirection, getSortedRows } from './utils';
import { Direction, Row, HeaderCell } from './types';

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
type TableContainerElProps = Pick<TableProps, 'scrollable' | 'noShadow'>;

const tableContainerBaseStyles = () => css`
  position: relative;
`;

const tableContainerScrollableStyles = ({
  scrollable,
}: TableContainerElProps) =>
  scrollable &&
  css`
    height: 100%;
  `;

const shadowStyles = ({
  theme,
  noShadow,
}: TableContainerElProps & StyleProps) =>
  !noShadow &&
  css`
    border: ${theme.borderWidth.kilo} solid var(--cui-border-divider);
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

const baseStyles = css`
  background-color: var(--cui-bg-normal);
  border-collapse: separate;
  width: 100%;
`;

const borderCollapsedStyles = ({ borderCollapsed }: TableElProps) =>
  borderCollapsed &&
  css`
    border-collapse: collapse;
  `;

const StyledTable = styled.table<TableElProps>(
  baseStyles,
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
    this.updateSort(i, nextDirection);
  };

  getInitialRows = (
    rows: Row[],
    initialSortDirection?: Direction | undefined,
    initialSortedRow?: number | undefined,
  ): Row[] => {
    if (initialSortedRow && initialSortDirection) {
      return getSortedRows(
        initialSortDirection,
        initialSortedRow,
        rows,
        this.props.onSortBy,
      );
    }
    return rows;
  };

  updateSort = (i: number, nextDirection: Direction): void =>
    this.setState({
      sortedRow: i,
      sortDirection: nextDirection,
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
              sortedRow={sortedRow}
              sortDirection={sortDirection}
              rowHeaders={rowHeaders}
              sortHover={sortHover}
              onSortBy={onSortBy}
              onRowClick={onRowClick}
            />
          </StyledTable>
        </ScrollContainer>
      </TableContainer>
    );
  }
}

export default Table;
