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
} from '../../../../../../util/test-utils.js';

import { SortSheet, type SortSheetProps } from './SortSheet.js';

describe('SortSheet', () => {
  const baseProps = {
    open: true,
    title: 'Sort by',
    description: 'Choose how you want to see your members',
    parametersLabel: 'Parameters',
    orderLabel: 'Order',
    sortLabels: { ascending: 'Ascending', descending: 'Descending' },
    applyLabel: 'Apply',
    clearLabel: 'Clear',
    onClose: vi.fn(),
    onApply: vi.fn(),
    columns: [
      {
        id: 'name',
        label: 'Name',
        sortable: true,
        type: { name: 'text' },
      },
      {
        id: 'joined',
        label: 'Joined',
        sortable: true,
        type: { name: 'text' },
      },
      { id: 'notes', label: 'Notes', type: { name: 'text' } },
    ],
  } satisfies SortSheetProps<unknown>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show the title and description', () => {
    render(<SortSheet {...baseProps} />);

    expect(screen.getByRole('dialog', { name: 'Sort by' })).toBeVisible();
    expect(screen.getByText(baseProps.description)).toBeVisible();
  });

  it('should list the sortable columns only', () => {
    render(<SortSheet {...baseProps} />);

    const group = screen.getByRole('radiogroup', { name: 'Parameters' });
    expect(group).toBeVisible();
    expect(screen.getByRole('radio', { name: 'Name' })).toBeVisible();
    expect(screen.getByRole('radio', { name: 'Joined' })).toBeVisible();
    expect(screen.queryByRole('radio', { name: 'Notes' })).toBeNull();
  });

  it('should show the order in ascending order before a column is chosen', () => {
    render(<SortSheet {...baseProps} />);

    expect(screen.getByRole('radiogroup', { name: 'Order' })).toBeVisible();
    expect(screen.getByRole('radio', { name: 'Ascending' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Descending' })).not.toBeChecked();
  });

  it('should apply nothing when only the order is chosen', async () => {
    render(<SortSheet {...baseProps} />);

    await userEvent.click(screen.getByRole('radio', { name: 'Descending' }));
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(baseProps.onApply).toHaveBeenCalledWith(undefined);
  });

  it('should keep the order chosen before the column', async () => {
    render(<SortSheet {...baseProps} />);

    await userEvent.click(screen.getByRole('radio', { name: 'Descending' }));
    await userEvent.click(screen.getByRole('radio', { name: 'Joined' }));
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(baseProps.onApply).toHaveBeenCalledWith({
      columnId: 'joined',
      direction: 'descending',
    });
  });

  it('should start from the applied sorting', () => {
    render(
      <SortSheet
        {...baseProps}
        value={{ columnId: 'name', direction: 'descending' }}
      />,
    );

    expect(screen.getByRole('radio', { name: 'Name' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Descending' })).toBeChecked();
  });

  it('should apply the chosen sorting and close', async () => {
    render(<SortSheet {...baseProps} />);

    await userEvent.click(screen.getByRole('radio', { name: 'Name' }));
    await userEvent.click(screen.getByRole('radio', { name: 'Descending' }));
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(baseProps.onApply).toHaveBeenCalledTimes(1);
    expect(baseProps.onApply).toHaveBeenCalledWith({
      columnId: 'name',
      direction: 'descending',
    });
    expect(baseProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should keep the chosen direction when changing the column', async () => {
    render(<SortSheet {...baseProps} />);

    await userEvent.click(screen.getByRole('radio', { name: 'Name' }));
    await userEvent.click(screen.getByRole('radio', { name: 'Descending' }));
    await userEvent.click(screen.getByRole('radio', { name: 'Joined' }));
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(baseProps.onApply).toHaveBeenCalledWith({
      columnId: 'joined',
      direction: 'descending',
    });
  });

  it('should only clear the draft and apply nothing until Apply is clicked', async () => {
    render(
      <SortSheet
        {...baseProps}
        value={{ columnId: 'name', direction: 'ascending' }}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(baseProps.onApply).not.toHaveBeenCalled();
    expect(screen.getByRole('radio', { name: 'Name' })).not.toBeChecked();

    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(baseProps.onApply).toHaveBeenCalledWith(undefined);
  });

  it('should meet accessibility guidelines', async () => {
    const { baseElement } = render(
      <SortSheet
        {...baseProps}
        value={{ columnId: 'name', direction: 'ascending' }}
      />,
    );

    const actual = await axe(baseElement);
    expect(actual).toHaveNoViolations();
  });
});
