import React, { Fragment } from 'react';
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

const mapProps = props => (isString(props) ? { children: props } : props);
const getChildren = props => (isString(props) ? props : props.children);

const Table = ({ headers, rows, rowHeaders }) => (
  <Container>
    <ScrollContainer rowHeaders>
      <StyledTable rowHeaders>
        <thead>
          {!!headers.length && (
            <TableRow header>
              {headers.map(
                (header, i) =>
                  rowHeaders && i === 0 ? (
                    <Fragment>
                      <TableHeader fixed {...mapProps(header)} />
                      <TableCell role="presentation" aria-hidden="true" header>
                        {getChildren(header)}
                      </TableCell>
                    </Fragment>
                  ) : (
                    <TableHeader {...mapProps(header)} />
                  )
              )}
            </TableRow>
          )}
        </thead>
        <tbody>
          {rows.map(row => (
            <TableRow>
              {row.map(
                (cell, i) =>
                  rowHeaders && i === 0 ? (
                    <Fragment>
                      <TableHeader
                        fixed
                        scope={TableHeader.ROW}
                        {...mapProps(cell)}
                      />
                      <TableCell role="presentation" aria-hidden="true">
                        {getChildren(cell)}
                      </TableCell>
                    </Fragment>
                  ) : (
                    <TableCell {...mapProps(cell)} />
                  )
              )}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </ScrollContainer>
  </Container>
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
