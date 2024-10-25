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

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, axe, userEvent, screen } from '../../util/test-utils';
import { Badge } from '../Badge/index';

import { Table } from './Table';
import type { HeaderCell, Direction } from './types';

const sortLabel = ({ direction }: { direction?: Direction }) => {
  const order = direction === 'ascending' ? 'descending' : 'ascending';
  return `Sort in ${order} order`;
};
const headers: HeaderCell[] = [
  {
    children: 'Letters',
    sortable: true,
    sortLabel,
  },
  {
    children: 'Numbers',
    sortable: true,
    sortLabel,
  },
  'Words',
];
const rows = [
  ['b', '3', 'Foo'],
  ['a', '1', 'Bar'],
  ['c', '2', 'Baz'],
];
const rowLength = rows[0].length;

describe('Table', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Style tests', () => {
    it('should render with component cells', () => {
      render(
        <Table
          headers={['Name', 'Type']}
          rows={[
            ['Apple', 'Fruit'],
            ['Broccoli', 'Vegetable'],
            [
              'Chickpeas',
              { children: <Badge color={'warning'}>Unknown</Badge> },
            ],
          ]}
        />,
      );
      expect(screen.getByText('Unknown')).toBeVisible();
    });

    it('should render "null" or "undefined" cells', () => {
      render(
        <Table
          headers={['Name', 'Type']}
          rows={[
            [null, 'Fruit'],
            ['Broccoli', undefined],
          ]}
        />,
      );
      expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    });
  });

  it('should call the row click callback', async () => {
    const onRowClickMock = vi.fn();
    const index = 0;
    render(<Table onRowClick={onRowClickMock} headers={headers} rows={rows} />);

    const rowElements = screen.getAllByRole('row');

    // rowElements[0] is the hidden first row
    await userEvent.click(rowElements[1]);

    expect(onRowClickMock).toHaveBeenCalledTimes(1);
    expect(onRowClickMock).toHaveBeenCalledWith(index);
  });

  describe('sorting', () => {
    it('should sort a column in ascending order', async () => {
      render(<Table rows={rows} headers={headers} rowHeaders={false} />);

      const letterHeaderEl = screen.getAllByRole('columnheader')[0];
      const cellEls = screen.getAllByRole('cell');

      await userEvent.click(letterHeaderEl);

      const sortedRow = ['a', 'b', 'c'];

      rows.forEach((_row, index) => {
        const cellIndex = rowLength * index;
        expect(cellEls[cellIndex]).toHaveTextContent(sortedRow[index]);
      });
    });

    it('should sort a column in ascending order when initial sort direction and initial sorted column is provided', () => {
      render(
        <Table
          rows={rows}
          headers={headers}
          rowHeaders={false}
          initialSortedColumn={1}
          initialSortDirection={'ascending'}
        />,
      );

      const cellEls = screen.getAllByRole('cell');

      const sortedRow = ['a', 'c', 'b'];

      rows.forEach((_row, index) => {
        const cellIndex = rowLength * index;
        expect(cellEls[cellIndex]).toHaveTextContent(sortedRow[index]);
      });
    });

    it('should sort a column in descending order', async () => {
      render(<Table rows={rows} headers={headers} rowHeaders={false} />);

      const letterHeaderEl = screen.getAllByRole('columnheader')[0];
      const cellEls = screen.getAllByRole('cell');

      await userEvent.click(letterHeaderEl);
      await userEvent.click(letterHeaderEl);

      const sortedRow = ['c', 'b', 'a'];

      rows.forEach((_row, index) => {
        const cellIndex = rowLength * index;
        expect(cellEls[cellIndex]).toHaveTextContent(sortedRow[index]);
      });
    });

    it('should sort a column in descending order when initial sort direction and initial sorted column is provided', () => {
      render(
        <Table
          rows={rows}
          headers={headers}
          rowHeaders={false}
          initialSortedColumn={1}
          initialSortDirection={'descending'}
        />,
      );

      const cellEls = screen.getAllByRole('cell');

      const sortedRow = ['b', 'c', 'a'];

      rows.forEach((_row, index) => {
        const cellIndex = rowLength * index;
        expect(cellEls[cellIndex]).toHaveTextContent(sortedRow[index]);
      });
    });

    it('should call a custom sort callback', async () => {
      const onSortByMock = vi.fn();
      const index = 0;
      const nextDirection = 'ascending';
      render(<Table onSortBy={onSortByMock} headers={headers} rows={rows} />);

      const headerElements = screen.getAllByRole('columnheader');

      await userEvent.click(headerElements[0]);

      expect(onSortByMock).toHaveBeenCalledTimes(1);
      expect(onSortByMock).toHaveBeenCalledWith(index, rows, nextDirection);
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Table rowHeaders headers={headers} rows={rows} />,
    );
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
