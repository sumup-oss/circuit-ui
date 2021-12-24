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

import { act, axe, render, userEvent, waitFor } from '../../util/test-utils';

import {
  NotificationInline,
  NotificationInlineProps,
} from './NotificationInline';

describe('NotificationInline', () => {
  const renderNotificationInline = (props: NotificationInlineProps) =>
    render(<NotificationInline {...props} />);

  const baseProps: NotificationInlineProps = {
    iconLabel: '',
    body: 'This is an inline message',
  };
  describe('styles', () => {
    it('should render with default styles', () => {
      const { baseElement } = renderNotificationInline(baseProps);
      expect(baseElement).toMatchSnapshot();
    });

    it('should render the notification inline', async () => {
      const { getByText } = renderNotificationInline({
        ...baseProps,
      });

      const toastEl = getByText('This is an inline message');

      await waitFor(() => {
        expect(toastEl).toBeVisible();
      });
    });

    const variants: NotificationInlineProps['variant'][] = [
      'info',
      'confirm',
      'notify',
      'alert',
    ];

    it.each(variants)(
      'should render notification inline with %s styles',
      (variant) => {
        const { baseElement } = renderNotificationInline({
          ...baseProps,
          variant,
        });
        expect(baseElement).toMatchSnapshot();
      },
    );

    it('should render notification inline with headline', () => {
      const { baseElement } = renderNotificationInline({
        ...baseProps,
        headline: 'Information',
      });
      expect(baseElement).toMatchSnapshot();
    });

    it('should render notification toast with an action button', () => {
      const { baseElement } = renderNotificationInline({
        ...baseProps,
        action: {
          onClick: jest.fn(),
          children: 'Click here',
        },
      });
      expect(baseElement).toMatchSnapshot();
    });
  });
  describe('business logic', () => {
    it('should click on a call to action button', () => {
      const props = {
        ...baseProps,
        action: {
          onClick: jest.fn(),
          children: 'Click here',
        },
      };
      const { getByRole } = renderNotificationInline(props);

      act(() => {
        userEvent.click(getByRole('button'));
      });

      expect(props.action.onClick).toHaveBeenCalledTimes(1);
    });
    it('should close the notification inline when the onClose method is called', () => {
      const props = {
        ...baseProps,
        onClose: jest.fn(),
        closeButtonLabel: 'Close notification',
      };
      const { getByRole } = renderNotificationInline(props);

      act(() => {
        userEvent.click(getByRole('button', { name: /close/i }));
      });

      expect(props.onClose).toHaveBeenCalled();
    });
  });
  /**
   * Accessibility tests.
   */
  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderNotificationInline(baseProps);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
