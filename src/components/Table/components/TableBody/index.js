import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import TableRow from '../TableRow';
import TableHeader from '../TableHeader';
import TableCell from '../TableCell';
import { mapProps, getChildren, RowPropType } from '../../utils';
import { TR_KEY_PREFIX, TD_KEY_PREFIX } from '../../constants';

const TableBody = ({ rows, rowHeaders, sortHover }) => (
  <tbody>
    {rows.map((row, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <TableRow key={`${TR_KEY_PREFIX}-${i}`}>
        {row.map(
          (cell, j) =>
            rowHeaders && j === 0 ? (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={`${TD_KEY_PREFIX}-${i}-${j}`}>
                <TableHeader
                  fixed
                  scope={TableHeader.ROW}
                  isActive={sortHover === j}
                  {...mapProps(cell)}
                />
                <TableCell role="presentation" aria-hidden="true">
                  {getChildren(cell)}
                </TableCell>
              </Fragment>
            ) : (
              <TableCell
                // eslint-disable-next-line react/no-array-index-key
                key={`${TD_KEY_PREFIX}-${i}-${j}`}
                isActive={sortHover === j}
                {...mapProps(cell)}
              />
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
