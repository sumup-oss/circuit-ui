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
import { Card, CircleCheckmarkFilled } from '@sumup/icons';
import { Theme } from '@sumup/design-tokens';

import { spacing } from '../../styles/style-mixins';
import Body from '../Body';

import { ListItem, ListItemProps } from './ListItem';
import docs from './ListItem.docs.mdx';

interface Item {
  title: string;
  status: string;
  amount: string;
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
  timestamp: '17:21',
};

const Label = (
  <Body size="one" noMargin>
    {item.title}
  </Body>
);

const statusStyles = css`
  display: flex;
  align-items: center;
`;

const statusIconStyles = (theme: Theme) => css`
  margin-right: ${theme.spacings.bit};
  color: ${theme.colors.success};
`;

const Status = (
  <div css={statusStyles}>
    <CircleCheckmarkFilled css={statusIconStyles} />
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

const Suffix = (
  <Body size="one" variant="highlight" noMargin>
    {item.amount}
  </Body>
);

const baseArgs = {
  icon: Card,
  label: Label,
  status: Status,
  suffix: Suffix,
  selected: false,
  disabled: false,
  highlighted: false,
  onClick: null,
  css: { width: 500 },
};

export const Base = (args: ListItemProps) => <ListItem {...args} />;

Base.args = baseArgs;
