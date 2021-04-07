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

import { ReactNode } from 'react';

import { Direction, SortByValue, CellObject, Cell, Row } from './types';

export const mapRowProps = (props: Row): { cells: Cell[] } =>
  Array.isArray(props) ? { cells: props } : props;

export const getRowCells = (props: Row): Cell[] => mapRowProps(props).cells;

export const mapCellProps = (props: Cell): CellObject =>
  typeof props === 'string' || typeof props === 'number'
    ? { children: props }
    : props;

export const getCellChildren = (props: Cell): ReactNode =>
  mapCellProps(props).children;

export const getSortByValue = (props: Cell): SortByValue | ReactNode =>
  typeof props === 'object' && props.sortByValue !== undefined
    ? props.sortByValue
    : getCellChildren(props);

export const getSortDirection = (
  isActive?: boolean,
  currentSort?: Direction,
): Direction => {
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

  if (
    first === null ||
    first === undefined ||
    second === null ||
    second === undefined
  ) {
    // if (process.env.NODE_ENV !== 'production') {
    //   console.warn(['Warn']);
    // }
    return 0;
  }

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

  if (
    first === null ||
    first === undefined ||
    second === null ||
    second === undefined
  ) {
    // if (process.env.NODE_ENV !== 'production') {
    //   console.warn(['Warn']);
    // }
    return 0;
  }

  if (first > second) {
    return -1;
  }
  if (first < second) {
    return 1;
  }

  return 0;
};
