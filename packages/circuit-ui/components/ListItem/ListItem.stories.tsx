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

import { action } from '@storybook/addon-actions';
import { SumUpCard, Confirm } from '@sumup-oss/icons';

import { Stack } from '../../../../.storybook/components/index';
import { Body } from '../Body/index';
import { Badge } from '../Badge/index';

import { ListItem, type ListItemProps } from './ListItem';

interface Item {
  title: string;
  status: string;
  amount: string;
  fee: string;
  timestamp: string;
}

export default {
  title: 'Components/ListItem',
  component: ListItem,
  argTypes: {
    label: { control: 'text' },
    details: { control: 'text' },
    trailingLabel: { control: 'text' },
    trailingDetails: { control: 'text' },
  },
};

const item: Item = {
  title: 'MasterCard •••• 4494',
  status: 'Successful',
  amount: '€24.00',
  fee: '€0.46',
  timestamp: '17:21',
};

const LeadingBadge = (
  <Badge variant="danger" circle>
    3
  </Badge>
);

const Details = (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Confirm
      size="16"
      style={{
        marginRight: 'var(--cui-spacings-bit)',
        color: 'var(--cui-fg-success)',
      }}
      aria-hidden="true"
    />
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

const lineThrough = {
  textDecorationLine: 'line-through',
};

const TrailingLabel = (
  <Body size="m" color="subtle" style={lineThrough}>
    {item.amount}
  </Body>
);

const TrailingDetails = (
  <Body size="s" color="subtle" style={lineThrough}>
    {item.fee} fee
  </Body>
);

const TrailingBadge = <Badge variant="promo">Promo</Badge>;

const baseArgs: ListItemProps = {
  variant: undefined,
  leadingComponent: undefined,
  label: item.title,
  details: undefined,
  trailingLabel: undefined,
  trailingDetails: undefined,
  trailingComponent: undefined,
  selected: undefined,
  disabled: undefined,
  onClick: undefined,
  href: undefined,
};

export const Base = (args: ListItemProps) => (
  <ListItem {...args} leadingComponent={SumUpCard} details={Details} />
);
Base.args = {
  ...baseArgs,
  variant: 'navigation',
  trailingLabel: item.amount,
  trailingDetails: `${item.fee} fee`,
  onClick: action('ListItem clicked'),
} as ListItemProps;

export const Variants = (args: ListItemProps) => (
  <Stack vertical>
    <ListItem {...args} variant="action" />
    <ListItem {...args} variant="navigation" />
  </Stack>
);
Variants.args = baseArgs;

export const WithLeadingContent = (args: ListItemProps) => (
  <Stack vertical>
    <ListItem {...args} leadingComponent={SumUpCard} />
    <ListItem {...args} leadingComponent={LeadingBadge} />
  </Stack>
);
WithLeadingContent.args = baseArgs;

export const WithCustomLabel = (args: ListItemProps) => (
  <Stack vertical>
    <ListItem
      {...args}
      leadingComponent={SumUpCard}
      label={`Default truncated label: ${args.label as string}`}
    />
    <ListItem
      {...args}
      leadingComponent={SumUpCard}
      label={<Body size="m">Custom multiline label: {args.label}</Body>}
    />
  </Stack>
);
WithCustomLabel.args = {
  ...baseArgs,
  variant: 'navigation',
  label: 'Kraftfahrzeug-Haftpflichtversicherung',
} as ListItemProps;

export const WithDetails = (args: ListItemProps) => (
  <Stack vertical>
    <ListItem {...args} details={item.timestamp} />
    <ListItem {...args} details={Details} />
  </Stack>
);
WithDetails.args = baseArgs;

export const WithTrailingContent = (args: ListItemProps) => (
  <Stack vertical>
    <ListItem {...args} trailingLabel={item.amount} />
    <ListItem
      {...args}
      trailingLabel={item.amount}
      trailingDetails={`${item.fee} fee`}
    />
    <ListItem
      {...args}
      trailingLabel={TrailingLabel}
      trailingDetails={TrailingDetails}
    />
    <ListItem {...args} trailingComponent={TrailingBadge} />
  </Stack>
);
WithTrailingContent.args = baseArgs;

export const Interactive = (args: ListItemProps) => (
  <Stack vertical>
    <ListItem {...args} onClick={action('ListItem clicked')} />
    <ListItem
      {...args}
      variant="navigation"
      href="https://sumup.com"
      target="_blank"
    />
  </Stack>
);
Interactive.args = baseArgs;

export const Selected = (args: ListItemProps) => <ListItem {...args} />;
Selected.args = {
  ...baseArgs,
  selected: true,
  onClick: action('ListItem clicked'),
} as ListItemProps;

export const Disabled = (args: ListItemProps) => <ListItem {...args} />;
Disabled.args = {
  ...baseArgs,
  disabled: true,
  onClick: action('ListItem clicked'),
} as ListItemProps;
