import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash/fp';

import TableRow from '../TableRow';
import TableHeader from '../TableHeader';
import TableCell from '../TableCell';
import { mapProps, getChildren, RowPropType } from '../../utils';
import { ASCENDING, DESCENDING, TH_KEY_PREFIX } from '../../constants';

const TableHead = ({
  headers,
  rowHeaders,
  sortBy,
  sortDirection,
  sortedRow,
  onSortEnter,
  onSortLeave
}) => (
  <thead>
    {!!headers.length && (
      <TableRow header>
        {headers.map((header, i) => {
          const props = mapProps(header);
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={`${TH_KEY_PREFIX}-${i}`}>
              <TableHeader
                {...props}
                fixed={rowHeaders && i === 0}
                onClick={props.sortable ? () => sortBy(i) : null}
                onMouseEnter={
                  props.sortable ? onSortEnter && (() => onSortEnter(i)) : null
                }
                onMouseLeave={
                  props.sortable ? onSortLeave && (() => onSortLeave(i)) : null
                }
                sortDirection={sortedRow === i ? sortDirection : null}
                isSorted={sortedRow === i}
              />
              {rowHeaders &&
                i === 0 && (
                  <TableCell role="presentation" aria-hidden="true" header>
                    {getChildren(header)}
                  </TableCell>
                )}
            </Fragment>
          );
        })}
      </TableRow>
    )}
  </thead>
);

TableHead.propTypes = {
  headers: PropTypes.arrayOf(RowPropType),
  rowHeaders: PropTypes.bool,
  sortBy: PropTypes.func,
  sortDirection: PropTypes.oneOf([ASCENDING, DESCENDING]),
  sortable: PropTypes.bool,
  sortedRow: PropTypes.number,
  onSortEnter: PropTypes.func,
  onSortLeave: PropTypes.func
};

TableHead.defaultProps = {
  headers: [],
  rowHeaders: true,
  sortBy: noop,
  sortDirection: null,
  sortable: null,
  sortedRow: null,
  onSortEnter: null,
  onSortLeave: null
};

export default TableHead;
