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

import { type ChangeEvent, useId } from 'react';

import { CheckboxGroup } from '../../../CheckboxGroup/index.js';
import type { FilterOption } from '../Filter/types.js';

export interface MultiChoiceFilterProps {
  /**
   * The name of the filter, used as the label of the checkbox group.
   */
  label: string;
  /**
   * Visually hide the label, e.g. when the trigger button already names the
   * filter.
   */
  hideLabel?: boolean;
  /**
   * The available options.
   */
  options: FilterOption[];
  /**
   * The values of the selected options. `undefined` means no option is
   * selected.
   */
  value?: string[];
  /**
   * Called with the values of the selected options, in the order of the
   * `options`. Called with `undefined` when the last option is deselected.
   */
  onChange: (value: string[] | undefined) => void;
}

/**
 * Lets the user pick any number of options. Changes are reported immediately.
 */
export function MultiChoiceFilter({
  label,
  hideLabel,
  options,
  value = [],
  onChange,
}: MultiChoiceFilterProps) {
  const name = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: optionValue, checked } = event.target;
    const selected = checked
      ? [...value, optionValue]
      : value.filter((item) => item !== optionValue);
    const ordered = options
      .map((option) => option.value)
      .filter((item) => selected.includes(item));

    onChange(ordered.length > 0 ? ordered : undefined);
  };

  return (
    <CheckboxGroup
      name={name}
      label={label}
      hideLabel={hideLabel}
      options={options}
      value={value}
      onChange={handleChange}
    />
  );
}
