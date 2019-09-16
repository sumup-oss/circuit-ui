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
import { identity } from 'lodash/fp';
import PaginationContainer from './PaginationContainer';

describe('PaginationContainer', () => {
  describe('styles', () => {
    describe('when the current page is 1', () => {
      it('should render with default styles', () => {
        const component = create(
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

    describe('when the current page is not the first and last page', () => {
      it('should render with default styles', () => {
        const component = create(
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

    describe('when the current page is the last page', () => {
      it('should render with default styles', () => {
        const component = create(
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

  describe('interactions', () => {
    describe('click on the first page', () => {
      it('should call function with parameter page less 1', () => {
        const onChange = jest.fn();

        const { getByTestId } = render(
          <PaginationContainer
            page={10}
            totalPages={50}
            translate={identity}
            onChange={onChange}
          >
            Children Element
          </PaginationContainer>
        );

        act(() => {
          fireEvent.click(getByTestId('pagination-button-previous'));
        });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(9);
      });
    });

    describe('click on the last page', () => {
      it('should call function with parameter page more 1', () => {
        const onChange = jest.fn();

        const { getByTestId } = render(
          <PaginationContainer
            page={10}
            totalPages={50}
            translate={identity}
            onChange={onChange}
          >
            Children Element
          </PaginationContainer>
        );

        act(() => {
          fireEvent.click(getByTestId('pagination-button-next'));
        });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(11);
      });
    });
  });
});
