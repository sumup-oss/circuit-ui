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
import {
  Items,
  ItemsFilled,
  Bookings,
  BookingsFilled,
  Invoice,
  InvoiceFilled,
  Payouts,
  PayoutsFilled,
  Settings,
  SettingsFilled,
  Profile,
} from '@sumup-oss/icons';
import { useState } from 'react';

import { modes } from '../../../../.storybook/modes.js';
import { Headline } from '../Headline/index.js';
import { Body } from '../Body/index.js';

import type { SideNavigationProps } from './types.js';
import { SideNavigation } from './SideNavigation.js';
import classes from './SideNavigationStories.module.css';
import { SumUpLogo } from '../SumUpLogo/SumUpLogo.js';
import { Hamburger } from '../Hamburger/index.js';
import { utilClasses } from '../../styles/utility.js';

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
      },
    },
  },
  excludeStories: /.*Args$/,
};

const groups: SideNavigationProps['groups'] = [
  {
    id: 'primary',
    label: 'Your shortcuts',
    items: [
      {
        icon: Payouts,
        activeIcon: PayoutsFilled,
        label: 'Payouts',
        href: '/#payouts',
        onClick: action('Payouts clicked'),
      },
      {
        icon: Invoice,
        activeIcon: InvoiceFilled,
        label: 'Invoices',
        href: '/#invoices',
      },
    ],
  },
  {
    id: 'secondary',
    label: 'Your business',
    items: [
      {
        icon: Items,
        activeIcon: ItemsFilled,
        label: 'Items',
        isActive: true,
        onClick: action('Items clicked'),
        secondaryItems: [
          {
            label: 'Catalog',
            href: '/#items-catalog',
          },
          {
            label: 'Inventory',
            href: '/#items-inventory',
          },
          {
            label: 'Reports',
            href: '/#items-reports',
            target: '_blank',
            externalLabel: 'Opens in a new tab',
            isActive: true,
          },
        ],
      },
      {
        icon: Bookings,
        activeIcon: BookingsFilled,
        label: 'Bookings',
        href: '/#bookings',
      },

      {
        icon: Invoice,
        activeIcon: InvoiceFilled,
        label: 'Documents',
        href: '/#documents',
        target: '_blank',
        externalLabel: 'Opens in a new tab',
      },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    items: [
      {
        icon: Profile,
        activeIcon: Profile,
        label: 'Personal information',
        href: '/#account',
      },
      {
        icon: Settings,
        activeIcon: SettingsFilled,
        label: 'Settings',
        href: '/#settings',
      },
    ],
  },
];

const logo = (
  <div style={{ paddingTop: 'var(--cui-spacings-kilo)' }}>
    <a
      className={utilClasses.focusVisible}
      href="https://sumup.com"
      aria-label="Visit SumUp's website"
      target="_blank"
      rel="noreferrer"
    >
      <SumUpLogo variant="full" />
    </a>
  </div>
);

export const baseArgs: SideNavigationProps = {
  label: 'Side navigation',
  isLoading: false,
  isOpen: true,
  closeButtonLabel: 'Close navigation',
  onClose: action('Close'),
  groups,
  skipNavigationLabel: 'Skip Navigation',
  skipNavigationHref: '#main-content',
  logo,
};

const placeHolderContent = (
  <main id="main-content" className={classes.main}>
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

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <SideNavigation {...args} isOpen={isOpen} onClose={toggleIsOpen} />
      <Hamburger
        className={classes.hamburger}
        activeLabel={'Close'}
        inactiveLabel={'Open'}
        isActive={isOpen}
        onClick={toggleIsOpen}
      />
      {placeHolderContent}
    </div>
  );
};

Base.args = baseArgs;
