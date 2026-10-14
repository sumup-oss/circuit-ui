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

import { type ReactNode, useState } from 'react';

import { modes } from '../../../../../../../.storybook/modes.js';
import type { Option } from '../../../types.js';

import { FilterWrapper, type FilterWrapperProps } from './index.js';
import type { FilterValue } from './types.js';

export default {
  title: 'Components/DataTable/Filter',
  component: FilterWrapper,
  tags: ['status:internal'],
  chromatic: {
    modes: {
      mobile: modes.smallMobile,
    },
    pauseAnimationAtEnd: true,
  },
  parameters: {
    layout: 'padded',
  },
};

function StoryWrapper({ children }: { children: ReactNode }) {
  return <div style={{ minHeight: '400px' }}>{children}</div>;
}

const FilterStory = (args: FilterWrapperProps) => {
  const [value, setValue] = useState<FilterValue | undefined>();

  return (
    <StoryWrapper>
      <FilterWrapper {...args} value={value} onChange={setValue} />
    </StoryWrapper>
  );
};

const paymentStatusOptions: Option[] = [
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Revoked', value: 'revoked' },
];

const multiChoiceColumn: FilterWrapperProps['column'] = {
  label: 'Payment Status',
  filter: true,
  type: { name: 'multiSelection', options: paymentStatusOptions },
};

export const MultiChoice = (args: FilterWrapperProps) => (
  <FilterStory {...args} />
);

MultiChoice.args = { column: multiChoiceColumn };

const quantityColumn: FilterWrapperProps['column'] = {
  label: 'Quantity',
  filter: true,
  type: { name: 'number' },
};

export const Quantity = (args: FilterWrapperProps) => <FilterStory {...args} />;

Quantity.args = { column: quantityColumn };

const percentageColumn: FilterWrapperProps['column'] = {
  label: 'VAT',
  filter: true,
  type: { name: 'number', formattingOptions: { style: 'percent' } },
};

export const Percentage = (args: FilterWrapperProps) => (
  <FilterStory {...args} />
);

Percentage.args = { column: percentageColumn };

const currencyColumn: FilterWrapperProps['column'] = {
  label: 'Amount',
  filter: true,
  type: {
    name: 'number',
    formattingOptions: { style: 'currency', currency: 'EUR' },
  },
};

export const Currency = (args: FilterWrapperProps) => <FilterStory {...args} />;

Currency.args = { column: currencyColumn };

const dateColumn: FilterWrapperProps['column'] = {
  label: 'Date',
  filter: true,
  type: { name: 'date' },
};

export const DateRange = (args: FilterWrapperProps) => (
  <FilterStory {...args} />
);

DateRange.args = { column: dateColumn };

const inlineColumns = [multiChoiceColumn, currencyColumn, dateColumn];

/**
 * Eg of how filters can be stacked on mobile.
 */
export const Inline = () => {
  const [values, setValues] = useState<Record<string, FilterValue | undefined>>(
    {},
  );

  return (
    <div style={{ display: 'grid', gap: '24px', maxWidth: '360px' }}>
      {inlineColumns.map((column) => (
        <FilterWrapper
          key={column.label}
          column={column}
          variant="inline"
          value={values[column.label]}
          onChange={(value) =>
            setValues((previous) => ({ ...previous, [column.label]: value }))
          }
        />
      ))}
    </div>
  );
};
