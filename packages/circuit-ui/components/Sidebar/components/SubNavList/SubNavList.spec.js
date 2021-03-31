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

import SubNavList from './SubNavList';

describe('SubNavList', () => {
  describe('styles', () => {
    it('should render with default styles when there is a selected child', () => {
      const actual = create(
        <SubNavList>
          <li>Item 1</li>
          <li selected>Item 2</li>
        </SubNavList>,
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render with default styles when there is no selected child', () => {
      const actual = create(
        <SubNavList>
          <li>Item 1</li>
          <li>Item 2</li>
        </SubNavList>,
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render without children', () => {
      const actual = create(<SubNavList />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <SubNavList>
          <li>Item 1</li>
          <li selected>Item 2</li>
        </SubNavList>,
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
