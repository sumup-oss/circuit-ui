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

import { formatCurrency, formatDate, formatNumber } from '@sumup-oss/intl';

import { toPlainDate } from '../../../../../util/date.js';
import type { Locale } from '../../../../../util/i18n.js';
import type { Column } from '../../../types.js';

import type {
  DateRange,
  FilterKind,
  FilterValue,
  NumberRange,
} from './types.js';

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
 * Puts the ends of a range in order, so that a minimum above the maximum (or
 * a start date after the end date) becomes a valid range. Other values are
 * returned as they are.
 */
export function normalizeFilterValue(
  { type }: Pick<FilterColumn, 'type'>,
  value: FilterValue | undefined,
): FilterValue | undefined {
  if (value === undefined) {
    return undefined;
  }
  switch (type.name) {
    case 'number': {
      const { min, max } = value as NumberRange;
      return min !== undefined && max !== undefined && min > max
        ? { min: max, max: min }
        : value;
    }
    case 'date': {
      const { from, to } = value as DateRange;
      return from !== undefined && to !== undefined && from > to
        ? { from: to, to: from }
        : value;
    }
    default:
      return value;
  }
}

function formatRange(
  start: string | undefined,
  end: string | undefined,
): string | undefined {
  if (start !== undefined && end !== undefined) {
    return `${start} – ${end}`;
  }
  if (start !== undefined) {
    return `≥ ${start}`;
  }
  return end === undefined ? undefined : `≤ ${end}`;
}

/**
 * Describes the applied value of a filter in a few words, to show on its
 * trigger: the number of selections, or the range of an amount or a date.
 */
export function getFilterSummary(
  { type }: Pick<FilterColumn, 'type'>,
  value: FilterValue | undefined,
  locale: Locale,
): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  switch (type.name) {
    case 'singleSelection':
    case 'multiSelection':
      return String((value as string[]).length);
    case 'number': {
      const amount = getAmountKind(type);
      const format = (number: number) => {
        if (amount.kind === 'currency') {
          return formatCurrency(number, locale, amount.currency);
        }
        if (amount.kind === 'percentage') {
          return formatNumber(number / 100, locale, {
            style: 'percent',
            maximumFractionDigits: 2,
          });
        }
        return formatNumber(number, locale);
      };
      const { min, max } = value as NumberRange;
      return formatRange(
        min === undefined ? undefined : format(min),
        max === undefined ? undefined : format(max),
      );
    }
    case 'date': {
      const format = (date: string) => {
        const plainDate = toPlainDate(date);
        return plainDate ? formatDate(plainDate, locale, 'medium') : date;
      };
      const { from, to } = value as DateRange;
      return formatRange(
        from === undefined ? undefined : format(from),
        to === undefined ? undefined : format(to),
      );
    }
    default:
      return undefined;
  }
}
