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

import React, { Component, createRef } from 'react';
import { css } from '@emotion/core';
import { isNil, throttle } from 'lodash/fp';

import { shadowSingle } from '../../styles/style-mixins';
import styled, { StyleProps } from '../../styles/styled';

import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import {
  getSortDirection,
  ascendingSort,
  descendingSort,
  DIRECTION,
  Row,
} from './utils';

export type TableProps = {
  /**
   * An array of headers for the table. The Header can be a string or an object
   * with options described on TableHeader component
   */
  headers?: (
    | string
    | {
        children: string;
        align?: 'left' | 'right' | 'center';
        sortable?: boolean;
      }
  )[];
  /**
   * (An array of rows or object with children) containing an array of cells for the table. The Cell can be a
   * string or an object with options described on TableCell component
   */
  rows: Row[];
  /**
   * Enables/disables sticky columns on mobile
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
    nextDirection: DIRECTION | null,
    currentRows: Row[],
  ) => Row[];
  /**
   * Click handler for the row
   * The signature is (index)
   */
  onRowClick?: (index: Row) => unknown;
  /**
   * Collapses the table cells.
   */
  borderCollapsed?: boolean;
};

/**
 * Table container styles.
 * The position: relative; container is necessary because ShadowContainer
 * is a position: absolute; element
 */
const tableContainerBaseStyles = () => css`
  label: table-container;
  position: relative;
`;

const tableContainerScrollableStyles = ({
  scrollable,
  rowHeaders,
  theme,
}: { scrollable: boolean; rowHeaders: boolean } & StyleProps) =>
  scrollable &&
  css`
    height: 100%;
    ${theme.mq.untilMega} {
      height: ${rowHeaders ? 'unset' : '100%'};
    }
  `;

const noShadowStyles = ({ noShadow }: { noShadow: boolean }) =>
  noShadow &&
  css`
    label: table-container--no-shadow;
    box-shadow: none;
  `;

const TableContainer = styled.div<
  { scrollable: boolean; rowHeaders: boolean; noShadow: boolean } & StyleProps
>`
  ${tableContainerBaseStyles};
  ${tableContainerScrollableStyles};
  ${shadowSingle};
  ${noShadowStyles};
`;

/**
 * Scroll container styles.
 */
const containerStyles = ({
  theme,
  rowHeaders,
}: { rowHeaders: boolean } & StyleProps) =>
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

const scrollableStyles = ({
  scrollable,
  height,
}: {
  scrollable: boolean;
  height: string | null;
}) =>
  scrollable &&
  css`
    height: ${height || '100%'};
    overflow-y: auto;
  `;

const ScrollContainer = styled.div<
  StyleProps & {
    scrollable: boolean;
    height: string | null;
    rowHeaders: boolean;
  }
>`
  ${containerStyles};
  ${scrollableStyles};
`;

/**
 * Table styles.
 */
const baseStyles = ({ theme }: StyleProps) => css`
  label: table;
  background-color: ${theme.colors.white};
  border-collapse: separate;
  width: 100%;
`;

const responsiveStyles = ({
  theme,
  rowHeaders,
}: { rowHeaders: boolean } & StyleProps) =>
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

const borderCollapsedStyles = ({
  borderCollapsed,
}: {
  borderCollapsed: boolean;
}) =>
  borderCollapsed &&
  css`
    border-collapse: collapse;
  `;

const StyledTable = styled.table<
  StyleProps & { borderCollapsed: boolean; rowHeaders: boolean }
>`
  ${baseStyles};
  ${responsiveStyles};
  ${borderCollapsedStyles};
`;

type TableState = {
  sortedRow: number | null;
  sortHover: number | null;
  sortDirection: DIRECTION | null;
  scrollTop: number | null;
  tableBodyHeight: string | null;
};

/**
 * Table interface component. It handles rendering rows/headers properly
 */
class Table extends Component<TableProps, TableState> {
  state: TableState = {
    sortedRow: null,
    sortHover: null,
    sortDirection: null,
    scrollTop: null,
    tableBodyHeight: null,
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
      tableBodyHeight: isNil(this.tableRef.current)
        ? 'unset'
        : `${this.tableRef.current.offsetHeight}px`,
    });
  };

  onSortEnter = (i: number) => this.setState({ sortHover: i });

  onSortLeave = () => this.setState({ sortHover: null });

  onSortBy = (i: number) => {
    const { sortedRow, sortDirection } = this.state;
    const isActive = i === sortedRow;
    const nextDirection = getSortDirection(isActive, sortDirection);

    this.updateSort(i, nextDirection);
  };

  getSortedRows = () => {
    const { rows, onSortBy } = this.props;
    const { sortDirection, sortedRow } = this.state;

    if (sortedRow === null) {
      return rows;
    }

    return onSortBy
      ? onSortBy(sortedRow, sortDirection, rows)
      : this.defaultSortBy(sortedRow, sortDirection, rows);
  };

  updateSort = (i: number, nextDirection: DIRECTION | null) =>
    this.setState({
      sortedRow: i,
      sortDirection: nextDirection,
    });

  defaultSortBy = (i: number, direction: DIRECTION | null, rows: Row[]) => {
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
      onRowClick = null,
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
