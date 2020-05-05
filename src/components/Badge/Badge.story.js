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
import { select, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { values } from 'lodash/fp';

import { colorNames } from '../../styles/constants';

import docs from './Badge.docs.mdx';
import Badge from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: { page: docs },
    jest: ['Badge']
  }
};

export const base = () => (
  <Badge color={select('Color', values(colorNames))}>Badge</Badge>
);

export const colors = () => (
  <Fragment>
    <Badge color={Badge.NEUTRAL}>Neutral</Badge>
    <Badge color={Badge.PRIMARY}>Primary</Badge>
    <Badge color={Badge.SUCCESS}>Success</Badge>
    <Badge color={Badge.WARNING}>Warning</Badge>
    <Badge color={Badge.DANGER}>Danger</Badge>
  </Fragment>
);

export const circular = () => (
  <Badge color={Badge.PRIMARY} circle={boolean('Circular', true)}>
    42
  </Badge>
);

export const clickable = () => (
  <Badge color={Badge.PRIMARY} onClick={action('onClick')} as="button">
    Click me
  </Badge>
);
