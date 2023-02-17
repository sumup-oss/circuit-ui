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

import { action } from '@storybook/addon-actions';
import { Like, Home, LiveChat, Package, Shop } from '@sumup/icons';

import { ModalProvider } from '../ModalContext';
import { TOP_NAVIGATION_HEIGHT } from '../TopNavigation/TopNavigation';

import { SideNavigation, SideNavigationProps } from './SideNavigation';

export default {
  title: 'Navigation/SideNavigation',
  component: SideNavigation,
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 960, 1280] },
  },
  excludeStories: /.*Args$/,
};

export const baseArgs: SideNavigationProps = {
  isLoading: false,
  isOpen: true,
  closeButtonLabel: 'Close navigation',
  onClose: action('Close'),
  primaryNavigationLabel: 'Primary',
  secondaryNavigationLabel: 'Secondary',
  primaryLinks: [
    {
      icon: Home,
      label: 'Home',
      href: '/',
      onClick: action('Home'),
    },
    {
      icon: Shop,
      label: 'Shop',
      href: '/shop',
      onClick: action('Shop'),
      isActive: true,
      badge: true,
      secondaryGroups: [
        {
          secondaryLinks: [
            {
              label: 'Shirts',
              href: '/shop/shirts',
              onClick: action('Shop → Shirts'),
              badge: { children: 'New' },
            },
            {
              label: 'Pants',
              href: '/shop/pants',
              onClick: action('Shop → Pants'),
            },
            {
              label: 'Socks',
              href: '/shop/socks',
              onClick: action('Shop → Socks'),
              isActive: true,
            },
          ],
        },
        {
          label: 'For Kids',
          secondaryLinks: [
            {
              label: 'Toys',
              href: '/shop/toys',
              onClick: action('Shop → Toys'),
            },
            {
              label: 'Books',
              href: '/shop/books',
              onClick: action('Shop → Books'),
            },
          ],
        },
      ],
    },
    {
      icon: Package,
      label: 'Orders',
      href: '/orders',
      onClick: action('Orders'),
    },
    {
      icon: Like,
      label: 'Wishlist',
      href: '/wishlist',
      onClick: action('Wishlist'),
    },
    {
      icon: LiveChat,
      label: 'Support',
      href: 'https://support.example.com',
      onClick: action('Support'),
      target: '_blank',
    },
  ],
};

export const Base = (args: SideNavigationProps) => (
  <ModalProvider>
    <div style={{ height: TOP_NAVIGATION_HEIGHT }} />
    <div style={{ display: 'flex' }}>
      <SideNavigation {...args} />
      <div style={{ width: '100%', minHeight: '440px' }} />
    </div>
  </ModalProvider>
);

Base.args = baseArgs;
