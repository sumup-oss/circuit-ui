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

import { useCallback, useEffect, useState } from 'react';
import { Add, ExternalLink } from '@sumup-oss/icons';
import { screen, userEvent, within } from 'storybook/test';
import { action } from 'storybook/actions';
import type { Decorator } from '@storybook/react-vite';

import { Button } from '../Button/index.js';
import { Stack } from '../../../../.storybook/components/index.js';
import { modes } from '../../../../.storybook/modes.js';

import classes from './AutocompleteInputStory.module.css';
import {
  addresses,
  catNames,
  groupedOptions,
  options as mockOptions,
} from './fixtures.js';
import {
  AutocompleteInput,
  type AutocompleteInputProps,
} from './AutocompleteInput.js';
import {
  isGroup,
  updateMultipleSelectionValue,
} from './AutocompleteInputService.js';
import type { AutocompleteInputOption } from './components/Option/Option.js';

export default {
  title: 'Forms/AutocompleteInput',
  component: AutocompleteInput,
  tags: ['status:stable'],
  argTypes: {
    // Value & change handling
    value: {
      table: {
        category: 'Value & change handling',
      },
    },
    onSearch: {
      table: {
        category: 'Value & change handling',
      },
    },
    onChange: {
      table: {
        category: 'Value & change handling',
      },
    },
    onClear: {
      table: {
        category: 'Value & change handling',
      },
    },
    // Options & results
    options: {
      table: {
        category: 'Options & results',
      },
    },
    allowNewItems: {
      table: {
        category: 'Options & results',
      },
    },
    isLoadingMore: {
      table: {
        category: 'Options & results',
      },
    },
    loadMore: {
      table: {
        category: 'Options & results',
      },
    },
    isLoading: {
      table: {
        category: 'Options & results',
      },
    },
    // Input
    label: {
      table: {
        category: 'Input',
      },
    },
    placeholder: {
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
    multiple: {
      table: {
        category: 'Behavior & Appearance',
      },
    },
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
    action: {
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
  options: mockOptions,
  validationHint: 'All our cats have been neutered and vaccinated.',
  onChange: (value?: AutocompleteInputOption) => action('onChange')(value),
  onSearch: (text) => action('onSearch')(text),
  value: undefined,
};

const openAutocomplete =
  (label?: string, text?: string) =>
  async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(label ?? baseArgs.label);

    await userEvent.click(input);
    await screen.findByText(text ?? 'Luna');
  };

const filterOptions = (
  searchText: string,
  allOptions: AutocompleteInputProps['options'],
) =>
  allOptions
    .flatMap((option) => (isGroup(option) ? option.options : option))
    .filter(
      (option) =>
        option.value.includes(searchText.trim().toLowerCase()) ||
        option.label.includes(searchText.trim().toLowerCase()),
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
  const [options, setOptions] = useState(args.options);
  const [isLoading, setIsLoading] = useState(false);
  const onSearchTextChange = (searchText: string) => {
    setIsLoading(true);
    args.onSearch(searchText);
    setTimeout(() => {
      setOptions(filterOptions(searchText, args.options));
      setIsLoading(false);
    }, 1500);
  };
  const onChange = (value: AutocompleteInputOption) => {
    args.onChange(value);
    setAutocompleteValue(value);
  };

  const onClear = () => {
    setAutocompleteValue(undefined);
  };

  return (
    <AutocompleteInput
      {...args}
      value={autocompleteValue}
      options={options}
      isLoading={isLoading}
      onChange={onChange}
      onSearch={onSearchTextChange}
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
  options: addresses,
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
  options: groupedOptions,
};
Grouped.play = openAutocomplete();

export const WithMultiSelection = (args: AutocompleteInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState<
    AutocompleteInputOption[]
  >((args.value ?? []) as AutocompleteInputOption[]);
  const [options, setOptions] = useState(args.options);
  const onSearchTextChange = (searchText: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setOptions(filterOptions(searchText, args.options));
      setIsLoading(false);
    }, 1500);
  };
  const onSelection = useCallback(
    (value: AutocompleteInputOption) => {
      setAutocompleteValue((prevValue) =>
        updateMultipleSelectionValue(prevValue, value),
      );
      // reset options
      setOptions(args.options);
    },
    [args.options],
  );

  return (
    <AutocompleteInput
      {...args}
      value={autocompleteValue}
      options={options}
      isLoading={isLoading}
      onChange={onSelection}
      onSearch={onSearchTextChange}
      className={classes['fixed-width-input']}
    />
  );
};
WithMultiSelection.args = {
  ...baseArgs,
  value: mockOptions.slice(2, 4),
  multiple: true,
};
WithMultiSelection.play = openAutocomplete();

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
      options={[]}
      label="Default no results message"
      validationHint="type something to see the no results message"
    />
    <AutocompleteInput
      {...args}
      options={[]}
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
      <AutocompleteInput {...args} options={[]} label="Default" isLoading />
      <AutocompleteInput
        {...args}
        options={[]}
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
  await screen.findByRole('status', { busy: true });
};

export const LoadMore = (args: AutocompleteInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(args.options);
  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setOptions(catNames);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <AutocompleteInput
      {...args}
      options={options}
      loadMore={options.length < 10 ? loadMore : undefined}
      isLoadingMore={isLoading}
      aria-setsize={catNames.length}
    />
  );
};

LoadMore.args = { ...baseArgs, options: catNames.slice(0, 5) };
LoadMore.play = openAutocomplete(undefined, 'Tiger');

export const Immersive = (args: AutocompleteInputProps) => (
  <AutocompleteInput {...args} variant="immersive" />
);

Immersive.args = { ...baseArgs };
Immersive.play = openAutocomplete();
Immersive.parameters = {
  chromatic: {
    cropToViewport: true,
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
  <AutocompleteInput
    {...args}
    value={{ label: 'Lu', value: 'Lu' }}
    allowNewItems
  />
);
AllowNewItems.args = { ...baseArgs, options: [mockOptions[1]] };
AllowNewItems.play = openAutocomplete();
