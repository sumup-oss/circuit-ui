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

import { screen, userEvent, within } from '@storybook/test';
import isChromatic from 'chromatic/isChromatic';

import { Stack } from '../../../../.storybook/components/index.js';
import Button from '../Button/index.js';
import { ToastProvider } from '../ToastContext/index.js';

import {
  useNotificationToast,
  NotificationToast,
  type NotificationToastProps,
} from './NotificationToast.js';

export default {
  title: 'Notification/NotificationToast',
  component: NotificationToast,
  argTypes: {
    position: {
      options: ['top', 'top-right', 'bottom'],
      control: { type: 'select' },
    },
  },
};

const TOASTS = [
  {
    body: 'An update is available.',
    variant: 'info',
    iconLabel: '',
  },
  {
    body: 'Unexpected error occurred.',
    variant: 'danger',
    iconLabel: '',
  },
  {
    body: 'There was a problem with your request.',
    variant: 'warning',
    iconLabel: 'warning',
  },
  {
    body: 'You successfully updated your data.',
    variant: 'success',
    iconLabel: '',
  },
] as NotificationToastProps[];

const App = ({ toast }: { toast: NotificationToastProps }) => {
  const { setToast } = useNotificationToast();
  const randomIndex = isChromatic()
    ? 1
    : Math.floor(Math.random() * TOASTS.length);
  return (
    <Button
      type="button"
      onClick={() => setToast({ ...toast, ...TOASTS[randomIndex] })}
    >
      Open toast
    </Button>
  );
};
const play = async ({
  canvasElement,
}: {
  canvasElement: HTMLCanvasElement;
}) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button', {
    name: 'Open toast',
  });

  await userEvent.click(button);
  await screen.findByRole('status');
};

export const Base = (toast: NotificationToastProps) => (
  <ToastProvider>
    <App toast={toast} />
  </ToastProvider>
);

Base.play = play;

export const Position = (toast: NotificationToastProps) => (
  <ToastProvider {...toast}>
    <App toast={toast} />
  </ToastProvider>
);

Position.args = {
  position: 'top',
};

Position.play = play;

const variants = ['info', 'success', 'warning', 'danger'] as const;

export const Variants = (toast: NotificationToastProps) => (
  <Stack vertical>
    {variants.map((variant) => (
      <NotificationToast
        key={variant}
        {...toast}
        isVisible={true}
        variant={variant}
      />
    ))}
  </Stack>
);

Variants.args = {
  body: 'This is a toast message',
  iconLabel: '',
} as NotificationToastProps;

export const WithHeadline = (toast: NotificationToastProps) => (
  <NotificationToast {...toast} isVisible={true} />
);

WithHeadline.args = {
  headline: 'Information',
  iconLabel: '',
  body: 'You successfully updated your data.',
  variant: 'info',
} as NotificationToastProps;
