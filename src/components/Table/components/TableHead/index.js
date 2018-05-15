import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash/fp';

import TableRow from '../TableRow';
import TableHeader from '../TableHeader';
import TableCell from '../TableCell';
import { mapProps, getChildren, RowPropType } from '../../utils';

const TableHead = ({
  headers,
  rowHeaders,
  sortable,
  sortBy,
  onSortEnter,
  onSortLeave
}) => (
  <thead>
    {!!headers.length && (
      <TableRow header>
        {headers.map((header, i) => (
          <Fragment>
            <TableHeader
              {...mapProps(header)}
              sortable={sortable}
              fixed={rowHeaders && i === 0}
              onClick={sortable && (() => sortBy(i))}
              onMouseEnter={onSortEnter && (() => onSortEnter(i))}
              onMouseLeave={onSortLeave && (() => onSortLeave(i))}
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
  sortable: PropTypes.bool,
  sortBy: PropTypes.func,
  onSortEnter: PropTypes.func,
  onSortLeave: PropTypes.func
};

TableHead.defaultProps = {
  headers: [],
  rowHeaders: true,
  sortable: false,
  sortBy: noop,
  onSortEnter: null,
  onSortLeave: null
};

export default TableHead;
