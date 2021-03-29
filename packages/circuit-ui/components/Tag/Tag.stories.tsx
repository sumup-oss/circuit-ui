/**
 * Copyright 2019, SumUp Ltd.
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
import { action } from '@storybook/addon-actions';
import { Check } from '@sumup/icons';

import docs from './Tag.docs.mdx';
import { Tag, TagProps } from './Tag';

export default {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    docs: { page: docs },
  },
};
export const Base = ({ onRemove, ...args }: TagProps) => (
  <Tag {...args}>Transactions</Tag>
);

export const Selected = ({ onRemove, ...args }: TagProps) => (
  <Tag {...args}>Transactions</Tag>
);

Selected.args = { selected: true };

export const WithPrefix = ({ onRemove, ...args }: TagProps) => (
  <Tag {...args}>Transactions</Tag>
);

WithPrefix.args = { prefix: Check };

export const WithSuffix = ({ onRemove, ...args }: TagProps) => (
  <Tag {...args}>Transactions</Tag>
);

WithSuffix.args = { suffix: Check };

export const Clickable = ({ onRemove, ...args }: TagProps) => (
  <Tag {...args}>Transactions</Tag>
);

Clickable.args = {
  onClick: action('Tag clicked'),
  tracking: { label: 'trackingId' },
};

export const Removable = (args: TagProps) => <Tag {...args}>Transactions</Tag>;

Removable.args = {
  onRemove: action('Tag removed'),
  labelRemoveButton: 'Remove',
  tracking: { label: 'trackingId' },
};
