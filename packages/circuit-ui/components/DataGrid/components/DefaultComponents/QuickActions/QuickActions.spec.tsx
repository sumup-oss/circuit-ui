import { describe, expect, it, vi } from 'vitest';
import { Add, Delete } from '@sumup-oss/icons';

import {
  act,
  axe,
  render,
  screen,
  userEvent,
} from '../../../../../util/test-utils.js';

import { QuickActions, type CustomAction } from './QuickActions.js';

type Data = {
  id: string;
  name: string;
};

describe('QuickActions', () => {
  const onAddClick = vi.fn();
  const onRemoveClick = vi.fn();

  const value: Data = {
    id: '123',
    name: 'Ada Lovelace',
  };

  const actions: CustomAction<Data>[] = [
    {
      onClick: onAddClick,
      children: 'Add',
      icon: Add,
      'aria-description': (data) => `Add ${data.name}`,
    },
    {
      onClick: onRemoveClick,
      children: 'Remove',
      icon: Delete,
      destructive: true,
      'aria-description': (data) => `Remove ${data.name}`,
    },
  ];

  const defaultProps = {
    actions,
    value,
  };

  it('should render a button with an accessible description for each action', async () => {
    render(<QuickActions {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Add' })).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Add' }),
    ).toHaveAccessibleDescription('Add Ada Lovelace');
    expect(screen.getByRole('button', { name: 'Remove' })).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Remove' }),
    ).toHaveAccessibleDescription('Remove Ada Lovelace');
  });

  it('should call onClick with the event and value when an action is clicked', async () => {
    render(<QuickActions {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onAddClick).toHaveBeenCalledTimes(1);
    expect(onAddClick).toHaveBeenCalledWith(expect.any(Object), value);
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<QuickActions {...defaultProps} />);

    await act(async () => {
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
