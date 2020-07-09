/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import PropTypes from 'prop-types';
import { isString, isNumber, isArray, curry } from 'lodash/fp';

import { childrenPropType } from '../../util/shared-prop-types';

import { ASCENDING, DESCENDING } from './constants';

export const mapRowProps = props => (isArray(props) ? { cells: props } : props);

export const getRowCells = props => mapRowProps(props).cells;

export const mapCellProps = props =>
  isString(props) || isNumber(props) ? { children: props } : props;

export const getCellChildren = props => mapCellProps(props).children;

export const getSortByValue = props =>
  Object.prototype.hasOwnProperty.call(props, 'sortByValue')
    ? props.sortByValue
    : getCellChildren(props);

export const getSortDirection = (isActive, currentSort) => {
  if (!currentSort || !isActive) {
    return ASCENDING;
  }

  return currentSort === ASCENDING ? DESCENDING : ASCENDING;
};

export const ascendingSort = curry((i, a, b) => {
  const firstRow = getRowCells(a);
  const secondRow = getRowCells(b);
  const first = getSortByValue(firstRow[i]);
  const second = getSortByValue(secondRow[i]);

  if (first < second) {
    return -1;
  }
  if (first > second) {
    return 1;
  }

  return 0;
});

export const descendingSort = curry((i, a, b) => {
  const firstRow = getRowCells(a);
  const secondRow = getRowCells(b);
  const first = getSortByValue(firstRow[i]);
  const second = getSortByValue(secondRow[i]);

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
    align: PropTypes.string,
  }),
]);
