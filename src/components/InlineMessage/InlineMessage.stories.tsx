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

import UntypedCard from '../Card';

import docs from './InlineMessage.docs.mdx';
import { InlineMessage } from './InlineMessage';

// FIXME: Remove once the Card component has been migrated to TypeScript.
const Card = UntypedCard as any;

export default {
  title: 'Forms/InlineMessage',
  component: InlineMessage,
  parameters: {
    docs: { page: docs },
  },
};

export const base = () => (
  <Card>
    <InlineMessage variant="warning">
      Something might go terribly wrong.
    </InlineMessage>
  </Card>
);

export const variants = () => (
  <Card>
    <InlineMessage variant="success">
      Something has gone wonderfully right.
    </InlineMessage>

    <InlineMessage variant="warning">
      Something might go sideways.
    </InlineMessage>

    <InlineMessage variant="danger">
      Something has gone terribly wrong.
    </InlineMessage>
  </Card>
);

export const sizes = () => (
  <>
    <Card spacing="mega">
      <InlineMessage variant="success" size="mega">
        Something has gone wonderfully right with a smaller card.
      </InlineMessage>
    </Card>
    <Card>
      <InlineMessage variant="success" size="giga">
        Something has gone wonderfully right with a larger card.
      </InlineMessage>
    </Card>
  </>
);
