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

import docs from './Notification.docs.mdx';
import Notification, { NotificationIcon, NotificationButton } from '.';
import Heading from '../Heading';
import Text from '../Text';
import Button from '../Button';

export default {
  title: 'Components/Notification',
  component: Notification,
  parameters: {
    docs: { page: docs },
    jest: ['Notification']
  }
};

export const base = () => (
  <Notification>
    <div>
      <Heading as="h4" size={Heading.KILO} noMargin>
        New Feature — Intelligent Reporting
      </Heading>
      <Text noMargin>
        Get automatic insights into your business statistics with one click.
      </Text>
    </div>
  </Notification>
);

export const success = () => (
  <Notification>
    <NotificationIcon type={NotificationIcon.SUCCESS} />
    <Heading size={Heading.KILO} as="h4" noMargin>
      Transaction successfully refunded
    </Heading>
  </Notification>
);

export const warning = () => (
  <Notification>
    <NotificationIcon type={NotificationIcon.WARNING} />
    <Heading size={Heading.KILO} as="h4" noMargin>
      You still need to verify your account
    </Heading>
    <NotificationButton>
      <Button
        size={Button.KILO}
        onClick={e => {
          action('Button clicked')(e);
        }}
      >
        Verify account
      </Button>
    </NotificationButton>
  </Notification>
);

export const alert = () => (
  <Notification>
    <NotificationIcon type={NotificationIcon.ERROR} />
    <Heading size={Heading.KILO} as="h4" noMargin>
      Your transaction has failed
    </Heading>
    <NotificationButton>
      <Button
        size={Button.KILO}
        onClick={e => {
          action('Button clicked')(e);
        }}
      >
        Try again
      </Button>
    </NotificationButton>
  </Notification>
);
