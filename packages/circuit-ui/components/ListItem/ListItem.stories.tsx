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

import { css } from '@emotion/react';
import { action } from '@storybook/addon-actions';
import { SumUpCard, Confirm } from '@sumup/icons';
import { Theme } from '@sumup/design-tokens';

import { spacing } from '../../styles/style-mixins.js';
import Body from '../Body/index.js';
import Badge from '../Badge/index.js';

import { ListItem, ListItemProps } from './ListItem.js';

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

const detailsStyles = css`
  display: flex;
  align-items: center;
`;

const statusIconStyles = (theme: Theme) => css`
  margin-right: ${theme.spacings.bit};
  color: var(--cui-fg-success);
`;

const Details = (
  <div css={detailsStyles}>
    <Confirm size="16" css={statusIconStyles} role="presentation" />
    <Body size="two" variant="highlight" css={spacing({ right: 'bit' })}>
      {item.status}
    </Body>
    <Body size="two" variant="subtle">
      &middot; {item.timestamp}
    </Body>
  </div>
);

const lineThrough = css`
  text-decoration-line: line-through;
`;

const TrailingLabel = (
  <Body size="one" variant="subtle" css={lineThrough}>
    {item.amount}
  </Body>
);

const TrailingDetails = (
  <Body size="two" variant="subtle" css={lineThrough}>
    {item.fee} fee
  </Body>
);

const TrailingBadge = <Badge variant="promo">Promo</Badge>;

const baseStyles = css`
  width: 500px;
`;

const stylesWithMargin = (theme: Theme) => css`
  ${baseStyles};
  margin-bottom: ${theme.spacings.tera};
`;

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
  <ListItem {...args} css={baseStyles} />
);
Base.args = baseArgs;

export const NavigationVariant = (args: ListItemProps) => (
  <ListItem {...args} css={baseStyles} />
);
NavigationVariant.args = {
  ...baseArgs,
  variant: 'navigation',
} as ListItemProps;

export const WithLeadingIcon = (args: ListItemProps) => (
  <ListItem {...args} leadingComponent={SumUpCard} css={baseStyles} />
);
WithLeadingIcon.args = {
  ...baseArgs,
} as ListItemProps;

export const WithLeadingComponent = (args: ListItemProps) => (
  <ListItem {...args} leadingComponent={LeadingBadge} css={baseStyles} />
);
WithLeadingComponent.args = {
  ...baseArgs,
} as ListItemProps;

export const WithCustomLabel = (args: ListItemProps) => (
  <>
    <ListItem
      {...args}
      leadingComponent={SumUpCard}
      label={`Default truncated label: ${args.label as string}`}
      css={stylesWithMargin}
    />
    <ListItem
      {...args}
      leadingComponent={SumUpCard}
      label={<Body size="one">Custom multiline label: {args.label}</Body>}
      css={baseStyles}
    />
  </>
);
WithCustomLabel.args = {
  ...baseArgs,
  variant: 'navigation',
  label: 'Kraftfahrzeug-Haftpflichtversicherung',
} as ListItemProps;

export const WithDetails = (args: ListItemProps) => (
  <ListItem {...args} css={baseStyles} />
);
WithDetails.args = {
  ...baseArgs,
  details: item.timestamp,
} as ListItemProps;

export const WithCustomDetails = (args: ListItemProps) => (
  <ListItem {...args} details={Details} css={baseStyles} />
);
WithCustomDetails.args = {
  ...baseArgs,
} as ListItemProps;

export const WithTrailingLabel = (args: ListItemProps) => (
  <ListItem {...args} css={baseStyles} />
);
WithTrailingLabel.args = {
  ...baseArgs,
  trailingLabel: item.amount,
} as ListItemProps;

export const WithTrailingLabelAndDetails = (args: ListItemProps) => (
  <ListItem {...args} css={baseStyles} />
);
WithTrailingLabelAndDetails.args = {
  ...baseArgs,
  trailingLabel: item.amount,
  trailingDetails: `${item.fee} fee`,
} as ListItemProps;

export const WithTrailingLabelAndDetailsComponents = (args: ListItemProps) => (
  <ListItem
    {...args}
    trailingLabel={TrailingLabel}
    trailingDetails={TrailingDetails}
    css={baseStyles}
  />
);
WithTrailingLabelAndDetailsComponents.args = {
  ...baseArgs,
} as ListItemProps;

export const WithTrailingComponent = (args: ListItemProps) => (
  <ListItem {...args} trailingComponent={TrailingBadge} css={baseStyles} />
);
WithTrailingComponent.args = {
  ...baseArgs,
} as ListItemProps;

export const Clickable = (args: ListItemProps) => (
  <ListItem {...args} css={baseStyles} />
);
Clickable.args = {
  ...baseArgs,
  variant: 'navigation',
  onClick: action('ListItem clicked'),
} as ListItemProps;

export const AsLink = (args: ListItemProps) => (
  <ListItem {...args} css={baseStyles} />
);
AsLink.args = {
  ...baseArgs,
  variant: 'navigation',
  href: 'https://sumup.com',
  target: '_blank',
} as ListItemProps;

export const Selected = (args: ListItemProps) => (
  <ListItem {...args} css={baseStyles} />
);
Selected.args = {
  ...baseArgs,
  selected: true,
  onClick: action('ListItem clicked'),
} as ListItemProps;

export const Disabled = (args: ListItemProps) => (
  <ListItem {...args} css={baseStyles} />
);
Disabled.args = {
  ...baseArgs,
  disabled: true,
  onClick: action('ListItem clicked'),
} as ListItemProps;

export const SampleConfiguration = (args: ListItemProps) => (
  <ListItem
    {...args}
    leadingComponent={SumUpCard}
    details={Details}
    css={baseStyles}
  />
);
SampleConfiguration.args = {
  ...baseArgs,
  variant: 'navigation',
  trailingLabel: item.amount,
  trailingDetails: `${item.fee} fee`,
  onClick: action('ListItem clicked'),
} as ListItemProps;
