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

import { describe, expect, it, vi } from 'vitest';

import {
  create,
  screen,
  render,
  renderToHtml,
  axe,
} from '../../../../util/test-utils.js';
import { NavList } from '../NavList';

import { NavItem } from './NavItem.js';

describe('NavItem', () => {
  describe('styles', () => {
    it('should render with default styles and match the snapshot', () => {
      const props = {
        selected: false,
        onClick: vi.fn(),
      };
      const actual = create(<NavItem {...props} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with default styles and match the snapshot for a secondary NavItem', () => {
      const props = {
        secondary: true,
        selected: false,
        onClick: vi.fn(),
      };
      const actual = create(<NavItem {...props} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with selected state styles and match the snapshot', () => {
      const props = {
        selected: true,
        onClick: vi.fn(),
      };
      const actual = create(<NavItem {...props} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with disabled state styles and match the snapshot', () => {
      const props = {
        disabled: true,
      };
      const actual = create(<NavItem {...props} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render an icon', () => {
      const { getByTestId } = render(
        <NavItem defaultIcon={<div data-testid="icon" />} />,
      );
      const iconEl = getByTestId('icon');
      expect(iconEl).not.toBeNull();
    });
  });

  describe('when disabled', () => {
    it('should ignore clicks', () => {
      const label = 'Disabled';
      const mockOnClick = vi.fn();
      render(
        <NavItem
          disabled={true}
          onClick={mockOnClick}
          secondary={false}
          label={label}
          selected={false}
        />,
      );

      screen.getByText(label).click();
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <NavList>
          <NavItem label="Item" />
        </NavList>,
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});