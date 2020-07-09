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

import Table from './Table';
import { ASCENDING } from './constants';

const headers = [
  { children: 'Letters', sortable: true },
  { children: 'Numbers', sortable: true },
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
      const actual = create(<Table headers={headers} rows={rows} />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('Interaction tests', () => {
    it('should call the row click callback', () => {
      const onRowClickMock = jest.fn();
      const index = 0;
      const { getAllByTestId } = render(
        <Table onRowClick={onRowClickMock} headers={headers} rows={rows} />,
      );

      act(() => {
        fireEvent.click(getAllByTestId('table-row')[0]);
      });

      expect(onRowClickMock).toHaveBeenCalledTimes(1);
      expect(onRowClickMock).toHaveBeenCalledWith(index);
    });

    describe('sorting', () => {
      it('should sort a column in ascending order', () => {
        const { getAllByTestId } = render(
          <Table rows={rows} headers={headers} />,
        );

        const letterHeaderEl = getAllByTestId('table-header')[0];
        const cellEls = getAllByTestId('table-cell');

        act(() => {
          fireEvent.click(letterHeaderEl);
        });

        const sortedRow = ['a', 'b', 'c'];

        rows.forEach((row, index) => {
          // There's a hidden header cell that we need to skip with +1.
          const cellIndex = rowLength * index + 1;
          expect(cellEls[cellIndex]).toHaveTextContent(sortedRow[index]);
        });
      });

      it('should sort a column in descending order', () => {
        const { getAllByTestId } = render(
          <Table rows={rows} headers={headers} />,
        );

        const letterHeaderEl = getAllByTestId('table-header')[0];
        const cellEls = getAllByTestId('table-cell');

        act(() => {
          fireEvent.click(letterHeaderEl);
        });
        act(() => {
          fireEvent.click(letterHeaderEl);
        });

        const sortedRow = ['c', 'b', 'a'];

        rows.forEach((row, index) => {
          // There's a hidden header cell that we need to skip with +1.
          const cellIndex = rowLength * index + 1;
          expect(cellEls[cellIndex]).toHaveTextContent(sortedRow[index]);
        });
      });

      it('should call a custom sort callback', () => {
        const onSortByMock = jest.fn();
        const index = 0;
        const nextDirection = ASCENDING;
        const { getAllByTestId } = render(
          <Table onSortBy={onSortByMock} headers={headers} rows={rows} />,
        );

        act(() => {
          fireEvent.click(getAllByTestId('table-header')[0]);
        });

        expect(onSortByMock).toHaveBeenCalledTimes(1);
        expect(onSortByMock).toHaveBeenCalledWith(index, nextDirection, rows);
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
