/**
 * Copyright 2026, SumUp Ltd.
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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { axe, render, screen, userEvent } from '../../../../util/test-utils.js';

import { FilterShell } from './FilterShell.js';

describe('FilterShell', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  const baseProps = {
    label: 'Amount',
    children: <p>Filter controls</p>,
  };

  it('should label the trigger with the filter name', () => {
    render(<FilterShell {...baseProps} />);

    expect(screen.getByRole('button', { name: 'Amount' })).toBeInTheDocument();
  });

  it('should add the number of active selections to the trigger label', () => {
    render(<FilterShell {...baseProps} count={3} />);

    expect(
      screen.getByRole('button', { name: 'Amount (3)' }),
    ).toBeInTheDocument();
  });

  it('should open the popover when clicking the trigger', async () => {
    render(<FilterShell {...baseProps} />);
    const trigger = screen.getByRole('button', { name: 'Amount' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Filter controls')).toBeVisible();
  });

  describe('without an onApply callback', () => {
    it('should not render the Apply and Clear buttons', async () => {
      render(<FilterShell {...baseProps} />);

      await userEvent.click(screen.getByRole('button', { name: 'Amount' }));

      expect(
        screen.queryByRole('button', { name: 'Apply' }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Clear' }),
      ).not.toBeInTheDocument();
    });
  });

  describe('with an onApply callback', () => {
    it('should call onApply and close the popover when clicking Apply', async () => {
      const onApply = vi.fn();
      const onDiscard = vi.fn();
      render(
        <FilterShell {...baseProps} onApply={onApply} onDiscard={onDiscard} />,
      );
      const trigger = screen.getByRole('button', { name: 'Amount' });

      await userEvent.click(trigger);
      await userEvent.click(screen.getByRole('button', { name: 'Apply' }));

      expect(onApply).toHaveBeenCalledTimes(1);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should call onClear without closing the popover when clicking Clear', async () => {
      const onClear = vi.fn();
      render(
        <FilterShell {...baseProps} onApply={vi.fn()} onClear={onClear} />,
      );
      const trigger = screen.getByRole('button', { name: 'Amount' });

      await userEvent.click(trigger);
      await userEvent.click(screen.getByRole('button', { name: 'Clear' }));

      expect(onClear).toHaveBeenCalledTimes(1);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should call onDiscard when closing the popover without applying', async () => {
      const onApply = vi.fn();
      const onDiscard = vi.fn();
      render(
        <FilterShell {...baseProps} onApply={onApply} onDiscard={onDiscard} />,
      );
      const trigger = screen.getByRole('button', { name: 'Amount' });

      await userEvent.click(trigger);
      await userEvent.click(trigger);

      expect(onDiscard).toHaveBeenCalledTimes(1);
      expect(onApply).not.toHaveBeenCalled();
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<FilterShell {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
