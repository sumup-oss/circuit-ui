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

import {
  ComparisonTable,
  type ComparisonTableProps,
} from './ComparisonTable.js';

export default {
  title: 'Brand/ComparisonTable',
  component: ComparisonTable,
  tags: ['status:stable'],
};

const baseProps: ComparisonTableProps = {
  caption: 'Compare plans',
  cols: [
    {
      title: 'Product',
      description: 'Free',
      cta: {
        children: 'Get started',
        href: 'https://sumup.com',
      },
    },
    {
      title: 'Product',
      tier: { variant: 'plus' },
      description: '14.99$/month',
      cta: {
        children: 'Join now',
        href: 'https://sumup.com/plus',
      },
    },
    {
      title: 'Product Premium',
      tier: { variant: 'plus' },
      description: '24.99$/month',
      cta: {
        children: 'Join now',
        href: 'https://sumup.com/pro',
      },
    },
  ],
  rows: [
    {
      title: 'Banking basics',
      features: [
        {
          featureDescription: {
            title: 'Free business account',
            description: 'get started right away',
            toggleTip: {
              component: (props) => (
                <IconButton {...props} icon={Help} variant="tertiary" size="s">
                  View details for Free business account
                </IconButton>
              ),
              headline: 'What is a chargeback?',
              body: 'A chargeback is a return of money to a payer of a transaction, especially a credit card transaction.',
              action: {
                children: 'Learn more',
                navigationIcon: ArrowSlanted,
                href: 'https://help.sumup.com/en-US/articles/3ztthQLEXab3K0vUaQqgwx-chargeback-faq',
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
            title: 'Free physical or virtual Mastercard',
          },
          values: [
            { value: true, label: 'available' },
            { value: true, label: 'available' },
            { value: true, label: 'available' },
          ],
        },
        {
          featureDescription: {
            title: 'Free instant transfers',
          },
          values: [
            { value: true, label: 'available' },
            { value: true, label: 'available' },
            { value: true, label: 'available' },
          ],
        },
        {
          featureDescription: {
            title: 'Scheduled payments',
          },
          values: [
            { value: false, label: 'uavailable' },
            { value: true, label: 'available' },
            { value: true, label: 'available' },
          ],
        },
        {
          featureDescription: {
            title: 'Payment reminders',
          },
          values: [
            { value: false, label: 'uavailable' },
            { value: true, label: 'available' },
            { value: true, label: 'available' },
          ],
        },
      ],
    },
    {
      title: 'Product catalog',
      features: [
        {
          featureDescription: {
            title: 'Variants',
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
            title: 'Modifiers',
            toggleTip: {
              component: (props) => (
                <IconButton {...props} icon={Help} variant="tertiary" size="s">
                  View details for Modifiers
                </IconButton>
              ),
              headline: 'What are variants ?',
              body: 'A variant is a product that is similar to another product but has some differences.',
              action: {
                children: 'Learn more',
                navigationIcon: ArrowSlanted,
                href: 'https://help.sumup.com/en-US/articles/3ztthQLEXab3K0vUaQqgwx-chargeback-faq',
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
            title: 'Units of mesure',
          },
          values: [
            { value: false, label: 'uavailable' },
            { value: true, label: 'available' },
            { value: true, label: 'available' },
          ],
        },
        {
          featureDescription: {
            title: 'Eat-in & takeaway',
          },
          values: [
            { value: false, label: 'uavailable' },
            { value: true, label: 'available' },
            { value: true, label: 'available' },
          ],
        },
        {
          featureDescription: {
            title: 'Fees',
          },
          values: [
            { value: '1.55%', label: '1.55%' },
            { value: '0.99%', label: '0.99%' },
            { value: '0.55%', label: '0.55%' },
          ],
        },
      ],
    },
    {
      title: 'Bookings',
      features: [
        {
          featureDescription: {
            title: 'Variants',
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
            title: 'Modifiers',
            toggleTip: {
              component: (props) => (
                <IconButton {...props} icon={Help} variant="tertiary" size="s">
                  View details for Modifiers
                </IconButton>
              ),
              headline: 'What are variants ?',
              body: 'A variant is a product that is similar to another product but has some differences.',
              action: {
                children: 'Learn more',
                navigationIcon: ArrowSlanted,
                href: 'https://help.sumup.com/en-US/articles/3ztthQLEXab3K0vUaQqgwx-chargeback-faq',
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
            title: 'Units of mesure',
          },
          values: [
            { value: false, label: 'uavailable' },
            { value: true, label: 'available' },
            { value: true, label: 'available' },
          ],
        },
        {
          featureDescription: {
            title: 'Eat-in & takeaway',
          },
          values: [
            { value: false, label: 'uavailable' },
            { value: true, label: 'available' },
            { value: true, label: 'available' },
          ],
        },
        {
          featureDescription: {
            title: 'Fees',
          },
          values: [
            { value: '1.55%', label: '1.55%' },
            { value: '0.99%', label: '0.99%' },
            { value: '0.55%', label: '0.55%' },
          ],
        },
      ],
    },
    {
      title: 'Cash management',
      features: [
        {
          featureDescription: {
            title: 'Variants',
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
            title: 'Modifiers',
            toggleTip: {
              component: (props) => (
                <IconButton {...props} icon={Help} variant="tertiary" size="s">
                  View details for Modifiers
                </IconButton>
              ),
              headline: 'What are variants ?',
              body: 'A variant is a product that is similar to another product but has some differences.',
              action: {
                children: 'Learn more',
                navigationIcon: ArrowSlanted,
                href: 'https://help.sumup.com/en-US/articles/3ztthQLEXab3K0vUaQqgwx-chargeback-faq',
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
            title: 'Units of mesure',
          },
          values: [
            { value: false, label: 'uavailable' },
            { value: true, label: 'available' },
            { value: true, label: 'available' },
          ],
        },
        {
          featureDescription: {
            title: 'Eat-in & takeaway',
          },
          values: [
            { value: false, label: 'uavailable' },
            { value: true, label: 'available' },
            { value: true, label: 'available' },
          ],
        },
        {
          featureDescription: {
            title: 'Fees',
          },
          values: [
            { value: '1.55%', label: '1.55%' },
            { value: '0.99%', label: '0.99%' },
            { value: '0.55%', label: '0.55%' },
          ],
        },
      ],
    },
  ],
};

export const Base = (args: ComparisonTableProps) => (
  <ComparisonTable style={{ width: '1000px' }} {...args} />
);

Base.args = baseProps;
