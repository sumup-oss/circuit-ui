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

import { useI18n } from '../../../../../../../hooks/useI18n/useI18n.js';
import type { Column, ColumnType } from '../../../../../types.js';
import { AmountFilter } from '../AmountFilter/index.js';
import { DateFilter } from '../DateFilter/index.js';
import { FilterShell } from '../FilterShell/index.js';
import { MultiChoiceFilter } from '../MultiChoiceFilter/index.js';

import {
  getAmountKind,
  getFilterKind,
  getFilterSummary,
  getSelectionOptions,
  normalizeFilterValue,
} from './FilterService.js';
import type {
  DateRange,
  FilterLabels,
  FilterValue,
  NumberRange,
} from './types.js';
import { useFilterDraft } from './useFilterDraft.js';
import { CircuitError } from '../../../../../../../util/errors.js';

export interface FilterWrapperProps<P = unknown> {
  /**
   * The column to filter. A filter is only shown when `filter` is true and
   * the type of the column supports one.
   */
  column: Pick<Column<P>, 'label' | 'type' | 'filter'>;
  /**
   * Labels the filter will need to render
   */
  labels?: FilterLabels;
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

interface FilterBodyProps<P> {
  type: ColumnType<P>;
  label: string;
  labels?: FilterLabels;
  hideLabel?: boolean;
  value?: FilterValue;
  onChange: (value: FilterValue | undefined) => void;
}

function FilterBody<P>({ type, labels, value, ...props }: FilterBodyProps<P>) {
  switch (type.name) {
    case 'boolean':
    case 'singleSelection':
    case 'multiSelection':
      return (
        <MultiChoiceFilter
          {...props}
          options={getSelectionOptions(type)}
          value={value as string[] | undefined}
        />
      );
    case 'number':
      if (labels && 'min' in labels && 'max' in labels) {
        return (
          <AmountFilter
            {...props}
            amount={getAmountKind(type)}
            minLabel={labels.min}
            maxLabel={labels.max}
            value={value as NumberRange | undefined}
          />
        );
      }
      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test'
      ) {
        throw new CircuitError(
          'DataGrid Filter',
          `The "min" or "max"  labels for "${props.label}" is missing`,
        );
      }
      return null;

    case 'date':
      if (labels && 'from' in labels && 'to' in labels) {
        return (
          <DateFilter
            {...props}
            fromLabel={labels.from}
            toLabel={labels.to}
            value={value as DateRange | undefined}
          />
        );
      }
      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test'
      ) {
        throw new CircuitError(
          'DataGrid Filter',
          `The "from" or "to" labels for "${props.label}" is missing`,
        );
      }
      return null;
    default:
      return null;
  }
}

function PopoverFilter<P>({
  type,
  label,
  value,
  onChange,
  ...props
}: FilterBodyProps<P>) {
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
export function Filter<P>({
  column,
  variant = 'popover',
  ...props
}: FilterWrapperProps<P>) {
  const kind = getFilterKind(column);

  if (!kind) {
    return null;
  }

  if (variant === 'inline') {
    return <FilterBody {...props} type={column.type} label={column.label} />;
  }

  return <PopoverFilter {...props} type={column.type} label={column.label} />;
}
