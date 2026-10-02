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

import { modes } from '../../../../../../.storybook/modes.js';
import { AmountFilter, type AmountFilterProps } from '../AmountFilter/index.js';
import { FilterShell } from '../FilterShell/index.js';
import {
  MultiChoiceFilter,
  type MultiChoiceFilterProps,
} from '../MultiChoiceFilter/index.js';
import {
  SingleChoiceFilter,
  type SingleChoiceFilterProps,
} from '../SingleChoiceFilter/index.js';

import type { Option } from '../../types.js';
import type { NumberRange } from './types.js';
import { useFilterDraft } from './useFilterDraft.js';

export default {
  title: 'Components/DataTable/Filter',
  component: FilterShell,
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
  return <div style={{ minHeight: '300px' }}>{children}</div>;
}

const paymentStatusOptions: Option[] = [
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Revoked', value: 'revoked' },
];

export const SingleChoice = (args: SingleChoiceFilterProps) => {
  const [value, setValue] = useState<string | undefined>();
  const { draft, setDraft, apply, clear, discard } = useFilterDraft(
    value,
    setValue,
  );

  return (
    <StoryWrapper>
      <FilterShell
        label={args.label}
        count={value ? 1 : 0}
        onApply={apply}
        onClear={clear}
        onDiscard={discard}
      >
        <SingleChoiceFilter
          {...args}
          hideLabel
          value={draft}
          onChange={setDraft}
        />
      </FilterShell>
    </StoryWrapper>
  );
};

SingleChoice.args = {
  label: 'Payment Status',
  options: paymentStatusOptions,
};

export const MultiChoice = (args: MultiChoiceFilterProps) => {
  const [value, setValue] = useState<string[] | undefined>();
  const { draft, setDraft, apply, clear, discard } = useFilterDraft(
    value,
    setValue,
  );

  return (
    <StoryWrapper>
      <FilterShell
        label={args.label}
        count={value?.length}
        onApply={apply}
        onClear={clear}
        onDiscard={discard}
      >
        <MultiChoiceFilter
          {...args}
          hideLabel
          value={draft}
          onChange={setDraft}
        />
      </FilterShell>
    </StoryWrapper>
  );
};

MultiChoice.args = {
  label: 'Payment Status',
  options: paymentStatusOptions,
};

const AmountStory = (args: AmountFilterProps) => {
  const [value, setValue] = useState<NumberRange | undefined>();
  const { draft, setDraft, apply, clear, discard } = useFilterDraft(
    value,
    setValue,
  );

  return (
    <StoryWrapper>
      <FilterShell
        label={args.label}
        count={value ? 1 : 0}
        onApply={apply}
        onClear={clear}
        onDiscard={discard}
      >
        <AmountFilter {...args} hideLabel value={draft} onChange={setDraft} />
      </FilterShell>
    </StoryWrapper>
  );
};

export const Quantity = (args: AmountFilterProps) => <AmountStory {...args} />;

Quantity.args = {
  label: 'Quantity',
  kind: 'number',
};

export const Percentage = (args: AmountFilterProps) => (
  <AmountStory {...args} />
);

Percentage.args = {
  label: 'VAT',
  kind: 'percentage',
};

export const Currency = (args: AmountFilterProps) => <AmountStory {...args} />;

Currency.args = {
  label: 'Amount',
  kind: 'currency',
  currency: 'EUR',
};
