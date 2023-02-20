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

import { action } from '@storybook/addon-actions';

import Badge from '../Badge';
import { isString } from '../../util/type-check';

import { TableProps } from './Table';
import { Direction } from './types';

import Table from '.';

export default {
  title: 'Components/Table',
  component: Table,
};

const sortLabel = ({ direction }: { direction?: Direction }) => {
  const order = direction === 'ascending' ? 'descending' : 'ascending';
  return `Sort in ${order} order`;
};

export const Base = ({ onSortBy, ...args }: TableProps): JSX.Element => (
  <Table {...args} />
);

const baseProps: TableProps = {
  headers: [
    { children: 'Name', sortable: true, sortLabel },
    { children: 'Created at', sortable: true, sortLabel },
    'Permissions',
    { children: 'Status', align: 'right' },
  ],
  rows: [
    {
      cells: [
        'Lorem ipsum',
        { children: '12/01/2017', sortByValue: 0 },
        '-',
        { children: 'Disabled', align: 'right' },
      ],
    },
    [
      'Consectetur adipiscing',
      { children: '13/01/2017', sortByValue: 1 },
      'Virtual Terminal',
      { children: 'Enabled', align: 'right' },
    ],
    [
      'Dolor sit amet',
      { children: '14/01/2017', sortByValue: 2 },
      '-',
      { children: 'Disabled', align: 'right' },
    ],
  ],
  rowHeaders: true,
  onRowClick: action('onRowClick'),
};

Base.args = baseProps;

export const WithComponentRows = ({
  onSortBy,
  ...args
}: TableProps): JSX.Element => <Table {...args} />;

WithComponentRows.args = {
  headers: ['Name', 'Type'],
  rows: [
    ['Apple', { children: <Badge variant="alert">Fruit</Badge> }],
    ['Broccoli', { children: <Badge variant="confirm">Vegetable</Badge> }],
    ['Chickpeas', { children: <Badge variant="notify">Legume</Badge> }],
  ],
};

export const Sortable = ({ onSortBy, ...args }: TableProps): JSX.Element => (
  <Table {...args} />
);

Sortable.args = {
  headers: [
    { children: 'Name', sortable: true, sortLabel },
    { children: 'Date added', sortable: true, sortLabel },
  ],
  rows: [
    [
      { children: 'Apple' },
      {
        children: '12/12/18',
        sortByValue: new Date('12/12/18'),
      },
    ],
    [
      { children: 'Broccoli' },
      {
        children: '12/13/18',
        sortByValue: new Date('12/13/18'),
      },
    ],
    [
      { children: 'Chickpeas' },
      {
        children: '12/14/18',
        sortByValue: new Date('12/14/18'),
      },
    ],
  ],
};

export const CustomSort = (args: TableProps): JSX.Element => {
  const onSortBy: TableProps['onSortBy'] = (_i, rows, direction) => {
    if (direction === 'ascending') {
      return rows.sort(
        (a, b) => isString(a[0]) && isString(b[0]) && a[0].localeCompare(b[0]),
      );
    }
    return rows.sort(
      (a, b) => isString(a[0]) && isString(b[0]) && b[0].localeCompare(a[0]),
    );
  };
  return <Table {...args} onSortBy={onSortBy} />;
};

CustomSort.args = {
  headers: [{ children: 'Country', sortable: true, sortLabel }],
  rows: [
    ['Schweiz'],
    ['Österreich'],
    ['Deutschland'],
    ['Liechtenstein'],
    ['Italien'],
  ],
};
