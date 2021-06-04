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

import React, { Component, createRef, HTMLProps } from 'react';
import { css } from '@emotion/core';
import { isNil, throttle } from 'lodash/fp';

import styled, { StyleProps } from '../../styles/styled';

import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import { getSortDirection, ascendingSort, descendingSort } from './utils';
import { Direction, Row, Cell } from './types';

export interface TableProps
  extends Omit<HTMLProps<HTMLDivElement>, 'headers' | 'rows'> {
  /**
   * An array of headers for the table. The Header can be a string or an object
   * with options described on TableHeader component
   */
  headers?: Cell[];
  /**
   * (An array of rows or object with children) containing an array of cells for the table. The Cell can be a
   * string or an object with options described on TableCell component
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
   * The signature is (index, nextDirection, currentRows) and it should return
   * an array of rows
   */
  onSortBy?: (
    index: number,
    // FIXME: we're keeping null here for backward compatibility, will switch to an optional param in v3
    nextDirection: Direction | null,
    currentRows: Row[],
  ) => Row[];
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
  label: table-container;
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
    label: table-container--shadow;
    border: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  `;

const TableContainer = styled.div<TableContainerElProps & StyleProps>`
  ${tableContainerBaseStyles};
  ${tableContainerScrollableStyles};
  ${shadowStyles};
`;

/**
 * Scroll container styles.
 */
type ScrollContainerElElProps = Pick<TableProps, 'scrollable' | 'rowHeaders'> &
  HTMLProps<HTMLDivElement>;

const containerStyles = ({
  theme,
  rowHeaders,
}: ScrollContainerElElProps & StyleProps) =>
  rowHeaders &&
  css`
    label: table-container;
    border-radius: ${theme.borderRadius.mega};
    ${theme.mq.untilMega} {
      height: unset;
      margin-left: 145px;
      overflow-x: auto;
    }
  `;

const scrollableStyles = ({ scrollable, height }: ScrollContainerElElProps) =>
  scrollable &&
  css`
    height: ${height || '100%'};
    overflow-y: auto;
  `;

const ScrollContainer = styled.div<ScrollContainerElElProps>`
  ${containerStyles};
  ${scrollableStyles};
`;

/**
 * Table styles.
 */
type TableElProps = Pick<TableProps, 'borderCollapsed' | 'rowHeaders'>;

const baseStyles = ({ theme }: StyleProps) => css`
  label: table;
  background-color: ${theme.colors.white};
  border-collapse: separate;
  width: 100%;
`;

const responsiveStyles = ({ theme, rowHeaders }: TableElProps & StyleProps) =>
  rowHeaders &&
  css`
    label: table--responsive;
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

const StyledTable = styled.table<TableElProps>`
  ${baseStyles};
  ${responsiveStyles};
  ${borderCollapsedStyles};
`;

type TableState = {
  sortedRow?: number;
  sortHover?: number;
  sortDirection?: Direction;
  scrollTop?: number;
  tableBodyHeight?: string;
};

/**
 * Table interface component. It handles rendering rows/headers properly
 */
class Table extends Component<TableProps, TableState> {
  state: TableState = {
    sortedRow: undefined,
    sortHover: undefined,
    sortDirection: undefined,
    scrollTop: undefined,
    tableBodyHeight: undefined,
  };

  private tableRef = createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.props.scrollable) {
      this.addVerticalScroll();
    }
  }

  componentDidUpdate(prevProps: TableProps) {
    if (!prevProps.scrollable && this.props.scrollable) {
      this.addVerticalScroll();
    }

    if (prevProps.scrollable && !this.props.scrollable) {
      this.removeVerticalScroll();
    }
  }

  componentWillUnmount() {
    if (this.props.scrollable) {
      this.removeVerticalScroll();
    }
  }

  addVerticalScroll = () => {
    this.calculateTableBodyHeight();

    window.addEventListener(
      'resize',
      throttle(1000, this.calculateTableBodyHeight),
    );
  };

  removeVerticalScroll = () => {
    window.removeEventListener('resize', this.calculateTableBodyHeight);
  };

  calculateTableBodyHeight = () => {
    this.setState({
      tableBodyHeight:
        isNil(this.tableRef.current) ||
        isNil(this.tableRef.current.parentElement)
          ? 'unset'
          : `${this.tableRef.current.parentElement.offsetHeight}px`,
    });
  };

  onSortEnter = (i: number) => this.setState({ sortHover: i });

  onSortLeave = () => this.setState({ sortHover: undefined });

  onSortBy = (i: number) => {
    const { sortedRow, sortDirection } = this.state;
    const isActive = i === sortedRow;
    const nextDirection = getSortDirection(isActive, sortDirection);

    this.updateSort(i, nextDirection);
  };

  getSortedRows = () => {
    const { rows, onSortBy } = this.props;
    const { sortDirection, sortedRow } = this.state;

    if (sortedRow === undefined) {
      return rows;
    }

    return onSortBy
      ? onSortBy(sortedRow, sortDirection || null, rows)
      : this.defaultSortBy(sortedRow, rows, sortDirection);
  };

  updateSort = (i: number, nextDirection: Direction) =>
    this.setState({
      sortedRow: i,
      sortDirection: nextDirection,
    });

  defaultSortBy = (i: number, rows: Row[], direction?: Direction) => {
    const sortFn = direction === 'ascending' ? ascendingSort : descendingSort;

    return [...rows].sort(sortFn(i));
  };

  handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    this.setState({ scrollTop: e.currentTarget.scrollTop });
  };

  render() {
    const {
      rowHeaders = true,
      headers = [],
      noShadow = false,
      borderCollapsed = false,
      condensed = false,
      scrollable = false,
      onRowClick,
      rows,
      onSortBy,
      ...props
    } = this.props;
    const {
      sortDirection,
      sortHover,
      sortedRow,
      scrollTop,
      tableBodyHeight,
    } = this.state;

    const sortedRows = this.getSortedRows();

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
              rows={sortedRows}
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
