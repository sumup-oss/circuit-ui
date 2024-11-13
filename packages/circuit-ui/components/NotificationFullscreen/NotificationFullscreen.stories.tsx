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

import {
  NotificationFullscreen,
  type NotificationFullscreenProps,
} from './NotificationFullscreen.js';

export default {
  title: 'Notification/NotificationFullscreen',
  component: NotificationFullscreen,
  tags: ['status:stable'],
};

export const Base = (args: NotificationFullscreenProps) => (
  <NotificationFullscreen {...args} />
);

Base.args = {
  headline: "The browser you're using is no longer supported",
  body: 'You need a more up-to-date browser to continue using SumUp.',
  image: {
    src: '/images/illustration-update.svg',
    alt: '',
  },
  actions: {
    primary: {
      children: 'Update now',
      onClick: () => action('Clicked'),
    },
  },
};

export const WithHeading1 = (args: NotificationFullscreenProps) => (
  <NotificationFullscreen {...args} />
);

WithHeading1.args = {
  ...Base.args,
  headline: { label: 'I am an h1', as: 'h1' },
};
