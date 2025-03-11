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

import { ArrowSlanted, Help } from '@sumup-oss/icons';

import { IconButton } from '../Button/index.js';

import type { TableHeaderProps } from './components/TableHeader/TableHeader.js';
import type { FeatureSection } from './components/PlanTable/PlanTable.js';
import type { FeatureRowProps } from './components/TableRow/FeatureRow.js';

export const posPlan: TableHeaderProps = {
  title: 'POS',
  id: 'pos',
  description: 'Free',
  callToAction: {
    children: 'Get started',
    href: 'https://sumup.com',
  },
};

export const posPlusPlan: TableHeaderProps = {
  title: 'POS',
  id: 'pos_plus',
  tier: { variant: 'plus' },
  description: '15$/month',
  callToAction: {
    children: 'Join now',
    href: 'https://sumup.com',
  },
};

export const posProPlan: TableHeaderProps = {
  title: 'POS Pro',
  id: 'pos_pro',
  description: '25$/month',
  callToAction: {
    children: 'Join now',
    href: 'https://sumup.com',
  },
};

export const freeBusinessAccountFeature: FeatureRowProps = {
  featureDescription: {
    label: 'Free business account',
    description: 'get started right away',
    toggletip: {
      component: (props) => (
        <IconButton {...props} icon={Help} variant="tertiary" size="s">
          View details for Free business account
        </IconButton>
      ),
      headline: 'Some additional information',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      action: {
        children: 'Learn more',
        navigationIcon: ArrowSlanted,
        href: 'https://help.sumup.com/',
        target: '_blank',
      },
      offset: 8,
    },
  },
  values: [
    { value: true, label: 'available' },
    { value: true, label: 'available' },
    { value: true, label: 'available' },
  ],
};

export const freePhysicalCardFeature: FeatureRowProps = {
  featureDescription: {
    label: 'Free physical or virtual Mastercard',
  },
  values: [
    { value: true, label: 'available' },
    { value: true, label: 'available' },
    { value: true, label: 'available' },
  ],
};

export const freeInstantTransfersFeature: FeatureRowProps = {
  featureDescription: {
    label: 'Free instant transfers',
  },
  values: [
    { value: true, label: 'available' },
    { value: true, label: 'available' },
    { value: true, label: 'available' },
  ],
};

export const scheduledPaymentsFeature: FeatureRowProps = {
  featureDescription: {
    label: 'Scheduled payments',
  },
  values: [
    { value: false, label: 'unavailable' },
    { value: true, label: 'available' },
    { value: true, label: 'available' },
  ],
};

export const paymentRemindersFeature: FeatureRowProps = {
  featureDescription: {
    label: 'Payment reminders',
  },
  values: [
    { value: false, label: 'unavailable' },
    { value: true, label: 'available' },
    { value: true, label: 'available' },
  ],
};

export const bankingBasicsSection: FeatureSection = {
  title: 'Banking basics',
  features: [
    freeBusinessAccountFeature,
    freePhysicalCardFeature,
    freeInstantTransfersFeature,
    scheduledPaymentsFeature,
    paymentRemindersFeature,
  ],
};

export const productCatalogSection: FeatureSection = {
  title: 'Product catalog',
  features: [
    {
      featureDescription: {
        label: 'Variants',
        description: 'add variations',
      },
      values: [
        { value: true, label: 'available' },
        { value: true, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
    {
      featureDescription: {
        label: 'Modifiers',
        toggletip: {
          component: (props) => (
            <IconButton {...props} icon={Help} variant="tertiary" size="s">
              View details for Modifiers
            </IconButton>
          ),
          headline: 'Some additional information',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
          action: {
            children: 'Learn more',
            navigationIcon: ArrowSlanted,
            href: 'https://help.sumup.com/',
            target: '_blank',
          },
          offset: 8,
        },
      },

      values: [
        { value: true, label: 'available' },
        { value: true, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
    {
      featureDescription: {
        label: 'Units of mesure',
      },
      values: [
        { value: false, label: 'unavailable' },
        { value: true, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
    {
      featureDescription: {
        label: 'Eat-in & takeaway',
      },
      values: [
        { value: false, label: 'unavailable' },
        { value: true, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
    {
      featureDescription: {
        label: 'Fees',
      },
      values: [
        { value: '1.55%', label: '1.55%' },
        { value: '0.99%', label: '0.99%' },
        { value: '0.55%', label: '0.55%' },
      ],
    },
  ],
};

export const bookingsSection: FeatureSection = {
  title: 'Bookings',
  features: [
    {
      featureDescription: {
        label: 'Calendar',
      },
      values: [
        { value: false, label: 'available' },
        { value: true, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
    {
      featureDescription: {
        label: 'Automated communications',
        description: 'Emails, SMS, and push notifications',
      },

      values: [
        { value: false, label: 'available' },
        { value: true, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
    {
      featureDescription: {
        label: 'Automated appointments',
      },

      values: [
        { value: false, label: 'available' },
        { value: false, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
  ],
};

export const cashManagementSection: FeatureSection = {
  title: 'Cash management',
  features: [
    {
      featureDescription: {
        label: 'Virtual cash drawer',
      },
      values: [
        { value: false, label: 'available' },
        { value: true, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
    {
      featureDescription: {
        label: 'Cash Movements history',
      },

      values: [
        { value: false, label: 'available' },
        { value: true, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
    {
      featureDescription: {
        label: 'Daily cash reconciliation report',
      },

      values: [
        { value: false, label: 'available' },
        { value: true, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
    {
      featureDescription: {
        label: 'Multi device management',
      },
      values: [
        { value: false, label: 'unavailable' },
        { value: false, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
  ],
};
