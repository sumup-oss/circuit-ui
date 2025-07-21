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
import { Button } from '../Button/index.js';

import { luna, mochi, oliver, options } from './fixtures.js';
import {
  AutocompleteInput,
  type AutocompleteInputProps,
} from './AutocompleteInput.js';

vi.mock('../../hooks/useMedia/index.js');

const props: AutocompleteInputProps = {
  options,
  onSearch: vi.fn(),
  onClear: vi.fn(),
  onChange: vi.fn(),
  label: 'label',
};
describe('AutocompleteInput', () => {
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

  it('should throw CircuitError passed an array in single selection mode', () => {
    // Silence the console.error output and switch to development mode to throw the error
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    process.env.NODE_ENV = 'development';
    expect(() =>
      render(<AutocompleteInput {...props} value={options.slice(0, 2)} />),
    ).toThrow();
    process.env.NODE_ENV = 'test';
    vi.restoreAllMocks();
  });

  it('should fire onClear when the clear button is clicked', async () => {
    render(
      <AutocompleteInput
        {...props}
        value={{ label: 'Foo', value: 'bar' }}
        onClear={props.onClear}
      />,
    );

    const clearButton = screen.getByRole('button', { name: 'Clear' });
    await userEvent.click(clearButton);
    act(() => {
      vi.runAllTimers();
    });
    expect(props.onClear).toHaveBeenCalledOnce();
  });

  it("should restore display value on blur if user doesn't make a selection", async () => {
    render(
      <AutocompleteInput {...props} value={{ label: 'Foo', value: 'bar' }} />,
    );

    const input = screen.getByRole('combobox', { name: props.label });
    expect(input).toHaveValue('Foo');

    // simulate user typing
    await userEvent.type(input, 'baz');
    // wait for debounce
    act(() => {
      vi.runAllTimers();
    });
    expect(input).toHaveValue('baz');

    // simulate blur
    act(() => {
      input.blur();
    });
    expect(input).toHaveValue('Foo');
  });

  it('should call onSearch when the user types', async () => {
    render(<AutocompleteInput {...props} />);

    await userEvent.type(screen.getByRole('combobox'), 'f');
    act(() => {
      vi.runAllTimers();
    });
    expect(props.onSearch).toHaveBeenCalledOnce();
  });

  it('should debounce onSearch calls', async () => {
    render(<AutocompleteInput {...props} />);
    const input = screen.getByRole('combobox');

    await userEvent.type(input, 'f');
    expect(props.onSearch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(props.onSearch).not.toHaveBeenCalled();

    await userEvent.type(input, 'oo');
    expect(props.onSearch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);

    expect(props.onSearch).toHaveBeenCalledOnce();
  });

  it('should call onChange when an option is clicked and close the list box', async () => {
    render(<AutocompleteInput {...props} />);
    await userEvent.click(screen.getByRole('combobox', { name: props.label }));
    expect(screen.queryByRole('listbox')).toBeVisible();

    await userEvent.click(screen.getByText(options[0].label));
    expect(props.onChange).toHaveBeenCalledWith(options[0]);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should call onChange when Enter key pressed on an option and close the list box', async () => {
    render(<AutocompleteInput {...props} />);

    // open the options
    const input = screen.getByRole('combobox', { name: props.label });
    await userEvent.click(input);
    expect(screen.getByRole('listbox')).toBeVisible();
    // select first option
    await userEvent.keyboard('{ArrowDown}');
    expect(input).toHaveAttribute(
      'aria-activedescendant',
      `option-${input.getAttribute('data-id')}-0`,
    );
    // press Enter
    await userEvent.keyboard('{Enter}');

    expect(props.onChange).toHaveBeenCalledWith(props.options[0]);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  describe('Opening the list box', () => {
    it('should open list box if the user types anything', async () => {
      render(<AutocompleteInput {...props} />);
      const input = screen.getByRole('combobox', { name: props.label });
      await userEvent.type(input, 'AZERTY');
      act(() => {
        vi.runAllTimers();
      });
      expect(props.onSearch).toHaveBeenCalledExactlyOnceWith('AZERTY');

      expect(screen.getByRole('listbox')).toBeVisible();
    });
    it('should open list box when options are available', async () => {
      const { rerender } = render(
        <AutocompleteInput {...props} options={[]} />,
      );
      const input = screen.getByRole('combobox', { name: props.label });
      await userEvent.type(input, 'f');
      act(() => {
        vi.runAllTimers();
      });
      expect(props.onSearch).toHaveBeenCalledExactlyOnceWith('f');

      rerender(<AutocompleteInput {...props} options={options} />);

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeVisible();

      expect(screen.getAllByRole('option')).toHaveLength(options.length);
      expect(screen.getAllByRole('status')[1]).toHaveTextContent(
        `${options.length} results found`,
      );
    });

    it('should open list box on arrow down key press', async () => {
      render(<AutocompleteInput {...props} />);

      await userEvent.click(screen.getByLabelText(props.label));

      await userEvent.keyboard('{ArrowDown}');

      expect(screen.getByRole('listbox')).toBeVisible();
    });

    it('should open list box on click when input is clicked and has options', async () => {
      render(<AutocompleteInput {...props} />);

      await userEvent.click(
        screen.getByRole('combobox', { name: props.label }),
      );
      expect(screen.getByRole('listbox')).toBeVisible();
    });
    it('should not open the list box on click when input is readOnly', async () => {
      render(<AutocompleteInput {...props} readOnly />);

      await userEvent.click(
        screen.getByRole('combobox', { name: props.label }),
      );
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
    it('should not open the list box on click when input is disabled', async () => {
      render(<AutocompleteInput {...props} disabled />);

      await userEvent.click(
        screen.getByRole('combobox', { name: props.label }),
      );
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('closing the list box', () => {
    it('should close the list box when the readOnly prop becomes truthy', async () => {
      const { rerender } = render(<AutocompleteInput {...props} />);
      const input = screen.getByRole('combobox', { name: props.label });
      await userEvent.click(input);
      expect(screen.getByRole('listbox')).toBeVisible();
      rerender(<AutocompleteInput {...props} readOnly />);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('should close the list box when the disabled prop becomes truthy', async () => {
      const { rerender } = render(<AutocompleteInput {...props} />);
      await userEvent.click(
        screen.getByRole('combobox', { name: props.label }),
      );
      expect(screen.getByRole('listbox')).toBeVisible();
      rerender(<AutocompleteInput {...props} disabled />);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('should close the list box when the escape key is pressed', async () => {
      render(<AutocompleteInput {...props} />);
      await userEvent.click(
        screen.getByRole('combobox', { name: props.label }),
      );
      expect(screen.getByRole('listbox')).toBeVisible();
      await userEvent.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('should close the list box on outside click', async () => {
      render(<AutocompleteInput {...props} />);
      await userEvent.click(
        screen.getByRole('combobox', { name: props.label }),
      );
      expect(screen.getByRole('listbox')).toBeVisible();
      await userEvent.click(document.body);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('multi-selection', () => {
    it('should throw CircuitError passed a single value in multi-selection mode', () => {
      // Silence the console.error output and switch to development mode to throw the error
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      process.env.NODE_ENV = 'development';
      expect(() =>
        render(
          <AutocompleteInput
            {...props}
            value={options[0]}
            multiple="multiple"
          />,
        ),
      ).toThrow();
      process.env.NODE_ENV = 'test';
      vi.restoreAllMocks();
    });
    it('should render the selected values as tags', () => {
      render(
        <AutocompleteInput
          {...props}
          multiple="multiple"
          value={options.slice(0, 2)}
        />,
      );
      expect(screen.getByText(options[0].label)).toBeVisible();
      expect(screen.getByText(options[1].label)).toBeVisible();
      expect(
        screen.getByRole('button', { name: `Remove ${options[0].label}` }),
      ).toBeVisible();
      expect(
        screen.getByRole('button', { name: `Remove ${options[1].label}` }),
      ).toBeVisible();
    });
    it('should call onChange with the correct value when the Remove option button is clicked', async () => {
      render(
        <AutocompleteInput
          {...props}
          multiple="multiple"
          value={options.slice(0, 2)}
        />,
      );

      await userEvent.click(
        screen.getByRole('button', { name: `Remove ${options[0].label}` }),
      );
      expect(props.onChange).toHaveBeenCalledExactlyOnceWith(options[0]);
    });
    it('should select a value, call onChange and close the list box', async () => {
      render(
        <AutocompleteInput
          {...props}
          multiple="multiple"
          value={options.slice(0, 2)}
        />,
      );
      await userEvent.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeVisible();

      await userEvent.click(screen.queryAllByRole('option')[0]);
      expect(props.onChange).toHaveBeenCalledExactlyOnceWith(options[0]);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
    it('should call onChange if field has values and user pressed backspace key', async () => {
      render(
        <AutocompleteInput
          {...props}
          multiple="multiple"
          value={options.slice(0, 2)}
        />,
      );
      await userEvent.click(screen.getByRole('combobox'));
      await userEvent.keyboard('{Backspace}');

      expect(props.onChange).toHaveBeenCalledExactlyOnceWith(options[1]);
    });
  });

  describe('Immersive', () => {
    beforeEach(() => {
      (useMedia as Mock).mockReturnValue(true);
    });
    afterAll(() => {
      (useMedia as Mock).mockReturnValue(false);
    });

    it('should open in a modal dialog on (any) key press', async () => {
      render(<AutocompleteInput {...props} variant="immersive" />);
      // focus the input
      await userEvent.keyboard('{Tab}');
      // press anything
      await userEvent.keyboard('m');

      const dialog = screen.getByRole('dialog');

      expect(dialog).toBeVisible();
      expect(
        within(dialog).getByRole('combobox', { name: props.label }),
      ).toHaveValue('m');
    });

    it('should open in a modal dialog on click', async () => {
      render(<AutocompleteInput {...props} variant="immersive" />);
      await userEvent.click(screen.getByLabelText(props.label));

      expect(screen.getByRole('dialog')).toBeVisible();
    });

    it('should call onClear', async () => {
      render(
        <AutocompleteInput {...props} variant="immersive" value={options[0]} />,
      );
      const clearButton = screen.getByRole('button', { name: 'Clear' });

      await userEvent.click(clearButton);
      expect(props.onClear).toHaveBeenCalledOnce();
    });

    it('should call onSearch when user types in field', async () => {
      render(<AutocompleteInput {...props} variant="immersive" />);
      await userEvent.click(screen.getByLabelText(props.label));

      expect(screen.getByRole('dialog')).toBeVisible();
      await userEvent.type(screen.getByRole('combobox'), 'f');
      act(() => {
        vi.runAllTimers();
      });
      expect(props.onSearch).toHaveBeenCalledExactlyOnceWith('f');
    });

    it('should select a value, call onChange and close the dialog', async () => {
      render(<AutocompleteInput {...props} variant="immersive" />);
      await userEvent.click(screen.getByLabelText(props.label));

      expect(screen.getByRole('dialog')).toBeVisible();
      expect(screen.getByRole('listbox')).toBeVisible();
      expect(screen.getAllByRole('option')).toHaveLength(props.options.length);

      await userEvent.click(screen.getByText(options[0].label));
      act(() => {
        vi.runAllTimers();
      });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(props.onChange).toHaveBeenCalledWith(options[0]);
    });

    it('should render with selected value', async () => {
      const selectedValue = options[0];
      render(
        <AutocompleteInput
          {...props}
          variant="immersive"
          value={selectedValue}
        />,
      );
      const input = screen.getByLabelText(props.label);
      expect(input).toHaveValue(selectedValue.label);
      await userEvent.click(input);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeVisible();
      expect(screen.getByRole('listbox')).toBeVisible();
      expect(
        within(dialog).getByRole('combobox', { name: props.label }),
      ).toHaveValue(selectedValue.label);
    });

    it('should not open the list box on click when input is readOnly', async () => {
      render(<AutocompleteInput {...props} variant="immersive" readOnly />);

      await userEvent.click(screen.getByLabelText(props.label));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    it('should not open the list box on click when input is disabled', async () => {
      render(<AutocompleteInput {...props} variant="immersive" disabled />);

      await userEvent.click(screen.getByLabelText(props.label));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Loading state', () => {
    it('should render the default loading message when isLoading is true', async () => {
      render(<AutocompleteInput {...props} options={[]} isLoading />);
      await userEvent.type(screen.getByRole('combobox'), 'l');

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(screen.getByText('Loading')).toBeVisible();
      expect(screen.getByTestId('options-loading-spinner')).toBeVisible();
    });

    it('should render custom loading message when isLoading is true', async () => {
      const message = 'Fetching your contacts...';
      render(
        <AutocompleteInput
          {...props}
          options={[]}
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
      render(<AutocompleteInput {...props} options={[]} />);
      await userEvent.type(screen.getByRole('combobox'), 'l');

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(screen.getByText('No results found')).toBeVisible();
      expect(screen.getAllByRole('status')[1]).toHaveTextContent(
        '0 results found',
      );
    });

    it('should render the custom no results string message no results are found', async () => {
      const message = "Couldn't find any results";
      render(
        <AutocompleteInput
          {...props}
          options={[]}
          noResultsMessage={message}
        />,
      );
      await userEvent.type(screen.getByRole('combobox'), 'l');
      expect(screen.getByText(message)).toBeVisible();
    });

    it('should render the custom no results node message no results are found', async () => {
      const message = (
        <Button size="s" variant="secondary" href="#">
          Contact support
        </Button>
      );
      render(
        <AutocompleteInput
          {...props}
          options={[]}
          noResultsMessage={message}
        />,
      );
      await userEvent.type(screen.getByRole('combobox'), 'l');
      expect(screen.getByText('Contact support')).toBeVisible();
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
      expect(screen.getAllByRole('option')).toHaveLength(options.length);
    });

    it('should apply the correct aria-activedescendant attribute', async () => {
      const { rerender } = render(
        <AutocompleteInput {...props} options={[mochi, luna, oliver]} />,
      );
      const input = screen.getByLabelText(props.label);
      await userEvent.click(input);
      await userEvent.keyboard('{ArrowDown}');
      expect(input).toHaveAttribute(
        'aria-activedescendant',
        `option-${input.getAttribute('data-id')}-0`,
      );
      await userEvent.keyboard('{ArrowDown}');
      expect(input).toHaveAttribute(
        'aria-activedescendant',
        `option-${input.getAttribute('data-id')}-1`,
      );
      await userEvent.keyboard('{ArrowUp}');
      expect(input).toHaveAttribute(
        'aria-activedescendant',
        `option-${input.getAttribute('data-id')}-0`,
      );

      rerender(
        <AutocompleteInput
          {...props}
          options={[mochi, luna, oliver]}
          isLoading
        />,
      );
      expect(input).not.toHaveAttribute('aria-activedescendant');
    });
  });
});
