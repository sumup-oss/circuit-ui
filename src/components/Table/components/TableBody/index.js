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
        {row.map((cell, i) => (
          <Fragment>
            <TableHeader
              fixed={rowHeaders && i === 0}
              scope={TableHeader.ROW}
              {...mapProps(cell)}
            />
            {rowHeaders &&
              i === 0 && (
                <TableCell role="presentation" aria-hidden="true">
                  {getChildren(cell)}
                </TableCell>
              )}
          </Fragment>
        ))}
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
