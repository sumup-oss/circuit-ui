/**
 * Copyright 2021, SumUp Ltd.
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

export type SortByValue = boolean | number | string | Date;

export type Direction = 'ascending' | 'descending';

export type CellAlignment = 'left' | 'right' | 'center';

type SortableHeaderCell =
  | { sortable?: false; sortLabel?: never; sortByValue?: never }
  | {
      /**
       * Makes a table column sortable. An accessible `sortLabel` also needs to
       * be provided.
       */
      sortable: true;
      /**
       * Visually hidden label for the sort button for visually impaired users.
       * When passed as a function, it is called with the sort `{ direction }`.
       */
      sortLabel:
        | string
        | (({ direction }: { direction?: Direction }) => string);
    };

type SortableRowCell = {
  /**
   * An optional value to change the order of the table rows.
   */
  sortByValue?: SortByValue;
};

type CellObject = {
  'children': ReactNode;
  'align'?: CellAlignment;
  'data-testid'?: string;
};

export type RowCellObject = SortableRowCell & CellObject;

export type HeaderCellObject = CellObject & SortableHeaderCell;

type Cell = string | number | null | undefined;

export type HeaderCell = Cell | HeaderCellObject;

export type RowCell = Cell | RowCellObject;

export type Row = RowCell[] | { cells: RowCell[] };

export type SortParams =
  | {
      /**
       * Defines whether or not the row is sortable.
       */
      sortable: true;
      /**
       * Defines whether or not the row is currently sorted.
       */
      isSorted: boolean;
      /**
       * A visually hidden label for the sort button for visually impaired users.
       */
      sortLabel: string;
      /**
       * The row's current sort direction.
       */
      sortDirection?: Direction;
    }
  | {
      sortable: false;
      sortLabel?: never;
      sortDirection?: never;
      isSorted?: never;
    };
