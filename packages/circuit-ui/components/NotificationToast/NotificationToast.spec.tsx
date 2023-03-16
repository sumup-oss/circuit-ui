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

import {
  axe,
  userEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '../../util/test-utils';
import Button from '../Button';
import { ToastProvider } from '../ToastContext/ToastContext';

import {
  NotificationToast,
  NotificationToastProps,
  useNotificationToast,
} from './NotificationToast';

describe('NotificationToast', () => {
  beforeEach(() => jest.clearAllMocks());

  const renderStaticNotificationToast = (props: NotificationToastProps) =>
    render(<NotificationToast {...props} />);

  const renderNotificationToast = (props: NotificationToastProps) => {
    const App = () => {
      const { setToast } = useNotificationToast();
      return (
        <Button type="button" onClick={() => setToast(props)}>
          Open toast
        </Button>
      );
    };

    return render(
      <ToastProvider>
        <App />
      </ToastProvider>,
    );
  };

  const baseNotificationToast: NotificationToastProps = {
    onClose: jest.fn(),
    iconLabel: '',
    isVisible: false,
    body: 'This is a toast message',
  };

  describe('styles', () => {
    it('should render with default styles', () => {
      const { baseElement } = renderStaticNotificationToast(
        baseNotificationToast,
      );
      expect(baseElement).toMatchSnapshot();
    });

    const variants: NotificationToastProps['variant'][] = [
      'info',
      'success',
      'confirm',
      'warning',
      'notify',
      'danger',
      'alert',
    ];

    it.each(variants)('should render with %s variant styles', (variant) => {
      const { baseElement } = renderStaticNotificationToast({
        ...baseNotificationToast,
        variant,
      });
      expect(baseElement).toMatchSnapshot();
    });

    it('should render with a headline', () => {
      const { baseElement } = renderStaticNotificationToast({
        ...baseNotificationToast,
        headline: 'Information',
      });
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    /**
     * FIXME: these tests should use jest fake timers instead of waiting for
     * NotificationToast timers to run.
     */
    it('should open a toast', async () => {
      const { findByRole, getByText } = renderNotificationToast(
        baseNotificationToast,
      );

      await userEvent.click(getByText('Open toast'));

      const toastEl = await findByRole('status');

      expect(toastEl).toBeVisible();
    });

    it('should close the toast when the onClose method is called', async () => {
      const { getByText } = renderNotificationToast(baseNotificationToast);

      await userEvent.click(getByText('Open toast'));

      await waitFor(() => {
        expect(getByText('This is a toast message')).toBeVisible();
      });

      const closeButton = getByText('-');

      await userEvent.click(closeButton);

      expect(baseNotificationToast.onClose).toHaveBeenCalled();
    });

    it('should autodismiss toast after the duration has expired', async () => {
      const { getByText } = renderNotificationToast(baseNotificationToast);

      await userEvent.click(getByText('Open toast'));

      const toastElement = getByText('This is a toast message');

      await waitFor(() => {
        expect(toastElement).toBeVisible();
      });

      await waitForElementToBeRemoved(toastElement, {
        timeout: 10000,
      });

      expect(baseNotificationToast.onClose).toHaveBeenCalledTimes(1);
    }, 10000);
  });

  /**
   * Accessibility tests.
   */
  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container, getByText } = renderNotificationToast(
        baseNotificationToast,
      );

      await userEvent.click(getByText('Open toast'));

      await waitFor(() => {
        expect(getByText('This is a toast message')).toBeVisible();
      });

      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
