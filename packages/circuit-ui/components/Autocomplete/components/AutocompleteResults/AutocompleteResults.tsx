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

import { useRef } from 'react';

import { utilClasses } from '../../../../styles/utility.js';
import {
  SuggestionBox,
  type SuggestionBoxProps,
} from '../SuggestionBox/SuggestionBox.js';
import type { AutocompleteProps } from '../../Autocomplete.js';
import { Hr } from '../../../Hr/index.js';
import { clsx } from '../../../../styles/clsx.js';

import classes from './AutocompleteResults.module.css';

export type AutocompleteResultsProps = SuggestionBoxProps &
  Pick<
    AutocompleteProps,
    'loadingLabel' | 'noResultsMessage' | 'loadMore' | 'readOnly' | 'action'
  > & {
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
  readOnly,
  action,
  suggestionIdPrefix,
  allowNewItems,
  searchText,
  resultsSummary,
  isModal,
}: AutocompleteResultsProps) => {
  const actionsRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className={classes.base}
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
            aria-readonly={readOnly}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            loadMore={loadMore}
            searchText={searchText}
            allowNewItems={allowNewItems}
            hasAction={!!action}
            isModal={isModal}
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
