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

import { type ChangeEvent, forwardRef, useState } from 'react';
import type { IconComponentType } from '@sumup-oss/icons';

import { SearchInput, type SearchInputProps } from '../SearchInput/index.js';
import type { ClickEvent } from '../../types/events.js';

import classes from './Autocomplete.module.css';

type LeadingMedia =
  | {
      icon: IconComponentType;
      src: never;
      alt: never;
    }
  | {
      icon: never;
      src: string;
      alt: string;
    };

type AutocompleteSuggestion = {
  value: string;
  label: string;
  description?: string;
  selected?: boolean;
  leadingMedia?: LeadingMedia;
};

type AutocompleteSuggestionGroup = {
  label: string;
  suggestions: AutocompleteSuggestion[];
};

export type AutocompleteSuggestions = (
  | AutocompleteSuggestionGroup
  | AutocompleteSuggestion
)[];

export type AutocompleteProps = SearchInputProps & {
  suggestions: AutocompleteSuggestions;
};

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ onClear, clearLabel, ...props }, ref) => {
    const [searchText, setSearchText] = useState<string>();

    const onSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
      if (props.onChange) {
        props.onChange(event);
      }
    };

    const onSearchTextClear = (event: ClickEvent) => {
      setSearchText('');
      onClear?.(event);
    };

    return (
      <SearchInput
        {...props}
        ref={ref}
        clearLabel={clearLabel}
        className={classes.input}
        value={searchText}
        onChange={onSearchTextChange}
        onClear={onSearchTextClear}
      />
    );
  },
);
