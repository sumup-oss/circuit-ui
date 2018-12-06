import PropTypes from 'prop-types';
import { isString, isNumber, curry } from 'lodash/fp';
import { ASCENDING, DESCENDING } from './constants';
import { childrenPropType } from '../../util/shared-prop-types';

export const mapProps = props =>
  isString(props) || isNumber(props) ? { children: props } : props;

export const getChildren = props => mapProps(props).children;

export const getSortByValue = props =>
  Object.prototype.hasOwnProperty.call(props, 'sortByValue')
    ? props.sortByValue
    : getChildren(props);

export const getSortDirection = (isActive, currentSort) => {
  if (!currentSort || !isActive) {
    return ASCENDING;
  }

  return currentSort === ASCENDING ? DESCENDING : ASCENDING;
};

export const ascendingSort = curry((i, a, b) => {
  const first = getSortByValue(a[i]);
  const second = getSortByValue(b[i]);

  if (first < second) {
    return -1;
  }
  if (first > second) {
    return 1;
  }

  return 0;
});

export const descendingSort = curry((i, a, b) => {
  const first = getSortByValue(a[i]);
  const second = getSortByValue(b[i]);

  if (first > second) {
    return -1;
  }
  if (first < second) {
    return 1;
  }

  return 0;
});

export const RowPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    children: childrenPropType,
    align: PropTypes.string
  })
]);
