import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
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
  [
    'Lorem ipsum dolor',
    { children: '12/01/2017', sortByValue: 0 },
    '-',
    { children: 'Disabled', align: TableCell.RIGHT }
  ],
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
  .addDecorator(withTests('Table'))
  .add(
    'Table',
    withInfo()(() => (
      <div style={{ width: '98vw' }}>
        <Table
          headers={headers}
          rows={rows}
          rowHeaders={boolean('Mobile rows', false)}
          noShadow={boolean('Without Shadow', false)}
          onRowClick={action('onRowClick')}
          borderCollapsed={boolean('Border collapsed', false)}
        />
      </div>
    ))
  );
