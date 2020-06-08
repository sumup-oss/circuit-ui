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
import { boolean, text } from '@storybook/addon-knobs/react';
import { Check } from '@sumup/icons';

import docs from './Tag.docs.mdx';
import Tag from './Tag';

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
    prefix={boolean('Prefix', false) ? <Check /> : null}
    suffix={boolean('Suffix', false) ? <Check /> : null}
    onClick={boolean('Clickable', false) ? action('Tag clicked') : null}
  >
    Transactions
  </Tag>
);

export const selected = () => <Tag selected>Transactions</Tag>;

export const withPrefix = () => <Tag prefix={Check}>Transactions</Tag>;

export const withSuffix = () => <Tag suffix={Check}>Transactions</Tag>;

export const removable = () => (
  <Tag
    onRemove={action('Tag removed')}
    labelRemoveButton="Remove"
    tracking={{ label: text('Tracking Label', 'trackingId') }}
  >
    Transactions
  </Tag>
);

export const clickable = () => (
  <Tag
    onClick={action('Tag clicked')}
    as="button"
    tracking={{
      label: text('Tracking Label', 'trackingId')
    }}
  >
    Transactions
  </Tag>
);
