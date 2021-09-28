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
import { css } from '@emotion/core';
import { Card, CircleCheckmarkFilled, CircleCrossFilled } from '@sumup/icons';
import { Theme } from '@sumup/design-tokens';

import { spacing } from '../../styles/style-mixins';
import Body from '../Body';
import ListItem from '../ListItem';

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

const Label = ({ item }: { item: Item }) => (
  <Body size="one" noMargin>
    {item.title}
  </Body>
);

const statusStyles = css`
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

const Status = ({ item }: { item: Item }) => (
  <div css={statusStyles}>
    {item.status !== 'Failed' ? (
      <CircleCheckmarkFilled css={successfulIconStyles} />
    ) : (
      <CircleCrossFilled css={failedIconStyles} />
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
    noMargin
    css={item.status === 'Failed' && failedSuffixStyles}
  >
    {item.amount}
  </Body>
);

const baseArgs = {
  title: (
    <Body size="two" noMargin>
      Today
    </Body>
  ),
  suffix: (
    <Body size="two" noMargin>
      €26.20
    </Body>
  ),
  immersive: false,
  css: { width: 500 },
};

export const Base = (args: ListItemGroupProps) => {
  const [selectedId, setSelectedId] = useState<number>(null);

  const children = items.map((item) => (
    <ListItem
      key={item.id}
      variant="navigation"
      icon={Card}
      label={<Label item={item} />}
      status={<Status item={item} />}
      suffix={<Suffix item={item} />}
      selected={item.id === selectedId}
      onClick={() => setSelectedId(item.id)}
    />
  ));

  return <ListItemGroup {...args}>{children}</ListItemGroup>;
};

Base.args = baseArgs;
