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

import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  axe,
  userEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '../../util/test-utils.js';
import Button from '../Button/index.js';
import { ToastProvider } from '../ToastContext/ToastContext.js';

import {
  NotificationToastProps,
  useNotificationToast,
} from './NotificationToast.js';

describe('NotificationToast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
    onClose: vi.fn(),
    iconLabel: '',
    isVisible: false,
    body: 'This is a toast message',
  };

  it('should render with a headline', async () => {
    const { getByText, findByRole } = renderNotificationToast({
      ...baseNotificationToast,
      headline: 'Information',
    });

    await userEvent.click(getByText('Open toast'));

    const headingEl = await findByRole('heading');

    expect(headingEl.tagName).toBe('H3');
    expect(headingEl).toHaveTextContent('Information');
  });

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

  it('should have no accessibility violations', async () => {
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
