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

import { Stack } from '../../../../.storybook/components/index.js';

import {
  NotificationInline,
  type NotificationInlineProps,
} from './NotificationInline.js';

export default {
  title: 'Notification/NotificationInline',
  component: NotificationInline,
};

const variants = ['info', 'success', 'warning', 'danger'] as const;

export const Base = (args: NotificationInlineProps) => (
  <NotificationInline {...args} isVisible={true} />
);

Base.args = {
  body: 'You successfully updated your data.',
  variant: 'info',
} as NotificationInlineProps;

export const Variants = (args: NotificationInlineProps) => (
  <Stack vertical>
    {variants.map((variant) => (
      <NotificationInline
        key={variant}
        {...args}
        isVisible={true}
        variant={variant}
      />
    ))}
  </Stack>
);

Variants.args = {
  body: 'This is an inline message',
} as NotificationInlineProps;

export const Dismissable = (args: NotificationInlineProps): JSX.Element => {
  const [isVisible, setVisible] = useState(args.isVisible);
  return (
    <NotificationInline
      {...args}
      isVisible={isVisible}
      onClose={() => setVisible(false)}
      closeButtonLabel="Close notification"
    />
  );
};

Dismissable.args = {
  body: 'You successfully updated your data.',
  variant: 'info',
} as NotificationInlineProps;

export const WithHeadlineAndAction = (
  args: NotificationInlineProps,
): JSX.Element => <NotificationInline {...args} isVisible={args.isVisible} />;

WithHeadlineAndAction.args = {
  headline: 'Information',
  body: 'You successfully updated your data.',
  variant: 'info',
  action: {
    onClick: action('Action clicked'),
    children: 'Click here',
  },
} as NotificationInlineProps;
