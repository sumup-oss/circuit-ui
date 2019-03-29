import React from 'react';
import { shuffle } from 'lodash/fp';

import Table from './Table';
import { ASCENDING, DESCENDING } from './constants';

const headers = [{ children: 'Foo', sortable: true }, 'Bar', 'Baz'];
const items = [['1', '2', '3'], ['1', '2', '3'], ['1', '2', '3']];

describe('Table', () => {
  beforeEach(jest.clearAllMocks);

  describe('Style tests', () => {
    it('should render with default styles', () => {
      const actual = create(<Table headers={headers} rows={items} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render without the table shadow', () => {
      const actual = create(<Table headers={headers} rows={items} noShadow />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with rowHeader styles', () => {
      const actual = create(
        <Table rowHeaders headers={headers} rows={items} />
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render a collapsed table', () => {
      const actual = create(
        <Table headers={headers} rows={items} borderCollapsed />
      );
      expect(actual).toMatchSnapshot();
    });
  });

  describe('Accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <Table rowHeaders headers={headers} rows={items} />
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });

  describe('onSortEnter()', () => {
    it('should set sortHover to the provided index', () => {
      const wrapper = shallow(<Table />)
        .find('Table')
        .instance();

      const index = 0;
      const expected = index;

      wrapper.onSortEnter(index);

      const actual = wrapper.state.sortHover;

      expect(actual).toBe(expected);
    });
  });

  describe('onSortLeave()', () => {
    it('should set sortHover to null', () => {
      const wrapper = shallow(<Table />)
        .find('Table')
        .instance();

      wrapper.setState({
        sortHover: 0
      });
      wrapper.onSortLeave();

      const actual = wrapper.state.sortHover;

      expect(actual).toBeNull();
    });
  });

  describe('onSortBy()', () => {
    describe('custom onSortBy', () => {
      it('should call the provided onSortBy instead of defaultSortBy with index, nextDirection and rows', () => {
        const row = ['a', 'b', 'c', 'd', 'e'];
        const rows = [row];
        const shuffledRow = shuffle(row);
        const expected = [shuffledRow];
        const mock = jest.fn().mockReturnValue(expected);
        const index = 0;
        const nextDirection = ASCENDING;
        const wrapper = shallow(<Table onSortBy={mock} rows={rows} />)
          .find('Table')
          .instance();

        wrapper.onSortBy(index);

        expect(mock).toHaveBeenCalledWith(index, nextDirection, rows);
        expect(wrapper.getSortedRows()).toEqual(expected);
      });
    });
  });

  describe('updateSort()', () => {
    it('should update the state with sortedRow, nextDirection and nextDirection', () => {
      const wrapper = shallow(<Table />)
        .find('Table')
        .instance();
      const index = 0;
      const nextDirection = ASCENDING;

      wrapper.updateSort(index, nextDirection);

      expect(wrapper.state.sortedRow).toBe(index);
      expect(wrapper.state.sortDirection).toBe(nextDirection);
    });
  });

  describe('defaultSortBy()', () => {
    describe('next direction ASCENDING', () => {
      it('should sort the provided row by ascending order', () => {
        const wrapper = shallow(<Table />)
          .find('Table')
          .instance();
        const index = 0;
        const nextDirection = ASCENDING;
        const a = ['Foo'];
        const b = ['Bar'];
        const rows = [a, b];
        const expected = [b, a];
        const actual = wrapper.defaultSortBy(index, nextDirection, rows);

        expect(actual).toEqual(expected);
      });
    });

    describe('next direction DESCENDING', () => {
      it('should sort the provided row by descending order', () => {
        const wrapper = shallow(<Table />)
          .find('Table')
          .instance();
        const index = 0;
        const nextDirection = DESCENDING;
        const a = ['Bar'];
        const b = ['Foo'];
        const rows = [a, b];
        const expected = [b, a];
        const actual = wrapper.defaultSortBy(index, nextDirection, rows);

        expect(actual).toEqual(expected);
      });
    });
  });
});
