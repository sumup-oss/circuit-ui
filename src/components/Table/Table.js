import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

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

const noShadowStyles = ({ noShadow }) =>
  noShadow &&
  css`
    label: table-container--no-shadow;
    box-shadow: none;
  `;

const ScrollContainer = styled.div(containerStyles);
const Container = styled.div`
  ${shadowSingle};
  ${noShadowStyles};
`;

/**
 * Table interface component. It handles rendering rows/headers properly
 */
class Table extends Component {
  state = {
    sortedRow: null,
    sortHover: null,
    sortDirection: null
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

  render() {
    const {
      rowHeaders,
      headers,
      onRowClick,
      noShadow,
      borderCollapsed
    } = this.props;
    const { sortDirection, sortHover, sortedRow } = this.state;

    return (
      <Container noShadow={noShadow}>
        <ScrollContainer rowHeaders={rowHeaders}>
          <StyledTable
            rowHeaders={rowHeaders}
            borderCollapsed={borderCollapsed}
          >
            <TableHead
              sortDirection={sortDirection}
              sortedRow={sortedRow}
              onSortBy={this.onSortBy}
              onSortEnter={this.onSortEnter}
              onSortLeave={this.onSortLeave}
              headers={headers}
              rowHeaders={rowHeaders}
            />
            <TableBody
              rows={this.getSortedRows()}
              rowHeaders={rowHeaders}
              sortHover={sortHover}
              onRowClick={onRowClick}
            />
          </StyledTable>
        </ScrollContainer>
      </Container>
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
   * An array of rows with an array of cells for the table. The Cell can be a
   * string or an object with options described on TableCell component
   */
  rows: PropTypes.arrayOf(PropTypes.arrayOf(RowPropType)),
  /**
   * Enables/disables sticky columns on mobile
   */
  rowHeaders: PropTypes.bool,
  /**
   * Removes the default box-shadow from the table.
   */
  noShadow: PropTypes.bool,
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
  noShadow: false,
  onSortBy: null,
  onRowClick: null,
  borderCollapsed: false
};

export default Table;
