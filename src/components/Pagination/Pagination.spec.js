import React from 'react';
import { identity } from 'lodash/fp';
import Pagination from './Pagination';

describe('Pagination', () => {
  describe('styles', () => {
    describe('With 5 or less pages', () => {
      const component = shallow(
        <Pagination
          page={1}
          total={250}
          translate={identity}
          onChange={identity}
        />
      );
      expect(component).toMatchSnapshot();
    });

    describe('With more than 5 pages', () => {
      describe('when user is on page one', () => {
        const component = shallow(
          <Pagination
            page={1}
            total={500}
            translate={identity}
            onChange={identity}
          />
        );
        expect(component).toMatchSnapshot();
      });

      describe('when user is on page 2', () => {
        const component = shallow(
          <Pagination
            page={2}
            total={500}
            translate={identity}
            onChange={identity}
          />
        );
        expect(component).toMatchSnapshot();
      });

      describe('when user is on last page', () => {
        const component = shallow(
          <Pagination
            page={10}
            total={500}
            translate={identity}
            onChange={identity}
          />
        );
        expect(component).toMatchSnapshot();
      });

      describe('when user is last but one page', () => {
        const component = shallow(
          <Pagination
            page={9}
            total={500}
            translate={identity}
            onChange={identity}
          />
        );
        expect(component).toMatchSnapshot();
      });

      describe('when user is on page in the middle', () => {
        const component = shallow(
          <Pagination
            page={5}
            total={500}
            translate={identity}
            onChange={identity}
          />
        );
        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <Pagination
          page={1}
          total={250}
          translate={identity}
          onChange={identity}
        />
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
