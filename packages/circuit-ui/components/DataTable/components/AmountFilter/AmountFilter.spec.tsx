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

import { AmountFilter, type AmountFilterProps } from './AmountFilter.js';

describe('AmountFilter', () => {
  const baseProps = {
    label: 'Amount range',
    kind: 'number',
    onChange: vi.fn(),
  } satisfies AmountFilterProps;

  it('should name the group with the label', () => {
    render(<AmountFilter {...baseProps} />);

    expect(
      screen.getByRole('group', { name: 'Amount range' }),
    ).toBeInTheDocument();
  });

  it.each([
    ['number', 'spinbutton'],
    ['percentage', 'textbox'],
    ['currency', 'textbox'],
  ] as const)('should render a min and a max field for the %s kind', (kind, role) => {
    render(
      <AmountFilter
        {...baseProps}
        {...(kind === 'currency' ? { kind, currency: 'EUR' } : { kind })}
      />,
    );

    expect(screen.getByRole(role, { name: 'Min' })).toBeInTheDocument();
    expect(screen.getByRole(role, { name: 'Max' })).toBeInTheDocument();
  });

  it('should show the values of the range', () => {
    render(<AmountFilter {...baseProps} value={{ min: 5, max: 20 }} />);

    expect(screen.getByRole('spinbutton', { name: 'Min' })).toHaveValue(5);
    expect(screen.getByRole('spinbutton', { name: 'Max' })).toHaveValue(20);
  });

  it('should call onChange with the minimum when typing in the min field', async () => {
    const onChange = vi.fn();
    render(<AmountFilter {...baseProps} onChange={onChange} />);

    await userEvent.type(screen.getByRole('spinbutton', { name: 'Min' }), '5');

    expect(onChange).toHaveBeenCalledWith({ min: 5 });
  });

  it('should keep the maximum when typing in the min field', async () => {
    const onChange = vi.fn();
    render(
      <AmountFilter {...baseProps} value={{ max: 20 }} onChange={onChange} />,
    );

    await userEvent.type(screen.getByRole('spinbutton', { name: 'Min' }), '5');

    expect(onChange).toHaveBeenCalledWith({ min: 5, max: 20 });
  });

  it('should call onChange with undefined when the last value is removed', async () => {
    const onChange = vi.fn();
    render(
      <AmountFilter {...baseProps} value={{ min: 5 }} onChange={onChange} />,
    );

    await userEvent.clear(screen.getByRole('spinbutton', { name: 'Min' }));

    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it('should report a number for the currency kind', async () => {
    const onChange = vi.fn();
    render(
      <AmountFilter
        {...baseProps}
        kind="currency"
        currency="EUR"
        formattingLocale="en-US"
        onChange={onChange}
      />,
    );

    await userEvent.type(screen.getByRole('textbox', { name: 'Max' }), '12.5');

    expect(onChange).toHaveBeenLastCalledWith({ max: 12.5 });
  });

  describe('when the minimum is greater than the maximum', () => {
    it('should show the message and mark both fields as invalid', () => {
      render(<AmountFilter {...baseProps} value={{ min: 10, max: 5 }} />);

      expect(
        screen.getByText('The minimum cannot be greater than the maximum.'),
      ).toBeInTheDocument();
      expect(screen.getByRole('spinbutton', { name: 'Min' })).toBeInvalid();
      expect(screen.getByRole('spinbutton', { name: 'Max' })).toBeInvalid();
    });
  });

  describe('when the range is valid', () => {
    it('should not show the message', () => {
      render(<AmountFilter {...baseProps} value={{ min: 5, max: 10 }} />);

      expect(
        screen.queryByText('The minimum cannot be greater than the maximum.'),
      ).not.toBeInTheDocument();
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<AmountFilter {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
