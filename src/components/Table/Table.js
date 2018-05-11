import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { isString } from 'lodash/fp';

import TableHeader from './components/TableHeader';
import TableCell from './components/TableCell';
import TableRow from './components/TableRow';
import { shadowSingle } from '../../styles/style-helpers';
import { childrenPropType } from '../../util/shared-prop-types';

const baseStyles = ({ theme }) => css`
  label: table;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.mega};
  width: 100%;
`;

const responsiveStyles = ({ theme, rowHeaders }) =>
  rowHeaders &&
  css`
    label: table--responsive;
    ${theme.mq.untilMega`
      margin-left: -145px;
    `};
  `;

const StyledTable = styled.table`
  ${baseStyles};
  ${responsiveStyles};
  ${shadowSingle};
`;

const containerStyles = ({ theme, rowHeaders }) =>
  rowHeaders &&
  css`
    label: table-container;
    ${theme.mq.untilMega`
      margin-left: 145px;
      overflow-x: auto;
    `};
  `;

const StyledContainer = styled.div(containerStyles);

const mapProps = props => (isString(props) ? { children: props } : props);

const Table = ({ headers, rows, rowHeaders }) => (
  <StyledContainer rowHeaders>
    <StyledTable rowHeaders>
      <tbody>
        {!!headers.length && (
          <TableRow header>
            {headers.map(header => <TableHeader {...mapProps(header)} />)}
          </TableRow>
        )}
        {rows.map(row => (
          <TableRow>
            {row.map(
              (cell, i) =>
                rowHeaders && i === 0 ? (
                  <TableHeader scope={TableHeader.ROW} {...mapProps(cell)} />
                ) : (
                  <TableCell {...mapProps(cell)} />
                )
            )}
          </TableRow>
        ))}
      </tbody>
    </StyledTable>
  </StyledContainer>
);

const ItemPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    children: childrenPropType,
    align: PropTypes.string
  })
]);

Table.propTypes = {
  headers: PropTypes.arrayOf(ItemPropType),
  rows: PropTypes.arrayOf(PropTypes.arrayOf(ItemPropType)),
  rowHeaders: PropTypes.bool
};

Table.defaultProps = {
  headers: [],
  rows: [],
  rowHeaders: true
};

export default Table;
