import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Table from './Table';
import TableHeader from './components/TableHeader';
import TableCell from './components/TableCell';

const headers = [
  { children: 'Name', fixed: true },
  'Created at',
  'Permissions',
  { children: 'Status', align: TableHeader.RIGHT }
];

const rows = [
  [
    'Lorem ipsum dolor sit amet',
    '12/04/2017',
    '-',
    { children: 'Disabled', align: TableCell.RIGHT }
  ],
  [
    'Lorem ipsum dolor sit amet, consectetur',
    '12/04/2017',
    'Virtual Terminal',
    { children: 'Enabled', align: TableCell.RIGHT }
  ],
  [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    '12/04/2017',
    '-',
    { children: 'Disabled', align: TableCell.RIGHT }
  ]
];

storiesOf('Table', module)
  .add(
    'Default Table',
    withInfo()(() => (
      <div style={{ width: '98vw' }}>
        <Table headers={headers} rows={rows} />
      </div>
    ))
  );
