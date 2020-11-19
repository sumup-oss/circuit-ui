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
import { fireEvent } from '@testing-library/dom';

import {
  create,
  render,
  renderToHtml,
  axe,
  RenderFn,
} from '../../../../util/test-utils';

import { PageSelect, PageSelectProps } from './PageSelect';

describe('PageSelect', () => {
  function renderPageSelect<T>(renderFn: RenderFn<T>, props: PageSelectProps) {
    return renderFn(<PageSelect {...props} />);
  }

  const baseProps: PageSelectProps = {
    onChange: jest.fn(),
    label: 'Pagination',
    totalLabel: (total) => `of ${total}`,
    pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    currentPage: 1,
    totalPages: 10,
  };

  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = renderPageSelect(create, baseProps);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should call the onChange callback', () => {
      const testId = 'select-page';
      const onChange = jest.fn();
      const { getByTestId } = renderPageSelect(render, {
        ...baseProps,
        onChange,
        'data-testid': testId,
      });
      const selectEl = getByTestId(testId);

      fireEvent.change(selectEl, { target: { value: '3' } });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(3);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderPageSelect(renderToHtml, baseProps);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
