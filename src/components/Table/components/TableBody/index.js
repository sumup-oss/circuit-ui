import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import TableRow from '../TableRow';
import TableHeader from '../TableHeader';
import TableCell from '../TableCell';
import { mapProps, getChildren, RowPropType } from '../../utils';

const TableBody = ({ rows, rowHeaders, sortHover }) => (
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
                  active={sortHover === i}
                  {...mapProps(cell)}
                />
                <TableCell role="presentation" aria-hidden="true">
                  {getChildren(cell)}
                </TableCell>
              </Fragment>
            ) : (
              <TableCell {...mapProps(cell)} active={sortHover === i} />
            )
        )}
      </TableRow>
    ))}
  </tbody>
);

TableBody.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(RowPropType)),
  rowHeaders: PropTypes.bool,
  sortHover: PropTypes.number
};

TableBody.defaultProps = {
  rows: [],
  rowHeaders: true,
  sortHover: null
};

export default TableBody;
