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

import React from 'react';
import { action } from '@storybook/addon-actions';

import Notification from '../Notification';
import Heading from '../Heading';
import Text from '../Text';
import Button from '../Button';

import {
  NotificationBanner,
  NotificationBannerProps,
} from './NotificationBanner';

export default {
  title: 'Components/Notification/NotificationBanner',
  component: NotificationBanner,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Base = (args: NotificationBannerProps) => (
  <NotificationBanner {...args}>
    <Notification variant="success">
      <Heading as="h4" size="kilo" noMargin>
        New Feature — Intelligent Reporting
      </Heading>
      <Text>
        Get automatic insights into your business statistics with one click.
      </Text>
      <Button size="kilo" onClick={action('Action clicked')}>
        Learn more
      </Button>
    </Notification>
  </NotificationBanner>
);
