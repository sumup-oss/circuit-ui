import React from 'react';

import TableHead from '.';
import { ASCENDING } from '../../constants';

const fixtureHeaders = [{ children: 'Foo', sortable: true }, 'Bar', 'Baz'];

describe('TableHead', () => {
  describe('Style tests', () => {
    it('should render with default styles', () => {
      const actual = create(<TableHead headers={fixtureHeaders} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with rowHeader styles', () => {
      const actual = create(<TableHead rowHeader headers={fixtureHeaders} />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('rowHeaders', () => {
    it('should add fixed to first TableHeader', () => {
      const wrapper = shallow(
        <TableHead rowHeaders headers={fixtureHeaders} />
      );

      expect(
        wrapper
          .find('TableHeader')
          .at(0)
          .props().fixed
      ).toBeTruthy();
    });

    describe('presentational TableCell', () => {
      it('should add it to the first header', () => {
        const wrapper = shallow(
          <TableHead rowHeaders headers={fixtureHeaders} />
        );

        expect(wrapper.find('TableCell').at(0).length).toBeTruthy();
      });
    });
  });

  describe('TableHeader onClick', () => {
    describe('non sortable', () => {
      it('should not dispatch the onSortBy handler', () => {
        const headers = ['Foo'];
        const mock = jest.fn();
        const wrapper = shallow(
          <TableHead onSortBy={mock} headers={headers} />
        );

        wrapper
          .find('TableHeader')
          .at(0)
          .simulate('click');

        expect(mock).not.toHaveBeenCalled();
      });
    });

    it('should dispatch the onSortBy handler', () => {
      const headers = [{ children: 'Foo', sortable: true }];
      const mock = jest.fn();
      const wrapper = shallow(<TableHead onSortBy={mock} headers={headers} />);

      wrapper
        .find('TableHeader')
        .at(0)
        .simulate('click');

      expect(mock).toHaveBeenCalled();
    });
  });

  describe('TableHeader onSortEnter', () => {
    describe('non sortable', () => {
      it('should not dispatch the onSortEnter handler', () => {
        const headers = ['Foo'];
        const mock = jest.fn();
        const wrapper = shallow(
          <TableHead onSortEnter={mock} headers={headers} />
        );

        wrapper
          .find('TableHeader')
          .at(0)
          .simulate('mouseEnter');

        expect(mock).not.toHaveBeenCalled();
      });
    });

    it('should dispatch the onSortEnter handler', () => {
      const headers = [{ children: 'Foo', sortable: true }];
      const mock = jest.fn();
      const wrapper = shallow(
        <TableHead onSortEnter={mock} headers={headers} />
      );

      wrapper
        .find('TableHeader')
        .at(0)
        .simulate('mouseEnter');

      expect(mock).toHaveBeenCalled();
    });
  });

  describe('TableHeader onSortLeave', () => {
    describe('non sortable', () => {
      it('should not dispatch the onSortLeave handler', () => {
        const headers = ['Foo'];
        const mock = jest.fn();
        const wrapper = shallow(
          <TableHead onSortLeave={mock} headers={headers} />
        );

        wrapper
          .find('TableHeader')
          .at(0)
          .simulate('mouseLeave');

        expect(mock).not.toHaveBeenCalled();
      });
    });

    it('should dispatch the onSortLeave handler', () => {
      const headers = [{ children: 'Foo', sortable: true }];
      const mock = jest.fn();
      const wrapper = shallow(
        <TableHead onSortLeave={mock} headers={headers} />
      );

      wrapper
        .find('TableHeader')
        .at(0)
        .simulate('mouseLeave');

      expect(mock).toHaveBeenCalled();
    });
  });

  describe('sortDirection', () => {
    describe('sortedRow is the same as current and has sortDirection', () => {
      it('should add sortDirection prop to TableHeader', () => {
        const headers = ['Foo', 'Bar'];
        const sortedRow = 1;
        const sortDirection = ASCENDING;
        const props = {
          headers,
          sortedRow,
          sortDirection
        };
        const wrapper = shallow(<TableHead {...props} />);
        const expected = ASCENDING;
        const actual = wrapper
          .find('TableHeader')
          .at(1)
          .props().sortDirection;

        expect(actual).toBe(expected);
      });
    });

    describe('no sortDirection', () => {
      it('should not add sortDirection prop to TableHeader', () => {
        const headers = ['Foo', 'Bar'];
        const sortedRow = 1;
        const wrapper = shallow(
          <TableHead sortedRow={sortedRow} headers={headers} />
        );

        expect(
          wrapper
            .find('TableHeader')
            .at(1)
            .props().sortDirection
        ).toBeFalsy();
      });
    });
  });

  describe('isSorted', () => {
    describe('sortedRow is the same as current Header', () => {
      it('should add isSorted prop to TableHeader', () => {
        const headers = ['Foo', 'Bar'];
        const sortedRow = 1;
        const wrapper = shallow(
          <TableHead sortedRow={sortedRow} headers={headers} />
        );

        expect(
          wrapper
            .find('TableHeader')
            .at(1)
            .props().isSorted
        ).toBeTruthy();
      });
    });

    it('should not add isSorted prop to TableHeader', () => {
      const headers = ['Foo', 'Bar'];
      const sortedRow = 1;
      const wrapper = shallow(
        <TableHead sortedRow={sortedRow} headers={headers} />
      );

      expect(
        wrapper
          .find('TableHeader')
          .at(0)
          .props().isSorted
      ).toBeFalsy();
    });
  });

  describe('Accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <TableHead rowHeader headers={fixtureHeaders} />
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
