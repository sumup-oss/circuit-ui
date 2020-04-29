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
import { boolean } from '@storybook/addon-knobs/react';

import docs from './Tag.docs.mdx';
import Tag from './Tag';
import { ReactComponent as Icon } from './icon-tick.svg';

export default {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    docs: { page: docs },
    jest: ['Tag']
  }
};

export const base = () => (
  <Tag
    selected={boolean('Selected', false)}
    onRemove={boolean('Removable', false) ? action('Tag removed') : null}
    prefix={boolean('Prefix', false) ? <Icon /> : null}
    suffix={boolean('Suffix', false) ? <Icon /> : null}
    onClick={boolean('Clickable', false) ? action('Tag clicked') : null}
  >
    Transactions
  </Tag>
);

export const selected = () => <Tag selected>Transactions</Tag>;

export const withPrefix = () => <Tag prefix={Icon}>Transactions</Tag>;

export const withSuffix = () => <Tag suffix={Icon}>Transactions</Tag>;

export const removable = () => (
  <Tag onRemove={action('Tag removed')} labelRemoveButton="Remove">
    Transactions
  </Tag>
);

export const clickable = () => (
  <Tag onClick={action('Tag clicked')}>Transactions</Tag>
);
