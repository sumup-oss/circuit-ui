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

import { ReactNode, useCallback, useEffect, useState } from 'react';

import { isArray, isFunction } from '../../util/type-check';

import {
  Direction,
  SortByValue,
  RowCellObject,
  HeaderCellObject,
  HeaderCell,
  RowCell,
  Row,
  SortParams,
} from './types';

export const mapChildRowProps = (
  props: Row,
): { cells: RowCell[]; isChild: boolean } =>
  isArray(props)
    ? { cells: props, isChild: true }
    : { cells: props.cells, isChild: true };

export const mapRowProps = (
  props: Row,
): { cells: RowCell[]; children?: Row[]; isChild: boolean } =>
  isArray(props)
    ? { cells: props, isChild: false }
    : { ...props, isChild: false };

export const useExpandableTableOptions = (rows: Row[]) => {
  const [toggleState, setToggleState] = useState<boolean[]>([]);
  const [expandableState, setExpandableState] = useState<boolean[]>([]);

  const [data, setData] = useState<{ cells: RowCell[]; isChild: boolean }[]>(
    [],
  );

  const toggleRow = useCallback(
    (rowIndex: number) => {
      // get original row
      const row = mapRowProps(rows[rowIndex]);
      if (row.children) {
        // if already open, close row and remove children from data array
        if (toggleState[rowIndex]) {
          const newData = [...data];
          newData.splice(rowIndex + 1, row.children.length);
          setData(newData);
          // update toggle state
          const newState = [...toggleState];
          newState[rowIndex] = false;
          setToggleState(newState);
        } else {
          // if row not open, insert children in new data array
          const newData = [...data];
          const newElements = row.children.map((el) => mapChildRowProps(el));
          newData.splice(rowIndex + 1, 0, ...newElements);
          setData(newData);
          // update toggle state
          const newState = [...toggleState];
          newState[rowIndex] = true;
          setToggleState(newState);
        }
      }
    },
    [toggleState, setToggleState, setData, data, rows],
  );

  useEffect(() => {
    setToggleState(rows.map(() => false));
    setExpandableState(rows.map((el) => !!mapRowProps(el).children));
    setData(rows.map((el) => mapRowProps(el)));
  }, [rows]);

  return {
    data,
    toggleState,
    expandableState,
    toggleRow,
  };
};

export const getRowCells = (props: Row): RowCell[] => mapRowProps(props).cells;

export function mapCellProps(props: RowCell): RowCellObject;
export function mapCellProps(props: HeaderCell): HeaderCellObject;
export function mapCellProps(
  props: RowCell | HeaderCell,
): RowCellObject | HeaderCellObject {
  return typeof props === 'string' ||
    typeof props === 'number' ||
    props === null ||
    props === undefined
    ? { children: props }
    : props;
}

export const getSortByValue = (props: RowCell): SortByValue | ReactNode => {
  const cell = mapCellProps(props);

  return cell.sortByValue !== undefined ? cell.sortByValue : cell.children;
};

export const getSortDirection = (
  isActive?: boolean,
  currentSort?: Direction,
): Direction => {
  if (!currentSort || !isActive) {
    return 'ascending';
  }

  return currentSort === 'ascending' ? 'descending' : 'ascending';
};

export const ascendingSort =
  (i: number) =>
  (a: Row, b: Row): 0 | 1 | -1 => {
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

export const descendingSort =
  (i: number) =>
  (a: Row, b: Row): 0 | 1 | -1 => {
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

export const getSortParams = ({
  rowIndex,
  sortable,
  sortDirection,
  sortLabel,
  sortedRow,
}: {
  rowIndex: number;
  sortable?: boolean;
  sortDirection?: Direction;
  sortLabel?: string | (({ direction }: { direction?: Direction }) => string);
  sortedRow?: number;
}): SortParams => {
  if (!sortable || !sortLabel) {
    return { sortable: false };
  }
  const isSorted = sortedRow === rowIndex;
  return {
    sortable: true,
    sortLabel: isFunction(sortLabel)
      ? sortLabel({ direction: sortDirection })
      : sortLabel,
    sortDirection: isSorted ? sortDirection : undefined,
    isSorted,
  };
};

export function defaultSortBy(
  i: number,
  rows: Row[],
  direction?: Direction,
): Row[] {
  const sortFn = direction === 'ascending' ? ascendingSort : descendingSort;

  return [...rows].sort(sortFn(i));
}
