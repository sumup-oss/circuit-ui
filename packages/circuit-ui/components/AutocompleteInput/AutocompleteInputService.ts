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
import type { AutocompleteInputSuggestion } from './components/Suggestion/Suggestion.js';
import type { AutocompleteInputSuggestionGroup } from './components/SuggestionBox/SuggestionBox.js';

export const isGroup = (
  suggestion: AutocompleteInputSuggestionGroup | AutocompleteInputSuggestion,
): suggestion is AutocompleteInputSuggestionGroup =>
  suggestion && 'label' in suggestion && 'suggestions' in suggestion;

export const getSuggestionByValue = (
  suggestions: AutocompleteInputProps['suggestions'],
  value?: string,
): AutocompleteInputSuggestion | undefined => {
  if (!value) {
    return undefined;
  }
  const flatSuggestions = suggestions.flatMap((suggestion) =>
    isGroup(suggestion) ? suggestion.suggestions : suggestion,
  );

  return flatSuggestions.find((suggestion) => suggestion.value === value);
};

export const isSuggestionFocused = (
  suggestionValues: string[],
  value: string,
  activeSuggestion?: number,
) =>
  activeSuggestion !== undefined
    ? suggestionValues[activeSuggestion] === value
    : false;
