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
import { within } from '@testing-library/dom';

import { act, axe, render, userEvent, screen } from '../../util/test-utils.js';
import { luna, mochi, oliver, suggestions } from './fixtures.js';
import { Autocomplete, type AutocompleteProps } from './Autocomplete.js';
import { createRef } from 'react';
import { useMedia } from '../../hooks/useMedia/index.js';

vi.mock('../../hooks/useMedia/index.js');

const props: AutocompleteProps = {
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
    const { container } = render(<Autocomplete {...props} ref={ref} />);
    const input = container.querySelector('input');
    expect(ref.current).toBe(input);
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <Autocomplete {...props} inputClassName={className} />,
    );
    const input = container.querySelector('input');
    expect(input?.className).toContain(className);
  });

  it('should fire onClear when the clear button is clicked', async () => {
    render(<Autocomplete {...props} value="foo" onClear={props.onClear} />);

    const clearButton = screen.getByRole('button', { name: 'Clear' });
    await userEvent.click(clearButton);
    act(() => {
      vi.runAllTimers();
    });
    expect(props.onClear).toHaveBeenCalledOnce();
    expect(props.onChange).toHaveBeenCalledOnce();
  });

  it('should call onChange when user types', async () => {
    render(<Autocomplete {...props} />);

    await userEvent.type(screen.getByRole('combobox'), 'f');
    act(() => {
      vi.runAllTimers();
    });
    expect(props.onChange).toHaveBeenCalledOnce();
  });

  it('should call onSelection when a suggestion is clicked', async () => {
    render(<Autocomplete {...props} openOnFocus />);
    await userEvent.click(screen.getByLabelText(props.label));
    expect(screen.queryByRole('listbox')).toBeVisible();

    await userEvent.click(screen.getByText(suggestions[0].label));
    expect(props.onSelection).toHaveBeenCalledWith(suggestions[0].value);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  describe('opening the suggestion box', () => {
    it('should open suggestion box when suggestions are available', async () => {
      const { rerender } = render(<Autocomplete {...props} suggestions={[]} />);
      const input = screen.getByLabelText(props.label);
      await userEvent.type(input, 'f');
      act(() => {
        vi.runAllTimers();
      });
      expect(props.onChange).toHaveBeenCalledOnce();

      rerender(<Autocomplete {...props} suggestions={suggestions} />);

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeVisible();

      expect(screen.getAllByRole('option')).toHaveLength(suggestions.length);
    });

    it('should open suggestion box on arrow down key press', async () => {
      render(<Autocomplete {...props} />);

      await userEvent.click(screen.getByLabelText(props.label));

      await userEvent.keyboard('{ArrowDown}');

      expect(screen.getByRole('listbox')).toBeVisible();
    });

    it('should open suggestion box on click when openOnFocus is set to true', async () => {
      render(<Autocomplete {...props} openOnFocus />);

      await userEvent.click(screen.getByLabelText(props.label));
      expect(screen.getByRole('listbox')).toBeVisible();
    });
  });

  describe('closing the suggestion box', () => {
    it('should close the suggestion box readOnly prop becomes truthy', async () => {
      const { rerender } = render(<Autocomplete {...props} openOnFocus />);
      const input = screen.getByLabelText(props.label);
      await userEvent.click(input);
      expect(screen.getByRole('listbox')).toBeVisible();
      rerender(<Autocomplete {...props} openOnFocus readOnly />);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('should close the suggestion box disabled prop becomes truthy', async () => {
      const { rerender } = render(<Autocomplete {...props} openOnFocus />);
      const input = screen.getByLabelText(props.label);
      await userEvent.click(input);
      expect(screen.getByRole('listbox')).toBeVisible();
      rerender(<Autocomplete {...props} openOnFocus disabled />);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('should close the suggestion box when the escape key is pressed', async () => {
      render(<Autocomplete {...props} openOnFocus />);
      const input = screen.getByLabelText(props.label);
      await userEvent.click(input);
      expect(screen.getByRole('listbox')).toBeVisible();
      await userEvent.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('should close the suggestion box on outside click', async () => {
      render(<Autocomplete {...props} openOnFocus />);
      const input = screen.getByLabelText(props.label);
      await userEvent.click(input);
      expect(screen.getByRole('listbox')).toBeVisible();
      await userEvent.click(document.body);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('on narrow viewports', () => {
    beforeEach(() => {
      (useMedia as Mock).mockReturnValue(true);
    });
    afterAll(() => {
      (useMedia as Mock).mockReturnValue(false);
    });
    it('should open in a modal dialog', async () => {
      render(<Autocomplete {...props} modalMobileView />);
      const input = screen.getByText(props.label);

      await userEvent.click(input);
      expect(screen.getByRole('dialog')).toBeVisible();
    });
    it('should call onClear', async () => {
      render(<Autocomplete {...props} modalMobileView value="luna" />);
      const clearButton = screen.getByRole('button', { name: 'Clear' });

      await userEvent.click(clearButton);
      expect(props.onClear).toHaveBeenCalledOnce();
      expect(props.onChange).toHaveBeenCalledOnce();
    });
    it('should call onChange when user types in field', async () => {
      render(<Autocomplete {...props} modalMobileView />);
      const input = screen.getByText(props.label);

      await userEvent.click(input);
      expect(screen.getByRole('dialog')).toBeVisible();
      await userEvent.type(screen.getByRole('combobox'), 'f');
      act(() => {
        vi.runAllTimers();
      });
      expect(props.onChange).toHaveBeenCalledOnce();
    });
    it('should select a value, call onSelection and close dialog', async () => {
      render(<Autocomplete {...props} modalMobileView />);
      const input = screen.getByText(props.label);
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
        <Autocomplete {...props} modalMobileView value={selectedValue.value} />,
      );
      const input = screen.getByLabelText(props.label);
      expect(input).toHaveValue(selectedValue.label);
      await userEvent.click(input);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeVisible();
      expect(screen.getByRole('listbox')).toBeVisible();
      expect(within(dialog).getByRole('combobox')).toHaveValue(
        selectedValue.label,
      );
    });
    it('should close dialog when cancel button is clicked', async () => {
      render(<Autocomplete {...props} modalMobileView />);
      const input = screen.getByText(props.label);
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

  describe('loading state', () => {
    it('should render loading state when isLoading is true', async () => {
      render(
        <Autocomplete {...props} suggestions={[]} openOnFocus isLoading />,
      );
      await userEvent.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(screen.getByText('Loading')).toBeVisible();
      expect(screen.getByTestId('suggestions-loading-spinner')).toBeVisible();
    });

    it('should render custom loading message when suggestions are empty and isLoading is true', async () => {
      const message = 'Fetching your contacts...';
      render(
        <Autocomplete
          {...props}
          suggestions={[]}
          openOnFocus
          isLoading
          loadingLabel={message}
        />,
      );
      await userEvent.click(screen.getByRole('combobox'));
      expect(screen.getByText(message)).toBeVisible();
    });
  });

  describe('no results state', () => {
    it('should render no results message when no results are found', async () => {
      render(<Autocomplete {...props} suggestions={[]} openOnFocus />);
      await userEvent.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(screen.getByText('No results')).toBeVisible();
    });

    it('should render custom no results message no results are found', async () => {
      const message = "Couldn't find any results";
      render(
        <Autocomplete
          {...props}
          suggestions={[]}
          openOnFocus
          noResultsMessage={message}
        />,
      );
      await userEvent.click(screen.getByRole('combobox'));
      expect(screen.getByText(message)).toBeVisible();
    });
  });

  describe('a11y', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Autocomplete {...props} />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it('should render with the right accessibility attributes');

    it('should apply correct aria-activedescendant attribute', async () => {
      const { rerender } = render(
        <Autocomplete
          {...props}
          openOnFocus
          suggestions={[mochi, luna, oliver]}
        />,
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
        <Autocomplete
          {...props}
          openOnFocus
          suggestions={[mochi, luna, oliver]}
          isLoading
        />,
      );
      expect(input).not.toHaveAttribute('aria-activedescendant');
    });

    it('should have the correct attributes', async () => {
      render(<Autocomplete {...props} openOnFocus />);
      const input = screen.getByLabelText(props.label);
      expect(input).toHaveRole('combobox');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
      expect(input).toHaveAttribute('aria-expanded', 'false');

      await userEvent.click(input);

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeVisible();
      const popupId = listbox.parentElement?.getAttribute('id');
      expect(input).toHaveAttribute('aria-controls', popupId);

      expect(screen.getAllByRole('option')).toHaveLength(suggestions.length);
    });
  });
});
