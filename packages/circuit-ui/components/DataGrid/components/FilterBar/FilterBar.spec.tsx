import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  act,
  axe,
  fireEvent,
  render,
  screen,
  userEvent,
} from '../../../../util/test-utils.js';

import { columns, type Member } from '../../fixtures.js';
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

const [fullName, age, status] = columns;

describe('FilterBar', () => {
  const onSearch = vi.fn();
  const onVisibleColumnChange = vi.fn();

  const defaultProps = {
    columns,
    visibleColumns: [fullName, status],
    onSearch,
    onVisibleColumnChange,
  } satisfies FilterBarProps<Member>;

  afterEach(() => {
    vi.clearAllMocks();
  });

  function renderFilterBar(props: Partial<FilterBarProps<Member>> = {}) {
    return render(<FilterBar {...defaultProps} {...props} />);
  }

  it('should render the search field, filter button, and column picker', async () => {
    renderFilterBar();

    expect(screen.getByRole('searchbox', { name: 'Search' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Pick Columns' })).toBeVisible();

    await settle();
  });

  it('should show the active filters placeholder on desktop', async () => {
    renderFilterBar();

    expect(screen.getByText('- Filters go here -')).toBeVisible();

    await settle();
  });

  it('should hide the active filters placeholder on mobile', async () => {
    renderFilterBar({ isMobile: true });

    expect(screen.queryByText('- Filters go here -')).not.toBeInTheDocument();

    await settle();
  });

  describe('search', () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    async function renderFilterBarWithTimers() {
      vi.useFakeTimers();
      renderFilterBar();
      // Icon button tooltips position themselves on the next task. Flush that
      // update before changing the search value.
      await act(async () => {
        await vi.runAllTimersAsync();
      });
    }

    function changeSearch(value: string) {
      fireEvent.change(screen.getByRole('searchbox', { name: 'Search' }), {
        target: { value },
      });
    }

    it('should call onSearch with the query after the debounce delay', async () => {
      await renderFilterBarWithTimers();

      changeSearch('ja');

      expect(onSearch).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(299);
      });
      expect(onSearch).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(onSearch).toHaveBeenCalledExactlyOnceWith('ja');
    });

    it('should call onSearch once with the latest query', async () => {
      await renderFilterBarWithTimers();

      changeSearch('j');
      act(() => {
        vi.advanceTimersByTime(200);
      });

      changeSearch('jane');
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(onSearch).toHaveBeenCalledExactlyOnceWith('jane');
    });
  });

  it('should forward visible column changes from the column picker', async () => {
    renderFilterBar();

    await click(screen.getByRole('button', { name: 'Pick Columns' }));
    await click(screen.getByRole('checkbox', { name: age.label }));

    expect(onVisibleColumnChange).toHaveBeenCalledExactlyOnceWith([
      fullName.id,
      status.id,
      age.id,
    ]);
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
