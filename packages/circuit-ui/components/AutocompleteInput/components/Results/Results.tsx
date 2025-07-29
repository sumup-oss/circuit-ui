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

import { forwardRef, type ReactNode } from 'react';

import { utilClasses } from '../../../../styles/utility.js';
import { Options, type OptionsProps } from '../Options/Options.js';
import { Hr } from '../../../Hr/index.js';
import { clsx } from '../../../../styles/clsx.js';
import { Spinner } from '../../../Spinner/index.js';
import { Button, type ButtonProps } from '../../../Button/index.js';

import classes from './Results.module.css';

export type ResultsProps = OptionsProps & {
  /**
   * Custom label to display while loading options.
   */
  loadingLabel?: string;
  /**
   * Custom content to display when no options are available.
   */
  noResultsMessage?: ReactNode;
  /**
   * An optional button to display below the options.
   */
  action?: Omit<ButtonProps, 'variant' | 'size'>;
  resultsSummary: string;
  isImmersive?: boolean;
};

export const Results = forwardRef<HTMLDivElement, ResultsProps>(
  (
    {
      isLoading,
      isLoadingMore,
      loadingLabel,
      noResultsMessage,
      options,
      value,
      onOptionClick,
      label,
      activeOption,
      loadMore,
      action,
      optionIdPrefix,
      allowNewItems,
      searchText,
      resultsSummary,
      isImmersive,
      loadMoreLabel,
      id,
      ...rest
    },
    ref,
  ) => (
    <div
      id={id}
      ref={ref}
      className={clsx(
        !isImmersive && classes.modal,
        isImmersive && action && classes['modal-with-action'],
      )}
    >
      <div
        role="status"
        aria-live="polite"
        aria-busy={isLoading}
        className={utilClasses.hideVisually}
      >
        {resultsSummary}
      </div>
      {isLoading && options.length === 0 && (
        <div className={classes.loading}>
          <Spinner data-testid="options-loading-spinner" />
          {loadingLabel}
        </div>
      )}
      {!isLoading && options.length === 0 && !allowNewItems && noResultsMessage}

      {(options.length > 0 || (allowNewItems && options.length === 0)) && (
        <>
          <Options
            value={value}
            options={options}
            onOptionClick={onOptionClick}
            label={label}
            optionIdPrefix={optionIdPrefix}
            activeOption={activeOption}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            loadMore={loadMore}
            searchText={searchText}
            allowNewItems={allowNewItems}
            hasAction={!!action}
            isImmersive={isImmersive}
            loadMoreLabel={loadMoreLabel}
            {...rest}
          />
          {action && (
            <div
              className={clsx(
                classes.action,
                isImmersive && classes['action-modal'],
              )}
            >
              <Hr />
              {action && <Button {...action} variant="tertiary" size="s" />}
            </div>
          )}
        </>
      )}
    </div>
  ),
);
