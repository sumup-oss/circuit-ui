import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Add, Delete } from '@sumup-oss/icons';

import { act, axe, render, screen } from '../../../../../util/test-utils.js';

import { RowActions } from './RowActions.js';

describe('RowActions', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  /**
   * Flushes microtasks to prevent act() warnings from floating-ui.
   *
   * @see https://floating-ui.com/docs/react-dom#testing
   */
  async function flushMicrotasks() {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {});
  }

  const onAddClick = vi.fn();
  const onRemoveClick = vi.fn();

  const defaultProps = {
    label: 'Actions',
    labelDescription: 'Actions for item 123',
    actions: [
      {
        onClick: onAddClick,
        children: 'Add',
        icon: Add,
      },
      { type: 'divider' as const },
      {
        onClick: onRemoveClick,
        children: 'Remove',
        icon: Delete,
        destructive: true,
      },
    ],
  };

  it('should render a trigger button with an accessible name', async () => {
    render(<RowActions {...defaultProps} />);
    expect(
      screen.getByRole('button', { name: defaultProps.label }),
    ).toBeVisible();
    await flushMicrotasks();
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<RowActions {...defaultProps} />);

    await act(async () => {
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
