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

import {
  type AutocompleteSuggestion,
  Suggestion,
} from '../Suggestion/Suggestion.js';
import { Compact } from '../../../Compact/index.js';
import type { AutocompleteProps } from '../../Autocomplete.js';

import classes from './SuggestionBox.module.css';

type AutocompleteSuggestionGroup = {
  label: string;
  suggestions: AutocompleteSuggestion[];
};

type AutocompleteSuggestionElement =
  | AutocompleteSuggestionGroup
  | AutocompleteSuggestion;

export type AutocompleteSuggestions = AutocompleteSuggestionElement[];

type SuggestionBoxProps = HTMLAttributes<HTMLUListElement> & {
  suggestions: AutocompleteSuggestions;
  isSelectable?: boolean;
  onSuggestionClicked: (value: string) => void;
  label: string;
  autocompleteId: string;
  activeSuggestion?: number;
  value: AutocompleteProps['value'];
};

const isGroup = (
  suggestion: AutocompleteSuggestionElement,
): suggestion is { label: string; suggestions: AutocompleteSuggestion[] } =>
  suggestion && 'label' in suggestion && 'suggestions' in suggestion;

export const SuggestionBox = ({
  suggestions,
  onSuggestionClicked,
  isSelectable,
  label,
  autocompleteId,
  activeSuggestion,
  value,
}: SuggestionBoxProps) => {
  const suggestionBoxRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setTimeout(() => {
      suggestionBoxRef.current
        ?.querySelector('[aria-selected="true"]')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }, []);

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
    <ul
      // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: list element has all necessary attributes to be interactive
      role="listbox"
      aria-multiselectable={isSelectable}
      ref={suggestionBoxRef}
      aria-label={label}
      tabIndex={-1}
      className={classes.base}
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
                    isFocused={
                      activeSuggestion !== undefined
                        ? suggestionValues[activeSuggestion] ===
                          suggestionItem.value
                        : false
                    }
                    tabIndex={
                      activeSuggestion &&
                      suggestionValues[activeSuggestion] ===
                        suggestionItem.value
                        ? 0
                        : -1
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
            isFocused={
              activeSuggestion !== undefined
                ? suggestionValues[activeSuggestion] === suggestion.value
                : false
            }
            tabIndex={
              activeSuggestion &&
              suggestionValues[activeSuggestion] === suggestion.value
                ? 0
                : -1
            }
          />
        );
      })}
    </ul>
  );
};
