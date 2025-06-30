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

import {
  afterEach,
  beforeAll,
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from 'vitest';
import { within } from '@testing-library/react';
import { createRef } from 'react';

import { act, axe, render, userEvent, screen } from '../../util/test-utils.js';
import { useMedia } from '../../hooks/useMedia/index.js';

import { luna, mochi, oliver, suggestions } from './fixtures.js';
import {
  AutocompleteInput,
  type AutocompleteInputProps,
} from './AutocompleteInput.js';

vi.mock('../../hooks/useMedia/index.js');

const props: AutocompleteInputProps = {
  suggestions,
  onSelection: vi.fn(),
  onClear: vi.fn(),
  onChange: vi.fn(),
  value: '',
  label: 'label',
};
describe('Autocomplete', () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();

    (useMedia as Mock).mockReturnValue(false);
  });

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(<AutocompleteInput {...props} ref={ref} />);
    // eslint-disable-next-line testing-library/no-node-access
    const input = container.querySelector('input');
    expect(ref.current).toBe(input);
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <AutocompleteInput {...props} inputClassName={className} />,
    );
    // eslint-disable-next-line testing-library/no-node-access
    const input = container.querySelector('input');
    expect(input?.className).toContain(className);
  });

  it('should fire onClear when the clear button is clicked', async () => {
    render(
      <AutocompleteInput {...props} value="foo" onClear={props.onClear} />,
    );

    const clearButton = screen.getByRole('button', { name: 'Clear' });
    await userEvent.click(clearButton);
    act(() => {
      vi.runAllTimers();
    });
    expect(props.onClear).toHaveBeenCalledOnce();
    expect(props.onChange).toHaveBeenCalledOnce();
  });

  it('should call onChange when the user types', async () => {
    render(<AutocompleteInput {...props} />);

    await userEvent.type(screen.getByRole('combobox'), 'f');
    act(() => {
      vi.runAllTimers();
    });
    expect(props.onChange).toHaveBeenCalledOnce();
  });

  it('should debounce onChange calls', async () => {
    render(<AutocompleteInput {...props} />);
    const input = screen.getByRole('combobox');

    await userEvent.type(input, 'f');
    expect(props.onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(props.onChange).not.toHaveBeenCalled();

    await userEvent.type(input, 'oo');
    expect(props.onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);

    expect(props.onChange).toHaveBeenCalledOnce();
  });

  it('should call onSelection when a suggestion is clicked and close the suggestion box', async () => {
    render(<AutocompleteInput {...props} />);
    await userEvent.click(screen.getByRole('combobox', { name: props.label }));
    expect(screen.queryByRole('listbox')).toBeVisible();

    await userEvent.click(screen.getByText(suggestions[0].label));
    expect(props.onSelection).toHaveBeenCalledWith(suggestions[0].value);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should call onSelection when Enter key pressed on a suggestion and close the suggestion box', async () => {
    render(<AutocompleteInput {...props} />);

    // open suggestion box
    const input = screen.getByRole('combobox', { name: props.label });
    await userEvent.click(input);
    expect(screen.getByRole('listbox')).toBeVisible();
    // select first suggestion
    await userEvent.keyboard('{ArrowDown}');
    expect(input).toHaveAttribute(
      'aria-activedescendant',
      `suggestion-${input.getAttribute('data-id')}-0`,
    );
    // press Enter
    await userEvent.keyboard('{Enter}');

    expect(props.onSelection).toHaveBeenCalledWith(props.suggestions[0].value);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  describe('Opening the suggestion box', () => {
    it('should open suggestion box when suggestions are available', async () => {
      const { rerender } = render(
        <AutocompleteInput {...props} suggestions={[]} />,
      );
      const input = screen.getByRole('combobox', { name: props.label });
      await userEvent.type(input, 'f');
      act(() => {
        vi.runAllTimers();
      });
      expect(props.onChange).toHaveBeenCalledOnce();

      rerender(<AutocompleteInput {...props} suggestions={suggestions} />);

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeVisible();

      expect(screen.getAllByRole('option')).toHaveLength(suggestions.length);
      expect(screen.getAllByRole('status')[1]).toHaveTextContent(
        `${suggestions.length} results found`,
      );
    });

    it('should open suggestion box on arrow down key press', async () => {
      render(<AutocompleteInput {...props} />);

      await userEvent.click(screen.getByLabelText(props.label));

      await userEvent.keyboard('{ArrowDown}');

      expect(screen.getByRole('listbox')).toBeVisible();
    });

    it('should open suggestion box on click when input is clicked and has suggestions', async () => {
      render(<AutocompleteInput {...props} />);

      await userEvent.click(
        screen.getByRole('combobox', { name: props.label }),
      );
      expect(screen.getByRole('listbox')).toBeVisible();
    });
  });

  describe('closing the suggestion box', () => {
    it('should close the suggestion box when the readOnly prop becomes truthy', async () => {
      const { rerender } = render(<AutocompleteInput {...props} />);
      const input = screen.getByRole('combobox', { name: props.label });
      await userEvent.click(input);
      expect(screen.getByRole('listbox')).toBeVisible();
      rerender(<AutocompleteInput {...props} readOnly />);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('should close the suggestion box when the disabled prop becomes truthy', async () => {
      const { rerender } = render(<AutocompleteInput {...props} />);
      const input = screen.getByRole('combobox', { name: props.label });
      await userEvent.click(input);
      expect(screen.getByRole('listbox')).toBeVisible();
      rerender(<AutocompleteInput {...props} disabled />);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('should close the suggestion box when the escape key is pressed', async () => {
      render(<AutocompleteInput {...props} />);
      const input = screen.getByRole('combobox', { name: props.label });
      await userEvent.click(input);
      expect(screen.getByRole('listbox')).toBeVisible();
      await userEvent.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('should close the suggestion box on outside click', async () => {
      render(<AutocompleteInput {...props} />);
      const input = screen.getByRole('combobox', { name: props.label });
      await userEvent.click(input);
      expect(screen.getByRole('listbox')).toBeVisible();
      await userEvent.click(document.body);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('On narrow viewports', () => {
    beforeEach(() => {
      (useMedia as Mock).mockReturnValue(true);
    });
    afterAll(() => {
      (useMedia as Mock).mockReturnValue(false);
    });

    it('should open in a modal dialog', async () => {
      render(<AutocompleteInput {...props} variant="immersive" />);
      const input = screen.getByRole('searchbox', { name: props.label });

      await userEvent.click(input);
      expect(screen.getByRole('dialog')).toBeVisible();
    });

    it('should call onClear', async () => {
      render(<AutocompleteInput {...props} variant="immersive" value="luna" />);
      const clearButton = screen.getByRole('button', { name: 'Clear' });

      await userEvent.click(clearButton);
      expect(props.onClear).toHaveBeenCalledOnce();
      expect(props.onChange).toHaveBeenCalledOnce();
    });

    it('should call onChange when user types in field', async () => {
      render(<AutocompleteInput {...props} variant="immersive" />);
      const input = screen.getByRole('searchbox', { name: props.label });

      await userEvent.click(input);
      expect(screen.getByRole('dialog')).toBeVisible();
      await userEvent.type(screen.getByRole('combobox'), 'f');
      act(() => {
        vi.runAllTimers();
      });
      expect(props.onChange).toHaveBeenCalledOnce();
    });

    it('should select a value, call onSelection and close the dialog', async () => {
      render(<AutocompleteInput {...props} variant="immersive" />);
      const input = screen.getByRole('searchbox', { name: props.label });
      await userEvent.click(input);
      expect(screen.getByRole('dialog')).toBeVisible();
      expect(screen.getByRole('listbox')).toBeVisible();
      expect(screen.getAllByRole('option')).toHaveLength(
        props.suggestions.length,
      );

      await userEvent.click(screen.getByText(suggestions[0].label));
      act(() => {
        vi.runAllTimers();
      });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(props.onSelection).toHaveBeenCalledWith(suggestions[0].value);
    });

    it('should render with selected value', async () => {
      const selectedValue = suggestions[0];
      render(
        <AutocompleteInput
          {...props}
          variant="immersive"
          value={selectedValue.value}
        />,
      );
      const input = screen.getByRole('searchbox', { name: props.label });
      expect(input).toHaveValue(selectedValue.label);
      await userEvent.click(input);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeVisible();
      expect(screen.getByRole('listbox')).toBeVisible();
      expect(
        within(dialog).getByRole('combobox', { name: props.label }),
      ).toHaveValue(selectedValue.label);
    });

    it('should close dialog when the cancel button is clicked', async () => {
      render(<AutocompleteInput {...props} variant="immersive" />);
      const input = screen.getByRole('searchbox', { name: props.label });
      await userEvent.click(input);
      expect(screen.getByRole('dialog')).toBeVisible();
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await userEvent.click(cancelButton);
      act(() => {
        vi.runAllTimers();
      });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Loading state', () => {
    it('should render the default loading message when isLoading is true', async () => {
      render(<AutocompleteInput {...props} suggestions={[]} isLoading />);
      await userEvent.type(screen.getByRole('combobox'), 'l');

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(screen.getByText('Loading')).toBeVisible();
      expect(screen.getByTestId('suggestions-loading-spinner')).toBeVisible();
    });

    it('should render custom loading message when isLoading is true', async () => {
      const message = 'Fetching your contacts...';
      render(
        <AutocompleteInput
          {...props}
          suggestions={[]}
          isLoading
          loadingLabel={message}
        />,
      );
      await userEvent.type(screen.getByRole('combobox'), 'l');
      expect(screen.getByText(message)).toBeVisible();
    });
  });

  describe('No results state', () => {
    it('should render the default no results message when no results are found', async () => {
      render(<AutocompleteInput {...props} suggestions={[]} />);
      await userEvent.type(screen.getByRole('combobox'), 'l');

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(screen.getByText('No results found')).toBeVisible();
      expect(screen.getAllByRole('status')[1]).toHaveTextContent(
        '0 results found',
      );
    });

    it('should render the custom no results message no results are found', async () => {
      const message = "Couldn't find any results";
      render(
        <AutocompleteInput
          {...props}
          suggestions={[]}
          noResultsMessage={message}
        />,
      );
      await userEvent.type(screen.getByRole('combobox'), 'l');
      expect(screen.getByText(message)).toBeVisible();
    });
  });

  describe('a11y', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<AutocompleteInput {...props} />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it('should have the correct attributes', async () => {
      render(<AutocompleteInput {...props} />);
      const input = screen.getByLabelText(props.label);
      expect(input).toHaveRole('combobox');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
      expect(input).toHaveAttribute('aria-expanded', 'false');

      await userEvent.click(input);

      expect(screen.getByRole('listbox')).toBeVisible();
      expect(input).toHaveAttribute('aria-expanded', 'true');

      const popupId = screen
        .getByTestId(`${input.getAttribute('data-id')}-popup`)
        .getAttribute('id');
      expect(input).toHaveAttribute('aria-controls', popupId);
      expect(screen.getAllByRole('option')).toHaveLength(suggestions.length);
    });

    it('should apply the correct aria-activedescendant attribute', async () => {
      const { rerender } = render(
        <AutocompleteInput {...props} suggestions={[mochi, luna, oliver]} />,
      );
      const input = screen.getByLabelText(props.label);
      await userEvent.click(input);
      await userEvent.keyboard('{ArrowDown}');
      expect(input).toHaveAttribute(
        'aria-activedescendant',
        `suggestion-${input.getAttribute('data-id')}-0`,
      );
      await userEvent.keyboard('{ArrowDown}');
      expect(input).toHaveAttribute(
        'aria-activedescendant',
        `suggestion-${input.getAttribute('data-id')}-1`,
      );
      await userEvent.keyboard('{ArrowUp}');
      expect(input).toHaveAttribute(
        'aria-activedescendant',
        `suggestion-${input.getAttribute('data-id')}-0`,
      );

      rerender(
        <AutocompleteInput
          {...props}
          suggestions={[mochi, luna, oliver]}
          isLoading
        />,
      );
      expect(input).not.toHaveAttribute('aria-activedescendant');
    });
  });
});
