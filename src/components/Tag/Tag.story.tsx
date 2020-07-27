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
import { boolean, text } from '@storybook/addon-knobs';
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

const BaseTag = (props: Partial<TagProps>) => (
  <Tag
    selected={boolean('Selected', false)}
    prefix={boolean('Prefix', false) ? Check : undefined}
    suffix={boolean('Suffix', false) ? Check : undefined}
    onClick={boolean('Clickable', false) ? action('Tag clicked') : undefined}
    onRemove={boolean('Removable', false) ? action('Tag removed') : undefined}
    {...props}
  >
    Transactions
  </Tag>
);

export const base = () => <BaseTag />;

export const selected = () => <BaseTag selected />;

export const withPrefix = () => <BaseTag prefix={Check} />;

export const withSuffix = () => <BaseTag suffix={Check} />;

export const clickable = () => (
  <BaseTag
    onClick={action('Tag clicked')}
    as="button"
    tracking={{ label: text('Tracking Label', 'trackingId') }}
  />
);

export const removable = () => (
  <BaseTag
    onRemove={action('Tag removed')}
    labelRemoveButton="Remove"
    tracking={{ label: text('Tracking Label', 'trackingId') }}
  />
);
