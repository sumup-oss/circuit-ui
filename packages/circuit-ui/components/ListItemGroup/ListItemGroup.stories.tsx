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

import React, { useState } from 'react';
import { css } from '@emotion/react';
import { SumUpCard, Confirm, Alert } from '@sumup/icons';
import { Theme } from '@sumup/design-tokens';

import { spacing } from '../../styles/style-mixins';
import Body from '../Body';

import { ListItemGroup, ListItemGroupProps } from './ListItemGroup';
import docs from './ListItemGroup.docs.mdx';

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
  parameters: {
    docs: { page: docs },
  },
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

const detailsStyles = css`
  display: flex;
  align-items: center;
`;

const successfulIconStyles = (theme: Theme) => css`
  margin-right: ${theme.spacings.bit};
  color: ${theme.colors.success};
`;

const failedIconStyles = (theme: Theme) => css`
  margin-right: ${theme.spacings.bit};
  color: ${theme.colors.danger};
`;

const Details = ({ item }: { item: Item }) => (
  <div css={detailsStyles}>
    {item.status !== 'Failed' ? (
      <Confirm size="16" css={successfulIconStyles} role="presentation" />
    ) : (
      <Alert size="16" css={failedIconStyles} role="presentation" />
    )}
    <Body
      size="two"
      variant="highlight"
      noMargin
      css={spacing({ right: 'bit' })}
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

const Suffix = ({ item }: { item: Item }) => (
  <Body
    size="one"
    variant={item.status === 'Failed' ? 'subtle' : 'highlight'}
    css={item.status === 'Failed' && failedSuffixStyles}
    noMargin
  >
    {item.amount}
  </Body>
);

const baseStyles = css`
  width: 500px;
`;

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

export const Base = (args: ListItemGroupProps) => (
  <ListItemGroup {...args} css={baseStyles} />
);
Base.args = baseArgs;

export const WithHiddenLabel = (args: ListItemGroupProps) => (
  <ListItemGroup {...args} css={baseStyles} />
);
WithHiddenLabel.args = {
  ...baseArgs,
  hideLabel: true,
} as ListItemGroupProps;

export const WithLabelAndDetails = (args: ListItemGroupProps) => (
  <ListItemGroup {...args} css={baseStyles} />
);
WithLabelAndDetails.args = {
  ...baseArgs,
  details: '€26.20',
} as ListItemGroupProps;

export const PlainVariant = (args: ListItemGroupProps) => (
  <ListItemGroup {...args} css={baseStyles} />
);
PlainVariant.args = {
  ...baseArgs,
  variant: 'plain',
  details: '€26.20',
} as ListItemGroupProps;

export const SampleConfiguration = (args: ListItemGroupProps) => {
  const [selectedId, setSelectedId] = useState<number>(null);

  return (
    <ListItemGroup
      {...args}
      items={items.map((item) => ({
        key: item.id,
        variant: 'navigation',
        prefix: SumUpCard,
        label: item.title,
        details: <Details item={item} />,
        suffixLabel: <Suffix item={item} />,
        selected: item.id === selectedId,
        onClick: () => setSelectedId(item.id),
      }))}
      css={baseStyles}
    />
  );
};
SampleConfiguration.args = {
  ...baseArgs,
  items: [],
  details: '€26.20',
} as ListItemGroupProps;
