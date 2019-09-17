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
import Pagination from './Pagination';

describe('Pagination', () => {
  describe('styles', () => {
    describe('With 5 or less pages', () => {
      it('should render only the number of pages passed and the next and previous buttons', () => {
        const component = create(
          <Pagination
            page={1}
            total={250}
            perPage={50}
            translate={identity}
            onChange={identity}
          />
        );

        expect(component).toMatchSnapshot();
      });

      it('should have only 3 buttons whem we have 3 pages', () => {
        const { getAllByTestId } = render(
          <Pagination
            page={1}
            total={150}
            perPage={50}
            translate={identity}
            onChange={identity}
          />
        );

        expect(getAllByTestId('pagination-button-page')).toHaveLength(3);
      });
    });

    describe('With more than 5 pages', () => {
      describe('when user is on page one', () => {
        it('should render with default styles and match snapshot', () => {
          const component = create(
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
          const { getAllByTestId, getByTestId } = render(
            <Pagination
              page={1}
              total={500}
              translate={identity}
              onChange={identity}
            />
          );
          expect(getAllByTestId('pagination-button-page')).toHaveLength(5);
          expect(getByTestId('pagination-button-next')).toBeVisible();
        });
      });

      describe('when user is on page 2', () => {
        it('should render with default styles and match snapshot', () => {
          const component = create(
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
          const { getAllByTestId, getByTestId } = render(
            <Pagination
              page={2}
              total={500}
              translate={identity}
              onChange={identity}
            />
          );
          expect(getAllByTestId('pagination-button-page')).toHaveLength(5);
          expect(getByTestId('pagination-button-next')).toBeVisible();
        });
      });

      describe('when user is on last page', () => {
        it('should render with default styles and match snapshot', () => {
          const component = create(
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
          const { getAllByTestId, getByTestId } = render(
            <Pagination
              page={10}
              total={500}
              translate={identity}
              onChange={identity}
            />
          );
          expect(getAllByTestId('pagination-button-page')).toHaveLength(5);
          expect(getByTestId('pagination-button-next')).toBeVisible();
        });
      });

      describe('when user is last but one page', () => {
        it('should render with default styles and match snapshot', () => {
          const component = create(
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
          const { getAllByTestId, getByTestId } = render(
            <Pagination
              page={9}
              total={500}
              translate={identity}
              onChange={identity}
            />
          );
          expect(getAllByTestId('pagination-button-page')).toHaveLength(5);
          expect(getByTestId('pagination-button-next')).toBeVisible();
        });
      });

      describe('when user is on page in the middle', () => {
        it('should render with default styles and match snapshot', () => {
          const component = create(
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
          const { getAllByTestId, getByTestId } = render(
            <Pagination
              page={11}
              total={1000}
              translate={identity}
              onChange={identity}
            />
          );
          expect(getAllByTestId('pagination-button-page')).toHaveLength(5);
          expect(getByTestId('pagination-button-next')).toBeVisible();
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
