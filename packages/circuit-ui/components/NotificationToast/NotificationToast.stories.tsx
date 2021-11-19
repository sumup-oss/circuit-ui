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

import React, { useEffect } from 'react';

import Button from '../Button';
import Body from '../Body';
import { ToastProvider } from '../ToastContext';

import {
  NotificationToast,
  NotificationToastProps,
  useNotificationToast,
} from './NotificationToast';

export default {
  title: 'Notification/NotificationToast',
  component: NotificationToast,
};

export const Base = (toast: NotificationToastProps): JSX.Element => {
  const App = () => {
    const { setToast } = useNotificationToast();
    return (
      <Button type="button" onClick={() => setToast(toast)}>
        Open toast
      </Button>
    );
  };
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
};

Base.args = {
  closeButtonLabel: 'Close',
  body: 'This is a toast message',
} as NotificationToastProps;

const variants = ['info', 'confirm', 'notify', 'alert'] as const;

export const Variants = (toast: NotificationToastProps): JSX.Element => {
  const App = () => {
    const { setToast } = useNotificationToast();
    useEffect(() => {
      variants.forEach((variant) => {
        setToast({ ...toast, variant });
      });
    }, [setToast]);

    return <Body noMargin>Your app</Body>;
  };
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
};

Variants.args = Base.args;
