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

import {
  type FocusEventHandler,
  type HTMLAttributes,
  type KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from 'react';

import {
  type AutocompleteSuggestion,
  Suggestion,
} from '../Suggestion/Suggestion.js';
import { Compact } from '../../../Compact/index.js';
import { isArrowDown, isArrowUp } from '../../../../util/key-codes.js';

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
}: SuggestionBoxProps) => {
  const suggestionBoxRef = useRef<HTMLUListElement>(null);
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const onSuggestionKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (!suggestionBoxRef.current) {
        return;
      }
      const totalSuggestions =
        suggestionBoxRef.current.querySelectorAll('[role="option"]').length ??
        0;
      if (isArrowDown(event) || isArrowUp(event)) {
        event.preventDefault();
        const nextSuggestion =
          (isArrowDown(event)
            ? activeSuggestion + totalSuggestions + 1
            : activeSuggestion + totalSuggestions - 1) % totalSuggestions;

        setActiveSuggestion(nextSuggestion);

        (
          suggestionBoxRef.current.querySelectorAll('[role="option"]')[
            nextSuggestion
          ] as HTMLElement | null
        )?.focus();
      }
    },
    [activeSuggestion],
  );

  const onSuggestionFocused: FocusEventHandler<HTMLLIElement> = useCallback(
    (event) => {
      if (!suggestionBoxRef.current) {
        return;
      }
      const target = event.target as HTMLLIElement;
      const suggestionIndex = Array.from(
        suggestionBoxRef.current.querySelectorAll('[role="option"]'),
      ).indexOf(target);
      if (suggestionIndex !== -1) {
        setActiveSuggestion(suggestionIndex);
      }
    },
    [],
  );

  return (
    <ul
      // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: list element has all necessary attributes to be interactive
      role="listbox"
      ref={suggestionBoxRef}
      aria-label={label}
      tabIndex={-1}
      className={classes.base}
      onBlur={() => setActiveSuggestion(0)}
    >
      {suggestions.map((suggestion) => {
        if (isGroup(suggestion)) {
          return (
            <li
              role="presentation"
              key={suggestion.label}
              className={classes.group}
            >
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
                {suggestion.suggestions.map((groupSuggestion) => (
                  <Suggestion
                    key={groupSuggestion.value}
                    {...groupSuggestion}
                    onSuggestionClicked={onSuggestionClicked}
                    isSelectable={isSelectable}
                    onKeyDown={onSuggestionKeydown}
                    onFocus={onSuggestionFocused}
                  />
                ))}
              </ul>
            </li>
          );
        }
        return (
          <Suggestion
            key={suggestion.value}
            {...suggestion}
            onSuggestionClicked={onSuggestionClicked}
            isSelectable={isSelectable}
            onKeyDown={onSuggestionKeydown}
            onFocus={onSuggestionFocused}
          />
        );
      })}
    </ul>
  );
};
