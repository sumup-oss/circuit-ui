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
import type {
  Feature,
  FeatureSection,
} from './components/PlanTable/PlanTable.js';

export const posPlan: TableHeaderProps = {
  title: 'Free',
  id: 'free',
  description: '$0 / month',
};

export const posPlusPlan: TableHeaderProps = {
  title: 'POS',
  id: 'pos_plus',
  tier: { variant: 'plus' },
  description: '$15/month',
  action: {
    children: 'Join now',
    href: 'https://sumup.com',
  },
};

export const posProPlan: TableHeaderProps = {
  title: 'POS Pro',
  id: 'pos_pro',
  description: '$25/month',
  action: {
    children: 'Join now',
    href: 'https://sumup.com',
  },
};

export const freeBusinessAccountFeature: Feature = {
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

export const freePhysicalCardFeature: Feature = {
  featureDescription: {
    label: 'Free physical or virtual Mastercard',
  },
  values: [
    { value: true, label: 'available' },
    { value: true, label: 'available' },
    { value: true, label: 'available' },
  ],
};

export const freeInstantTransfersFeature: Feature = {
  featureDescription: {
    label: 'Free instant transfers',
  },
  values: [
    { value: true, label: 'available' },
    { value: true, label: 'available' },
    { value: true, label: 'available' },
  ],
};

export const scheduledPaymentsFeature: Feature = {
  featureDescription: {
    label: 'Scheduled payments',
  },
  values: [
    { value: false, label: 'unavailable' },
    { value: true, label: 'available' },
    { value: true, label: 'available' },
  ],
};

export const paymentRemindersFeature: Feature = {
  featureDescription: {
    label: 'Payment reminders',
  },
  values: [
    { value: false, label: 'unavailable' },
    { value: false, label: 'available' },
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
        label: 'Catalog with item images',
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
        label: 'Sell with Variants, modifiers, and units of measure',
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
        label: 'Eat-in/takeaway prices',
      },
      values: [
        { value: false, label: 'unavailable' },
        { value: true, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
    {
      featureDescription: {
        label: 'Import/export items',
      },
      values: [
        { value: false, label: 'unavailable' },
        { value: true, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
    {
      featureDescription: {
        label: 'Item creation by taking a photo',
      },
      values: [
        { value: false, label: 'unavailable' },
        { value: false, label: 'unavailable' },
        { value: true, label: 'available' },
      ],
    },
  ],
};

export const moneyManagement: FeatureSection = {
  title: 'Money Management',
  features: [
    {
      featureDescription: {
        label: 'Expense cards',
      },
      values: [
        { value: false, label: 'available' },
        '3 included',
        '5 included',
      ],
    },
    {
      featureDescription: {
        label: 'Additional balances',
        description: 'Emails, SMS, and push notifications',
      },

      values: [
        { value: false, label: 'available' },
        '3 included',
        '5 included',
      ],
    },
    {
      featureDescription: {
        label: 'Bulk transfers',
      },

      values: [
        { value: false, label: 'available' },
        { value: true, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
  ],
};

export const invoicingSection: FeatureSection = {
  title: 'Invoicing',
  features: [
    {
      featureDescription: {
        label: 'Send invoices to get paid',
        description: 'Includes electronic invoices',
      },
      values: ['4', 'unlimited', 'unlimited'],
    },
    {
      featureDescription: {
        label: 'Invoices as proof of payment',
        description: 'Includes electronic invoices',
      },

      values: ['unlimited', 'unlimited', 'unlimited'],
    },
    {
      featureDescription: {
        label: 'Get paid via invoices by bank transfer',
      },

      values: [
        'With the SumUp Business Account',
        'With any bank account',
        'With any bank account',
      ],
    },
    {
      featureDescription: {
        label: 'Create recurring invoices',
      },
      values: [
        { value: false, label: 'unavailable' },
        { value: false, label: 'available' },
        { value: true, label: 'available' },
      ],
    },
  ],
};
