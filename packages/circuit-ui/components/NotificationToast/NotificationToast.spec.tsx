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

/* eslint-disable react/display-name */
import React from 'react';

import { act, axe, fireEvent, render, waitFor } from '../../util/test-utils';
import Button from '../Button';
import { ToastProvider } from '../ToastContext';

import {
  NotificationToast,
  NotificationToastProps,
  useNotificationToast,
} from './NotificationToast';

describe('NotificationToast', () => {
  const renderNotificationToast = (props: NotificationToastProps) =>
    render(<NotificationToast {...props} />);

  const baseNotificationToast: NotificationToastProps = {
    closeButtonLabel: 'Close toast',
    onClose: jest.fn(),
    body: 'This is a toast message',
  };
  describe('styles', () => {
    it('should render with default styles', () => {
      const { baseElement } = renderNotificationToast(baseNotificationToast);
      expect(baseElement).toMatchSnapshot();
    });

    it('should render the toast', async () => {
      const App = () => {
        const { setToast } = useNotificationToast();
        return (
          <Button type="button" onClick={() => setToast(baseNotificationToast)}>
            Open toast
          </Button>
        );
      };

      const { findByRole, getByText } = render(
        <ToastProvider>
          <App />
        </ToastProvider>,
      );

      act(() => {
        fireEvent.click(getByText('Open toast'));
      });

      const toastEl = await findByRole('status');

      await waitFor(() => {
        expect(toastEl).toBeVisible();
      });
    });
    const variants: NotificationToastProps['variant'][] = [
      'info',
      'confirm',
      'notify',
      'alert',
    ];

    it.each(variants)(
      'should render notification toast with %s styles',
      (variant) => {
        const actual = renderNotificationToast({
          ...baseNotificationToast,
          variant,
        });
        expect(actual).toMatchSnapshot();
      },
    );
  });
  describe('business logic', () => {
    it('should close the toast when the onClose method is called', async () => {
      const App = () => {
        const { setToast } = useNotificationToast();
        return (
          <Button type="button" onClick={() => setToast(baseNotificationToast)}>
            Open toast
          </Button>
        );
      };

      const { findByRole, getByText } = render(
        <ToastProvider>
          <App />
        </ToastProvider>,
      );

      act(() => {
        fireEvent.click(getByText('Open toast'));
      });

      const toastEl = await findByRole('status');

      await waitFor(() => {
        expect(toastEl).toBeVisible();
      });

      const closeButton = await findByRole('button', { name: /Close toast/ });

      act(() => {
        fireEvent.click(closeButton);
      });

      expect(baseNotificationToast.onClose).toHaveBeenCalledTimes(1);
    });
  });
  it('should autodismiss toast after the duration has expired', async () => {
    const App = () => {
      const { setToast } = useNotificationToast();
      return (
        <Button
          type="button"
          onClick={() => setToast({ ...baseNotificationToast, duration: 30 })}
        >
          Open toast
        </Button>
      );
    };

    const { findByRole } = render(
      <ToastProvider>
        <App />
      </ToastProvider>,
    );

    const toastEl = await findByRole('status');

    await waitFor(() => {
      expect(toastEl).toBeVisible();
    });

    await waitFor(() => {
      expect(baseNotificationToast.onClose).toHaveBeenCalledTimes(1);
    });
  });
  /**
   * Accessibility tests.
   */
  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderNotificationToast(baseNotificationToast);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
