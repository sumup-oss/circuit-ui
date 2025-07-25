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

import { action } from 'storybook/actions';
import { Like, Home, LiveChat, Package, Shop } from '@sumup-oss/icons';
import { useState } from 'react';

import { modes } from '../../../../.storybook/modes.js';
import { Headline } from '../Headline/index.js';
import { Body } from '../Body/index.js';

import { SideNavigation, type SideNavigationProps } from './SideNavigation.js';

export default {
  title: 'Navigation/SideNavigation',
  component: SideNavigation,
  tags: ['status:stable'],
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      modes: {
        mobile: modes.smallMobile,
        tablet: modes.tablet,
        desktop: modes.desktop,
      },
    },
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
      badge: { variant: 'promo', children: 'New items' },
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
              tier: { variant: 'plus' },
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
      externalLabel: 'Opens in a new tab',
    },
  ],
  skipNavigationLabel: 'Skip Navigation',
  skipNavigationHref: '#main-content',
};

const placeHolderContent = (
  <main id="main-content" style={{ padding: 'var(--cui-spacings-tera)' }}>
    <Headline as="h1">Main content</Headline>
    <Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent semper
      sed massa sit amet dapibus. Praesent sed libero in erat malesuada luctus
      quis non justo. Maecenas massa nisl, facilisis a nunc vitae, accumsan
      faucibus odio. Pellentesque tempus ex id lacus mattis, non dapibus elit
      efficitur. Praesent ultricies odio ut velit efficitur, eu mattis lectus
      blandit. Duis pretium dignissim sapien accumsan semper. Sed hendrerit eros
      posuere, sodales sem vitae, sagittis mi. Donec finibus enim ut ligula
      luctus viverra.
    </Body>
  </main>
);

export const Base = (args: SideNavigationProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  const onSideNavigationClose = () => {
    setIsOpen(false);
  };
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div style={{ display: 'flex' }}>
        <SideNavigation
          {...args}
          isOpen={isOpen}
          onClose={onSideNavigationClose}
        />
        {placeHolderContent}
      </div>
    </div>
  );
};

Base.args = baseArgs;
