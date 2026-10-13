/**
 * Copyright 2026, SumUp Ltd.
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

import type { Column } from '../../types.js';

import type { FilterKind, FilterValue } from './types.js';

type FilterColumn = Pick<Column<unknown>, 'type' | 'filter'>;

type NumberColumnType = Extract<FilterColumn['type'], { name: 'number' }>;

export type AmountKind =
  | { kind: 'number' | 'percentage' }
  | { kind: 'currency'; currency: string };

/**
 * Derives the kind of amount filter for a number column from its formatting.
 */
export function getAmountKind({
  formattingOptions,
}: NumberColumnType): AmountKind {
  if (formattingOptions?.style === 'currency' && formattingOptions.currency) {
    return { kind: 'currency', currency: formattingOptions.currency };
  }
  if (formattingOptions?.style === 'percent') {
    return { kind: 'percentage' };
  }
  return { kind: 'number' };
}

/**
 * Returns the kind of filter for a column, or `undefined` when the column has
 * no filter or its type does not support one.
 */
export function getFilterKind({
  type,
  filter,
}: FilterColumn): FilterKind | undefined {
  if (!filter) {
    return undefined;
  }
  switch (type.name) {
    case 'singleSelection':
      return 'single';
    case 'multiSelection':
      return 'multi';
    case 'number':
      return getAmountKind(type).kind;
    case 'date':
      return 'date';
    default:
      return undefined;
  }
}

/**
 * Returns how many selections a filter has, e.g. for the count on its trigger.
 */
export function getFilterCount(
  kind: FilterKind,
  value: FilterValue | undefined,
): number {
  if (value === undefined) {
    return 0;
  }
  return kind === 'multi' ? (value as string[]).length : 1;
}
