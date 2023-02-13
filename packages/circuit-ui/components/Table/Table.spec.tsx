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

import {
  create,
  render,
  renderToHtml,
  axe,
  userEvent,
} from '../../util/test-utils';
import Badge from '../Badge';

import Table from './Table';
import { HeaderCell, Direction } from './types';

jest.setTimeout(500000);

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
  beforeEach(jest.clearAllMocks);

  describe('Style tests', () => {
    it('should render with default styles', () => {
      const actual = create(<Table headers={headers} rows={rows} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render without the table shadow', () => {
      const actual = create(<Table headers={headers} rows={rows} noShadow />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with rowHeader styles', () => {
      const actual = create(<Table rowHeaders headers={headers} rows={rows} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render a collapsed table', () => {
      const actual = create(
        <Table headers={headers} rows={rows} borderCollapsed />,
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render a condensed table', () => {
      const actual = create(<Table headers={headers} rows={rows} condensed />);
      expect(actual).toMatchSnapshot();
    });

    it('should render a scrollable table', () => {
      const actual = create(
        <Table headers={headers} rows={rows} scrollable rowHeaders={false} />,
      );
      expect(actual).toMatchSnapshot();
    });

    it('should not render a scrollable table if the rowHeaders prop is true', () => {
      const actual = create(<Table headers={headers} rows={rows} rowHeaders />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with component cells', () => {
      const actual = create(
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
      expect(actual).toMatchSnapshot();
    });

    it('should render "null" or "undefined" cells', () => {
      const actual = create(
        <Table
          headers={['Name', 'Type']}
          rows={[
            [null, 'Fruit'],
            ['Broccoli', undefined],
          ]}
        />,
      );
      expect(actual).toMatchSnapshot();
    });
  });

  describe('Interaction tests', () => {
    it('should call the row click callback', async () => {
      const onRowClickMock = jest.fn();
      const index = 0;
      const { getAllByRole } = render(
        <Table onRowClick={onRowClickMock} headers={headers} rows={rows} />,
      );

      const rowElements = getAllByRole('row');

      // rowElements[0] is the hidden first row
      await userEvent.click(rowElements[1]);

      expect(onRowClickMock).toHaveBeenCalledTimes(1);
      expect(onRowClickMock).toHaveBeenCalledWith(index);
    });

    describe('sorting', () => {
      it('should sort a column in ascending order', async () => {
        const { getAllByRole } = render(
          <Table rows={rows} headers={headers} rowHeaders={false} />,
        );

        const letterHeaderEl = getAllByRole('columnheader')[0];

        await userEvent.click(letterHeaderEl);
        const cellEls = getAllByRole('cell');

        const sortedRow = ['a', 'b', 'c'];

        rows.forEach((_row, index) => {
          const cellIndex = rowLength * index;
          expect(cellEls[cellIndex]).toHaveTextContent(sortedRow[index]);
        });
      });

      it('should sort a column in ascending order when initial sort direction and initial sorted row is provided', () => {
        const { getAllByRole } = render(
          <Table
            rows={rows}
            headers={headers}
            rowHeaders={false}
            initialSortedRow={1}
            initialSortDirection={'ascending'}
          />,
        );

        const cellEls = getAllByRole('cell');

        const sortedRow = ['a', 'c', 'b'];

        rows.forEach((_row, index) => {
          const cellIndex = rowLength * index;
          expect(cellEls[cellIndex]).toHaveTextContent(sortedRow[index]);
        });
      });

      it('should sort a column in descending order', async () => {
        const { getAllByRole } = render(
          <Table rows={rows} headers={headers} rowHeaders={false} />,
        );

        const letterHeaderEl = getAllByRole('columnheader')[0];

        await userEvent.click(letterHeaderEl);
        await userEvent.click(letterHeaderEl);

        const cellEls = getAllByRole('cell');
        const sortedRow = ['c', 'b', 'a'];

        rows.forEach((_row, index) => {
          const cellIndex = rowLength * index;
          expect(cellEls[cellIndex]).toHaveTextContent(sortedRow[index]);
        });
      });

      it('should sort a column in descending order when initial sort direction and initial sorted row is provided', () => {
        const { getAllByRole } = render(
          <Table
            rows={rows}
            headers={headers}
            rowHeaders={false}
            initialSortedRow={1}
            initialSortDirection={'descending'}
          />,
        );

        const cellEls = getAllByRole('cell');

        const sortedRow = ['b', 'c', 'a'];

        rows.forEach((_row, index) => {
          const cellIndex = rowLength * index;
          expect(cellEls[cellIndex]).toHaveTextContent(sortedRow[index]);
        });
      });

      it('should call a custom sort callback', async () => {
        const onSortByMock = jest.fn();
        onSortByMock.mockReturnValue([]);
        const index = 0;
        const nextDirection = 'ascending';
        const { getAllByRole } = render(
          <Table onSortBy={onSortByMock} headers={headers} rows={rows} />,
        );

        const headerElements = getAllByRole('columnheader');

        await userEvent.click(headerElements[0]);

        expect(onSortByMock).toHaveBeenCalledTimes(1);
        expect(onSortByMock).toHaveBeenCalledWith(index, rows, nextDirection);
      });
    });
  });

  describe('Accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <Table rowHeaders headers={headers} rows={rows} />,
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
