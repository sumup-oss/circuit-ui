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
import type { Decorator } from '@storybook/react-vite';

import { Button } from '../Button/index.js';
import { Stack } from '../../../../.storybook/components/index.js';
import { modes } from '../../../../.storybook/modes.js';

import {
  addresses,
  catNames,
  groupedSuggestions,
  suggestions as mockSuggestions,
} from './fixtures.js';
import { Autocomplete, type AutocompleteProps } from './Autocomplete.js';
import { isGroup } from './AutocompleteService.js';

export default {
  title: 'Forms/Autocomplete',
  component: Autocomplete,
  tags: ['status:stable'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '400px' }}>
        <Story />
      </div>
    ),
  ] as Decorator[],
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

    await userEvent.click(input);
    await screen.findByText(text ?? 'Luna');
  };

const filterSuggestions = (
  searchText: string,
  allSuggestions: AutocompleteProps['suggestions'],
) =>
  allSuggestions
    .flatMap((suggestion) =>
      isGroup(suggestion) ? suggestion.suggestions : suggestion,
    )
    .filter(
      (suggestion) =>
        suggestion.value.includes(searchText.trim().toLowerCase()) ||
        suggestion.label.includes(searchText.trim().toLowerCase()),
    );

const messages = [
  'Please wait while the cats knock everything off the shelves...',
  'Summoning extra cats from under the bed...',
  'Doing the heavy purring...',
  "We're working very hard... right after this nap...",
  'Waking up the cats... this may take a few attempts...',
  'You are number 2843684714 in the cuddle queue...',
  '️Please wait while we attend to other hoomans...',
  'Our premium plan comes with extra belly rubs...',
];

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
Base.play = openAutocomplete();

export const WithIcons = (args: AutocompleteProps) => (
  <Autocomplete {...args} />
);
WithIcons.args = {
  ...baseArgs,
  suggestions: addresses,
  label: 'Address',
  placeholder: 'Type an address',
  validationHint: undefined,
};
WithIcons.play = openAutocomplete('Address', '123 Main St');

export const Grouped = (args: AutocompleteProps) => <Autocomplete {...args} />;

Grouped.args = {
  ...baseArgs,
  suggestions: groupedSuggestions,
};
Grouped.play = openAutocomplete();

export const WithAction = (args: AutocompleteProps) => (
  <Autocomplete {...args} />
);
WithAction.args = {
  ...baseArgs,
  action: { icon: Add, children: 'Add item' },
};
WithAction.play = openAutocomplete();

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
NoResults.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLCanvasElement;
}) => {
  const canvas = within(canvasElement);
  const input = canvas.getByLabelText('Default no results message');

  await userEvent.type(input, '#/hgd*@');
  await screen.findByText('No results found');
};

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
      <Autocomplete {...args} suggestions={[]} label="Default" isLoading />
      <Autocomplete
        {...args}
        suggestions={[]}
        label="With custom message"
        isLoading
        loadingLabel={messages[customMessage]}
      />
    </Stack>
  );
};
Loading.args = {
  ...baseArgs,
  isLoading: true,
};
Loading.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLCanvasElement;
}) => {
  const canvas = within(canvasElement);
  const input = canvas.getByLabelText('Default');

  await userEvent.type(input, 'Luna');
  await screen.findByText('Loading');
};

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
      loadMore={suggestions.length < 10 ? loadMore : undefined}
      isLoadingMore={isLoading}
    />
  );
};

LoadMore.args = { ...baseArgs, suggestions: catNames.slice(0, 5) };
LoadMore.play = openAutocomplete(undefined, 'Tiger');

export const ModalView = (args: AutocompleteProps) => (
  <Autocomplete {...args} modalMobileView />
);

ModalView.args = { ...baseArgs };
ModalView.play = openAutocomplete();
ModalView.parameters = {
  chromatic: {
    modes: {
      mobile: modes.smallMobile,
    },
  },
};
ModalView.decorators = [
  (Story) => (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Story />
    </div>
  ),
] as Decorator[];

export const AllowNewItems = (args: AutocompleteProps) => (
  <Autocomplete {...args} value={'Lu'} allowNewItems />
);
AllowNewItems.args = { ...baseArgs, suggestions: [mockSuggestions[1]] };
AllowNewItems.play = openAutocomplete();
