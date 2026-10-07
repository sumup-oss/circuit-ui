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

import {
  axe,
  render,
  screen,
  userEvent,
  within,
} from '../../../../util/test-utils.js';

import { DateFilter } from './DateFilter.js';

describe('DateFilter', () => {
  const baseProps = {
    label: 'Date range',
    onChange: vi.fn(),
    locale: 'en-US',
  } as const;

  it('should name the group with the label', () => {
    render(<DateFilter {...baseProps} />);

    expect(
      screen.getByRole('group', { name: 'Date range' }),
    ).toBeInTheDocument();
  });

  it('should render a from and a to field', () => {
    render(<DateFilter {...baseProps} />);

    expect(screen.getByRole('group', { name: 'From' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'To' })).toBeInTheDocument();
  });

  it('should show the dates of the range', () => {
    render(
      <DateFilter
        {...baseProps}
        value={{ from: '2026-09-05', to: '2026-10-12' }}
      />,
    );

    const from = within(screen.getByRole('group', { name: 'From' }));
    const to = within(screen.getByRole('group', { name: 'To' }));

    expect(from.getByLabelText('Year')).toHaveValue('2026');
    expect(from.getByLabelText('Month')).toHaveValue('9');
    expect(from.getByLabelText('Day')).toHaveValue('5');
    expect(to.getByLabelText('Month')).toHaveValue('10');
    expect(to.getByLabelText('Day')).toHaveValue('12');
  });

  it('should call onChange with the start date when entering a full date', async () => {
    const onChange = vi.fn();
    render(<DateFilter {...baseProps} onChange={onChange} />);
    const from = within(screen.getByRole('group', { name: 'From' }));

    await userEvent.type(from.getByLabelText('Year'), '2026');
    await userEvent.type(from.getByLabelText('Month'), '9');
    await userEvent.type(from.getByLabelText('Day'), '05');

    expect(onChange).toHaveBeenLastCalledWith({ from: '2026-09-05' });
  });

  it('should keep the end date when changing the start date', async () => {
    const onChange = vi.fn();
    render(
      <DateFilter
        {...baseProps}
        value={{ to: '2026-10-12' }}
        onChange={onChange}
      />,
    );
    const from = within(screen.getByRole('group', { name: 'From' }));

    await userEvent.type(from.getByLabelText('Year'), '2026');
    await userEvent.type(from.getByLabelText('Month'), '9');
    await userEvent.type(from.getByLabelText('Day'), '05');

    expect(onChange).toHaveBeenLastCalledWith({
      from: '2026-09-05',
      to: '2026-10-12',
    });
  });

  it('should call onChange with undefined when the last date is cleared', async () => {
    const onChange = vi.fn();
    render(
      <DateFilter
        {...baseProps}
        value={{ from: '2026-09-05' }}
        onChange={onChange}
      />,
    );

    await userEvent.click(
      screen.getAllByRole('button', { name: /change date/i })[0],
    );
    await userEvent.click(screen.getByRole('button', { name: 'Clear date' }));

    expect(onChange).toHaveBeenLastCalledWith(undefined);
  });

  it('should not offer start dates after the end date', async () => {
    render(
      <DateFilter
        {...baseProps}
        value={{ from: '2026-09-05', to: '2026-09-10' }}
      />,
    );

    await userEvent.click(
      screen.getAllByRole('button', { name: /change date/i })[0],
    );

    expect(screen.getByRole('button', { name: '7' })).not.toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(screen.getByRole('button', { name: '15' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<DateFilter {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
