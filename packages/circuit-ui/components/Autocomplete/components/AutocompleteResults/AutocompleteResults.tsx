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

import { utilClasses } from '../../../../styles/utility.js';
import {
  SuggestionBox,
  type SuggestionBoxProps,
} from '../SuggestionBox/SuggestionBox.js';
import type { AutocompleteProps } from '../../Autocomplete.js';
import { Hr } from '../../../Hr/index.js';

import classes from './AutocompleteResults.module.css';

export type AutocompleteResultsProps = SuggestionBoxProps &
  Pick<
    AutocompleteProps,
    'loadingLabel' | 'noResultsMessage' | 'loadMore' | 'readOnly' | 'action'
  > & {
    resultsSummary: string;
  };

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
  suggestionIdPrefix,
  allowNewItems,
  searchText,
  resultsSummary,
}: AutocompleteResultsProps) => (
  <>
    <div
      role="status"
      aria-live="polite"
      aria-busy={isLoading}
      className={utilClasses.hideVisually}
    >
      {resultsSummary}
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
        onSuggestionClicked={onSuggestionClicked}
        label={label}
        suggestionIdPrefix={suggestionIdPrefix}
        activeSuggestion={activeSuggestion}
        aria-readonly={readOnly}
        isLoading={isLoading}
        loadMoreOnScrollDown={loadMore}
        searchText={searchText}
        allowNewItems={allowNewItems}
      />
    )}
    {action && (
      <div className={classes.action}>
        <Hr />
        {action}
      </div>
    )}
  </>
);
