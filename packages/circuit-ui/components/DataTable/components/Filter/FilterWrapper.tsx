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

import type { Column, ColumnType } from '../../types.js';
import { AmountFilter } from '../AmountFilter/index.js';
import { DateFilter } from '../DateFilter/index.js';
import { FilterShell } from '../FilterShell/index.js';
import { MultiChoiceFilter } from '../MultiChoiceFilter/index.js';
import { SingleChoiceFilter } from '../SingleChoiceFilter/index.js';

import {
  getAmountKind,
  getFilterCount,
  getFilterKind,
} from './FilterService.js';
import type {
  DateRange,
  FilterKind,
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
  hideLabel?: boolean;
  value?: FilterValue;
  onChange: (value: FilterValue | undefined) => void;
}

function FilterBody({
  type,
  label,
  hideLabel,
  value,
  onChange,
}: FilterBodyProps) {
  switch (type.name) {
    case 'singleSelection':
      return (
        <SingleChoiceFilter
          label={label}
          hideLabel={hideLabel}
          options={type.options}
          value={value as string | undefined}
          onChange={onChange}
        />
      );
    case 'multiSelection':
      return (
        <MultiChoiceFilter
          label={label}
          hideLabel={hideLabel}
          options={type.options}
          value={value as string[] | undefined}
          onChange={onChange}
        />
      );
    case 'number':
      return (
        <AmountFilter
          label={label}
          hideLabel={hideLabel}
          value={value as NumberRange | undefined}
          onChange={onChange}
          {...getAmountKind(type)}
        />
      );
    case 'date':
      return (
        <DateFilter
          label={label}
          hideLabel={hideLabel}
          value={value as DateRange | undefined}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
}

function PopoverFilter({
  kind,
  type,
  label,
  value,
  onChange,
}: FilterBodyProps & { kind: FilterKind }) {
  const { draft, setDraft, apply, clear, discard } = useFilterDraft(
    value,
    onChange,
  );

  return (
    <FilterShell
      label={label}
      count={getFilterCount(kind, value)}
      onApply={apply}
      onClear={clear}
      onDiscard={discard}
    >
      <FilterBody
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
  value,
  onChange,
  variant = 'popover',
}: FilterWrapperProps) {
  const kind = getFilterKind(column);

  if (!kind) {
    return null;
  }

  if (variant === 'inline') {
    return (
      <FilterBody
        type={column.type}
        label={column.label}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <PopoverFilter
      kind={kind}
      type={column.type}
      label={column.label}
      value={value}
      onChange={onChange}
    />
  );
}
