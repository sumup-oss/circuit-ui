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
import { screen, userEvent, within } from 'storybook/test';

import { Button } from '../../../../Button/index.js';
import { modes } from '../../../../../../../.storybook/modes.js';
import type { Column } from '../../../types.js';
import type { FilterLabels } from '../Filter/types.js';

import { FilterSheet, type FilterValues } from './index.js';

export default {
  title: 'Components/DataGrid/FilterSheet',
  component: FilterSheet,
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

const labels: FilterLabels = {
  min: 'Min',
  max: 'Max',
  from: 'From',
  to: 'To',
};

const columns: Pick<Column<unknown>, 'id' | 'label' | 'type' | 'filter'>[] = [
  {
    id: 'status',
    label: 'Payment Status',
    filter: true,
    type: {
      name: 'multiSelection',
      options: [
        { label: 'Paid', value: 'paid' },
        { label: 'Unpaid', value: 'unpaid' },
        { label: 'Revoked', value: 'revoked' },
      ],
    },
  },
  {
    id: 'amount',
    label: 'Amount',
    filter: true,
    type: {
      name: 'number',
      formattingOptions: { style: 'currency', currency: 'EUR' },
    },
  },
  { id: 'date', label: 'Date', filter: true, type: { name: 'date' } },
];

const openSheet = async ({
  canvasElement,
}: {
  canvasElement: HTMLCanvasElement;
}) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole('button', { name: 'Filters' }));
  await screen.findByRole('dialog');
};

/**
 * All the filters in one modal, e.g. on mobile. The DataGrid owns the trigger
 * and the "Clear all" action.
 */
export const Base = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<FilterValues>({});

  return (
    <div style={{ minHeight: '400px' }}>
      <Button type="button" onClick={() => setOpen(true)}>
        Filters
      </Button>
      <FilterSheet
        open={open}
        onClose={() => setOpen(false)}
        columns={columns}
        values={values}
        onApply={setValues}
        labels={labels}
        title="Filters"
        clearAllButtonLabel="Clear all"
      />
    </div>
  );
};

Base.play = openSheet;
