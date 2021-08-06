/**
 * Copyright 2021, SumUp Ltd.
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

import { ShoppingCart, SumUpLogo } from '@sumup/icons';

import { axe, render, renderToHtml } from '../../util/test-utils';
import { PopoverProps } from '../Popover';

import { TopNavigation, TopNavigationProps } from './TopNavigation';

describe('TopNavigation', () => {
  const baseProps: TopNavigationProps = {
    logo: (
      <a
        href="https://sumup.com"
        aria-label="Visit SumUp's website"
        target="_blank"
        rel="noreferrer"
      >
        <SumUpLogo />
      </a>
    ),
    hamburger: {
      isActive: false,
      onClick: jest.fn(),
      activeLabel: 'Close menu',
      inactiveLabel: 'Open menu',
    },
    userName: 'Jane Doe',
    userId: 'ID: AC3YULT8',
    profileLabel: 'Open profile menu',
    profileActions: [
      {
        onClick: jest.fn(),
        children: 'View profile',
      },
      {
        onClick: jest.fn(),
        children: 'Settings',
      },
      { type: 'divider' },
      {
        onClick: jest.fn(),
        children: 'Logout',
        destructive: true,
      },
    ] as PopoverProps['actions'],
    links: [
      {
        icon: ShoppingCart,
        label: 'Shop',
        href: '/shop',
        onClick: jest.fn(),
      },
    ],
  };

  describe('styles', () => {
    it('should match the snapshot', () => {
      const { container } = render(<TopNavigation {...baseProps} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<TopNavigation {...baseProps} />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
