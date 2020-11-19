/**
 * Copyright 2020, SumUp Ltd.
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
  userEvent,
  RenderFn,
} from '../../../../util/test-utils';

import { PageList, PageListProps } from './PageList';

describe('PageList', () => {
  function renderPageList<T>(renderFn: RenderFn<T>, props: PageListProps) {
    return renderFn(<PageList {...props} />);
  }

  const baseProps: PageListProps = {
    onChange: jest.fn(),
    pageLabel: (page) => `Go to page ${page}`,
    pages: [1, 2, 3],
    currentPage: 1,
  };

  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = renderPageList(create, baseProps);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should call the onChange callback', () => {
      const onChange = jest.fn();
      const { getByText } = renderPageList(render, { ...baseProps, onChange });
      const pageFour = getByText('3');

      userEvent.click(pageFour);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(3);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderPageList(renderToHtml, baseProps);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
