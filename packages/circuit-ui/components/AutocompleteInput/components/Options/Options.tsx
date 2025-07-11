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

import { type HTMLAttributes, useMemo } from 'react';
import { Plus } from '@sumup-oss/icons';

import { type AutocompleteInputOption, Option } from '../Option/Option.js';
import { Compact } from '../../../Compact/index.js';
import type { AutocompleteInputProps } from '../../AutocompleteInput.js';
import { isGroup, isOptionFocused } from '../../AutocompleteInputService.js';
import { clsx } from '../../../../styles/clsx.js';
import { Button } from '../../../Button/index.js';

import classes from './Options.module.css';

export type AutocompleteInputOptionGroup = {
  label: string;
  options: AutocompleteInputOption[];
};

type AutocompleteInputOptions =
  | AutocompleteInputOptionGroup[]
  | AutocompleteInputOption[];

export interface OptionsProps extends HTMLAttributes<HTMLUListElement> {
  label: string;
  value?: AutocompleteInputProps['value'];
  /**
   * List of options to display.
   */
  options: AutocompleteInputOptions;
  isSelectable?: boolean;
  onOptionClick: (value: AutocompleteInputOption) => void;
  /**
   * An optional function that allows to add more items to the bottom the option list currently displayed.
   * If this function is provided, a "Load more" button will be displayed at the bottom of the option list.
   * Use this to implement lazy loading of options.
   */
  loadMore?: () => void;
  /**
   * A custom label for the "Load more" button.
   */
  loadMoreLabel: string;
  /**
   * Whether options are currently loading.
   */
  isLoading?: boolean;
  /**
   * Used with the `loadMore` prop. Indicates a loading state while loading more options.
   */
  isLoadingMore?: boolean;
  optionIdPrefix: string;
  activeOption?: number;
  searchText?: string;
  /**
   * Whether to show the user's search text as an option.
   */
  allowNewItems?: boolean;
  hasAction?: boolean;
  isImmersive?: boolean;
}

export const Options = ({
  label,
  value,
  options,
  onOptionClick,
  isSelectable,
  isLoading = false,
  isLoadingMore = false,
  loadMore,
  loadMoreLabel,
  optionIdPrefix,
  activeOption,
  hasAction,
  isImmersive,
  allowNewItems,
  searchText,
  'aria-setsize': ariaSetSize,
  ...rest
}: OptionsProps) => {
  const optionValues: string[] = useMemo(
    () =>
      options
        .flatMap((option) => (isGroup(option) ? option.options : option))
        .map((option) => option.value),
    [options],
  );

  /*  check if the component received options with or without media (icon or image)
   we assume that all options have the same details, so we only check the first item */

  const firstOption = isGroup(options[0]) ? options[0].options[0] : options[0];
  const optionsHaveMedia = firstOption?.image !== undefined;

  const showsNewOption =
    allowNewItems &&
    searchText &&
    // make sure the search text is not already in the options
    optionValues.indexOf(searchText.trim().toLowerCase()) === -1;
  return (
    <>
      <ul
        {...rest}
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: list element has all necessary attributes to be interactive
        role="listbox"
        aria-multiselectable={isSelectable}
        aria-label={label}
        tabIndex={-1}
        className={clsx(
          classes.base,
          isLoading && classes.loading,
          hasAction && classes['has-action'],
        )}
      >
        {options.map((option, index) => {
          if (isGroup(option)) {
            return (
              <div key={option.label} className={classes.group}>
                <Compact
                  size="s"
                  color="subtle"
                  className={classes['group-label']}
                  id={`${optionIdPrefix}-group-${index}`}
                >
                  {option.label}
                </Compact>
                <ul
                  role="group"
                  aria-labelledby={`${optionIdPrefix}-group-${index}`}
                  className={classes['group-option']}
                >
                  {option.options.map((optionFromGroup) => {
                    const isFocused = isOptionFocused(
                      optionValues,
                      optionFromGroup.value,
                      activeOption,
                    );

                    return (
                      <Option
                        key={optionFromGroup.value}
                        {...optionFromGroup}
                        onOptionClick={onOptionClick}
                        isSelectable={isSelectable}
                        selected={value?.value === optionFromGroup.value}
                        id={`option-${optionIdPrefix}-${optionValues.indexOf(optionFromGroup.value)}`}
                        isFocused={isFocused}
                        tabIndex={!isLoading && isFocused ? 0 : -1}
                        aria-setsize={
                          ariaSetSize ?? 0 + (showsNewOption ? 1 : 0)
                        }
                      />
                    );
                  })}
                </ul>
              </div>
            );
          }
          const isFocused = isOptionFocused(
            optionValues,
            option.value,
            activeOption,
          );
          return (
            <Option
              key={option.value}
              {...option}
              onOptionClick={onOptionClick}
              selected={value?.value === option.value}
              isSelectable={isSelectable}
              id={`option-${optionIdPrefix}-${optionValues.indexOf(option.value)}`}
              isFocused={isFocused}
              tabIndex={!isLoading && isFocused ? 0 : -1}
              aria-setsize={ariaSetSize ?? 0 + (showsNewOption ? 1 : 0)}
            />
          );
        })}

        {showsNewOption && (
          <Option
            value={searchText}
            label={searchText}
            image={optionsHaveMedia ? Plus : undefined}
            isNew
            onOptionClick={onOptionClick}
            selected={value?.value === searchText}
            isSelectable={isSelectable}
            id={`option-${optionIdPrefix}-${optionValues.length}`}
            isFocused={activeOption === optionValues.length}
            tabIndex={
              !isLoading && activeOption && activeOption === optionValues.length
                ? 0
                : -1
            }
            aria-setsize={ariaSetSize ?? 0 + (showsNewOption ? 1 : 0)}
          />
        )}
      </ul>
      {loadMore && (
        <Button
          variant="tertiary"
          className={clsx(
            classes['load-more'],
            isImmersive && classes['load-more-modal'],
          )}
          size="s"
          onClick={loadMore}
          isLoading={isLoadingMore}
        >
          {loadMoreLabel}
        </Button>
      )}
    </>
  );
};
