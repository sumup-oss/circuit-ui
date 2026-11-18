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

import {
  axe,
  fireEvent,
  render,
  screen,
  userEvent,
} from '../../../../../../../util/test-utils.js';

import { Filter, type FilterProps } from './Filter.js';

declare const process: {
  env: { NODE_ENV: string };
};

interface Plan {
  id: number;
  name: string;
}

describe('Filter', () => {
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

  const multiColumn: FilterProps['column'] = {
    label: 'Allergies',
    filter: true,
    type: { name: 'multiSelection', options },
  };

  const baseProps = {
    column: multiColumn,
    onChange: vi.fn(),
    applyFilterLabel: 'Apply',
    clearFilterLabel: 'Clear',
  };

  it('should render nothing for a text column', () => {
    const { container } = render(
      <Filter
        {...baseProps}
        column={{ label: 'Notes', filter: true, type: { name: 'text' } }}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should render nothing when the column has no filter', () => {
    const { container } = render(
      <Filter {...baseProps} column={{ ...multiColumn, filter: false }} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it.each([
    ['single selection', { name: 'singleSelection', options }],
    ['multi selection', { name: 'multiSelection', options }],
    ['number', { name: 'number' }],
    ['boolean', { name: 'boolean', accessibleLabel: () => 'foo' }],
    ['date', { name: 'date' }],
  ] as const)('should render a trigger with the column label for a %s column', (_, type) => {
    render(
      <Filter
        {...baseProps}
        column={{ label: 'Column', filter: true, type }}
      />,
    );

    expect(screen.getByRole('button', { name: 'Column' })).toBeInTheDocument();
  });

  it('should add the number of selections to the trigger', () => {
    render(<Filter {...baseProps} value={['eggs', 'soy']} />);

    expect(
      screen.getByRole('button', { name: 'Allergies (2)' }),
    ).toBeInTheDocument();
  });

  it('should offer checkboxes for a single selection column', async () => {
    render(
      <Filter
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
      <Filter
        {...baseProps}
        column={{ label: 'Quantity', filter: true, type: { name: 'number' } }}
        value={{ min: 5, max: 20 }}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Quantity (5 – 20)' }),
    ).toBeInTheDocument();
  });
  it('should show a boolean type as a multi selection filter', async () => {
    render(
      <Filter
        {...baseProps}
        onChange={vi.fn()}
        column={{
          label: 'Boolean',
          filter: true,
          type: {
            name: 'boolean',
            accessibleLabel: (boolean) => (boolean ? 'True' : 'False'),
          },
        }}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Boolean' }));
    const [truthyOption, falsyOption] = screen.getAllByRole('checkbox');
    expect(truthyOption).toHaveAccessibleName('True');
    expect(falsyOption).toHaveAccessibleName('False');
  });

  describe('when applying a multi choice filter', () => {
    it('should only report the selection when clicking Apply', async () => {
      const onChange = vi.fn();
      render(<Filter {...baseProps} onChange={onChange} />);

      await userEvent.click(screen.getByRole('button', { name: 'Allergies' }));
      await userEvent.click(screen.getByRole('checkbox', { name: 'Eggs' }));

      expect(onChange).not.toHaveBeenCalled();

      await userEvent.click(screen.getByRole('button', { name: 'Apply' }));

      expect(onChange).toHaveBeenCalledWith(['eggs']);
    });

    it('should discard the selection when closing without applying', async () => {
      const onChange = vi.fn();
      render(<Filter {...baseProps} onChange={onChange} />);
      const trigger = screen.getByRole('button', { name: 'Allergies' });

      await userEvent.click(trigger);
      await userEvent.click(screen.getByRole('checkbox', { name: 'Eggs' }));
      await userEvent.click(trigger);
      await userEvent.click(trigger);

      expect(screen.getByRole('checkbox', { name: 'Eggs' })).not.toBeChecked();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should remove the filter and keep the popover open when clicking Clear', async () => {
      const onChange = vi.fn();
      render(<Filter {...baseProps} value={['eggs']} onChange={onChange} />);
      const trigger = screen.getByRole('button', { name: 'Allergies (1)' });

      await userEvent.click(trigger);
      await userEvent.click(screen.getByRole('button', { name: 'Clear' }));

      expect(onChange).toHaveBeenCalledWith(undefined);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it.each([
    [
      'currency',
      {
        name: 'number',
        formattingOptions: { style: 'currency', currency: 'EUR' },
      },
      'textbox',
    ],
    [
      'percentage',
      { name: 'number', formattingOptions: { style: 'percent' } },
      'textbox',
    ],
    ['plain number', { name: 'number' }, 'textbox'],
  ] as const)('should show the fields of a %s column', async (_, type, role) => {
    render(
      <Filter
        {...baseProps}
        labels={{
          min: 'Min',
          max: 'Max',
        }}
        column={{ label: 'Amount', filter: true, type }}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Amount' }));

    expect(screen.getByRole('group', { name: 'Amount' })).toBeInTheDocument();
    expect(screen.getByRole(role, { name: 'Min' })).toBeInTheDocument();
  });

  describe('Labels', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'development';
    });
    afterAll(() => {
      process.env.NODE_ENV = 'test';
    });

    it('should throw an error for missing popover labels', async () => {
      expect(() => {
        render(<Filter {...baseProps} applyFilterLabel={undefined} />);
      }).toThrow(
        '[DataGrid Filter] The "clearFilterLabel" or "applyFilterLabel" is missing',
      );
    });

    it.each([
      { name: 'singleSelection', options },
      { name: 'boolean', accessibleLabel: () => 'foo' },
      { name: 'multiSelection', options },
    ] as const)('should not throw an error for missing labels with type %s', (type) => {
      render(
        <Filter
          {...baseProps}
          column={{ label: 'Column', filter: true, type }}
        />,
      );

      expect(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Column' }));
      }).not.toThrow();
    });

    it.each([
      { name: 'number' },
      { name: 'date' },
    ] as const)('should throw an error for missing labels with type %s', async (type) => {
      render(
        <Filter
          {...baseProps}
          column={{ label: 'Column', filter: true, type }}
        />,
      );

      expect(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Column' }));
      }).toThrow();
    });
  });

  it('should report the range in order when applying a reversed range', async () => {
    const onChange = vi.fn();
    render(
      <Filter
        {...baseProps}
        labels={{
          max: 'Max',
          min: 'Min',
        }}
        column={{ label: 'Quantity', filter: true, type: { name: 'number' } }}
        onChange={onChange}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Quantity' }));
    await userEvent.type(screen.getByRole('textbox', { name: 'Max' }), '0');
    await userEvent.type(screen.getByRole('textbox', { name: 'Min' }), '7');
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(onChange).toHaveBeenCalledWith({ min: 0, max: 7 });
  });

  it('should offer options that are read with the getters', async () => {
    render(
      <Filter
        {...baseProps}
        column={{
          label: 'Plan',
          filter: true,
          type: {
            name: 'multiSelection',
            options: [
              { id: 1, name: 'Basic' },
              { id: 2, name: 'Pro' },
            ],
            getOptionLabel: (option: Plan) => option.name,
            getOptionValue: (option: Plan) => String(option.id),
          },
        }}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Plan' }));

    expect(screen.getByRole('checkbox', { name: 'Basic' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Pro' })).toBeInTheDocument();
  });

  describe('when inline', () => {
    it('should render the controls without a trigger', () => {
      render(<Filter {...baseProps} variant="inline" />);

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
      render(<Filter {...baseProps} variant="inline" onChange={onChange} />);

      await userEvent.click(screen.getByRole('checkbox', { name: 'Eggs' }));

      expect(onChange).toHaveBeenCalledWith(['eggs']);
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Filter {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
