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

import type { ChangeEvent } from 'react';

import { RadioButtonGroup } from '../../../RadioButtonGroup/index.js';
import type { Option } from '../../types.js';

export interface SingleChoiceFilterProps {
  /**
   * The name of the filter, used as the label of the radio group.
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
  options: Option[];
  /**
   * The value of the selected option. `undefined` means no option is selected.
   */
  value?: string;
  /**
   * Called with the value of the option that the user selected.
   */
  onChange: (value: string) => void;
}

/**
 * Lets the user pick exactly one option. Changes are reported immediately.
 */
export function SingleChoiceFilter({
  label,
  hideLabel,
  options,
  value,
  onChange,
}: SingleChoiceFilterProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <RadioButtonGroup
      label={label}
      hideLabel={hideLabel}
      // Setting `checked` on every option keeps the group controlled, even
      // when nothing is selected.
      options={options.map((option) => ({
        ...option,
        checked: option.value === value,
      }))}
      onChange={handleChange}
    />
  );
}
