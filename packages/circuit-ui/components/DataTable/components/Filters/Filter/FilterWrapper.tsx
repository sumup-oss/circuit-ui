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

'use client';

import { useI18n } from '../../../../../hooks/useI18n/useI18n.js';
import type { Column, ColumnType } from '../../../types.js';
import { AmountFilter } from '../AmountFilter/index.js';
import { DateFilter } from '../DateFilter/index.js';
import { FilterShell } from '../FilterShell/index.js';
import { MultiChoiceFilter } from '../MultiChoiceFilter/index.js';

import {
  getAmountKind,
  getFilterKind,
  getFilterSummary,
  normalizeFilterValue,
} from './FilterService.js';
import type {
  DateRange,
  FilterLabels,
  FilterValue,
  NumberRange,
} from './types.js';
import { useFilterDraft } from './useFilterDraft.js';

export interface FilterWrapperProps {
  /**
   * The column to filter. A filter is only shown when `filter` is true and
   * the type of the column supports one.
   */
  column: Pick<Column<unknown>, 'label' | 'type' | 'filter'>;
  // TODO: Only require the labels of the filter types in use once the columns are hooked up.
  /**
   * The labels of the fields of the amount and date filters.
   */
  labels: FilterLabels;
  /**
   * The applied value. Its shape follows the type of the column.
   */
  value?: FilterValue;
  /**
   * Called with the new value, or `undefined` when the filter is removed.
   */
  onChange: (value: FilterValue | undefined) => void;
  /**
   * `popover` shows a button that opens the filter. `inline` shows the filter
   * controls directly, e.g. inside a modal.
   * @default 'popover'
   */
  variant?: 'popover' | 'inline';
}

interface FilterBodyProps {
  type: ColumnType;
  label: string;
  labels: FilterLabels;
  hideLabel?: boolean;
  value?: FilterValue;
  onChange: (value: FilterValue | undefined) => void;
}

function FilterBody({ type, labels, value, ...props }: FilterBodyProps) {
  switch (type.name) {
    case 'singleSelection':
    case 'multiSelection':
      return (
        <MultiChoiceFilter
          {...props}
          options={type.options}
          value={value as string[] | undefined}
        />
      );
    case 'number':
      return (
        <AmountFilter
          {...props}
          amount={getAmountKind(type)}
          minLabel={labels.min}
          maxLabel={labels.max}
          value={value as NumberRange | undefined}
        />
      );
    case 'date':
      return (
        <DateFilter
          {...props}
          fromLabel={labels.from}
          toLabel={labels.to}
          value={value as DateRange | undefined}
        />
      );
    default:
      return null;
  }
}

function PopoverFilter({
  type,
  label,
  value,
  onChange,
  ...props
}: FilterBodyProps) {
  const { formattingLocale } = useI18n({});
  const { draft, setDraft, apply, clear, discard } = useFilterDraft(
    value,
    (next) => onChange(normalizeFilterValue({ type }, next)),
  );

  return (
    <FilterShell
      label={label}
      summary={getFilterSummary({ type }, value, formattingLocale)}
      onApply={apply}
      onClear={clear}
      onDiscard={discard}
    >
      <FilterBody
        {...props}
        type={type}
        label={label}
        hideLabel
        value={draft}
        onChange={setDraft}
      />
    </FilterShell>
  );
}

/**
 * Shows the filter that fits the type of a column, or nothing when the column
 * has no filter.
 */
export function FilterWrapper({
  column,
  variant = 'popover',
  ...props
}: FilterWrapperProps) {
  const kind = getFilterKind(column);

  if (!kind) {
    return null;
  }

  if (variant === 'inline') {
    return <FilterBody {...props} type={column.type} label={column.label} />;
  }

  return <PopoverFilter {...props} type={column.type} label={column.label} />;
}
