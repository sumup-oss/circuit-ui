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
import Headline from '../Headline';
import Body from '../Body';

import { ListItemGroup, ListItemGroupProps } from './ListItemGroup';

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

const GroupLabel = (
  <Headline as="h4" size="four" noMargin>
    Today
  </Headline>
);

const GroupDetails = (
  <Body size="two" noMargin>
    €26.20
  </Body>
);

const Label = ({ item }: { item: Item }) => (
  <Body size="one" noMargin>
    {item.title}
  </Body>
);

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

const failedSuffixStyles = (theme: Theme) => css`
  color: ${theme.colors.n700};
  text-decoration-line: line-through;
`;

const Suffix = ({ item }: { item: Item }) => (
  <Body
    size="one"
    variant="highlight"
    noMargin
    css={item.status === 'Failed' && failedSuffixStyles}
  >
    {item.amount}
  </Body>
);

const baseStyles = css`
  width: 500px;
`;

const baseArgs: ListItemGroupProps = {
  variant: undefined,
  items: [],
  label: undefined,
  details: undefined,
};

export const Base = (args: ListItemGroupProps) => (
  <ListItemGroup
    {...args}
    items={items.map((item) => ({
      key: item.id,
      label: <Label item={item} />,
    }))}
    label={GroupLabel}
    hideLabel
    css={baseStyles}
  />
);
Base.args = baseArgs;

export const WithLabel = (args: ListItemGroupProps) => (
  <ListItemGroup
    {...args}
    items={items.map((item) => ({
      key: item.id,
      label: <Label item={item} />,
    }))}
    label={GroupLabel}
    css={baseStyles}
  />
);
WithLabel.args = {
  ...baseArgs,
} as ListItemGroupProps;

export const WithLabelAndDetails = (args: ListItemGroupProps) => (
  <ListItemGroup
    {...args}
    items={items.map((item) => ({
      key: item.id,
      label: <Label item={item} />,
    }))}
    label={GroupLabel}
    details={GroupDetails}
    css={baseStyles}
  />
);
WithLabelAndDetails.args = {
  ...baseArgs,
} as ListItemGroupProps;

export const WithDetailsAndHiddenLabel = (args: ListItemGroupProps) => (
  <ListItemGroup
    {...args}
    items={items.map((item) => ({
      key: item.id,
      label: <Label item={item} />,
    }))}
    label={GroupLabel}
    hideLabel
    details={GroupDetails}
    css={baseStyles}
  />
);
WithDetailsAndHiddenLabel.args = {
  ...baseArgs,
} as ListItemGroupProps;

export const PlainVariant = (args: ListItemGroupProps) => (
  <ListItemGroup
    {...args}
    items={items.map((item) => ({
      key: item.id,
      label: <Label item={item} />,
    }))}
    label={GroupLabel}
    details={GroupDetails}
    css={baseStyles}
  />
);
PlainVariant.args = {
  ...baseArgs,
  variant: 'plain',
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
        label: <Label item={item} />,
        details: <Details item={item} />,
        suffixLabel: <Suffix item={item} />,
        selected: item.id === selectedId,
        onClick: () => setSelectedId(item.id),
      }))}
      label={GroupLabel}
      details={GroupDetails}
      css={baseStyles}
    />
  );
};
SampleConfiguration.args = {
  ...baseArgs,
} as ListItemGroupProps;
