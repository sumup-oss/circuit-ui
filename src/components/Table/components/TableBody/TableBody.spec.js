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

import TableBody from '.';

const fixtureRows = [['Foo', 'Bar']];

describe('TableBody', () => {
  describe('Style tests', () => {
    it('should render with default styles', () => {
      const actual = create(<TableBody rows={fixtureRows} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with fixed header styles', () => {
      const actual = create(<TableBody rowHeaders rows={fixtureRows} />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('logic tests', () => {
    describe('rowHeaders', () => {
      it('should render a table cell as the first element on each row with no rowHeaders', () => {
        const { getByTestId } = render(<TableBody rows={fixtureRows} />);
        const tableCell = getByTestId('table-row').firstChild;

        expect(tableCell.tagName).toBe('TD');
      });

      it('should render a table header as the first element of each row with rowHeaders', () => {
        const { getByTestId } = render(
          <TableBody rows={fixtureRows} rowHeaders />,
        );
        const tableCell = getByTestId('table-row').firstChild;

        expect(tableCell.tagName).toBe('TH');
      });
    });

    describe('sortHover', () => {
      it('should not render a cell with hovered styles if its column is not currently hovered', () => {
        const sortHover = 4;
        const wrapper = create(
          <TableBody sortHover={sortHover} rows={fixtureRows} />,
        );
        expect(wrapper).toMatchSnapshot();
      });

      it('should render a cell with hovered styles if its column is currently hovered', () => {
        const sortHover = 0;
        const wrapper = create(
          <TableBody sortHover={sortHover} rows={fixtureRows} />,
        );
        expect(wrapper).toMatchSnapshot();
      });
    });

    it('should forward additional props to the row', () => {
      const testId = 'row-1-testId';
      const rows = [{ 'cells': ['Foo', 'Bar'], 'data-testid': testId }];
      const { getAllByTestId } = render(<TableBody rows={rows} />);

      expect(getAllByTestId(testId)).toHaveLength(1);
    });

    it('should forward additional props to the cell', () => {
      const testId = 'cell-1-testId';
      const rows = [[{ 'children': 'Foo', 'data-testid': testId }, 'Bar']];
      const { getAllByTestId } = render(<TableBody rows={rows} />);

      expect(getAllByTestId(testId)).toHaveLength(1);
    });
  });

  describe('Accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<TableBody rowHeader rows={fixtureRows} />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
