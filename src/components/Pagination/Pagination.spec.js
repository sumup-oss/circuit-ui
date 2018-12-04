import React from 'react';
import { identity } from 'lodash/fp';
import Pagination from './Pagination';

describe('Pagination', () => {
  describe('styles', () => {
    describe('With 5 or less pages', () => {
      it('should render only the number of pages passed and the next and previous buttons', () => {
        const component = shallow(
          <Pagination
            page={1}
            total={250}
            perPage={50}
            translate={identity}
            onChange={identity}
          />
        );

        expect(component).toMatchSnapshot();

        expect(component.find('PaginationButtonContainer')).toHaveLength(5);
      });

      it('should have only 3 buttons whem we have 3 pages', () => {
        const component = shallow(
          <Pagination
            page={1}
            total={150}
            perPage={50}
            translate={identity}
            onChange={identity}
          />
        );

        expect(component.find('PaginationButtonContainer')).toHaveLength(3);
      });
    });

    describe('With more than 5 pages', () => {
      describe('when user is on page one', () => {
        it('should render with default styles and match snapshot', () => {
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
        it('should render five pages and one for showing that are hidden pages', () => {
          const component = shallow(
            <Pagination
              page={1}
              total={500}
              translate={identity}
              onChange={identity}
            />
          );
          expect(component.find('PaginationButtonContainer')).toHaveLength(5);
          expect(component.find('PageButton')).toHaveLength(1);
        });
      });

      describe('when user is on page 2', () => {
        it('should render with default styles and match snapshot', () => {
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
        it('should render five pages and one for showing that are hidden pages', () => {
          const component = shallow(
            <Pagination
              page={2}
              total={500}
              translate={identity}
              onChange={identity}
            />
          );
          expect(component.find('PaginationButtonContainer')).toHaveLength(5);
          expect(component.find('PageButton')).toHaveLength(1);
        });
      });

      describe('when user is on last page', () => {
        it('should render with default styles and match snapshot', () => {
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

        it('should render five pages and one for showing that are hidden pages', () => {
          const component = shallow(
            <Pagination
              page={10}
              total={500}
              translate={identity}
              onChange={identity}
            />
          );
          expect(component.find('PaginationButtonContainer')).toHaveLength(5);
          expect(component.find('PageButton')).toHaveLength(1);
        });
      });

      describe('when user is last but one page', () => {
        it('should render with default styles and match snapshot', () => {
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
        it('should render five pages and one for showing that are hidden pages', () => {
          const component = shallow(
            <Pagination
              page={9}
              total={500}
              translate={identity}
              onChange={identity}
            />
          );
          expect(component.find('PaginationButtonContainer')).toHaveLength(5);
          expect(component.find('PageButton')).toHaveLength(1);
        });
      });

      describe('when user is on page in the middle', () => {
        it('should render with default styles and match snapshot', () => {
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

        it('should render five pages and the buttons for showing that are hidden pages', () => {
          const component = shallow(
            <Pagination
              page={11}
              total={1000}
              translate={identity}
              onChange={identity}
            />
          );
          expect(component.find('PaginationButtonContainer')).toHaveLength(5);
          expect(component.find('PageButton')).toHaveLength(2);
        });
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
