/**
 * Copyright 2026, SumUp Ltd.
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

import { Info, Sparkles } from '@sumup-oss/icons';

import { Stack } from '../../../../.storybook/components/index.js';
import { Anchor } from '../Anchor/Anchor.js';

import { Callout, type CalloutProps } from './Callout.js';

export default {
  title: 'Notification/Callout',
  component: Callout,
  tags: ['status:experimental'],
};

const colors = ['confirm', 'neutral', 'notify', 'alert', 'promo'] as const;

export const Base = (args: CalloutProps) => <Callout {...args} />;

Base.args = {
  body: 'Callout is a newly available component for static inline guidance or emphasis.',
  color: 'promo',
  icon: Sparkles,
} as CalloutProps;

Base.parameters = {
  chromatic: {
    // covered in the Colors story
    disableSnapshot: true,
  },
};

export const Colors = (args: CalloutProps) => (
  <Stack vertical>
    {colors.map((color) => (
      <Callout key={color} {...args} color={color} />
    ))}
  </Stack>
);

Colors.args = {
  body: 'This is a callout message',
  icon: Info,
} as CalloutProps;

export const WithRichContent = (args: CalloutProps) => <Callout {...args} />;

WithRichContent.args = {
  body: (
    <div id="callout-rich-content">
      Callouts can include{' '}
      <Anchor href="#callout-rich-content">links to related content</Anchor>.
    </div>
  ),
  color: 'promo',
  icon: Sparkles,
} as CalloutProps;
