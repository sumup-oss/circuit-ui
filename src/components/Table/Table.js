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

/** @jsx jsx */

import { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';
import { isNil, throttle } from 'lodash/fp';

import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import {
  getSortDirection,
  ascendingSort,
  descendingSort,
  RowPropType
} from './utils';
import { ASCENDING } from './constants';
import { shadowSingle } from '../../styles/style-helpers';

/**
 * Table container styles.
 * The position: relative; container is necessary because ShadowContainer
 * is a position: absolute; element
 */
const tableContainerBaseStyles = () => css`
  label: table-container;
  position: relative;
`;
const tableContainerScrollableStyles = ({ scrollable, rowHeaders }) =>
  scrollable &&
  !rowHeaders &&
  css`
    height: 100%;
  `;

const noShadowStyles = ({ noShadow }) =>
  noShadow &&
  css`
    label: table-container--no-shadow;
    box-shadow: none;
  `;

const TableContainer = styled.div`
  ${tableContainerBaseStyles};
  ${shadowSingle};
  ${noShadowStyles};
  ${tableContainerScrollableStyles};
`;

/**
 * Scroll container styles.
 */
const containerStyles = ({ theme, rowHeaders }) =>
  rowHeaders &&
  css`
    label: table-container;
    border-radius: ${theme.borderRadius.mega};
    ${theme.mq.untilMega} {
      margin-left: 145px;
      overflow-x: auto;
    }
  `;

const scrollableStyles = ({ scrollable, height, rowHeaders }) =>
  scrollable &&
  !rowHeaders &&
  css`
    height: ${height || '100%'};
    overflow-y: auto;
  `;

const ScrollContainer = styled.div`
  ${containerStyles};
  ${scrollableStyles};
`;

/**
 * Table styles.
 */
const baseStyles = ({ theme }) => css`
  label: table;
  background-color: ${theme.colors.white};
  border-collapse: separate;
  width: 100%;
`;

const responsiveStyles = ({ theme, rowHeaders }) =>
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

const borderCollapsedStyles = ({ borderCollapsed }) =>
  borderCollapsed &&
  css`
    border-collapse: collapse;
  `;

const StyledTable = styled.table`
  ${baseStyles};
  ${responsiveStyles};
  ${borderCollapsedStyles};
`;

/**
 * Table interface component. It handles rendering rows/headers properly
 */
class Table extends Component {
  state = {
    sortedRow: null,
    sortHover: null,
    sortDirection: null,
    tableBodyHeight: null,
    scrollTop: null
  };

  componentDidMount() {
    if (this.props.scrollable && !this.props.rowHeaders) {
      this.addVerticalScroll();
    }
  }

  componentDidUpdate({ scrollable, rowHeaders }) {
    const shouldAddScroll =
      (!scrollable && this.props.scrollable) ||
      (rowHeaders && !this.props.rowHeaders);

    const shouldRemoveScroll =
      (scrollable && !this.props.scrollable) ||
      (!rowHeaders && this.props.rowHeaders);

    if (shouldAddScroll) {
      this.addVerticalScroll();
    }

    if (shouldRemoveScroll) {
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
      throttle(1000, this.calculateTableBodyHeight)
    );
  };

  removeVerticalScroll = () => {
    window.removeEventListener('resize', this.calculateTableBodyHeight);
  };

  setTableRef = tableContainer => {
    this.tableContainer = tableContainer;
  };

  calculateTableBodyHeight = () => {
    this.setState({
      tableBodyHeight: isNil(this.tableContainer)
        ? null
        : `${this.tableContainer.offsetHeight}px`
    });
  };

  onSortEnter = i => this.setState({ sortHover: i });

  onSortLeave = () => this.setState({ sortHover: null });

  onSortBy = i => {
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

  updateSort = (i, nextDirection) =>
    this.setState({
      sortedRow: i,
      sortDirection: nextDirection
    });

  defaultSortBy = (i, direction, rows) => {
    const sortFn = direction === ASCENDING ? ascendingSort : descendingSort;

    return [...rows].sort(sortFn(i), rows);
  };

  handleScroll = e => {
    this.setState({ scrollTop: e.target.scrollTop });
  };

  render() {
    const {
      rowHeaders,
      headers,
      noShadow,
      borderCollapsed,
      condensed,
      scrollable,
      onRowClick
    } = this.props;
    const {
      sortDirection,
      sortHover,
      sortedRow,
      tableBodyHeight,
      scrollTop
    } = this.state;

    return (
      <TableContainer
        ref={this.setTableRef}
        scrollable={scrollable}
        rowHeaders={rowHeaders}
        noShadow={noShadow}
      >
        <ScrollContainer
          rowHeaders={rowHeaders}
          scrollable={scrollable}
          height={tableBodyHeight}
          onScroll={scrollable ? this.handleScroll : null}
        >
          <StyledTable
            rowHeaders={rowHeaders}
            borderCollapsed={borderCollapsed}
          >
            <TableHead
              top={scrollTop}
              condensed={condensed}
              scrollable={scrollable}
              scrollTop={scrollTop}
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
              scrollable={scrollable}
              rows={this.getSortedRows()}
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

Table.propTypes = {
  /**
   * An array of headers for the table. The Header can be a string or an object
   * with options described on TableHeader component
   */
  headers: PropTypes.arrayOf(RowPropType),
  /**
   * (An array of rows or object with children) containing an array of cells for the table. The Cell can be a
   * string or an object with options described on TableCell component
   */
  rows: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({ cells: PropTypes.arrayOf(RowPropType) }),
      PropTypes.arrayOf(RowPropType)
    ])
  ),
  /**
   * Enables/disables sticky columns on mobile
   */
  rowHeaders: PropTypes.bool,
  /**
   * Removes the default box-shadow from the table.
   */
  noShadow: PropTypes.bool,
  /**
   * Toggles condensed styles on the Table.
   */
  condensed: PropTypes.bool,
  /**
   * Toggles vertical scroll on the Table body.
   */
  scrollable: PropTypes.bool,
  /**
   * Custom onSortBy function for the onSort handler.
   * The signature is (index, nextDirection, currentRows) and it should return
   * an array of rows
   */
  onSortBy: PropTypes.func,
  /**
   * Click handler for the row
   * The signature is (index)
   */
  onRowClick: PropTypes.func,
  /**
   * Collapses the table cells.
   */
  borderCollapsed: PropTypes.bool
};

Table.defaultProps = {
  headers: [],
  rows: [],
  rowHeaders: true,
  condensed: false,
  scrollable: false,
  noShadow: false,
  onSortBy: null,
  onRowClick: null,
  borderCollapsed: false
};

export default Table;
