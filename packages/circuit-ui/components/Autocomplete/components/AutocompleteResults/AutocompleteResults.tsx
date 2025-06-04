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

'use client';

import { useMemo } from 'react';

import classes from './AutocompleteResults.module.css';
import { utilClasses } from '../../../../styles/utility.js';
import { SuggestionBox } from '../SuggestionBox/SuggestionBox.js';
import type { AutocompleteProps } from '../../Autocomplete.js';
import { isGroup } from '../../AutocompleteService.js';

export interface AutocompleteResultsProps
  extends Pick<
    AutocompleteProps,
    | 'suggestions'
    | 'isLoading'
    | 'loadingLabel'
    | 'noResultsMessage'
    | 'value'
    | 'label'
    | 'loadMore'
    | 'readOnly'
    | 'action'
  > {
  autocompleteId: string;
  onSuggestionClicked: (value: string) => void;
  activeSuggestion?: number;
  allowNewItems?: boolean;
  searchText?: string;
}

export const AutocompleteResults = ({
  isLoading,
  loadingLabel,
  noResultsMessage,
  suggestions,
  value,
  onSuggestionClicked,
  label,
  activeSuggestion,
  loadMore,
  readOnly,
  action,
  autocompleteId,
  allowNewItems,
  searchText,
}: AutocompleteResultsProps) => {
  const suggestionValues: string[] = useMemo(
    () =>
      suggestions
        .flatMap((suggestion) =>
          isGroup(suggestion) ? suggestion.suggestions : suggestion,
        )
        .map((suggestion) => suggestion.value),
    [suggestions],
  );

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        aria-busy={isLoading}
        className={utilClasses.hideVisually}
      >
        {suggestionValues.length} results found
      </div>
      {isLoading && suggestions.length === 0 && loadingLabel}
      {!isLoading &&
        suggestions.length === 0 &&
        !allowNewItems &&
        noResultsMessage}

      {(suggestions.length > 0 ||
        (allowNewItems && suggestions.length === 0)) && (
        <SuggestionBox
          value={value}
          suggestions={suggestions}
          suggestionValues={suggestionValues}
          onSuggestionClicked={onSuggestionClicked}
          label={label}
          autocompleteId={autocompleteId}
          activeSuggestion={activeSuggestion}
          aria-readonly={readOnly}
          isLoading={isLoading}
          loadMore={loadMore}
          searchText={searchText}
          allowNewItems={allowNewItems}
        />
      )}
      {action && <div className={classes.action}>{action}</div>}
    </>
  );
};
