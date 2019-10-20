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

import Tag from './Tag';

const Icon = () => (
  <svg
    fill="#000000"
    height="16"
    viewBox="0 0 24 24"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </svg>
);

export default {
  title: 'Components|Tag',

  parameters: {
    component: Tag,
    jest: ['Tag']
  }
};

export const tag = () => (
  <Tag
    selected={boolean('Selected', false)}
    onRemove={boolean('Removable', false) ? action('Tag removed') : null}
    icon={boolean('With Icon', false) ? <Icon /> : null}
    onClick={boolean('Clickable', false) ? action('Tag clicked') : null}
  >
    Transactions
  </Tag>
);

tag.story = {
  name: 'Tag'
};
