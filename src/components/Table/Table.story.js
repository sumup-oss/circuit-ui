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
import { boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import Badge from '../Badge';

import docs from './Table.docs.mdx';
import Table from './Table';

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    docs: { page: docs }
  }
};

export const base = () => (
  <Table
    headers={[
      { children: 'Name', sortable: true },
      { children: 'Created at', sortable: true },
      'Permissions',
      { children: 'Status', align: 'right' }
    ]}
    rows={[
      {
        cells: [
          'Lorem ipsum dolor',
          {
            children: '12/01/2017',
            sortByValue: 0,
            'data-selector': 'item-1-cell-date-12/01/2017'
          },
          '-',
          { children: 'Disabled', align: 'right' }
        ],
        'data-selector': 'item-1'
      },
      [
        'Ipsum dolor sit amet',
        { children: '13/01/2017', sortByValue: 1 },
        'Virtual Terminal',
        { children: 'Enabled', align: 'right' }
      ],
      [
        'Dolor sit amet, consectetur adipiscing',
        { children: '14/01/2017', sortByValue: 2 },
        '-',
        { children: 'Disabled', align: 'right' }
      ]
    ]}
    rowHeaders={boolean('Mobile rows', true)}
    condensed={boolean('Condensed', false)}
    scrollable={boolean('Scrollable', false)}
    noShadow={boolean('Without Shadow', false)}
    onRowClick={action('onRowClick')}
    borderCollapsed={boolean('Border collapsed', false)}
  />
);

export const withComponentRows = () => (
  <Table
    headers={['Name', 'Type']}
    rows={[
      ['Apple', { children: <Badge color={'danger'}>Fruit</Badge> }],
      [
        'Broccoli',
        {
          children: <Badge color={'success'}>Vegetable</Badge>
        }
      ],
      ['Chickpeas', { children: <Badge color={'warning'}>Legume</Badge> }]
    ]}
  />
);

export const sortable = () => (
  <Table
    headers={[
      { children: 'Name', sortable: true },
      { children: 'Date added', sortable: true }
    ]}
    rows={[
      [
        { children: 'Apple' },
        {
          children: '12/12/18',
          sortByValue: new Date('12/12/18')
        }
      ],
      [
        { children: 'Broccoli' },
        {
          children: '12/13/18',
          sortByValue: new Date('12/13/18')
        }
      ],
      [
        { children: 'Chickpeas' },
        {
          children: '12/14/18',
          sortByValue: new Date('12/14/18')
        }
      ]
    ]}
  />
);

export const customSort = () => (
  <Table
    headers={[{ children: 'Country', sortable: true }]}
    onSortBy={(i, direction, rows) =>
      direction === 'ascending'
        ? rows.sort((a, b) => a[0].localeCompare(b[0]))
        : rows.sort((a, b) => b[0].localeCompare(a[0]))
    }
    rows={[
      ['Schweiz'],
      ['Österreich'],
      ['Deutschland'],
      ['Liechtenstein'],
      ['Italien']
    ]}
  />
);
