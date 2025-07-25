/**
 * Copyright 2021, SumUp Ltd.
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

import { action } from 'storybook/actions';
import { useState } from 'react';

import { modes } from '../../../../.storybook/modes.js';

import {
  NotificationBanner,
  type NotificationBannerProps,
} from './NotificationBanner.js';

export default {
  title: 'Notification/NotificationBanner',
  component: NotificationBanner,
  tags: ['status:stable'],
  parameters: {
    layout: 'padded',
    chromatic: {
      modes: {
        mobile: modes.smallMobile,
        desktop: modes.desktop,
      },
    },
  },
};

export const Base = (args: NotificationBannerProps) => (
  <NotificationBanner {...args} />
);

Base.args = {
  headline: 'Software update',
  body: 'There is updated firmware available for your card reader. Please update to continue using your card reader.',
  action: {
    onClick: action('Action clicked'),
    children: 'Update',
    variant: 'primary',
  },
  image: {
    src: '/images/illustration-update.svg',
    alt: 'Update',
    width: '120',
  },
};

export const Dismissable = (args: NotificationBannerProps) => {
  const [isVisible, setVisible] = useState(args.isVisible);
  return (
    <NotificationBanner
      {...args}
      isVisible={isVisible}
      onClose={() => setVisible(false)}
      closeButtonLabel="Close Notification"
    />
  );
};

Dismissable.args = {
  headline: 'Refer a friend, get rewarded',
  variant: 'promotional',
  action: {
    onClick: action('Action clicked'),
    children: 'Click here',
    variant: 'tertiary',
  },
  image: {
    src: '/images/illustration-referrals.svg',
    alt: 'Refer a friend',
  },
};
