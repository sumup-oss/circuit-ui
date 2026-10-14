import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  act,
  axe,
  render,
  screen,
  userEvent,
} from '../../../../../../util/test-utils.js';

import { columns, type Member } from '../../../../fixtures.js';
import { ColumnPicker, type ColumnPickerProps } from './ColumnPicker.js';

/**
 * `userEvent` turns the act() environment off while it dispatches events, then
 * turns it back on before its promise resolves. Floating UI (used by Tooltip
 * and Popover) applies its position on the next task, so that update lands
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

const [fullName, age, status, subscriptionPrice, frequentMember] = columns;

const groupLabel = 'Choose the column you want to display on this table';

describe('ColumnPicker', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const onChange = vi.fn();
  function renderColumnPicker({
    visibleColumns = [fullName, status],
    ...props
  }: Partial<ColumnPickerProps<Member>> = {}) {
    const view = render(
      <ColumnPicker
        columns={columns}
        visibleColumns={visibleColumns}
        onChange={onChange}
        {...props}
      />,
    );

    return { ...view, onChange };
  }

  function getColumnCheckbox(column: (typeof columns)[number]) {
    return screen.getByRole('checkbox', { name: column.label });
  }

  async function openPicker() {
    await click(screen.getByRole('button', { name: 'Pick Columns' }));
  }

  it('should render a collapsed trigger button', async () => {
    renderColumnPicker();

    const trigger = screen.getByRole('button', { name: 'Pick Columns' });
    expect(trigger).toBeVisible();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByRole('group', { name: groupLabel }),
    ).not.toBeInTheDocument();

    await settle();
  });

  it('should list every column and check the visible ones', async () => {
    renderColumnPicker();

    await openPicker();

    expect(screen.getByRole('group', { name: groupLabel })).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Pick Columns' }),
    ).toHaveAttribute('aria-expanded', 'true');

    expect(screen.getAllByRole('checkbox')).toHaveLength(columns.length);
    expect(getColumnCheckbox(fullName)).toBeChecked();
    expect(getColumnCheckbox(age)).not.toBeChecked();
    expect(getColumnCheckbox(status)).toBeChecked();
    expect(getColumnCheckbox(subscriptionPrice)).not.toBeChecked();
    expect(getColumnCheckbox(frequentMember)).not.toBeChecked();
  });

  it('should call onChange with the added column when a hidden column is checked', async () => {
    renderColumnPicker();

    await openPicker();
    await click(getColumnCheckbox(age));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([fullName.id, status.id, age.id]);
  });

  it('should call onChange without the column when a visible column is unchecked', async () => {
    renderColumnPicker();

    await openPicker();
    await click(getColumnCheckbox(fullName));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([status.id]);
  });

  it('should append a newly shown column after the current visible columns', async () => {
    renderColumnPicker({
      visibleColumns: [status, fullName],
    });

    await openPicker();
    await click(getColumnCheckbox(age));

    expect(onChange).toHaveBeenCalledWith([status.id, fullName.id, age.id]);
  });

  it('should disable the only remaining visible column', async () => {
    renderColumnPicker({
      visibleColumns: [age],
    });

    await openPicker();

    expect(getColumnCheckbox(age)).toBeDisabled();
    expect(getColumnCheckbox(fullName)).toBeEnabled();
    expect(getColumnCheckbox(status)).toBeEnabled();
    expect(getColumnCheckbox(subscriptionPrice)).toBeEnabled();
    expect(getColumnCheckbox(frequentMember)).toBeEnabled();

    await click(getColumnCheckbox(fullName));

    expect(onChange).toHaveBeenCalledWith([age.id, fullName.id]);
  });

  it('should keep every column enabled when more than one column is visible', async () => {
    renderColumnPicker({
      visibleColumns: [fullName, age],
    });

    await openPicker();

    expect(getColumnCheckbox(fullName)).toBeEnabled();
    expect(getColumnCheckbox(age)).toBeEnabled();
    expect(getColumnCheckbox(status)).toBeEnabled();
    expect(getColumnCheckbox(subscriptionPrice)).toBeEnabled();
    expect(getColumnCheckbox(frequentMember)).toBeEnabled();
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = renderColumnPicker();

    await act(async () => {
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    await settle();
  });

  it('should meet accessibility guidelines when open', async () => {
    const { container } = renderColumnPicker();

    await openPicker();

    await act(async () => {
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    await settle();
  });
});
