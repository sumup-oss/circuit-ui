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

import { type HTMLAttributes, useEffect, useMemo, useRef } from 'react';
import { Plus } from '@sumup-oss/icons';

import { type SuggestionType, Suggestion } from '../Suggestion/Suggestion.js';
import { Compact } from '../../../Compact/index.js';
import type { AutocompleteProps } from '../../Autocomplete.js';
import {
  computeTabIndex,
  isGroup,
  isSuggestionFocused,
} from '../../AutocompleteService.js';
import { clsx } from '../../../../styles/clsx.js';
import { Spinner } from '../../../Spinner/index.js';
import { Button } from '../../../Button/index.js';

import classes from './SuggestionBox.module.css';

export type SuggestionGroup = {
  label: string;
  suggestions: SuggestionType[];
};

export type AutocompleteSuggestions = SuggestionGroup[] | SuggestionType[];

export type SuggestionBoxProps = HTMLAttributes<HTMLUListElement> & {
  suggestions: AutocompleteSuggestions;
  isSelectable?: boolean;
  onSuggestionClicked: (value: string) => void;
  loadMore?: () => void;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  label: string;
  suggestionIdPrefix: string;
  activeSuggestion?: number;
  searchText?: string;
  value: AutocompleteProps['value'];
  allowNewItems?: boolean;
  hasAction?: boolean;
};

export const SuggestionBox = ({
  suggestions,
  onSuggestionClicked,
  isSelectable,
  label,
  suggestionIdPrefix,
  activeSuggestion,
  value,
  isLoading = false,
  isLoadingMore = false,
  hasAction,
  loadMore,
  allowNewItems,
  searchText,
  ...rest
}: SuggestionBoxProps) => {
  const suggestionBoxRef = useRef<HTMLUListElement>(null);

  const suggestionValues: string[] = useMemo(
    () =>
      suggestions
        .flatMap((suggestion) =>
          isGroup(suggestion) ? suggestion.suggestions : suggestion,
        )
        .map((suggestion) => suggestion.value),
    [suggestions],
  );

  useEffect(() => {
    // scroll the selected suggestion into view
    setTimeout(() => {
      suggestionBoxRef.current
        ?.querySelector('[aria-selected="true"]')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }, []);

  /*  check if the component received suggestions with or without media (icon or image)
   we assume that all suggestions have the same details, so we check the first item */

  const firstSuggestion = isGroup(suggestions[0])
    ? suggestions[0].suggestions[0]
    : suggestions[0];
  const suggestionsHaveMedia = firstSuggestion?.icon || firstSuggestion?.image;

  return (
    <>
      <ul
        {...rest}
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: list element has all necessary attributes to be interactive
        role="listbox"
        aria-multiselectable={isSelectable}
        ref={suggestionBoxRef}
        aria-label={label}
        tabIndex={-1}
        className={clsx(
          classes.base,
          isLoading && classes.loading,
          hasAction && classes['has-action'],
        )}
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
                      id={`suggestion-${suggestionIdPrefix}-${suggestionValues.indexOf(suggestionItem.value)}`}
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
              id={`suggestion-${suggestionIdPrefix}-${suggestionValues.indexOf(suggestion.value)}`}
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
          // make sure the search text is not already in the suggestions
          suggestionValues.indexOf(searchText.trim().toLowerCase()) === -1 && (
            <Suggestion
              value={searchText}
              label={searchText}
              icon={Plus}
              onSuggestionClicked={onSuggestionClicked}
              selected={value === searchText}
              isSelectable={isSelectable}
              id={`suggestion-${suggestionIdPrefix}-${suggestionValues.length}`}
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
              className={suggestionsHaveMedia ? undefined : classes.new}
            />
          )}
      </ul>
      {loadMore && !isLoadingMore && (
        <Button
          variant="tertiary"
          data-testid="loadMoreItems"
          className={classes['load-more']}
          size="s"
          onClick={loadMore}
        >
          Load more
        </Button>
      )}
      {isLoadingMore && (
        <Spinner
          data-testid="suggestions-loading"
          className={classes.spinner}
          size="s"
        />
      )}
    </>
  );
};
