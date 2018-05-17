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
  onSortBy,
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
                // eslint-disable-next-line react/prop-types
                onClick={props.sortable ? () => onSortBy(i) : null}
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

/**
 * [PRIVATE] TableHead for the Table component. The Table handlers rendering it
 */
TableHead.propTypes = {
  /**
   * An array of headers for the table. The Header can be a string or an object
   * with options described on TableHeader component
   */
  headers: PropTypes.arrayOf(RowPropType),
  /**
   * Enables/disables sticky columns on mobile
   */
  rowHeaders: PropTypes.bool,
  /**
   * [PRIVATE] sortBy handler
   */
  onSortBy: PropTypes.func,
  /**
   * [PRIVATE] The current sortDirection
   */
  sortDirection: PropTypes.oneOf([ASCENDING, DESCENDING]),
  /**
   * [PRIVATE] The current sorted row index
   */
  sortedRow: PropTypes.number,
  /**
   * [PRIVATE] sortEnter handler
   */
  onSortEnter: PropTypes.func,
  /**
   * [PRIVATE] sortLeave handler
   */
  onSortLeave: PropTypes.func
};

TableHead.defaultProps = {
  headers: [],
  rowHeaders: false,
  onSortBy: noop,
  sortDirection: null,
  sortedRow: null,
  onSortEnter: null,
  onSortLeave: null
};

export default TableHead;
