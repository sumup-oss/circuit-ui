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

import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
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
      invalidRange: 'The minimum cannot be greater than the maximum.',
      from: 'From',
      to: 'To',
    },
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

  it('should name the dialog with the title', () => {
    render(<FilterSheet {...baseProps} />);

    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument();
  });

  it('should show every column that has a filter', () => {
    render(<FilterSheet {...baseProps} />);

    expect(
      screen.getByRole('group', { name: 'Payment Status' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Amount' })).toBeInTheDocument();
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
  });

  it('should show the applied values', () => {
    render(<FilterSheet {...baseProps} values={{ status: ['paid'] }} />);

    expect(screen.getByRole('checkbox', { name: 'Paid' })).toBeChecked();
  });

  describe('when clearAll is provided', () => {
    it('should call it and empty the draft when clicking Clear all', async () => {
      const onClearAll = vi.fn();
      render(
        <FilterSheet
          {...baseProps}
          values={{ status: ['paid'] }}
          clearAll={{ label: 'Clear all', onClick: onClearAll }}
        />,
      );

      await userEvent.click(screen.getByRole('button', { name: 'Clear all' }));

      expect(onClearAll).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('checkbox', { name: 'Paid' })).not.toBeChecked();
      expect(baseProps.onClose).not.toHaveBeenCalled();
    });
  });

  it('should not show Clear all without clearAll', () => {
    render(<FilterSheet {...baseProps} />);

    expect(
      screen.queryByRole('button', { name: 'Clear all' }),
    ).not.toBeInTheDocument();
  });

  it('should apply the values of all filters at once and close', async () => {
    render(<FilterSheet {...baseProps} />);

    await userEvent.click(screen.getByRole('checkbox', { name: 'Paid' }));
    await userEvent.type(screen.getByRole('textbox', { name: 'Min' }), '5');

    expect(baseProps.onApply).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(baseProps.onApply).toHaveBeenCalledWith({
      status: ['paid'],
      amount: { min: 5 },
    });
    expect(baseProps.onClose).toHaveBeenCalledTimes(1);
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
