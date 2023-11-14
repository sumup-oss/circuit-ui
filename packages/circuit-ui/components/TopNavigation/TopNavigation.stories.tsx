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

import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Shop, SumUpLogo } from '@sumup/icons';

import { SideNavigation } from '../SideNavigation/index.js';
import { baseArgs as sideNavigationProps } from '../SideNavigation/SideNavigation.stories.js';
import { ModalProvider } from '../ModalContext/index.js';

import { TopNavigation, TopNavigationProps } from './TopNavigation.js';

export default {
  title: 'Navigation/TopNavigation',
  component: TopNavigation,
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 480, 960] },
  },
  excludeStories: /.*Args$/,
};

export const baseArgs: TopNavigationProps = {
  isLoading: false,
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
  user: {
    name: 'Jane Doe',
    id: 'ID: AC3YULT8',
  },
  profileMenu: {
    label: 'Open profile menu',
    actions: [
      {
        onClick: action('View profile'),
        children: 'View profile',
      },
      {
        onClick: action('Settings'),
        children: 'Settings',
      },
      { type: 'divider' },
      {
        onClick: action('Logout'),
        children: 'Logout',
        destructive: true,
      },
    ],
    className: 'custom-class-name',
  },
  links: [
    {
      icon: Shop,
      label: 'Shop',
      href: '/shop',
      onClick: action('Shop'),
    },
  ],
};

export const Base = (args: TopNavigationProps) => <TopNavigation {...args} />;

Base.args = baseArgs;

export const WithSideNavigation = (args: TopNavigationProps) => {
  const [isSideNavigationOpen, setSideNavigationOpen] = useState(false);
  const hamburger = {
    ...args.hamburger!,
    isActive: isSideNavigationOpen,
    onClick: () => setSideNavigationOpen((prev) => !prev),
  };
  return (
    <ModalProvider>
      <TopNavigation {...args} hamburger={hamburger} />
      <div style={{ display: 'flex' }}>
        <SideNavigation
          {...sideNavigationProps}
          isOpen={isSideNavigationOpen}
          onClose={() => setSideNavigationOpen(false)}
        />
        <div
          style={{
            backgroundColor: 'lightgrey',
            width: '100%',
            minHeight: '300px',
            margin: '1.5rem',
            borderRadius: '1rem',
          }}
        />
      </div>
    </ModalProvider>
  );
};

WithSideNavigation.storyName = 'With SideNavigation';
WithSideNavigation.args = {
  ...baseArgs,
  hamburger: {
    activeLabel: 'Close side navigation',
    inactiveLabel: 'Open side navigation',
  },
};
WithSideNavigation.parameters = {
  chromatic: { viewports: [320, 480, 960, 1280] },
};
