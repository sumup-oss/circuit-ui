/**
 * Copyright 2025, SumUp Ltd.
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

import type { AutocompleteInputProps } from './AutocompleteInput.js';
import type { AutocompleteInputOption } from './components/Option/Option.js';
import type { AutocompleteInputOptionGroup } from './components/Options/Options.js';

export const isGroup = (
  option: AutocompleteInputOptionGroup | AutocompleteInputOption,
): option is AutocompleteInputOptionGroup =>
  option && 'label' in option && 'options' in option;

export const getOptionByValue = (
  options: AutocompleteInputProps['options'],
  value?: string,
): AutocompleteInputOption | undefined => {
  if (!value) {
    return undefined;
  }
  const flatOptions = options.flatMap((option) =>
    isGroup(option) ? option.options : option,
  );

  return flatOptions.find((option) => option.value === value);
};

export const isOptionFocused = (
  optionValues: string[],
  value: string,
  activeOption?: number,
) =>
  activeOption !== undefined ? optionValues[activeOption] === value : false;
