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

import docs from './InlineNotification.docs.mdx';
import InlineNotification from './InlineNotification';
import Card from '../Card';
import Text from '../Text';

export default {
  title: 'Forms|InlineNotification',
  component: InlineNotification,
  parameters: {
    docs: { page: docs },
    jest: ['InlineNotification']
  }
};

export const base = () => (
  <Card>
    <InlineNotification
      type={InlineNotification.WARNING}
      size={InlineNotification.GIGA}
    >
      Something might go terribly wrong.
    </InlineNotification>
    <Text>Sorry that is how it is.</Text>
  </Card>
);

export const success = () => (
  <InlineNotification type={InlineNotification.SUCCESS}>
    Something has gone wonderfully right.
  </InlineNotification>
);

export const warning = () => (
  <InlineNotification type={InlineNotification.WARNING}>
    Something might go sideways.
  </InlineNotification>
);

export const alert = () => (
  <InlineNotification type={InlineNotification.DANGER}>
    Something has gone terribly wrong.
  </InlineNotification>
);

export const size = () => (
  <InlineNotification
    type={InlineNotification.WARNING}
    size={InlineNotification.MEGA}
  >
    Something might go terribly wrong with a bigger card.
  </InlineNotification>
);
