import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Table from './Table';
import TableHeader from './components/TableHeader';
import TableCell from './components/TableCell';

const headers = [
  'Name',
  'Created at',
  'Permissions',
  { children: 'Status', align: TableHeader.RIGHT }
];

const rows = [
  [
    'Lorem ipsum dolor',
    { children: '12/01/2017', sortByValue: '0' },
    '-',
    { children: 'Disabled', align: TableCell.RIGHT }
  ],
  [
    'Lorem ipsum dolor sit amet',
    { children: '13/01/2017', sortByValue: '1' },
    'Virtual Terminal',
    { children: 'Enabled', align: TableCell.RIGHT }
  ],
  [
    'Lorem ipsum dolor sit amet, consectetur adipiscing',
    { children: '14/01/2017', sortByValue: '2' },
    '-',
    { children: 'Disabled', align: TableCell.RIGHT }
  ]
];

storiesOf('Table', module)
  .addDecorator(withTests('Table'))
  .add(
    'Default Table',
    withInfo()(() => (
      <div style={{ width: '98vw' }}>
        <Table headers={headers} rows={rows} />
      </div>
    ))
  );
