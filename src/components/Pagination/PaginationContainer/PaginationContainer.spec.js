import React from 'react';
import { identity } from 'lodash/fp';
import PaginationContainer from './PaginationContainer';

describe('PaginationContainer', () => {
  describe('styles', () => {
    describe('When the actual page is 1', () => {
      it('should render with default styles', () => {
        const component = shallow(
          <PaginationContainer
            page={1}
            totalPages={50}
            translate={identity}
            onChange={identity}
          >
            Children Element
          </PaginationContainer>
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('When actual page is diferrent that first and last page', () => {
      it('should render with default styles', () => {
        const component = shallow(
          <PaginationContainer
            page={10}
            totalPages={50}
            translate={identity}
            onChange={identity}
          >
            Children Element
          </PaginationContainer>
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('When the actual page is equal the last page', () => {
      it('should render with default styles', () => {
        const component = shallow(
          <PaginationContainer
            page={50}
            totalPages={50}
            translate={identity}
            onChange={identity}
          >
            Children Element
          </PaginationContainer>
        );
        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('business', () => {
    describe('click on the first page', () => {
      it('should call function with parameter page less 1', () => {
        const onChange = jest.fn();

        const component = shallow(
          <PaginationContainer
            page={10}
            totalPages={50}
            translate={identity}
            onChange={onChange}
          >
            Children Element
          </PaginationContainer>
        );
        component
          .find('NavigationButton')
          .at(0)
          .simulate('click');
        expect(onChange).toHaveBeenCalledWith(9);
      });
    });

    describe('click on the last page', () => {
      it('should call function with parameter page more 1', () => {
        const onChange = jest.fn();

        const component = shallow(
          <PaginationContainer
            page={10}
            totalPages={50}
            translate={identity}
            onChange={onChange}
          >
            Children Element
          </PaginationContainer>
        );
        component
          .find('NavigationButton')
          .at(1)
          .simulate('click');
        expect(onChange).toHaveBeenCalledWith(11);
      });
    });
  });
});
