import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import TableRow from '../TableRow';
import TableHeader from '../TableHeader';
import TableCell from '../TableCell';
import { mapProps, getChildren, RowPropType } from '../../utils';

const TableBody = ({ rows, rowHeaders }) => (
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
);

TableBody.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(RowPropType)),
  rowHeaders: PropTypes.bool
};

TableBody.defaultProps = {
  rows: [],
  rowHeaders: true
};

export default TableBody;
