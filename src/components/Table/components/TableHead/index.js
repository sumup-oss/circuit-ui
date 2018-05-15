import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash/fp';

import TableRow from '../TableRow';
import TableHeader from '../TableHeader';
import TableCell from '../TableCell';
import { mapProps, getChildren, RowPropType } from '../../utils';

const TableHead = ({ headers, rowHeaders, sortBy }) => (
  <thead>
    {!!headers.length && (
      <TableRow header>
        {headers.map((header, i) => (
          <Fragment>
            <TableHeader
              {...mapProps(header)}
              sortable
              fixed={rowHeaders && i === 0}
              onClick={() => sortBy(i)}
            />
            {rowHeaders &&
              i === 0 && (
                <TableCell role="presentation" aria-hidden="true" header>
                  {getChildren(header)}
                </TableCell>
              )}
          </Fragment>
        ))}
      </TableRow>
    )}
  </thead>
);

TableHead.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.arrayOf(RowPropType)),
  rowHeaders: PropTypes.bool,
  sortBy: PropTypes.func
};

TableHead.defaultProps = {
  headers: [],
  rowHeaders: true,
  sortBy: noop
};

export default TableHead;
