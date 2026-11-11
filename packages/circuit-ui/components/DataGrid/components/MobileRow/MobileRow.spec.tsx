import { describe, expect, it, vi } from 'vitest';
import type { ReactElement } from 'react';

import {
  act,
  axe,
  render,
  screen,
  userEvent,
} from '../../../../util/test-utils.js';

import { columns, members, type Member } from '../../fixtures.js';
import type { MobileConfig } from '../../types.js';
import { MobileRow } from './MobileRow.js';

const member = members[0];
const fullName = `${member.firstName} ${member.lastName}`;

const mobileConfig = {
  slots: {
    label: 'full_name',
    details: 'age;status',
    trailingLabel: 'subscriptionPrice',
  },
} satisfies MobileConfig<Member>;

const defaultProps = {
  columns,
  data: member,
  rowIndex: 0,
  formattingLocale: 'en-US',
  rowId: 'row-0',
  mobileConfig,
};

function renderRow(ui: ReactElement) {
  return render(
    <table>
      <tbody>{ui}</tbody>
    </table>,
  );
}

/**
 * `userEvent` turns the act() environment off while it dispatches events, then
 * turns it back on before its promise resolves. Floating UI (used by the row
 * actions popover) applies its position on the next task, so that update lands
 * outside act() and React warns.
 *
 * Hold act() open across one more task so the position update is included.
 */
const user = userEvent.setup({ delay: null });

async function settle(action?: () => Promise<void> | void) {
  await act(async () => {
    await action?.();
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });
  });
}

async function click(element: HTMLElement) {
  await settle(async () => {
    await user.click(element);
  });
}

function getMenu(
  onEdit: (event: unknown, row: Member) => void,
): NonNullable<MobileConfig<Member>['menu']> {
  return {
    label: 'Actions',
    labelDescription: (row) => `Actions for ${row.firstName} ${row.lastName}`,
    actions: [
      {
        children: 'Edit',
        onClick: onEdit,
        'aria-description': (row) => `Edit ${row.firstName} ${row.lastName}`,
      },
    ],
  };
}

describe('MobileRow', () => {
  it('should render list item content from the mobile slots', () => {
    renderRow(<MobileRow {...defaultProps} />);

    const cell = screen.getByRole('gridcell');
    expect(cell).toHaveTextContent(fullName);
    expect(cell).toHaveTextContent(`${member.age} · Active`);
    expect(cell).toHaveTextContent(`€${member.subscription.price}`);
  });

  it('should set grid cell attributes for the first row', () => {
    renderRow(<MobileRow {...defaultProps} id="member-row" />);

    const cell = screen.getByRole('gridcell');
    expect(cell).toHaveAttribute('aria-colindex', '1');
    expect(cell).toHaveAttribute('data-x', '0');
    expect(cell).toHaveAttribute('data-y', '0');
    expect(cell).toHaveAttribute('tabIndex', '0');
    expect(screen.getByRole('row')).toHaveAttribute('id', 'member-row');
  });

  it('should set tabIndex to -1 when the row is not the first row', () => {
    renderRow(<MobileRow {...defaultProps} rowIndex={2} />);

    const cell = screen.getByRole('gridcell');
    expect(cell).toHaveAttribute('tabIndex', '-1');
    expect(cell).toHaveAttribute('data-y', '2');
  });

  it('should call onClick with the row data when the cell is clicked', async () => {
    const onClick = vi.fn();
    renderRow(
      <MobileRow
        {...defaultProps}
        mobileConfig={{ ...mobileConfig, onClick }}
      />,
    );

    await userEvent.click(screen.getByRole('gridcell'));

    expect(onClick).toHaveBeenCalledExactlyOnceWith(expect.any(Object), member);
  });

  it('should call onClick when pressing Enter or Space on the cell', async () => {
    const onClick = vi.fn();
    renderRow(
      <MobileRow
        {...defaultProps}
        mobileConfig={{ ...mobileConfig, onClick }}
      />,
    );

    const cell = screen.getByRole('gridcell');
    cell.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('{ }');

    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onClick).toHaveBeenNthCalledWith(1, expect.any(Object), member);
    expect(onClick).toHaveBeenNthCalledWith(2, expect.any(Object), member);
  });

  it('should render row actions and call the selected action with the row data', async () => {
    const onClick = vi.fn();
    const onEdit = vi.fn();
    renderRow(
      <MobileRow
        {...defaultProps}
        mobileConfig={{
          ...mobileConfig,
          onClick,
          menu: getMenu(onEdit),
        }}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger).toBeVisible();
    expect(trigger).toHaveAttribute(
      'aria-description',
      `Actions for ${fullName}`,
    );

    await click(trigger);
    expect(onClick).not.toHaveBeenCalled();

    const edit = screen.getByRole('button', { name: 'Edit' });
    expect(edit).toHaveAttribute('aria-description', `Edit ${fullName}`);
    await click(edit);

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(expect.any(Object), member);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should resolve row actions from a function of the row data', async () => {
    const onEdit = vi.fn();
    renderRow(
      <MobileRow
        {...defaultProps}
        mobileConfig={{
          ...mobileConfig,
          menu: {
            label: 'Actions',
            labelDescription: (row) =>
              `Actions for ${row.firstName} ${row.lastName}`,
            actions: (row) =>
              row.subscription.status === 'active'
                ? [
                    {
                      children: `Edit ${row.firstName} ${row.lastName}`,
                      onClick: onEdit,
                      'aria-description': (value) =>
                        `Edit ${value.firstName} ${value.lastName}`,
                    },
                  ]
                : [],
          },
        }}
      />,
    );

    await click(screen.getByRole('button', { name: 'Actions' }));

    const edit = screen.getByRole('button', { name: `Edit ${fullName}` });
    expect(edit).toHaveAttribute('aria-description', `Edit ${fullName}`);
    await click(edit);

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(expect.any(Object), member);
  });

  it('should not render an actions menu when there are no actions', () => {
    renderRow(
      <MobileRow
        {...defaultProps}
        mobileConfig={{
          ...mobileConfig,
          menu: {
            label: 'Actions',
            labelDescription: (row) =>
              `Actions for ${row.firstName} ${row.lastName}`,
            actions: [],
          },
        }}
      />,
    );

    expect(
      screen.queryByRole('button', { name: 'Actions' }),
    ).not.toBeInTheDocument();
  });

  it('should not call onClick when the actions menu is activated from the keyboard', async () => {
    const onClick = vi.fn();
    renderRow(
      <MobileRow
        {...defaultProps}
        mobileConfig={{
          ...mobileConfig,
          onClick,
          menu: getMenu(vi.fn()),
        }}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Actions' });
    await settle(() => {
      trigger.focus();
    });
    await settle(async () => {
      await user.keyboard('{Enter}');
    });

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = renderRow(<MobileRow {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  it('should meet accessibility guidelines when row actions are rendered', async () => {
    const { container } = renderRow(
      <MobileRow
        {...defaultProps}
        mobileConfig={{
          ...mobileConfig,
          menu: getMenu(vi.fn()),
        }}
      />,
    );

    await act(async () => {
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
