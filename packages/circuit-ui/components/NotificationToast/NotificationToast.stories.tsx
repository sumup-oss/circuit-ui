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
import React from 'react';

import Button from '../Button';
import { ToastProvider } from '../ToastContext';

import {
  NotificationToast,
  NotificationToastProps,
  useNotificationToast,
} from './NotificationToast';

export default {
  title: 'Notification/NotificatinToast',
  component: NotificationToast,
};

export const Base = (toast: NotificationToastProps): JSX.Element => {
  const Toast = () => {
    const { setToast } = useNotificationToast();

    return (
      <Button type="button" onClick={() => setToast(toast)}>
        Open toast
      </Button>
    );
  };
  return (
    <ToastProvider>
      <Toast />
    </ToastProvider>
  );
};

Base.args = {
  closeButtonLabel: 'Close Notification Toast',
  headline: 'Toast',
  body: 'This is a toast message',
  action: {
    onClick: action('Action clicked'),
    children: 'Click here',
  },
};

const variants = ['info', 'confirm', 'notify', 'alert'] as const;

export const Variants = (args: NotificationToastProps) => {
  const initialToast = {
    id: 'initial',
    component: NotificationToast,
    ...args,
  };

  return variants.map((variant) => (
    <ToastProvider
      initialState={[initialToast]}
      key={variant}
      variant={variant}
    ></ToastProvider>
  ));
};

Variants.args = {
  body: 'There is updated firmware available for your card reader',
};
