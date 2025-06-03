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

import { type HTMLAttributes, type UIEvent, useEffect, useRef } from 'react';
import { Plus } from '@sumup-oss/icons';

import {
  type AutocompleteSuggestion,
  Suggestion,
} from '../Suggestion/Suggestion.js';
import { Compact } from '../../../Compact/index.js';
import type { AutocompleteProps } from '../../Autocomplete.js';
import {
  computeTabIndex,
  isGroup,
  isSuggestionFocused,
} from '../../AutocompleteService.js';
import { Spinner } from '../../../Spinner/index.js';

import classes from './SuggestionBox.module.css';

type AutocompleteSuggestionGroup = {
  label: string;
  suggestions: AutocompleteSuggestion[];
};

export type AutocompleteSuggestionElement =
  | AutocompleteSuggestionGroup
  | AutocompleteSuggestion;

export type AutocompleteSuggestions = AutocompleteSuggestionElement[];

type SuggestionBoxProps = HTMLAttributes<HTMLUListElement> & {
  suggestions: AutocompleteSuggestions;
  suggestionValues: string[];
  isSelectable?: boolean;
  onSuggestionClicked: (value: string) => void;
  loadMore?: () => void;
  label: string;
  autocompleteId: string;
  activeSuggestion?: number;
  value: AutocompleteProps['value'];
  isLoading?: boolean;
  allowNewItems?: boolean;
  searchText?: string;
};

export const SuggestionBox = ({
  suggestions,
  suggestionValues,
  onSuggestionClicked,
  isSelectable,
  label,
  autocompleteId,
  activeSuggestion,
  value,
  isLoading = false,
  loadMore,
  allowNewItems,
  searchText,
}: SuggestionBoxProps) => {
  const suggestionBoxRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setTimeout(() => {
      suggestionBoxRef.current
        ?.querySelector('[aria-selected="true"]')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }, []);

  const onScroll = (event: UIEvent<HTMLUListElement>) => {
    const tracker = event.currentTarget;
    const limit = tracker.scrollHeight - tracker.clientHeight;
    if (event.currentTarget.scrollTop === limit) {
      loadMore?.();
    }
  };

  return (
    <ul
      // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: list element has all necessary attributes to be interactive
      role="listbox"
      aria-multiselectable={isSelectable}
      ref={suggestionBoxRef}
      aria-label={label}
      aria-busy={isLoading && !loadMore}
      tabIndex={-1}
      className={classes.base}
      onScroll={loadMore ? onScroll : undefined}
    >
      {suggestions.map((suggestion) => {
        if (isGroup(suggestion)) {
          return (
            <div key={suggestion.label} className={classes.group}>
              <Compact
                size="s"
                color="subtle"
                className={classes['group-label']}
              >
                {suggestion.label}
              </Compact>
              <ul
                role="group"
                aria-label={suggestion.label}
                className={classes['group-suggestion']}
              >
                {suggestion.suggestions.map((suggestionItem) => (
                  <Suggestion
                    key={suggestionItem.value}
                    {...suggestionItem}
                    onSuggestionClicked={onSuggestionClicked}
                    isSelectable={isSelectable}
                    selected={value === suggestionItem.value}
                    id={`suggestion-${autocompleteId}-${suggestionValues.indexOf(suggestionItem.value)}`}
                    isFocused={isSuggestionFocused(
                      suggestionValues,
                      suggestionItem.value,
                      activeSuggestion,
                    )}
                    tabIndex={computeTabIndex(
                      suggestionValues,
                      suggestionItem.value,
                      isLoading,
                      activeSuggestion,
                    )}
                    aria-setsize={suggestionValues.length}
                    aria-posinset={
                      suggestionValues.indexOf(suggestionItem.value) + 1
                    }
                  />
                ))}
              </ul>
            </div>
          );
        }
        return (
          <Suggestion
            key={suggestion.value}
            {...suggestion}
            onSuggestionClicked={onSuggestionClicked}
            selected={value === suggestion.value}
            isSelectable={isSelectable}
            id={`suggestion-${autocompleteId}-${suggestionValues.indexOf(suggestion.value)}`}
            isFocused={isSuggestionFocused(
              suggestionValues,
              suggestion.value,
              activeSuggestion,
            )}
            tabIndex={computeTabIndex(
              suggestionValues,
              suggestion.value,
              isLoading,
              activeSuggestion,
            )}
            aria-setsize={suggestionValues.length}
            aria-posinset={suggestionValues.indexOf(suggestion.value) + 1}
          />
        );
      })}

      {allowNewItems &&
        searchText &&
        suggestionValues.indexOf(searchText.trim().toLowerCase()) === -1 && (
          <Suggestion
            value={searchText}
            label={searchText}
            leadingMedia={{ icon: Plus }}
            onSuggestionClicked={onSuggestionClicked}
            selected={value === searchText}
            isSelectable={isSelectable}
            id={`suggestion-${autocompleteId}-${suggestionValues.length}`}
            isFocused={activeSuggestion === suggestionValues.length}
            tabIndex={
              !isLoading &&
              activeSuggestion &&
              activeSuggestion === suggestionValues.length
                ? 0
                : -1
            }
            aria-setsize={suggestionValues.length}
            aria-posinset={suggestionValues.length}
          />
        )}
      {loadMore && isLoading && (
        <Spinner className={classes.spinner} size="s" />
      )}
    </ul>
  );
};
