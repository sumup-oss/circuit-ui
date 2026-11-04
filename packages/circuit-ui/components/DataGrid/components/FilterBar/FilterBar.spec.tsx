import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  act,
  axe,
  render,
  screen,
  userEvent,
} from '../../../../util/test-utils.js';

import { columns, columnsWithFilters, type Member } from '../../fixtures.js';
import { FilterBar, type FilterBarProps } from './FilterBar.js';

/**
 * `userEvent` turns the act() environment off while it dispatches events, then
 * turns it back on before its promise resolves. Floating UI (used by the column
 * picker popover) applies its position on the next task, so that update lands
 * outside act() and React warns.
 *
 * Hold act() open across one more task so the position update is included.
 */
const user = userEvent.setup({ delay: null });

async function click(element: HTMLElement) {
  await settle(async () => {
    await user.click(element);
  });
}

async function settle(action?: () => Promise<void>) {
  await act(async () => {
    await action?.();
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });
  });
}

const [fullName, age, status, subscriptionPrice] = columns;
const onVisibleColumnChange = vi.fn();

const columnPickerConfig = {
  triggerLabel: 'Toggle columns visibility',
  pickerLabel: 'Choose columns to display',
};

const searchBarConfig = {
  label: 'Search',
  onSearch: vi.fn(),
  clearLabel: 'Clear search',
};

const defaultProps = {
  columns,
  visibleColumns: [fullName, status],
  onVisibleColumnChange,
  searchQuery: '',
  activeFilters: {},
} satisfies FilterBarProps<Member>;

