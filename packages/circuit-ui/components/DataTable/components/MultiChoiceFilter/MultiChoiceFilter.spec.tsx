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

import { describe, expect, it, vi } from 'vitest';

import { axe, render, screen, userEvent } from '../../../../util/test-utils.js';

import { MultiChoiceFilter } from './MultiChoiceFilter.js';

describe('MultiChoiceFilter', () => {
  const baseProps = {
    label: 'Payment status',
    options: [
      { label: 'Paid', value: 'paid' },
      { label: 'Unpaid', value: 'unpaid' },
      { label: 'Revoked', value: 'revoked' },
    ],
    onChange: vi.fn(),
  };

  it('should render a checkbox for each option', () => {
    render(<MultiChoiceFilter {...baseProps} />);

    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    expect(
      screen.getByRole('checkbox', { name: 'Unpaid' }),
    ).toBeInTheDocument();
  });

  it('should name the group with the label', () => {
    render(<MultiChoiceFilter {...baseProps} />);

    expect(
      screen.getByRole('group', { name: 'Payment status' }),
    ).toBeInTheDocument();
  });

  it('should select none of the options without a value', () => {
    render(<MultiChoiceFilter {...baseProps} />);

    for (const checkbox of screen.getAllByRole('checkbox')) {
      expect(checkbox).not.toBeChecked();
    }
  });

  it('should select the options matching the value', () => {
    render(<MultiChoiceFilter {...baseProps} value={['paid', 'revoked']} />);

    expect(screen.getByRole('checkbox', { name: 'Paid' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Unpaid' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Revoked' })).toBeChecked();
  });

  describe('when selecting an option', () => {
    it('should call onChange with the value added', async () => {
      const onChange = vi.fn();
      render(
        <MultiChoiceFilter
          {...baseProps}
          value={['paid']}
          onChange={onChange}
        />,
      );

      await userEvent.click(screen.getByRole('checkbox', { name: 'Unpaid' }));

      expect(onChange).toHaveBeenCalledWith(['paid', 'unpaid']);
    });

    it('should report the values in the order of the options', async () => {
      const onChange = vi.fn();
      render(
        <MultiChoiceFilter
          {...baseProps}
          value={['revoked']}
          onChange={onChange}
        />,
      );

      await userEvent.click(screen.getByRole('checkbox', { name: 'Paid' }));

      expect(onChange).toHaveBeenCalledWith(['paid', 'revoked']);
    });
  });

  describe('when deselecting an option', () => {
    it('should call onChange without the value', async () => {
      const onChange = vi.fn();
      render(
        <MultiChoiceFilter
          {...baseProps}
          value={['paid', 'unpaid']}
          onChange={onChange}
        />,
      );

      await userEvent.click(screen.getByRole('checkbox', { name: 'Paid' }));

      expect(onChange).toHaveBeenCalledWith(['unpaid']);
    });

    it('should call onChange with undefined when it was the last one', async () => {
      const onChange = vi.fn();
      render(
        <MultiChoiceFilter
          {...baseProps}
          value={['paid']}
          onChange={onChange}
        />,
      );

      await userEvent.click(screen.getByRole('checkbox', { name: 'Paid' }));

      expect(onChange).toHaveBeenCalledWith(undefined);
    });
  });

  it('should clear the selection when the value is removed', () => {
    const { rerender } = render(
      <MultiChoiceFilter {...baseProps} value={['paid']} />,
    );

    expect(screen.getByRole('checkbox', { name: 'Paid' })).toBeChecked();

    rerender(<MultiChoiceFilter {...baseProps} value={undefined} />);

    expect(screen.getByRole('checkbox', { name: 'Paid' })).not.toBeChecked();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<MultiChoiceFilter {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
