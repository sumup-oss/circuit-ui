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

import { action } from '@storybook/addon-actions';
import { Checkmark } from '@sumup-oss/icons';

import { Tag, type TagProps } from './Tag';

export default {
  title: 'Components/Tag',
  component: Tag,
};

export const Base = ({ onRemove, removeButtonLabel, ...args }: TagProps) => (
  <Tag {...args}>Transactions</Tag>
);

export const Selected = ({
  onRemove,
  removeButtonLabel,
  ...args
}: TagProps) => <Tag {...args}>Transactions</Tag>;

Selected.args = { selected: true };

export const WithPrefix = ({
  onRemove,
  removeButtonLabel,
  ...args
}: TagProps) => <Tag {...args}>Transactions</Tag>;

WithPrefix.args = { prefix: Checkmark };

export const WithSuffix = ({
  onRemove,
  removeButtonLabel,
  ...args
}: TagProps) => <Tag {...args}>Transactions</Tag>;

WithSuffix.args = { suffix: Checkmark };

export const Interactive = ({
  onRemove,
  removeButtonLabel,
  ...args
}: TagProps) => <Tag {...args}>Transactions</Tag>;

Interactive.args = {
  onClick: action('Tag clicked'),
};

export const Removable = (args: TagProps) => <Tag {...args}>Transactions</Tag>;

Removable.args = {
  onRemove: action('Tag removed'),
  removeButtonLabel: 'Remove transactions',
};
