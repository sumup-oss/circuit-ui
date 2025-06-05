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

import type { AutocompleteProps } from './Autocomplete.js';
import type { SuggestionType } from './components/Suggestion/Suggestion.js';
import type { SuggestionGroup } from './components/SuggestionBox/SuggestionBox.js';

export const getSuggestionLabelByValue = (
  suggestions: AutocompleteProps['suggestions'],
  value?: string,
): string => {
  if (!value) {
    return '';
  }
  const flatSuggestions = suggestions.flatMap((suggestion) =>
    'suggestions' in suggestion ? suggestion.suggestions : suggestion,
  );

  return (
    flatSuggestions.find((suggestion) => suggestion.value === value)?.label ||
    value
  );
};

export const computeTabIndex = (
  suggestionValues: string[],
  value: string,
  isLoading: boolean,
  activeSuggestion?: number,
) => {
  if (activeSuggestion === undefined) {
    return -1;
  }
  return !isLoading && suggestionValues[activeSuggestion] === value ? 0 : -1;
};

export const isSuggestionFocused = (
  suggestionValues: string[],
  value: string,
  activeSuggestion?: number,
) =>
  activeSuggestion !== undefined
    ? suggestionValues[activeSuggestion] === value
    : false;

export const isGroup = (
  suggestion: SuggestionGroup | SuggestionType,
): suggestion is { label: string; suggestions: SuggestionType[] } =>
  suggestion && 'label' in suggestion && 'suggestions' in suggestion;
