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
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import Table from './Table';
import TableHeader from './components/TableHeader';
import TableCell from './components/TableCell';

const headers = [
  { children: 'Name', sortable: true },
  { children: 'Created at', sortable: true },
  'Permissions',
  { children: 'Status', align: TableHeader.RIGHT }
];

const rows = [
  {
    cells: [
      'Lorem ipsum dolor',
      {
        children: '12/01/2017',
        sortByValue: 0,
        'data-selector': 'item-1-cell-date-12/01/2017'
      },
      '-',
      { children: 'Disabled', align: TableCell.RIGHT }
    ],
    'data-selector': 'item-1'
  },
  [
    'Ipsum dolor sit amet',
    { children: '13/01/2017', sortByValue: 1 },
    'Virtual Terminal',
    { children: 'Enabled', align: TableCell.RIGHT }
  ],
  [
    'Dolor sit amet, consectetur adipiscing',
    { children: '14/01/2017', sortByValue: 2 },
    '-',
    { children: 'Disabled', align: TableCell.RIGHT }
  ]
];

storiesOf(`${GROUPS.COMPONENTS}|Table`, module)
  .addParameters({ jest: ['Table'] })
  .add('Table', () => (
    <div style={{ width: '98vw', maxHeight: 150 }}>
      <Table
        headers={headers}
        rows={rows}
        rowHeaders={boolean('Mobile rows', true)}
        condensed={boolean('Condensed', false)}
        scrollable={boolean('Scrollable', false)}
        noShadow={boolean('Without Shadow', false)}
        onRowClick={action('onRowClick')}
        borderCollapsed={boolean('Border collapsed', false)}
      />
    </div>
  ));
