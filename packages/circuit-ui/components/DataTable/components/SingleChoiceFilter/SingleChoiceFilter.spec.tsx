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

import { SingleChoiceFilter } from './SingleChoiceFilter.js';

describe('SingleChoiceFilter', () => {
  const baseProps = {
    label: 'Payment status',
    options: [
      { label: 'Paid', value: 'paid' },
      { label: 'Unpaid', value: 'unpaid' },
      { label: 'Revoked', value: 'revoked' },
    ],
    onChange: vi.fn(),
  };

  it('should render a radio for each option', () => {
    render(<SingleChoiceFilter {...baseProps} />);

    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByRole('radio', { name: 'Unpaid' })).toBeInTheDocument();
  });

  it('should name the group with the label', () => {
    render(<SingleChoiceFilter {...baseProps} />);

    expect(
      screen.getByRole('radiogroup', { name: 'Payment status' }),
    ).toBeInTheDocument();
  });

  it('should select none of the options without a value', () => {
    render(<SingleChoiceFilter {...baseProps} />);

    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).not.toBeChecked();
    }
  });

  it('should select the option matching the value', () => {
    render(<SingleChoiceFilter {...baseProps} value="unpaid" />);

    expect(screen.getByRole('radio', { name: 'Unpaid' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Paid' })).not.toBeChecked();
  });

  it('should call onChange with the value of the clicked option', async () => {
    const onChange = vi.fn();
    render(<SingleChoiceFilter {...baseProps} onChange={onChange} />);

    await userEvent.click(screen.getByRole('radio', { name: 'Revoked' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('revoked');
  });

  it('should clear the selection when the value is removed', () => {
    const { rerender } = render(
      <SingleChoiceFilter {...baseProps} value="paid" />,
    );

    expect(screen.getByRole('radio', { name: 'Paid' })).toBeChecked();

    rerender(<SingleChoiceFilter {...baseProps} value={undefined} />);

    expect(screen.getByRole('radio', { name: 'Paid' })).not.toBeChecked();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SingleChoiceFilter {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
