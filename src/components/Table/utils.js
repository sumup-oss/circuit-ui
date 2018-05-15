import PropTypes from 'prop-types';
import { curry, isString } from 'lodash/fp';
import { ASCENDING, DESCENDING } from './constants';
import { childrenPropType } from '../../util/shared-prop-types';

export const mapProps = props =>
  isString(props) ? { children: props } : props;

export const getChildren = props => mapProps(props).children;

export const getSortByValue = props => props.sortByValue || getChildren(props);

export const getSortDirection = (isActive, currentSort) => {
  if (!currentSort || !isActive) {
    return ASCENDING;
  }

  return currentSort === ASCENDING ? DESCENDING : ASCENDING;
};

export const ascendingSort = curry(
  (i, a, b) => getSortByValue(a[i]) > getSortByValue(b[i])
);
export const descendingSort = curry(
  (i, a, b) => getSortByValue(a[i]) < getSortByValue(b[i])
);

export const RowPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    children: childrenPropType,
    align: PropTypes.string
  })
]);
