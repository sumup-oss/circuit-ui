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
import { ShoppingCart, SumUpLogo } from '@sumup/icons';

import { TopNavigation, TopNavigationProps } from './TopNavigation';
import docs from './TopNavigation.docs.mdx';

export default {
  title: 'Navigation/TopNavigation',
  component: TopNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: { page: docs },
  },
  argTypes: {
    children: { control: 'text' },
  },
};

const baseArgs = {
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
  userName: 'Jane Doe',
  userId: 'ID: AC3YULT8',
  profileLabel: 'Open profile menu',
  profileActions: [
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
  links: [
    {
      // eslint-disable-next-line react/display-name
      icon: (props) => <ShoppingCart {...props} size="large" />,
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
    ...args.hamburger,
    isActive: isSideNavigationOpen,
    onClick: () => setSideNavigationOpen((prev) => !prev),
  };
  return <TopNavigation {...args} hamburger={hamburger} />;
};

WithSideNavigation.storyName = 'With SideNavigation';
WithSideNavigation.args = {
  ...baseArgs,
  pageTitle: 'Home',
  hamburger: {
    activeLabel: 'Close side navigation',
    inactiveLabel: 'Open side navigation',
  },
};
