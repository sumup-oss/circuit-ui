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

import { useState } from 'react';
import type { StoryObj } from '@storybook/react-vite';

import { Input } from '../../../Input/index.js';
import { modes } from '../../../../../../.storybook/modes.js';

import { FilterShell } from '../FilterShell/index.js';
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

type Story = StoryObj<typeof FilterShell>;

export const Base: Story = {
  args: {
    label: 'Payment Status',
    children: <p>Filter controls go here.</p>,
  },
  render: (args) => (
    <div style={{ minHeight: '300px' }}>
      <FilterShell {...args} />
    </div>
  ),
};

export const WithCount: Story = {
  ...Base,
  args: { ...Base.args, count: 3 },
};

/**
 * Filters that commit on request keep a draft. Closing the popover without
 * clicking Apply discards it.
 */
export const WithApply: Story = {
  args: { label: 'Amount' },
  render: (args) => {
    const [value, setValue] = useState<string | undefined>();
    const { draft, setDraft, apply, clear, discard } = useFilterDraft(
      value,
      setValue,
    );

    return (
      <div style={{ minHeight: '300px' }}>
        <FilterShell
          {...args}
          count={value ? 1 : 0}
          onApply={apply}
          onClear={clear}
          onDiscard={discard}
        >
          <Input
            label="Min"
            value={draft ?? ''}
            onChange={(event) => setDraft(event.target.value || undefined)}
          />
        </FilterShell>
        <p>Applied value: {value ?? 'none'}</p>
      </div>
    );
  },
};
