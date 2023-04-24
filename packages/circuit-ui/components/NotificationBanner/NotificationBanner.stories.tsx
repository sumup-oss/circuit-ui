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

import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import {
  NotificationBanner,
  NotificationBannerProps,
} from './NotificationBanner.jsx';

export default {
  title: 'Notification/NotificationBanner',
  component: NotificationBanner,
};

export const Base = (args: NotificationBannerProps): JSX.Element => (
  <NotificationBanner {...args} />
);

Base.args = {
  headline: 'Software update',
  body: 'There is updated firmware available for your card reader',
  action: {
    onClick: action('Action clicked'),
    children: 'Update',
    variant: 'primary',
  },
  image: {
    src: '/images/software_update.png',
    alt: 'Update',
    width: '100',
  },
};

export const Dismissable = (args: NotificationBannerProps): JSX.Element => {
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
    src: '/images/referrals.svg',
    alt: 'Refer a friend',
  },
};
