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

class Table extends Component {
  state = {
    rows: this.props.rows,
    sortedRow: null,
    sortDirection: null
  };

  defaultSortBy = i => {
    const { rows, sortedRow, sortDirection } = this.state;
    const isActive = i === sortedRow;
    const nextDirection = getSortDirection(isActive, sortDirection);
    const nextFn = nextDirection === ASCENDING ? descendingSort : ascendingSort;

    this.setState({
      rows: [...rows].sort(nextFn(i)),
      sortedRow: i,
      sortDirection: nextDirection
    });
  };

  render() {
    const { rowHeaders, headers } = this.props;
    const { rows } = this.state;

    return (
      <Container>
        <ScrollContainer rowHeaders={rowHeaders}>
          <StyledTable rowHeaders={rowHeaders}>
            <TableHead
              sortBy={this.defaultSortBy}
              headers={headers}
              rowHeaders={rowHeaders}
            />
            <TableBody rows={rows} rowHeaders={rowHeaders} />
          </StyledTable>
        </ScrollContainer>
      </Container>
    );
  }
}

Table.propTypes = {
  headers: PropTypes.arrayOf(RowPropType),
  rows: PropTypes.arrayOf(PropTypes.arrayOf(RowPropType)),
  rowHeaders: PropTypes.bool
};

Table.defaultProps = {
  headers: [],
  rows: [],
  rowHeaders: true
};

export default Table;
