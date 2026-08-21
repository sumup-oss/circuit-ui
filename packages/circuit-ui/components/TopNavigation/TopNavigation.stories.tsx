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
import { action } from 'storybook/actions';
import { Settings } from '@sumup-oss/icons';

import { modes } from '../../../../.storybook/modes.js';
import { SideNavigation } from '../SideNavigation/index.js';
import { baseArgs as sideNavigationProps } from '../SideNavigation/SideNavigation.stories.js';
import { Body } from '../Body/index.js';
import type { HamburgerProps } from '../Hamburger/Hamburger.js';
import { Headline } from '../Headline/index.js';

import { TopNavigation, type TopNavigationProps } from './TopNavigation.js';
import { SumUpLogo } from '../SumUpLogo/SumUpLogo.js';
import classes from './TopNavigationStories.module.css';
import { useMedia } from '../../hooks/useMedia/index.js';

export default {
  title: 'Navigation/TopNavigation',
  component: TopNavigation,
  tags: ['status:stable'],
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      modes: {
        smallMobile: modes.smallMobile,
        tablet: modes.tablet,
      },
    },
  },
  excludeStories: /.*Args$/,
};

function CustomComponent() {
  return (
    <Body size="s" weight="semibold">
      Test account
    </Body>
  );
}

const Logo = () => {
  const isMobile = useMedia('(max-width: 767px)');
  return (
    <a
      href="https://sumup.com"
      aria-label="Visit SumUp's website"
      target="_blank"
      rel="noreferrer"
      style={{
        height: 'var(--cui-icon-sizes-l)',
        display: 'block',
        color: 'var(--cui-fg-normal)',
      }}
    >
      <SumUpLogo variant={isMobile ? 'short' : 'full'} />
    </a>
  );
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

export const baseArgs: TopNavigationProps = {
  isLoading: false,
  logo: <Logo />,
  links: [
    {
      key: 'custom',
      children: <CustomComponent />,
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/settings',
      onClick: action('Settings'),
    },
  ],
  skipNavigationHref: '#main-content',
  skipNavigationLabel: 'Skip navigation',
};

export const Base = (args: TopNavigationProps) => (
  <>
    <TopNavigation {...args} />
    {placeHolderContent}
  </>
);

Base.args = baseArgs;

export const WithSideNavigation = (args: TopNavigationProps) => {
  const [isSideNavigationOpen, setSideNavigationOpen] = useState(false);
  const hamburger = {
    ...(args.hamburger as HamburgerProps),
    isActive: isSideNavigationOpen,
    onClick: () => setSideNavigationOpen((prev) => !prev),
  };
  return (
    <>
      <SideNavigation
        {...sideNavigationProps}
        isOpen={isSideNavigationOpen}
        onClose={() => setSideNavigationOpen(false)}
        skipNavigationHref="#main-content"
        skipNavigationLabel="Skip navigation"
      />
      <div className={classes.container}>
        <TopNavigation {...args} hamburger={hamburger} />

        {placeHolderContent}
      </div>
    </>
  );
};

WithSideNavigation.storyName = 'With SideNavigation';
WithSideNavigation.args = {
  ...baseArgs,
  logo: undefined,
  skipNavigationHref: undefined,
  skipNavigationLabel: undefined,
  hamburger: {
    activeLabel: 'Close side navigation',
    inactiveLabel: 'Open side navigation',
  },
};
