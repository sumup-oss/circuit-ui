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

import { childrenPropType } from '../../util/shared-prop-types';

export type DIRECTION = 'ascending' | 'descending';

// TODO this should also take a JSX.Element, will have to adapt mapCellChildren
type CellChildren = string | number;

type Cell =
  | CellChildren
  | {
      children: CellChildren;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sortByValue?: any; // TODO sortByValue is usually a number but it could be a date object, or possibly more
    };

export type Row =
  | Cell[]
  | {
      cells: Cell[];
      align?: string;
    };

export const mapRowProps = (props: Row): { cells: Cell[] } =>
  Array.isArray(props) ? { cells: props } : props;

export const getRowCells = (props: Row): Cell[] => mapRowProps(props).cells;

export const mapCellProps = (props: Cell): { children: CellChildren } =>
  typeof props === 'string' || typeof props === 'number'
    ? { children: props }
    : props;

export const getCellChildren = (props: Cell): CellChildren =>
  mapCellProps(props).children;

export const getSortByValue = (props: Cell): string | CellChildren =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  typeof props === 'object' && props.sortByValue
    ? props.sortByValue
    : getCellChildren(props);

export const getSortDirection = (
  isActive?: boolean,
  currentSort?: DIRECTION | null,
): DIRECTION => {
  if (!currentSort || !isActive) {
    return 'ascending';
  }

  return currentSort === 'ascending' ? 'descending' : 'ascending';
};

export const ascendingSort = (i: number) => (a: Row, b: Row): 0 | 1 | -1 => {
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
};

export const descendingSort = (i: number) => (a: Row, b: Row): 0 | 1 | -1 => {
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
};

/**
 * TODO delete this when TableHead and TableBody have been migrated
 */
export const RowPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    children: childrenPropType,
    align: PropTypes.string,
  }),
]);
