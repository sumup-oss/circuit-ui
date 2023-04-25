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

import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';

import { axe, render, userEvent, waitFor } from '../../util/test-utils';

import {
  NotificationInline,
  NotificationInlineProps,
} from './NotificationInline';

describe('NotificationInline', () => {
  const renderNotificationInline = (props: NotificationInlineProps) =>
    render(<NotificationInline {...props} />);

  const baseProps: NotificationInlineProps = {
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
      'success',
      'warning',
      'danger',
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
      const { getByRole } = renderNotificationInline({
        ...baseProps,
        headline: 'Information',
      });

      const headingEl = getByRole('heading');

      expect(headingEl.tagName).toBe('H3');
      expect(headingEl).toHaveTextContent('Information');
    });

    it.each(['h2', 'h3', 'h4', 'h5', 'h6'] as const)(
      'should render notification inline as an %s headline',
      (level) => {
        const { getByRole } = renderNotificationInline({
          ...baseProps,
          headline: {
            label: `${level} headline`,
            as: level,
          },
        });

        const headingEl = getByRole('heading');

        expect(headingEl.tagName).toBe(level.toUpperCase());
      },
    );

    it('should render notification toast with an action button', () => {
      const { baseElement } = renderNotificationInline({
        ...baseProps,
        action: {
          onClick: vi.fn(),
          children: 'Click here',
        },
      });
      expect(baseElement).toMatchSnapshot();
    });

    it('should accept a working ref', () => {
      const ref = createRef<HTMLDivElement>();
      const { container } = render(
        <NotificationInline ref={ref} {...baseProps} />,
      );
      const wrapper = container.querySelector('div');
      expect(ref.current).toBe(wrapper);
    });
  });

  describe('business logic', () => {
    it('should click on a call to action button', async () => {
      const props = {
        ...baseProps,
        action: {
          onClick: vi.fn(),
          children: 'Click here',
        },
      };
      const { getByRole } = renderNotificationInline(props);

      await userEvent.click(getByRole('button'));

      expect(props.action.onClick).toHaveBeenCalledTimes(1);
    });

    it('should close the notification inline when the onClose method is called', async () => {
      const props = {
        ...baseProps,
        onClose: vi.fn(),
        closeButtonLabel: 'Close notification',
      };
      const { getByRole } = renderNotificationInline(props);

      await userEvent.click(getByRole('button', { name: /close/i }));

      expect(props.onClose).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderNotificationInline(baseProps);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
