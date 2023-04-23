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

import { render, axe, userEvent } from '../../util/test-utils';

import {
  NotificationBanner,
  NotificationBannerProps,
} from './NotificationBanner';

describe('NotificationBanner', () => {
  const renderNotificationBanner = (props: NotificationBannerProps) =>
    render(<NotificationBanner {...props} />);

  const baseProps: NotificationBannerProps = {
    headline: 'Software update',
    body: 'There is updated firmware available for your card reader',
    action: {
      onClick: vi.fn(),
      children: 'Update',
      variant: 'primary',
    },
    image: {
      src: '/images/software_update.png',
      alt: 'Update',
      width: '100',
    },
  };

  /**
   * Style tests.
   */
  describe('styles', () => {
    it('should render with default styles', () => {
      const { container } = renderNotificationBanner(baseProps);
      expect(container).toMatchSnapshot();
    });

    it('should render a promotional banner', () => {
      const { container } = renderNotificationBanner({
        ...baseProps,
        variant: 'promotional',
      });
      expect(container).toMatchSnapshot();
    });

    it('should change the alignment of the image', () => {
      const { container } = renderNotificationBanner({
        ...baseProps,
        variant: 'promotional',
        image: {
          ...baseProps.image,
          align: 'bottom',
        },
      });
      expect(container.querySelector('img')).toHaveStyle(
        'object-position: bottom',
      );
    });

    it('should accept a working ref', () => {
      const ref = createRef<HTMLDivElement>();
      const { container } = render(
        <NotificationBanner ref={ref} {...baseProps} />,
      );
      const wrapper = container.querySelector('div');
      expect(ref.current).toBe(wrapper);
    });
  });

  /**
   * Logic tests.
   */
  describe('business logic', () => {
    it('should click on a main button', async () => {
      const { getByRole } = renderNotificationBanner(baseProps);

      await userEvent.click(getByRole('button'));

      expect(baseProps.action.onClick).toHaveBeenCalledTimes(1);
    });

    it('should render a close button', () => {
      const { getByRole } = renderNotificationBanner({
        ...baseProps,
        onClose: vi.fn(),
        closeButtonLabel: 'Close notification',
      });

      expect(getByRole('button', { name: /close/i })).toBeVisible();
    });

    it('should call onClose when closed', async () => {
      const props = {
        ...baseProps,
        onClose: vi.fn(),
        closeButtonLabel: 'Close notification',
      };
      const { getByRole } = renderNotificationBanner(props);

      await userEvent.click(getByRole('button', { name: /close/i }));

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  /**
   * Accessibility tests.
   */
  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderNotificationBanner(baseProps);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
