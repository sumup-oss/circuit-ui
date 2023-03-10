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

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

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
  OnSortBy,
  RowWithInfo,
  StateInfo,
} from './types';

export const mapRowProps = (
  props: Row,
  originalRows: Row[],
  isChild: boolean,
  parentIndex?: number,
): RowWithInfo => {
  // eslint-disable-next-line no-nested-ternary

  if (isArray(props)) {
    return {
      cells: props,
      isChild,
      key: `table-row${
        isChild ? `-${parentIndex!}-child` : ''
      }-${originalRows.indexOf(props)}`,
    };
  }
  return isChild
    ? {
        cells: props.cells,
        isChild,
        key: `table-row-${parentIndex!}-child-${originalRows.indexOf(props)}`,
      }
    : {
        ...props,
        isChild,
        key: `table-row-${originalRows.indexOf(props)}`,
      };
};

export const getSortedRows = (
  sortDirection: Direction,
  sortedRow: number,
  rows: Row[],
  onSortBy?: OnSortBy,
): Row[] =>
  onSortBy
    ? onSortBy(sortedRow, rows, sortDirection)
    : defaultSortBy(sortedRow, rows, sortDirection);

export const computeInitialsToggleState = (rows: Row[]): StateInfo => {
  const initialState: StateInfo = {};
  rows.forEach((_row, index) => {
    initialState[`table-row-${index}`] = false;
  });
  return initialState;
};
export const computeInitialsExpandableState = (
  rows: Row[],
): { [key: string]: number } => {
  const initialState: { [key: string]: number } = {};
  rows.forEach((row, index) => {
    initialState[`table-row-${index}`] =
      mapRowProps(row, rows, false).children?.length ?? 0;
  });
  return initialState;
};

export const applyExpandAfterSort = (
  sortedData: Row[],
  rows: Row[],
  toggleState: StateInfo,
): RowWithInfo[] => {
  const result: RowWithInfo[] = [];
  sortedData.forEach((row, index) => {
    const positionInOriginalRows = rows.indexOf(row);
    const rowWithChildren = mapRowProps(
      rows[positionInOriginalRows],
      rows,
      false,
    );
    result.push(rowWithChildren);
    if (toggleState[`table-row-${positionInOriginalRows}`]) {
      const newElements = rowWithChildren.children!.map((el) =>
        mapRowProps(
          el,
          rowWithChildren.children ?? [],
          true,
          positionInOriginalRows,
        ),
      );
      result.splice(index + 1, 0, ...newElements);
    }
  });

  return result;
};

export const useExpandableTableOptions = (
  rows: Row[],
  sortDirection?: Direction,
  sortedRow?: number,
  onSortBy?: OnSortBy,
) => {
  const [toggleState, setToggleState] = useState<StateInfo>(
    useMemo(() => computeInitialsToggleState(rows), [rows]),
  );
  const [childCountState, setChildCountState] = useState<{
    [key: string]: number;
  }>(useMemo(() => computeInitialsExpandableState(rows), [rows]));

  const [data, setData] = useState<RowWithInfo[]>([]);

  const toggleRow = useCallback(
    (key: string, index: number) => {
      const originalIndex = Number(key.slice(-1));
      // get original row
      const rowWithInfo = mapRowProps(rows[originalIndex], rows, false);

      if (rowWithInfo.children) {
        // if already open, close row and remove children from data array
        if (toggleState[key]) {
          const newData = [...data];
          newData.splice(index + 1, rowWithInfo.children.length);
          setData(newData);
          // update toggle state
          const newState = { ...toggleState };
          newState[key] = false;
          setToggleState(newState);
        } else {
          // if row not open, insert children in new data array
          const newData = [...data];
          const newElements = rowWithInfo.children.map((el) =>
            mapRowProps(el, rowWithInfo.children ?? [], true, originalIndex),
          );
          newData.splice(index + 1, 0, ...newElements);
          setData(newData);
          // update toggle state
          const newState = { ...toggleState };
          newState[key] = true;
          setToggleState(newState);
        }
      }
    },
    [toggleState, setToggleState, setData, data, rows],
  );

  useEffect(() => {
    setToggleState(computeInitialsToggleState(rows));
    setChildCountState(computeInitialsExpandableState(rows));
    setData(rows.map((el) => mapRowProps(el, rows, false)));
  }, [rows]);

  useEffect(() => {
    if (sortDirection && sortedRow !== undefined) {
      const newData = getSortedRows(
        sortDirection,
        sortedRow,
        rows,
        onSortBy ?? defaultSortBy,
      );
      // update data with Expand state
      const dataToView = applyExpandAfterSort(newData, rows, toggleState);
      setData(dataToView);
    }
  }, [sortDirection, sortedRow, onSortBy, rows, toggleState]);

  return {
    data,
    toggleState,
    childCountState,
    toggleRow,
  };
};

export const getRowCells = (props: Row, rows: Row[]): RowCell[] =>
  mapRowProps(props, rows, false).cells;

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
  (i: number, rows: Row[]) =>
  (a: Row, b: Row): 0 | 1 | -1 => {
    const firstRow = getRowCells(a, rows);
    const secondRow = getRowCells(b, rows);
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
  (i: number, rows: Row[]) =>
  (a: Row, b: Row): 0 | 1 | -1 => {
    const firstRow = getRowCells(a, rows);
    const secondRow = getRowCells(b, rows);
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

  return [...rows].sort(sortFn(i, rows));
}

export const generateRowIds = (parentIndex: number, count: number): string => {
  const ids: string[] = [];
  for (let i = 0; i < count; i += 1) {
    ids.push(`table-row-${parentIndex}-child-${i}`);
  }
  return ids.join(' ');
};
