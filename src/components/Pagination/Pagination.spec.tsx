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

import {
  create,
  render,
  renderToHtml,
  axe,
  RenderFn,
  userEvent,
} from '../../util/test-utils';

import { Pagination, PaginationProps } from './Pagination';

describe('Pagination', () => {
  function renderPagination(renderFn: RenderFn, props: PaginationProps) {
    return renderFn(<Pagination {...props} />);
  }

  const baseProps: PaginationProps = {
    onChange: jest.fn(),
    totalPages: 5,
    label: 'Pagination',
    previousLabel: 'Previous',
    nextLabel: 'Next',
    pageLabel: (page) => `Go to page ${page}`,
    totalLabel: (total) => `of ${total}`,
  };

  it('should disable the previous button on the first page', () => {
    const { getByText } = renderPagination(render, {
      ...baseProps,
      currentPage: 1,
    });
    const prevButtonEl = getByText('Previous').closest('button');

    expect(prevButtonEl).toBeDisabled();
  });

  it('should disable the next button on the last page', () => {
    const { getByText } = renderPagination(render, {
      ...baseProps,
      currentPage: baseProps.totalPages,
    });
    const nextButtonEl = getByText('Next').closest('button');

    expect(nextButtonEl).toBeDisabled();
  });

  it('should go to the previous page', () => {
    const onChange = jest.fn();
    const { getByText } = renderPagination(render, {
      ...baseProps,
      onChange,
      currentPage: 3,
    });

    const prevButtonEl = getByText('Previous');

    userEvent.click(prevButtonEl);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('should go to the next page', () => {
    const onChange = jest.fn();
    const { getByText } = renderPagination(render, { ...baseProps, onChange });

    const nextButtonEl = getByText('Next');

    userEvent.click(nextButtonEl);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  describe('with less than 2 pages', () => {
    const props = { ...baseProps, totalPages: 1 };

    it('should not render', () => {
      const actual = renderPagination(create, props);

      expect(actual).toBeNull();
    });
  });

  describe('with 2 to 5 pages', () => {
    const props = { ...baseProps, totalPages: 5 };

    it('should render with default styles', () => {
      const actual = renderPagination(create, props);
      expect(actual).toMatchSnapshot();
    });

    it('should meet accessibility guidelines', async () => {
      const wrapper = renderPagination(renderToHtml, props);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });

  describe('with more than 5 pages', () => {
    const props = { ...baseProps, totalPages: 10 };

    it('should render with default styles', () => {
      const actual = renderPagination(create, props);
      expect(actual).toMatchSnapshot();
    });

    it('should meet accessibility guidelines', async () => {
      const wrapper = renderPagination(renderToHtml, props);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
