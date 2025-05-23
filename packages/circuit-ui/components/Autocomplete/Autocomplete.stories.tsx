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

import { type ChangeEvent, useState } from 'react';

import { Autocomplete, type AutocompleteProps } from './Autocomplete.js';
import { suggestions as mockSuggestions } from './fixtures.js';

export default {
  title: 'Forms/Autocomplete',
  component: Autocomplete,
  tags: ['status:stable'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

const baseArgs = {
  label: 'Choose your hero',
  placeholder: 'Whiskers',
  suggestions: mockSuggestions,
  validationHint: 'All our cats have been neutered and vaccinated.',
};

const filterSuggestions = (
  searchText: string,
  allSuggestions: AutocompleteProps['suggestions'],
) =>
  allSuggestions
    .flatMap((suggestion) =>
      'suggestions' in suggestion ? suggestion.suggestions : suggestion,
    )
    .filter(
      (suggestion) =>
        suggestion.value.includes(searchText) ||
        suggestion.label.includes(searchText),
    );

export const Base = (args: AutocompleteProps) => {
  const [autocompleteValue, setAutocompleteValue] = useState(args.value);
  const [suggestions, setSuggestions] = useState(args.suggestions);
  const onSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSuggestions(filterSuggestions(searchText, args.suggestions));
  };
  const onSelection = (value: string) => {
    setAutocompleteValue(value);
  };
  return (
    <Autocomplete
      {...args}
      value={autocompleteValue}
      suggestions={suggestions}
      onChange={onSearchTextChange}
      onSelection={onSelection}
    />
  );
};
Base.args = baseArgs;
