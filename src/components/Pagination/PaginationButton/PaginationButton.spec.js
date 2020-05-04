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

import PaginationButton from './PaginationButton';

describe('PaginationButton', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(
        <PaginationButton currentPage={1} onClick={jest.fn()} />
      );
      expect(actual).toMatchSnapshot();
    });
  });

  describe('interactions', () => {
    it('should call method onClick with currentPage passed from props', () => {
      const props = {
        currentPage: 13,
        onClick: jest.fn()
      };
      const { getByTestId } = render(
        <PaginationButton {...props} data-testid="pagination-button" />
      );

      act(() => {
        fireEvent.click(getByTestId('pagination-button'));
      });

      expect(props.onClick).toHaveBeenCalledTimes(1);
      expect(props.onClick).toHaveBeenCalledWith(13);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <PaginationButton currentPage={1} onClick={jest.fn()} />
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
