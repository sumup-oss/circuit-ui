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

import docs from './InlineMessage.docs.mdx';
import InlineMessage from './InlineMessage';
import Card from '../Card';
import Text from '../Text';

export default {
  title: 'Forms/InlineMessage',
  component: InlineMessage,
  parameters: {
    docs: { page: docs },
    jest: ['InlineMessage']
  }
};

export const base = () => (
  <Card>
    <InlineMessage type={InlineMessage.WARNING} size={InlineMessage.GIGA}>
      Something might go terribly wrong.
    </InlineMessage>
    <Text>Sorry that is how it is.</Text>
  </Card>
);

export const success = () => (
  <InlineMessage type={InlineMessage.SUCCESS}>
    Something has gone wonderfully right.
  </InlineMessage>
);

export const warning = () => (
  <InlineMessage type={InlineMessage.WARNING}>
    Something might go sideways.
  </InlineMessage>
);

export const alert = () => (
  <InlineMessage type={InlineMessage.DANGER}>
    Something has gone terribly wrong.
  </InlineMessage>
);

export const size = () => (
  <InlineMessage type={InlineMessage.WARNING} size={InlineMessage.MEGA}>
    Something might go terribly wrong with a bigger card.
  </InlineMessage>
);
