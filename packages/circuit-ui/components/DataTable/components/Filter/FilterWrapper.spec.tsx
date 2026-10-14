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

import { FilterWrapper, type FilterWrapperProps } from './FilterWrapper.js';

describe('FilterWrapper', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  const options = [
    { label: 'Eggs', value: 'eggs' },
    { label: 'Soy', value: 'soy' },
  ];

  const multiColumn: FilterWrapperProps['column'] = {
    label: 'Allergies',
    filter: true,
    type: { name: 'multiSelection', options },
  };

  const baseProps = { column: multiColumn, onChange: vi.fn() };

  it.each([
    ['text', { name: 'text' }],
    ['boolean', { name: 'boolean' }],
  ] as const)('should render nothing for a %s column', (_, type) => {
    const { container } = render(
      <FilterWrapper
        {...baseProps}
        column={{ label: 'Notes', filter: true, type }}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should render nothing when the column has no filter', () => {
    const { container } = render(
      <FilterWrapper
        {...baseProps}
        column={{ ...multiColumn, filter: false }}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it.each([
    ['single selection', { name: 'singleSelection', options }],
    ['multi selection', { name: 'multiSelection', options }],
    ['number', { name: 'number' }],
    ['date', { name: 'date' }],
  ] as const)('should render a trigger with the column label for a %s column', (_, type) => {
    render(
      <FilterWrapper
        {...baseProps}
        column={{ label: 'Column', filter: true, type }}
      />,
    );

    expect(screen.getByRole('button', { name: 'Column' })).toBeInTheDocument();
  });

  it('should add the number of selections to the trigger', () => {
    render(<FilterWrapper {...baseProps} value={['eggs', 'soy']} />);

    expect(
      screen.getByRole('button', { name: 'Allergies (2)' }),
    ).toBeInTheDocument();
  });

  it('should offer checkboxes for a single selection column', async () => {
    render(
      <FilterWrapper
        {...baseProps}
        column={{
          label: 'Status',
          filter: true,
          type: { name: 'singleSelection', options },
        }}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Status' }));

    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('should describe a range in the trigger', () => {
    render(
      <FilterWrapper
        {...baseProps}
        column={{ label: 'Quantity', filter: true, type: { name: 'number' } }}
        value={{ min: 5, max: 20 }}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Quantity (5 – 20)' }),
    ).toBeInTheDocument();
  });

  describe('when applying a multi choice filter', () => {
    it('should only report the selection when clicking Apply', async () => {
      const onChange = vi.fn();
      render(<FilterWrapper {...baseProps} onChange={onChange} />);

      await userEvent.click(screen.getByRole('button', { name: 'Allergies' }));
      await userEvent.click(screen.getByRole('checkbox', { name: 'Eggs' }));

      expect(onChange).not.toHaveBeenCalled();

      await userEvent.click(screen.getByRole('button', { name: 'Apply' }));

      expect(onChange).toHaveBeenCalledWith(['eggs']);
    });

    it('should discard the selection when closing without applying', async () => {
      const onChange = vi.fn();
      render(<FilterWrapper {...baseProps} onChange={onChange} />);
      const trigger = screen.getByRole('button', { name: 'Allergies' });

      await userEvent.click(trigger);
      await userEvent.click(screen.getByRole('checkbox', { name: 'Eggs' }));
      await userEvent.click(trigger);
      await userEvent.click(trigger);

      expect(screen.getByRole('checkbox', { name: 'Eggs' })).not.toBeChecked();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should remove the filter and close the popover when clicking Clear', async () => {
      const onChange = vi.fn();
      render(
        <FilterWrapper {...baseProps} value={['eggs']} onChange={onChange} />,
      );
      const trigger = screen.getByRole('button', { name: 'Allergies (1)' });

      await userEvent.click(trigger);
      await userEvent.click(screen.getByRole('button', { name: 'Clear' }));

      expect(onChange).toHaveBeenCalledWith(undefined);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('should report a range when applying a number filter', async () => {
    const onChange = vi.fn();
    render(
      <FilterWrapper
        column={{ label: 'Quantity', filter: true, type: { name: 'number' } }}
        onChange={onChange}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Quantity' }));
    await userEvent.type(screen.getByRole('spinbutton', { name: 'Min' }), '5');
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(onChange).toHaveBeenCalledWith({ min: 5 });
  });

  describe('when inline', () => {
    it('should render the controls without a trigger', () => {
      render(<FilterWrapper {...baseProps} variant="inline" />);

      expect(
        screen.queryByRole('button', { name: 'Allergies' }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole('group', { name: 'Allergies' }),
      ).toBeInTheDocument();
      expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    });

    it('should report changes right away', async () => {
      const onChange = vi.fn();
      render(
        <FilterWrapper {...baseProps} variant="inline" onChange={onChange} />,
      );

      await userEvent.click(screen.getByRole('checkbox', { name: 'Eggs' }));

      expect(onChange).toHaveBeenCalledWith(['eggs']);
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<FilterWrapper {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
