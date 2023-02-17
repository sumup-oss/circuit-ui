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

import Button from '../Button';
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

const TOASTS = [
  { body: 'An update is available.', variant: 'info', iconLabel: '' },
  { body: 'Unexpected error occurred.', variant: 'alert', iconLabel: '' },
  {
    body: 'There was a problem with your request.',
    variant: 'notify',
    iconLabel: 'warning',
  },
  {
    body: 'You successfully updated your data.',
    variant: 'confirm',
    iconLabel: '',
  },
] as NotificationToastProps[];

export const Base = (toast: NotificationToastProps): JSX.Element => {
  const App = () => {
    const { setToast } = useNotificationToast();
    return (
      <Button
        type="button"
        onClick={() =>
          setToast({
            ...toast,
            ...TOASTS[Math.floor(Math.random() * TOASTS.length)],
          })
        }
      >
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

const variants = ['info', 'confirm', 'notify', 'alert'] as const;

const StackToasts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const Variants = (toast: NotificationToastProps) => (
  <StackToasts>
    {variants.map((variant) => (
      <NotificationToast
        key={variant}
        {...toast}
        isVisible={true}
        variant={variant}
      />
    ))}
  </StackToasts>
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
