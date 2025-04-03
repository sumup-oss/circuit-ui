/**
 * Copyright 2025, SumUp Ltd.
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

import { Shop, SumUpLogo } from '@sumup-oss/icons';
import { action } from '@storybook/addon-actions';

import { modes } from '../../../../.storybook/modes.js';
import {
  TopNavigation,
  type TopNavigationProps,
} from '../TopNavigation/index.js';

import {
  ComparisonTable,
  type ComparisonTableProps,
} from './ComparisonTable.js';
import {
  basicPlan,
  standardPlan,
  premiumPlan,
  essentialFeaturesSection,
  customizationSection,
  supportSection,
  analyticsSection,
} from './fixtures.js';

export default {
  title: 'Brand/ComparisonTable',
  component: ComparisonTable,
  tags: ['status:stable'],
  parameters: {
    chromatic: {
      modes: {
        mobile: modes.smallMobile,
        desktop: modes.desktop,
      },
    },
  },
};

const baseProps: ComparisonTableProps = {
  caption: 'Compare plans',
  headers: [basicPlan, standardPlan],
  sections: [essentialFeaturesSection],
  showAllFeaturesLabel: 'Show all features',
  selectSecondPlanLabel: 'Select a second plan',
  selectFirstPlanLabel: 'Select a first plan',
};

export const Base = (args: ComparisonTableProps) => (
  <ComparisonTable {...args} />
);
Base.args = baseProps;
export const Collapsed = (args: ComparisonTableProps) => (
  <ComparisonTable {...args} />
);

Collapsed.args = {
  ...baseProps,
  headers: [basicPlan, standardPlan, premiumPlan],
  sections: [customizationSection, supportSection, analyticsSection],
};

const topNavigationProps: TopNavigationProps = {
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
        href: '/profile',
        onClick: action('View profile'),
        children: 'View profile',
      },
      {
        href: '/settings',
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
  skipNavigationHref: '#main-content',
  skipNavigationLabel: 'Skip navigation',
};

export const WithTopNavigation = (args: ComparisonTableProps) => (
  <>
    <TopNavigation {...topNavigationProps} />
    <ComparisonTable {...args} />
  </>
);

WithTopNavigation.args = {
  ...baseProps,
  headers: [basicPlan, standardPlan, premiumPlan],
  sections: [customizationSection, supportSection, analyticsSection],
};
