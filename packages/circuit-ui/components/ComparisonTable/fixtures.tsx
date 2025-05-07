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

export const basicPlan: TableHeaderProps = {
  title: 'Basic',
  id: 'basic',
  description: 'Essential features',
};

export const standardPlan: TableHeaderProps = {
  title: 'Standard',
  id: 'standard',
  description: 'Most popular',
  action: {
    children: 'Get started',
    href: '#',
  },
};

export const premiumPlan: TableHeaderProps = {
  title: 'Premium',
  id: 'premium',
  description: 'Full feature set',
  action: {
    children: 'Get started',
    href: '#',
  },
};

export const coreFeature: Feature = {
  featureDescription: {
    label: 'Core functionality',
    description: 'essential features included',
    toggletip: {
      component: (props) => (
        <IconButton {...props} icon={Help} variant="tertiary" size="s">
          View details for Core functionality
        </IconButton>
      ),
      headline: 'Additional information',
      body: 'This feature provides essential functionality for all users.',
      action: {
        children: 'Learn more',
        navigationIcon: ArrowSlanted,
        href: '#',
        target: '_blank',
      },
      offset: 8,
    },
  },
  values: [
    { value: true, label: 'included' },
    { value: true, label: 'included' },
  ],
};

export const advancedFeature: Feature = {
  featureDescription: {
    label: 'Advanced features',
  },
  values: [
    { value: true, label: 'included' },
    { value: true, label: 'included' },
  ],
};

export const premiumFeature: Feature = {
  featureDescription: {
    label: 'Premium features',
  },
  values: [
    { value: true, label: 'included' },
    { value: true, label: 'included' },
  ],
};

export const limitedFeature: Feature = {
  featureDescription: {
    label: 'Limited access',
  },
  values: [
    { value: false, label: 'not included' },
    { value: true, label: 'included' },
  ],
};

export const exclusiveFeature: Feature = {
  featureDescription: {
    label: 'Exclusive access',
  },
  values: [
    { value: false, label: 'not included' },
    { value: false, label: 'not included' },
  ],
};

export const essentialFeaturesSection: FeatureSection = {
  title: 'Essential Features',
  features: [
    coreFeature,
    advancedFeature,
    premiumFeature,
    limitedFeature,
    exclusiveFeature,
  ],
};

export const customizationSection: FeatureSection = {
  title: 'Customization',
  features: [
    {
      featureDescription: {
        label: 'Basic customization',
        description: 'limited options',
      },
      values: [
        { value: true, label: 'included' },
        { value: true, label: 'included' },
        { value: true, label: 'included' },
      ],
    },
    {
      featureDescription: {
        label: 'Advanced customization',
        toggletip: {
          component: (props) => (
            <IconButton {...props} icon={Help} variant="tertiary" size="s">
              View details for Advanced customization
            </IconButton>
          ),
          headline: 'Customization options',
          body: 'Advanced customization provides more flexibility and control over your experience.',
          action: {
            children: 'Learn more',
            navigationIcon: ArrowSlanted,
            href: '#',
            target: '_blank',
          },
          offset: 8,
        },
      },
      values: [
        { value: false, label: 'not included' },
        { value: true, label: 'included' },
        { value: true, label: 'included' },
      ],
    },
    {
      featureDescription: {
        label: 'Full customization',
      },
      values: [
        { value: false, label: 'not included' },
        { value: false, label: 'not included' },
        { value: true, label: 'included' },
      ],
    },
  ],
};

export const supportSection: FeatureSection = {
  title: 'Support',
  features: [
    {
      featureDescription: {
        label: 'Email support',
      },
      values: [
        { value: true, label: 'included' },
        { value: true, label: 'included' },
        { value: true, label: 'included' },
      ],
    },
    {
      featureDescription: {
        label: 'Priority support',
        description: '24/7 availability',
      },
      values: [
        { value: false, label: 'not included' },
        { value: true, label: 'included' },
        { value: true, label: 'included' },
      ],
    },
    {
      featureDescription: {
        label: 'Dedicated support',
      },
      values: [
        { value: false, label: 'not included' },
        { value: false, label: 'not included' },
        { value: true, label: 'included' },
      ],
    },
  ],
};

export const analyticsSection: FeatureSection = {
  title: 'Analytics',
  features: [
    {
      featureDescription: {
        label: 'Basic reporting',
      },
      values: [
        { value: true, label: 'included' },
        { value: true, label: 'included' },
        { value: true, label: 'included' },
      ],
    },
    {
      featureDescription: {
        label: 'Advanced analytics',
        description: 'Detailed insights and custom reports',
      },
      values: [
        { value: false, label: 'not included' },
        { value: true, label: 'included' },
        { value: true, label: 'included' },
      ],
    },
    {
      featureDescription: {
        label: 'Custom dashboards',
      },
      values: [
        { value: false, label: 'not included' },
        { value: false, label: 'not included' },
        { value: true, label: 'included' },
      ],
    },
  ],
};
