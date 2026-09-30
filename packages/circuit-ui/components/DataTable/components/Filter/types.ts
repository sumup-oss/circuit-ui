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

import type { ReactNode } from 'react';

export interface FilterOption {
  label: string;
  value: string;
}

export interface NumberRange {
  min?: number;
  max?: number;
}

/**
 * ISO 8601 calendar dates (`YYYY-MM-DD`), inclusive.
 */
export interface DateRange {
  min?: string;
  max?: string;
}

/**
 * The value of each filter type. An `undefined` value means the filter is
 * not active.
 */
export interface FilterValueMap {
  single: string;
  multi: string[];
  number: NumberRange;
  percentage: NumberRange;
  currency: NumberRange;
  date: DateRange;
  custom: unknown;
}

export interface CustomFilterRenderProps {
  value: unknown;
  onChange: (value: unknown) => void;
  onClose: () => void;
}

export type FilterConfig =
  | { type: 'single'; options: FilterOption[] }
  | { type: 'multi'; options: FilterOption[] }
  | { type: 'number' }
  | { type: 'percentage' }
  | { type: 'currency'; currency: string }
  | { type: 'date' }
  /** Reserved for later. Not rendered yet. */
  | { type: 'custom'; render: (props: CustomFilterRenderProps) => ReactNode };

export type FilterType = FilterConfig['type'];
