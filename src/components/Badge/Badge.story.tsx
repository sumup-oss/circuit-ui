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

import React, { Fragment } from 'react';
import { select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import docs from './Badge.docs.mdx';
import { Badge, BadgeProps } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: { page: docs }
  }
};

const BaseBadge = (props: Partial<BadgeProps>) => (
  <Badge
    color={select(
      'Color',
      ['neutral', 'primary', 'success', 'warning', 'danger'],
      'neutral'
    )}
    circle={boolean('Circular', false)}
    {...props}
  />
);

export const base = () => <BaseBadge>Badge</BaseBadge>;

export const colors = () => (
  <Fragment>
    <BaseBadge color="neutral">Neutral</BaseBadge>
    <BaseBadge color="primary">Primary</BaseBadge>
    <BaseBadge color="success">Success</BaseBadge>
    <BaseBadge color="warning">Warning</BaseBadge>
    <BaseBadge color="danger">Danger</BaseBadge>
  </Fragment>
);

export const circular = () => <BaseBadge circle>42</BaseBadge>;

export const clickable = () => (
  <BaseBadge onClick={action('onClick')}>Click me</BaseBadge>
);