describe('FilterBar', () => {
  const onFilter = vi.fn();
  const filtersConfig = {
    onFilter,
    applyFilterLabel: 'Apply',
    clearFilterLabel: 'Clear',
    clearAllLabel: 'Clear all',
  };
  afterEach(() => {
    vi.clearAllMocks();
  });

  function renderFilterBar(props: Partial<FilterBarProps<Member>> = {}) {
    return render(<FilterBar {...defaultProps} {...props} />);
  }

  it('should render the search field, filter button, and column picker', async () => {
    renderFilterBar({ searchBarConfig, columnPickerConfig });

    expect(screen.getByRole('searchbox', { name: 'Search' })).toBeVisible();
    expect(
      screen.getByRole('button', { name: columnPickerConfig.triggerLabel }),
    ).toBeVisible();

    await settle();
  });

  describe('Filters', () => {
    it('should not show any filter if no visible column has filtering option', async () => {
      renderFilterBar({ visibleColumns: columns.slice(0, 3) });
      expect(screen.queryAllByRole('button').length).toBe(0);
    });
    it('should not show any filter if filters prop is not provided', async () => {
      renderFilterBar({ visibleColumns: columnsWithFilters });
      expect(screen.queryAllByRole('button').length).toBe(0);
    });
    it('should render filter', async () => {
      renderFilterBar({ visibleColumns: columnsWithFilters, filtersConfig });
      expect(
        screen.getByRole('button', { name: columnsWithFilters[1].label }),
      ).toBeVisible();
      expect(
        screen.getByRole('button', { name: columnsWithFilters[2].label }),
      ).toBeVisible();
      expect(
        screen.getByRole('button', { name: columnsWithFilters[3].label }),
      ).toBeVisible();
    });
    it('should call onFilter when a filter value changes', async () => {
      renderFilterBar({ visibleColumns: columnsWithFilters, filtersConfig });
      await click(
        screen.getByRole('button', { name: columnsWithFilters[2].label }),
      );
      await click(screen.getByRole('checkbox', { name: 'Active' }));
      await click(screen.getByRole('button', { name: 'Apply' }));
      expect(onFilter).toHaveBeenCalledTimes(1);
      expect(onFilter).toHaveBeenCalledWith({
        [columnsWithFilters[2].id]: ['active'],
      });
      await settle();
    });
    it('should call onFilter when a filter is cleared', async () => {
      renderFilterBar({
        visibleColumns: columnsWithFilters,
        filtersConfig,
        activeFilters: {
          [columnsWithFilters[2].id]: ['active'],
        },
      });
      await click(
        screen.getByRole('button', {
          name: `${columnsWithFilters[2].label} (1)`,
        }),
      );
      await click(screen.getByRole('button', { name: 'Clear' }));
      expect(onFilter).toHaveBeenCalledTimes(1);
      expect(onFilter).toHaveBeenCalledWith({});

      await settle();
    });
    it("should call onFilter when 'Clear all' button is clicked", async () => {
      renderFilterBar({
        visibleColumns: columnsWithFilters,
        filtersConfig,
        activeFilters: {
          [columnsWithFilters[2].id]: ['active'],
        },
      });
      await click(
        screen.getByRole('button', {
          name: `${columnsWithFilters[2].label} (1)`,
        }),
      );

      await click(screen.getByRole('button', { name: 'Clear all' }));
      expect(onFilter).toHaveBeenCalledExactlyOnceWith({});
      await settle();
    });
    describe('With search', () => {
      const searchQuery = 'foo';
      it('should call onFilter with current search term when a filter value changes', async () => {
        renderFilterBar({
          visibleColumns: columnsWithFilters,
          filtersConfig,
          searchQuery,
          searchBarConfig,
        });
        await click(
          screen.getByRole('button', { name: columnsWithFilters[2].label }),
        );
        await click(screen.getByRole('checkbox', { name: 'Active' }));
        await click(screen.getByRole('button', { name: 'Apply' }));
        expect(onFilter).toHaveBeenCalledTimes(1);
        expect(onFilter).toHaveBeenCalledWith(
          {
            [columnsWithFilters[2].id]: ['active'],
          },
          searchQuery,
        );
        await settle();
      });
      it('should call onFilter with current search term when a filter is cleared', async () => {
        renderFilterBar({
          visibleColumns: columnsWithFilters,
          filtersConfig,
          activeFilters: {
            [columnsWithFilters[2].id]: ['active'],
          },
          searchQuery,
          searchBarConfig,
        });
        await click(
          screen.getByRole('button', {
            name: `${columnsWithFilters[2].label} (1)`,
          }),
        );
        await click(screen.getByRole('button', { name: 'Clear' }));
        expect(onFilter).toHaveBeenCalledTimes(1);
        expect(onFilter).toHaveBeenCalledWith({}, searchQuery);

        await settle();
      });
      it("should call onFilter with current search term when 'Clear all' button is clicked", async () => {
        renderFilterBar({
          visibleColumns: columnsWithFilters,
          filtersConfig,
          activeFilters: {
            [columnsWithFilters[2].id]: ['active'],
          },
          searchQuery,
          searchBarConfig,
        });
        await click(
          screen.getByRole('button', {
            name: `${columnsWithFilters[2].label} (1)`,
          }),
        );

        await click(screen.getByRole('button', { name: 'Clear all' }));
        expect(onFilter).toHaveBeenCalledExactlyOnceWith({}, searchQuery);
        await settle();
      });
    });
    describe('On mobile', () => {
      it('should render with active filters', async () => {
        renderFilterBar({
          visibleColumns: columnsWithFilters,
          isMobile: true,
          filtersConfig,
          activeFilters: {
            [columnsWithFilters[2].id]: ['active'],
          },
        });
        expect(
          screen.getByRole('button', { name: 'Filters' }),
        ).toHaveAccessibleDescription('1 Filters');
        await settle();
      });
      it('should render filters in a modal on mobile', async () => {
        renderFilterBar({
          visibleColumns: columnsWithFilters,
          isMobile: true,
          filtersConfig,
        });
        expect(
          screen.queryByRole('button', { name: columnsWithFilters[2].label }),
        ).not.toBeInTheDocument();
        const filtersTrigger = screen.getByRole('button', { name: 'Filters' });
        expect(filtersTrigger).toBeVisible();
        await click(filtersTrigger);
        expect(screen.getByRole('dialog', { name: 'Filters' })).toBeVisible();
        screen.getByRole('group', { name: age.label });
        screen.getByRole('group', { name: status.label });
        screen.getByRole('group', { name: subscriptionPrice.label });
        await settle();
      });
      it('should apply a filter, call onFilter and close the modal', async () => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
        renderFilterBar({
          visibleColumns: columnsWithFilters,
          isMobile: true,
          filtersConfig,
          searchQuery: 'foo',
          searchBarConfig,
        });
        expect(
          screen.queryByRole('button', { name: columnsWithFilters[2].label }),
        ).not.toBeInTheDocument();
        const filtersTrigger = screen.getByRole('button', { name: 'Filters' });
        expect(filtersTrigger).toBeVisible();
        await click(filtersTrigger);
        expect(screen.getByRole('dialog', { name: 'Filters' })).toBeVisible();
        await click(screen.getByRole('checkbox', { name: 'Active' }));
        await click(screen.getByRole('button', { name: 'Apply' }));
        expect(onFilter).toHaveBeenCalledExactlyOnceWith(
          {
            status: ['active'],
          },
          'foo',
        );
        vi.runAllTimers();
        expect(
          screen.queryByRole('dialog', { name: 'Filters' }),
        ).not.toBeInTheDocument();
        vi.useRealTimers();
        await settle();
      });
    });
  });

  describe('Search', () => {
    it('should not show the search bar when search config is missing', () => {
      renderFilterBar();
      expect(
        screen.queryByRole('searchbox', { name: 'Search' }),
      ).not.toBeInTheDocument();
    });

    it('should call onSearch', async () => {
      renderFilterBar({ searchBarConfig });

      await userEvent.type(
        screen.getByRole('searchbox', { name: 'Search' }),
        'j',
      );
      expect(searchBarConfig.onSearch).toHaveBeenCalledExactlyOnceWith('j');
    });

    it('should clearSearch', async () => {
      renderFilterBar({
        searchBarConfig: { ...searchBarConfig, clearLabel: 'Clear' },
        searchQuery: 'foo',
      });

      await click(screen.getByRole('button', { name: 'Clear' }));
      expect(searchBarConfig.onSearch).toHaveBeenCalledExactlyOnceWith('');
      await settle();
    });
    it('should reset active filters when user types a search term', async () => {
      renderFilterBar({
        searchBarConfig,
        visibleColumns: columnsWithFilters,
        filtersConfig,
        activeFilters: { age: { min: 18 } },
      });
      expect(screen.getByRole('button', { name: 'Age (≥ 18)' })).toBeVisible();

      await userEvent.type(
        screen.getByRole('searchbox', { name: 'Search' }),
        'j',
      );

      expect(searchBarConfig.onSearch).toHaveBeenCalledExactlyOnceWith('j');
      expect(filtersConfig.onFilter).toHaveBeenCalledExactlyOnceWith({}, 'j');
    });
    it('should reset active filters when the search field is cleared', async () => {
      renderFilterBar({
        searchQuery: 'foo',
        searchBarConfig,
        visibleColumns: columnsWithFilters,
        filtersConfig,
        activeFilters: { age: { min: 18 } },
      });
      expect(screen.getByRole('button', { name: 'Age (≥ 18)' })).toBeVisible();

      await click(
        screen.getByRole('button', { name: searchBarConfig.clearLabel }),
      );

      expect(searchBarConfig.onSearch).toHaveBeenCalledExactlyOnceWith('');
      expect(filtersConfig.onFilter).toHaveBeenCalledExactlyOnceWith({}, '');
      await settle();
    });
  });

  describe('Visible Columns', () => {
    it('should not show the column picker when config is missing', () => {
      renderFilterBar();
      expect(
        screen.queryByRole('button', { name: columnPickerConfig.triggerLabel }),
      ).not.toBeInTheDocument();
    });
    it('should not show the column picker in responsive view', () => {
      renderFilterBar({ columnPickerConfig, isMobile: true });
      expect(
        screen.queryByRole('button', { name: columnPickerConfig.triggerLabel }),
      ).not.toBeInTheDocument();
    });
    it('should forward visible column changes from the column picker', async () => {
      renderFilterBar({ columnPickerConfig });

      await click(
        screen.getByRole('button', { name: columnPickerConfig.triggerLabel }),
      );
      await click(screen.getByRole('checkbox', { name: age.label }));

      expect(onVisibleColumnChange).toHaveBeenCalledExactlyOnceWith([
        fullName.id,
        status.id,
        age.id,
      ]);
    });
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = renderFilterBar();

    await act(async () => {
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    await settle();
  });
});
