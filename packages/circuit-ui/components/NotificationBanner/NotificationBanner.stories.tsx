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

import { action } from '@storybook/addon-actions';

import {
  NotificationBanner,
  NotificationBannerProps,
} from './NotificationBanner';

export default {
  title: 'Components/Notification/NotificationBanner',
  component: NotificationBanner,
};

export const Base = (args: NotificationBannerProps) => (
  <NotificationBanner {...args}></NotificationBanner>
);

Base.args = {
  headline: 'Test',
  body: 'There is updated firmware available for your card reader',
  action: {
    onClick: () => alert('Heloooo'),
    children: 'Update',
    variant: 'primary',
  },
  src: 'https://source.unsplash.com/EcWFOYOpkpY/200x200',
  alt: 'Cup of coffee',
  onClose: action('Notification closed'),
  closeButtonLabel: 'Close notification',
};
