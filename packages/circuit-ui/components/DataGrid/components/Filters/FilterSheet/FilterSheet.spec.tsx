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

import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  act,
  axe,
  render,
  screen,
  userEvent,
} from '../../../../../util/test-utils.js';

import { FilterSheet, type FilterSheetProps } from './FilterSheet.js';

describe('FilterSheet', () => {
  const baseProps = {
    open: true,
    title: 'Filters',
    labels: {
      min: 'Min',
      max: 'Max',
      from: 'From',
      to: 'To',
    },
    clearAllButtonLabel: 'Clear all',
    onClose: vi.fn(),
    onApply: vi.fn(),
    values: {},
    columns: [
      {
        id: 'status',
        label: 'Payment Status',
        filter: true,
        type: {
          name: 'multiSelection',
          options: [
            { label: 'Paid', value: 'paid' },
            { label: 'Unpaid', value: 'unpaid' },
          ],
        },
      },
      {
        id: 'amount',
        label: 'Amount',
        filter: true,
        type: { name: 'number' },
      },
      { id: 'name', label: 'Name', filter: false, type: { name: 'text' } },
    ],
  } satisfies FilterSheetProps;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function ControlledSheet() {
    const [open, setOpen] = useState(true);

    return (
      <FilterSheet
        {...baseProps}
        open={open}
        onClose={() => {
          baseProps.onClose();
          setOpen(false);
        }}
      />
    );
  }

  it('should show every column that has a filter', () => {
    render(<FilterSheet {...baseProps} />);

    expect(
      screen.getByRole('group', { name: 'Payment Status' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Amount' })).toBeInTheDocument();
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
  });

  it('should empty the draft and remove all filters right away when clicking Clear all', async () => {
    render(<FilterSheet {...baseProps} values={{ status: ['paid'] }} />);

    await userEvent.click(screen.getByRole('button', { name: 'Clear all' }));

    expect(baseProps.onApply).toHaveBeenCalledWith({});
    expect(screen.getByRole('checkbox', { name: 'Paid' })).not.toBeChecked();
    expect(baseProps.onClose).not.toHaveBeenCalled();
  });

  it('should apply the values of all filters at once and close once', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(<ControlledSheet />);

    await userEvent.click(screen.getByRole('checkbox', { name: 'Paid' }));
    await userEvent.type(screen.getByRole('textbox', { name: 'Min' }), '5');

    expect(baseProps.onApply).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(baseProps.onApply).toHaveBeenCalledWith({
      status: ['paid'],
      amount: { min: 5 },
    });
    expect(baseProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when the user closes the sheet', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(<ControlledSheet />);

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(baseProps.onClose).toHaveBeenCalledTimes(1);
    expect(baseProps.onApply).not.toHaveBeenCalled();
  });

  it('should apply a reversed range in order', async () => {
    render(<FilterSheet {...baseProps} />);

    await userEvent.type(screen.getByRole('textbox', { name: 'Max' }), '0');
    await userEvent.type(screen.getByRole('textbox', { name: 'Min' }), '7');
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(baseProps.onApply).toHaveBeenCalledWith({
      amount: { min: 0, max: 7 },
    });
  });

  it('should leave out filters without a value', async () => {
    render(<FilterSheet {...baseProps} values={{ status: ['paid'] }} />);

    await userEvent.click(screen.getByRole('checkbox', { name: 'Paid' }));
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(baseProps.onApply).toHaveBeenCalledWith({});
  });

  it('should discard the edits when it closes without applying', async () => {
    const { rerender } = render(<FilterSheet {...baseProps} />);

    await userEvent.click(screen.getByRole('checkbox', { name: 'Paid' }));
    rerender(<FilterSheet {...baseProps} open={false} />);
    rerender(<FilterSheet {...baseProps} open />);

    expect(screen.getByRole('checkbox', { name: 'Paid' })).not.toBeChecked();
    expect(baseProps.onApply).not.toHaveBeenCalled();
  });

  it('should have no accessibility violations', async () => {
    const { baseElement } = render(<FilterSheet {...baseProps} />);
    const actual = await axe(baseElement);
    expect(actual).toHaveNoViolations();
  });
});
