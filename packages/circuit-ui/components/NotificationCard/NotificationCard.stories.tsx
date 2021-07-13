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

import Notification from '../Notification';
import Headline from '../Headline';
import Body from '../Body';
import Button from '../Button';
import { spacing } from '../../styles/style-mixins';

import { NotificationCard, NotificationCardProps } from './NotificationCard';

export default {
  title: 'Components/Notification/NotificationCard',
  component: NotificationCard,
};

export const Base = (args: NotificationCardProps) => (
  <NotificationCard {...args}>
    <Notification variant="success">
      <Headline as="h4" size="four" noMargin>
        New Feature — Intelligent Reporting
      </Headline>
      <Body noMargin css={spacing({ bottom: 'mega' })}>
        Get automatic insights into your business statistics with one click.
      </Body>
      <Button size="kilo" onClick={action('Action clicked')}>
        Learn more
      </Button>
    </Notification>
  </NotificationCard>
);
