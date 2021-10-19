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

import React from 'react';
import { css } from '@emotion/react';
import { action } from '@storybook/addon-actions';
import { SumUpCard, Confirm } from '@sumup/icons';
import { Theme } from '@sumup/design-tokens';

import { spacing } from '../../styles/style-mixins';
import Body from '../Body';
import Badge from '../Badge';

import { ListItem, ListItemProps } from './ListItem';
import docs from './ListItem.docs.mdx';

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
  parameters: {
    docs: { page: docs },
  },
  argTypes: {
    label: { control: 'text' },
    details: { control: 'text' },
    suffixLabel: { control: 'text' },
    suffixDetails: { control: 'text' },
  },
};

const item: Item = {
  title: 'MasterCard •••• 4494',
  status: 'Successful',
  amount: '€24.00',
  fee: '€0.46',
  timestamp: '17:21',
};

const PrefixBadge = (
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
  color: ${theme.colors.success};
`;

const Details = (
  <div css={detailsStyles}>
    <Confirm size="16" css={statusIconStyles} role="presentation" />
    <Body
      size="two"
      variant="highlight"
      css={spacing({ right: 'bit' })}
      noMargin
    >
      {item.status}
    </Body>
    <Body size="two" variant="subtle" noMargin>
      &middot; {item.timestamp}
    </Body>
  </div>
);

const failedSuffixStyles = css`
  text-decoration-line: line-through;
`;

const SuffixLabel = (
  <Body size="one" variant="subtle" noMargin css={failedSuffixStyles}>
    {item.amount}
  </Body>
);

const SuffixDetails = (
  <Body size="two" variant="subtle" noMargin css={failedSuffixStyles}>
    {item.fee} fee
  </Body>
);

const SuffixBadge = <Badge variant="promo">Promo</Badge>;

const baseStyles = css`
  width: 500px;
`;

const stylesWithMargin = (theme: Theme) => css`
  ${baseStyles};
  margin-bottom: ${theme.spacings.tera};
`;

const baseArgs: ListItemProps = {
  variant: undefined,
  prefix: undefined,
  label: item.title,
  details: undefined,
  suffixLabel: undefined,
  suffixDetails: undefined,
  suffix: undefined,
  selected: undefined,
  disabled: undefined,
  onClick: null,
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

export const WithIcon = (args: ListItemProps) => (
  <ListItem {...args} prefix={SumUpCard} css={baseStyles} />
);
WithIcon.args = {
  ...baseArgs,
} as ListItemProps;

export const WithCustomPrefix = (args: ListItemProps) => (
  <ListItem {...args} prefix={PrefixBadge} css={baseStyles} />
);
WithCustomPrefix.args = {
  ...baseArgs,
} as ListItemProps;

export const WithCustomLabel = (args: ListItemProps) => (
  <>
    <ListItem
      {...args}
      prefix={SumUpCard}
      label={`Default truncated label: ${args.label as string}`}
      css={stylesWithMargin}
    />
    <ListItem
      {...args}
      prefix={SumUpCard}
      label={
        <Body size="one" noMargin>
          Custom multiline label: {args.label}
        </Body>
      }
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

export const WithSuffixLabel = (args: ListItemProps) => (
  <ListItem {...args} css={baseStyles} />
);
WithSuffixLabel.args = {
  ...baseArgs,
  suffixLabel: item.amount,
} as ListItemProps;

export const WithSuffixLabelAndDetails = (args: ListItemProps) => (
  <ListItem {...args} css={baseStyles} />
);
WithSuffixLabelAndDetails.args = {
  ...baseArgs,
  suffixLabel: item.amount,
  suffixDetails: `${item.fee} fee`,
} as ListItemProps;

export const WithCustomSuffixLabelAndDetails = (args: ListItemProps) => (
  <ListItem
    {...args}
    suffixLabel={SuffixLabel}
    suffixDetails={SuffixDetails}
    css={baseStyles}
  />
);
WithCustomSuffixLabelAndDetails.args = {
  ...baseArgs,
} as ListItemProps;

export const WithCustomSuffix = (args: ListItemProps) => (
  <ListItem {...args} suffix={SuffixBadge} css={baseStyles} />
);
WithCustomSuffix.args = {
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
  <ListItem {...args} prefix={SumUpCard} details={Details} css={baseStyles} />
);
SampleConfiguration.args = {
  ...baseArgs,
  variant: 'navigation',
  suffixLabel: item.amount,
  suffixDetails: `${item.fee} fee`,
  onClick: action('ListItem clicked'),
} as ListItemProps;
