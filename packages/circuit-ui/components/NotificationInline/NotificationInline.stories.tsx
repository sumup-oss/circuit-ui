/* eslint-disable array-callback-return */
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

import styled from '@emotion/styled';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import {
  NotificationInline,
  NotificationInlineProps,
} from './NotificationInline';
import docs from './NotificationInline.docs.mdx';

export default {
  title: 'Notification/NotificationInline',
  parameters: {
    docs: { page: docs },
  },
  component: NotificationInline,
};

const variants = ['info', 'confirm', 'notify', 'alert'] as const;

const StackInlineMessages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const Variants = (args: NotificationInlineProps) => (
  <StackInlineMessages>
    {variants.map((variant) => (
      <NotificationInline
        key={variant}
        {...args}
        isVisible={true}
        variant={variant}
      />
    ))}
  </StackInlineMessages>
);

Variants.args = {
  body: 'This is a toast message',
} as NotificationInlineProps;

export const Base = (args: NotificationInlineProps) => (
  <NotificationInline {...args} isVisible={true} />
);

Base.args = {
  headline: 'Information',
  body: 'You successfully updated your data.',
  variant: 'info',
  action: {
    onClick: action('Action clicked'),
    children: 'Click here',
  },
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
