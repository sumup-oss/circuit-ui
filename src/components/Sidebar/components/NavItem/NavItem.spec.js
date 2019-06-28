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

import NavList from '../NavList';
import NavItem from './NavItem';

describe('NavItem', () => {
  describe('styles', () => {
    it('should render with default styles and match the snapshot', () => {
      const props = {
        selected: false,
        onClick: jest.fn()
      };
      const actual = create(<NavItem {...props} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with default styles and match the snapshot for a secondary NavItem', () => {
      const props = {
        secondary: true,
        selected: false,
        onClick: jest.fn()
      };
      const actual = create(<NavItem {...props} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with selected state styles and match the snapshot', () => {
      const props = {
        selected: true,
        onClick: jest.fn()
      };
      const actual = create(<NavItem {...props} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render children when selected', () => {
      const wrapper = shallow(
        <NavItem selected>
          <span data-selector="child">text node</span>
        </NavItem>
      );
      const actual = wrapper.find('[data-selector="child"]');

      expect(actual).toBeTruthy();
    });

    it('should render an icon', () => {
      const wrapper = shallow(
        <NavItem defaultIcon={<div data-selector="icon" />}>
          <span data-selector="child">text node</span>
        </NavItem>
      );
      const actual = wrapper.find('[data-selector="icon"]');

      expect(actual).toHaveLength(1);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <NavList>
          <NavItem />
        </NavList>
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
