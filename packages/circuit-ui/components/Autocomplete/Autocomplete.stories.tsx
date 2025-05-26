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
import { Add, ExternalLink } from '@sumup-oss/icons';
import { screen, userEvent, within } from 'storybook/test';

import { Button } from '../Button/index.js';

import { Autocomplete, type AutocompleteProps } from './Autocomplete.js';
import {
  catNames,
  groupedSuggestions,
  suggestions as mockSuggestions,
} from './fixtures.js';

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

const openAutocomplete =
  (label?: string) =>
  async ({
    canvasElement,
  }: {
    canvasElement: HTMLCanvasElement;
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(label ?? baseArgs.label);

    await userEvent.type(input, 'L');
    await screen.findByRole('listbox');
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
        suggestion.value.includes(searchText.trim().toLowerCase()) ||
        suggestion.label.includes(searchText.trim().toLowerCase()),
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
Base.play = openAutocomplete();

export const Grouped = (args: AutocompleteProps) => <Autocomplete {...args} />;

Grouped.args = {
  ...baseArgs,
  suggestions: groupedSuggestions,
};
Grouped.play = openAutocomplete();

export const Loading = (args: AutocompleteProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const loadResults = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--cui-spacings-mega)',
        gridTemplateColumns: 'repeat(2, 1fr)',
      }}
    >
      <Autocomplete
        {...args}
        suggestions={[]}
        label="With empty results"
        isLoading
      />
      <Autocomplete
        {...args}
        suggestions={mockSuggestions}
        onChange={loadResults}
        isLoading={isLoading}
        label="With results"
      />
    </div>
  );
};
Loading.args = {
  ...baseArgs,
  isLoading: true,
};
Loading.play = openAutocomplete('With empty results');

export const NoResults = (args: AutocompleteProps) => (
  <Autocomplete
    {...args}
    suggestions={[]}
    noResultsMessage={
      <div
        style={{
          gap: 'var(--cui-spacings-mega)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        No results matched your search terms.
        <Button
          size="s"
          variant="secondary"
          href="#"
          navigationIcon={ExternalLink}
        >
          contact support
        </Button>
      </div>
    }
  />
);

NoResults.args = baseArgs;
NoResults.play = openAutocomplete();

export const WithAction = (args: AutocompleteProps) => (
  <Autocomplete {...args} />
);
WithAction.args = {
  ...baseArgs,
  action: (
    <Button icon={Add} variant="tertiary">
      Add
    </Button>
  ),
};
WithAction.play = openAutocomplete();

export const LoadMore = (args: AutocompleteProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(args.suggestions);
  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSuggestions(catNames);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Autocomplete
      {...args}
      suggestions={suggestions}
      loadMore={suggestions.length < 20 ? loadMore : undefined}
      isLoading={isLoading}
    />
  );
};

LoadMore.args = { ...baseArgs, suggestions: catNames.slice(0, 15) };
LoadMore.play = openAutocomplete();
