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

import { type ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Add, ExternalLink } from '@sumup-oss/icons';
import { screen, userEvent, within } from 'storybook/test';
import { action } from 'storybook/actions';

import { Button } from '../Button/index.js';
import { Body } from '../Body/index.js';
import { Spinner } from '../Spinner/index.js';
import { Stack } from '../../../../.storybook/components/index.js';

import {
  catNames,
  groupedSuggestions,
  suggestions as mockSuggestions,
} from './fixtures.js';
import { Autocomplete, type AutocompleteProps } from './Autocomplete.js';

export default {
  title: 'Forms/Autocomplete',
  component: Autocomplete,
  tags: ['status:stable'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

const baseArgs: AutocompleteProps = {
  label: 'Choose your cat',
  placeholder: 'Whiskers',
  suggestions: mockSuggestions,
  validationHint: 'All our cats have been neutered and vaccinated.',
  onSelection: (value: string) => action('onSelection')(value),
  onChange: (event) => action('onChange')(event.target.value),
};

const openAutocomplete =
  (label?: string, text?: string) =>
  async ({
    canvasElement,
  }: {
    canvasElement: HTMLCanvasElement;
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(label ?? baseArgs.label);

    await userEvent.type(input, 'L');
    await screen.findByText(text ?? 'Luna');
  };

const openLoading =
  () =>
  async ({
    canvasElement,
  }: {
    canvasElement: HTMLCanvasElement;
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('With default message');
    await userEvent.click(input);
    await screen.findByText('Loading');
  };

const focusAutocomplete =
  (label?: string) =>
  async ({
    canvasElement,
  }: {
    canvasElement: HTMLCanvasElement;
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(label ?? baseArgs.label);

    await userEvent.click(input);
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

  const onClear = () => {
    setAutocompleteValue('');
  };

  return (
    <Autocomplete
      {...args}
      value={autocompleteValue}
      suggestions={suggestions}
      onChange={onSearchTextChange}
      onSelection={onSelection}
      onClear={onClear}
    />
  );
};
Base.args = baseArgs;
// Base.play = openAutocomplete();

export const Grouped = (args: AutocompleteProps) => <Autocomplete {...args} />;

Grouped.args = {
  ...baseArgs,
  suggestions: groupedSuggestions,
};
Grouped.play = openAutocomplete();

const messages = [
  'Please wait while the minions do their work...',
  'Grabbing extra minions...',
  'Doing the heavy lifting...',
  "We're working very hard... really...",
  'Waking up the minions...',
  'You are number 2843684714 in the queue...',
  '️Please wait while we serve other customers...',
  'Our premium plan is faster...',
];

export const Loading = (args: AutocompleteProps) => {
  const [customMessage, setCustomMessage] = useState(0);

  const pickRandomMessage = useCallback(() => {
    setTimeout(() => {
      setCustomMessage((prev) => (prev + 1) % messages.length);
      pickRandomMessage();
    }, 3000);
  }, []);

  useEffect(() => {
    pickRandomMessage();
  }, [pickRandomMessage]);

  return (
    <Stack>
      <Autocomplete
        {...args}
        suggestions={[]}
        label="With default message"
        isLoading
        openOnFocus
      />
      <Autocomplete
        {...args}
        suggestions={[]}
        label="With custom message"
        isLoading
        openOnFocus
        loadingLabel={
          <div
            style={{
              padding: 'var(--cui-spacings-giga)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
              gap: 'var(--cui-spacings-mega)',
              textAlign: 'center',
            }}
          >
            <Spinner />
            <Body>{messages[customMessage]}</Body>
          </div>
        }
      />
    </Stack>
  );
};
Loading.args = {
  ...baseArgs,
  isLoading: true,
};
Loading.play = openLoading();

export const NoResults = (args: AutocompleteProps) => (
  <Stack>
    <Autocomplete
      {...args}
      suggestions={[]}
      label="Default no results message"
      validationHint="type something to see the no results message"
    />
    <Autocomplete
      {...args}
      suggestions={[]}
      label="Custom no results message"
      validationHint="type something to see the no results message"
      noResultsMessage={
        <div
          style={{
            padding: 'var(--cui-spacings-mega)',
            gap: 'var(--cui-spacings-mega)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          No results matched your search terms ☹️
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
  </Stack>
);

NoResults.args = baseArgs;
NoResults.play = openAutocomplete('Default no results message', 'No results');

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
LoadMore.play = openAutocomplete(undefined, 'Milo');

export const Validations = (args: AutocompleteProps) => (
  <Stack>
    <Autocomplete
      {...args}
      value="luna"
      validationHint="Great choice! Luna is a lovely cat."
      showValid
    />
    <Autocomplete
      {...args}
      value="Zeus"
      validationHint="Sorry, Zeus is a God, not a pet"
      invalid
    />
    <Autocomplete
      {...args}
      value="sushi"
      validationHint="Sushi is not very good with other pets."
      hasWarning
      modalMobileView
    />
  </Stack>
);

Validations.args = baseArgs;

export const ModalView = (args: AutocompleteProps) => (
  <Autocomplete {...args} openOnFocus modalMobileView />
);

ModalView.args = { ...baseArgs };
ModalView.play = focusAutocomplete();

export const AllowNewItems = (args: AutocompleteProps) => {
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
      allowNewItems
    />
  );
};
AllowNewItems.args = baseArgs;
AllowNewItems.play = openAutocomplete();
