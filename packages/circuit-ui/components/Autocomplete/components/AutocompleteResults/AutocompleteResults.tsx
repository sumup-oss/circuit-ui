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

import { type ReactNode, useRef } from 'react';

import { utilClasses } from '../../../../styles/utility.js';
import {
  SuggestionBox,
  type SuggestionBoxProps,
} from '../SuggestionBox/SuggestionBox.js';
import { Hr } from '../../../Hr/index.js';
import { clsx } from '../../../../styles/clsx.js';

import classes from './AutocompleteResults.module.css';

export type AutocompleteResultsProps = SuggestionBoxProps & {
  /**
   * Custom content to display while loading suggestions.
   */
  loadingLabel?: ReactNode;
  /**
   * Custom content to display when no suggestions are available.
   */
  noResultsMessage?: ReactNode;
  /**
   * An optional function that allows to add more items to the bottom the suggestion list currently displayed.
   * If this function is provided, a "Load more" button will be displayed at the bottom of the suggestion list.
   * Use this to implement lazy loading of suggestions.
   */
  loadMore?: () => void;
  /**
   * An optional action to display below the Autocomplete suggestions.
   */
  action?: ReactNode;
  resultsSummary: string;
  isModal?: boolean;
};

export const AutocompleteResults = ({
  isLoading,
  isLoadingMore,
  loadingLabel,
  noResultsMessage,
  suggestions,
  value,
  onSuggestionClicked,
  label,
  activeSuggestion,
  loadMore,
  action,
  suggestionIdPrefix,
  allowNewItems,
  searchText,
  resultsSummary,
  isModal,
  loadMoreLabel,
}: AutocompleteResultsProps) => {
  const actionsRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className={clsx(!isModal && classes.modal)}
      style={{
        marginBottom: isModal
          ? `${actionsRef?.current?.getBoundingClientRect().height}px`
          : 0,
      }}
    >
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
        <>
          <SuggestionBox
            value={value}
            suggestions={suggestions}
            onSuggestionClicked={onSuggestionClicked}
            label={label}
            suggestionIdPrefix={suggestionIdPrefix}
            activeSuggestion={activeSuggestion}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            loadMore={loadMore}
            searchText={searchText}
            allowNewItems={allowNewItems}
            hasAction={!!action}
            isModal={isModal}
            loadMoreLabel={loadMoreLabel}
          />
          {action && (
            <div
              className={clsx(
                classes.action,
                isModal && classes['action-modal'],
              )}
              ref={actionsRef}
            >
              <Hr />
              {action}
            </div>
          )}
        </>
      )}
    </div>
  );
};
