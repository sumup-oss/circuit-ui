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
import {
  AutocompleteInput,
  type AutocompleteInputProps,
} from './AutocompleteInput.js';
import {
  getSuggestionLabelByValue,
  isGroup,
} from './AutocompleteInputService.js';

export default {
  title: 'Forms/Autocomplete',
  component: AutocompleteInput,
  tags: ['status:stable'],
  argTypes: {
    // Value & change handling
    value: {
      control: 'text',
      table: {
        category: 'Value & change handling',
      },
    },
    getSuggestionLabel: {
      table: {
        category: 'Value & change handling',
      },
    },
    onChange: {
      description: 'Callback fired when the search text value changes.',
      table: {
        category: 'Value & change handling',
      },
    },
    onClear: {
      table: {
        category: 'Value & change handling',
      },
    },
    onSelection: {
      table: {
        category: 'Value & change handling',
      },
    },
    // Suggestions & results
    suggestions: {
      table: {
        category: 'Suggestions & results',
      },
    },
    allowNewItems: {
      table: {
        category: 'Suggestions & results',
      },
    },
    isLoadingMore: {
      table: {
        category: 'Suggestions & results',
      },
    },
    loadMore: {
      table: {
        category: 'Suggestions & results',
      },
    },
    isLoading: {
      table: {
        category: 'Suggestions & results',
      },
    },
    action: {
      table: {
        category: 'Suggestions & results',
      },
    },
    // Input
    label: {
      table: {
        category: 'Input',
      },
    },
    placeholder: {
      control: 'text',
      table: {
        category: 'Input',
      },
    },
    hideLabel: {
      table: {
        category: 'Input',
      },
    },
    inputClassName: {
      control: 'text',
      table: {
        category: 'Input',
      },
    },
    textAlign: {
      table: {
        category: 'Input',
      },
    },
    optionalLabel: {
      table: {
        category: 'Input',
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'Input',
      },
    },
    readOnly: {
      control: 'boolean',
      table: {
        category: 'Input',
      },
    },
    hasWarning: {
      control: 'boolean',
      table: {
        category: 'Input',
      },
    },
    invalid: {
      control: 'boolean',
      table: {
        category: 'Input',
      },
    },
    showValid: {
      control: 'boolean',
      table: {
        category: 'Input',
      },
    },
    validationHint: {
      table: {
        category: 'Input',
      },
    },
    id: {
      table: {
        category: 'Input',
      },
    },
    // Behavior & Appearance
    variant: {
      table: {
        category: 'Behavior & Appearance',
      },
    },
    minQueryLength: {
      table: {
        category: 'Behavior & Appearance',
      },
    },
    // Customisation
    locale: {
      table: {
        category: 'Customisation',
      },
    },
    clearLabel: {
      table: {
        category: 'Customisation',
      },
    },
    loadingLabel: {
      table: {
        category: 'Customisation',
      },
    },
    noResultsMessage: {
      table: {
        category: 'Customisation',
      },
    },

    loadMoreLabel: {
      control: 'text',
      table: {
        category: 'Customisation',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '400px' }}>
        <Story />
      </div>
    ),
  ] as Decorator[],
};

const baseArgs: AutocompleteInputProps = {
  label: 'Choose your cat',
  placeholder: 'Whiskers',
  suggestions: mockSuggestions,
  validationHint: 'All our cats have been neutered and vaccinated.',
  onSelection: (value: string) => action('onSelection')(value),
  onChange: (event) => action('onChange')(event.target.value),
  getSuggestionLabel: (value?: string) =>
    getSuggestionLabelByValue(mockSuggestions, value),
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
  allSuggestions: AutocompleteInputProps['suggestions'],
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
  'Please wait while we attend to other hoomans...',
  'Our premium plan comes with extra belly rubs...',
];

export const Base = (args: AutocompleteInputProps) => {
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
    <AutocompleteInput
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

export const WithIcons = (args: AutocompleteInputProps) => (
  <AutocompleteInput {...args} />
);
WithIcons.args = {
  ...baseArgs,
  suggestions: addresses,
  label: 'Address',
  placeholder: 'Type an address',
  validationHint: undefined,
};
WithIcons.play = openAutocomplete('Address', '123 Main St');

export const Grouped = (args: AutocompleteInputProps) => (
  <AutocompleteInput {...args} />
);

Grouped.args = {
  ...baseArgs,
  suggestions: groupedSuggestions,
};
Grouped.play = openAutocomplete();

export const WithAction = (args: AutocompleteInputProps) => (
  <AutocompleteInput {...args} />
);
WithAction.args = {
  ...baseArgs,
  action: { icon: Add, children: 'Add item' },
};
WithAction.play = openAutocomplete();

export const NoResults = (args: AutocompleteInputProps) => (
  <Stack>
    <AutocompleteInput
      {...args}
      suggestions={[]}
      label="Default no results message"
      validationHint="type something to see the no results message"
    />
    <AutocompleteInput
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
            Contact support
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

export const Loading = (args: AutocompleteInputProps) => {
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
      <AutocompleteInput {...args} suggestions={[]} label="Default" isLoading />
      <AutocompleteInput
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

export const LoadMore = (args: AutocompleteInputProps) => {
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
    <AutocompleteInput
      {...args}
      suggestions={suggestions}
      loadMore={suggestions.length < 10 ? loadMore : undefined}
      isLoadingMore={isLoading}
    />
  );
};

LoadMore.args = { ...baseArgs, suggestions: catNames.slice(0, 5) };
LoadMore.play = openAutocomplete(undefined, 'Tiger');

export const Immersive = (args: AutocompleteInputProps) => (
  <AutocompleteInput {...args} variant="immersive" />
);

Immersive.args = { ...baseArgs };
Immersive.play = openAutocomplete();
Immersive.parameters = {
  chromatic: {
    modes: {
      mobile: modes.smallMobile,
    },
  },
};
Immersive.decorators = [
  (Story) => (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Story />
    </div>
  ),
] as Decorator[];

export const AllowNewItems = (args: AutocompleteInputProps) => (
  <AutocompleteInput {...args} value={'Lu'} allowNewItems />
);
AllowNewItems.args = { ...baseArgs, suggestions: [mockSuggestions[1]] };
AllowNewItems.play = openAutocomplete();
