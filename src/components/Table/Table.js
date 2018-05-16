import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

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
    ${theme.mq.untilMega`
      margin-left: -145px;
      width: calc(100% + 145px);

      &:after {
        content: '';
        background-image: linear-gradient(90deg,rgba(0,0,0,.12),transparent);
        height: 100%;
        left: 145px;
        position: absolute;
        top: 0;
        width: 6px;
      }
    `};
  `;

const StyledTable = styled.table`
  ${baseStyles};
  ${responsiveStyles};
`;

const containerStyles = ({ theme, rowHeaders }) =>
  rowHeaders &&
  css`
    label: table-container;
    border-radius: ${theme.borderRadius.mega};
    ${theme.mq.untilMega`
      margin-left: 145px;
      overflow-x: auto;
    `};
  `;

const ScrollContainer = styled.div(containerStyles);
const Container = styled.div(shadowSingle);

/**
 * Table interface component. It handles rendering rows/headers properly
 */
class Table extends Component {
  state = {
    rows: this.props.rows,
    sortedRow: null,
    sortHover: null,
    sortDirection: null,
    tabindex: null
  };

  componentDidMount() {
    const scrollRef = this.getScrollRef();

    if (!scrollRef) {
      return;
    }

    const { scrollWidth, clientWidth } = scrollRef;
    const scrollable = scrollWidth > clientWidth;

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      tabindex: scrollable ? '0' : null
    });
  }

  onSortEnter = i => this.setState({ sortHover: i });
  onSortLeave = () => this.setState({ sortHover: null });
  onSortBy = i => {
    const { rows, sortedRow, sortDirection } = this.state;
    const { onSortBy } = this.props;
    const isActive = i === sortedRow;
    const nextDirection = getSortDirection(isActive, sortDirection);

    const nextRows = onSortBy
      ? onSortBy(i, nextDirection, rows)
      : this.defaultSortBy(i, nextDirection, rows);

    this.updateSort(i, nextDirection, nextRows);
  };

  getScrollRef = () => this.scrollRef;

  setScrollRef = ref => {
    this.scrollRef = ref;
  };

  updateSort = (i, nextDirection, rows) =>
    this.setState({
      rows,
      sortedRow: i,
      sortDirection: nextDirection
    });

  defaultSortBy = (i, nextDirection, rows) => {
    const nextFn = nextDirection === ASCENDING ? ascendingSort : descendingSort;

    return [...rows].sort(nextFn(i));
  };

  render() {
    const { rowHeaders, headers } = this.props;
    const { rows, sortDirection, sortHover, sortedRow, tabindex } = this.state;

    return (
      <Container>
        <ScrollContainer
          rowHeaders={rowHeaders}
          innerRef={this.setScrollRef}
          tabIndex={tabindex}
        >
          <StyledTable rowHeaders={rowHeaders}>
            <TableHead
              sortBy={this.onSortBy}
              sortDirection={sortDirection}
              sortedRow={sortedRow}
              onSortEnter={this.onSortEnter}
              onSortLeave={this.onSortLeave}
              headers={headers}
              rowHeaders={rowHeaders}
            />
            <TableBody
              rows={rows}
              rowHeaders={rowHeaders}
              sortHover={sortHover}
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
   * Custom onSortBy function for the onSort handler.
   * The signature is (index, nextDirection, currentRows) and it should return
   * an array of rows
   */
  onSortBy: PropTypes.func
};

Table.defaultProps = {
  headers: [],
  rows: [],
  rowHeaders: true,
  onSortBy: null
};

export default Table;
