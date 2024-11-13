/**
 * Copyright 2021, SumUp Ltd.
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
import { SumUpCard, Confirm, Alert } from '@sumup-oss/icons';

import { Stack } from '../../../../.storybook/components/index.js';
import { Body } from '../Body/index.js';

import { ListItemGroup, type ListItemGroupProps } from './ListItemGroup.js';

interface Item {
  id: number;
  title: string;
  status: string;
  amount: string;
  timestamp: string;
}

export default {
  title: 'Components/ListItem/ListItemGroup',
  component: ListItemGroup,
  tags: ['status:stable'],
  argTypes: {
    label: { control: 'text' },
    details: { control: 'text' },
  },
};

const items: Item[] = [
  {
    id: 3,
    title: 'MasterCard •••• 4494',
    status: 'Successful',
    amount: '€24.00',
    timestamp: '17:23',
  },
  {
    id: 2,
    title: 'MasterCard •••• 4494',
    status: 'Failed',
    amount: '€24.00',
    timestamp: '17:21',
  },
  {
    id: 1,
    title: 'Visa •••• 9441',
    status: 'Successful',
    amount: '€2.20',
    timestamp: '08:14',
  },
];

const Details = ({ item }: { item: Item }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {item.status !== 'Failed' ? (
      <Confirm
        size="16"
        style={{
          marginRight: 'var(--cui-spacings-bit)',
          color: 'var(--cui-fg-success)',
        }}
        aria-hidden="true"
      />
    ) : (
      <Alert
        size="16"
        style={{
          marginRight: 'var(--cui-spacings-bit)',
          color: 'var(--cui-fg-danger)',
        }}
        aria-hidden="true"
      />
    )}
    <Body
      size="s"
      weight="bold"
      style={{ marginRight: 'var(--cui-spacings-bit)' }}
    >
      {item.status}
    </Body>
    <Body size="s" color="subtle">
      &middot; {item.timestamp}
    </Body>
  </div>
);

const TrailingLabel = ({ item }: { item: Item }) => (
  <Body
    size="m"
    color={item.status === 'Failed' ? 'subtle' : undefined}
    weight={item.status !== 'Failed' ? 'bold' : undefined}
    style={
      item.status === 'Failed' ? { textDecorationLine: 'line-through' } : {}
    }
  >
    {item.amount}
  </Body>
);

const baseArgs: ListItemGroupProps = {
  variant: undefined,
  items: items.map((item) => ({
    key: item.id,
    label: item.title,
  })),
  label: 'Today',
  hideLabel: undefined,
  details: undefined,
};
export const Base = (args: ListItemGroupProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <ListItemGroup
      {...args}
      items={items.map((item) => ({
        key: item.id,
        variant: 'navigation',
        leadingComponent: SumUpCard,
        label: item.title,
        details: <Details item={item} />,
        trailingLabel: <TrailingLabel item={item} />,
        selected: item.id === selectedId,
        onClick: () => setSelectedId(item.id),
      }))}
    />
  );
};
Base.args = {
  ...baseArgs,
  items: [],
  details: '€26.20',
} as ListItemGroupProps;

export const WithHiddenLabel = (args: ListItemGroupProps) => (
  <ListItemGroup {...args} />
);
WithHiddenLabel.args = {
  ...baseArgs,
  hideLabel: true,
} as ListItemGroupProps;

export const WithLabelAndDetails = (args: ListItemGroupProps) => (
  <ListItemGroup {...args} />
);
WithLabelAndDetails.args = {
  ...baseArgs,
  details: '€26.20',
} as ListItemGroupProps;

export const Variants = (args: ListItemGroupProps) => (
  <Stack vertical>
    <ListItemGroup {...args} variant="inset" />
    <ListItemGroup {...args} variant="plain" />
  </Stack>
);
Variants.args = {
  ...baseArgs,
  details: '€26.20',
} as ListItemGroupProps;
