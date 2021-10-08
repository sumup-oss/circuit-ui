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
import { css } from '@emotion/core';
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
};

const item: Item = {
  title: 'MasterCard •••• 4494',
  status: 'Successful',
  amount: '€24.00',
  fee: '€0.46',
  timestamp: '17:21',
};

const Label = (
  <Body size="one" noMargin>
    {item.title}
  </Body>
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
    <Body size="two" noMargin>
      &middot; {item.timestamp}
    </Body>
  </div>
);

const SuffixLabel = (
  <Body size="one" variant="highlight" noMargin>
    {item.amount}
  </Body>
);

const SuffixDetails = (
  <Body size="two" variant="subtle" noMargin>
    {item.fee} fee
  </Body>
);

const SuffixBadge = <Badge variant="promo">Promo</Badge>;

const baseStyles = css`
  width: 500px;
`;

const baseArgs: ListItemProps = {
  variant: 'action',
  prefix: undefined,
  label: undefined,
  details: undefined,
  suffixLabel: undefined,
  suffixDetails: undefined,
  suffix: undefined,
  selected: false,
  disabled: false,
  onClick: null,
  href: undefined,
};

export const Base = (args: ListItemProps) => (
  <ListItem {...args} label={Label} css={baseStyles} />
);
Base.args = baseArgs;

export const NavigationVariant = (args: ListItemProps) => (
  <ListItem {...args} label={Label} css={baseStyles} />
);
NavigationVariant.args = {
  ...baseArgs,
  variant: 'navigation',
} as ListItemProps;

export const WithIcon = (args: ListItemProps) => (
  <ListItem {...args} label={Label} prefix={SumUpCard} css={baseStyles} />
);
WithIcon.args = {
  ...baseArgs,
} as ListItemProps;

export const WithDetails = (args: ListItemProps) => (
  <ListItem {...args} label={Label} details={Details} css={baseStyles} />
);
WithDetails.args = {
  ...baseArgs,
} as ListItemProps;

export const WithLabelSuffix = (args: ListItemProps) => (
  <ListItem
    {...args}
    label={Label}
    suffixLabel={SuffixLabel}
    css={baseStyles}
  />
);
WithLabelSuffix.args = {
  ...baseArgs,
} as ListItemProps;

export const WithLabelAndDetailsSuffix = (args: ListItemProps) => (
  <ListItem
    {...args}
    label={Label}
    suffixLabel={SuffixLabel}
    suffixDetails={SuffixDetails}
    css={baseStyles}
  />
);
WithLabelAndDetailsSuffix.args = {
  ...baseArgs,
} as ListItemProps;

export const WithCustomSuffix = (args: ListItemProps) => (
  <ListItem {...args} label={Label} suffix={SuffixBadge} css={baseStyles} />
);
WithCustomSuffix.args = {
  ...baseArgs,
} as ListItemProps;

export const Selected = (args: ListItemProps) => (
  <ListItem {...args} label={Label} css={baseStyles} />
);
Selected.args = {
  ...baseArgs,
  selected: true,
} as ListItemProps;

export const Disabled = (args: ListItemProps) => (
  <ListItem {...args} label={Label} css={baseStyles} />
);
Disabled.args = {
  ...baseArgs,
  disabled: true,
} as ListItemProps;

export const Clickable = (args: ListItemProps) => (
  <ListItem {...args} label={Label} css={baseStyles} />
);
Clickable.args = {
  ...baseArgs,
  variant: 'navigation',
  onClick: action('ListItem clicked'),
} as ListItemProps;

export const AsLink = (args: ListItemProps) => (
  <ListItem {...args} label={Label} css={baseStyles} />
);
AsLink.args = {
  ...baseArgs,
  variant: 'navigation',
  href: 'https://sumup.com',
  target: '_blank',
} as ListItemProps;

export const SampleConfiguration = (args: ListItemProps) => (
  <ListItem
    {...args}
    label={Label}
    prefix={SumUpCard}
    details={Details}
    suffixLabel={SuffixLabel}
    suffixDetails={SuffixDetails}
    css={baseStyles}
  />
);
SampleConfiguration.args = {
  ...baseArgs,
  variant: 'navigation',
  onClick: action('ListItem clicked'),
} as ListItemProps;
