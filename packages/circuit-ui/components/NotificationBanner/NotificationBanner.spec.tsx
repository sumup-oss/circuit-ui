/**
 * Copyright 2019, SumUp Ltd.
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

import { render, axe, userEvent, act } from '../../util/test-utils';

import {
  NotificationBanner,
  NotificationBannerProps,
} from './NotificationBanner';

describe('NotificationBanner', () => {
  const renderNotificationBanner = (props: NotificationBannerProps) =>
    render(<NotificationBanner {...props} />);

  const baseProps: NotificationBannerProps = {
    headline: 'Test',
    body: 'There is updated firmware available for your card reader',
    action: {
      onClick: () => alert('Heloooo'),
      children: 'Update',
      variant: 'primary',
    },
    src: 'https://source.unsplash.com/EcWFOYOpkpY/100x100',
    alt: 'Cup of coffee',
  };

  /**
   * Style tests.
   */
  describe('styles', () => {
    it('should render with default styles', () => {
      const { container } = renderNotificationBanner(baseProps);
      expect(container).toMatchSnapshot();
    });
  });

  /**
   * Logic tests.
   */
  describe('when is removable', () => {
    const closeProps = {
      onClose: jest.fn(),
      closeButtonLabel: 'Close notification',
    };
    it('should render a close button', () => {
      const { getAllByRole } = render(
        <NotificationBanner
          {...baseProps}
          {...closeProps}
        ></NotificationBanner>,
      );
      expect(getAllByRole('button')[1]).not.toBeNull();
    });

    it('should call onClose when closed', () => {
      const { getAllByRole } = render(
        <NotificationBanner
          {...baseProps}
          {...closeProps}
        ></NotificationBanner>,
      );

      act(() => {
        userEvent.click(getAllByRole('button')[1]);
      });

      expect(closeProps.onClose).toHaveBeenCalledTimes(1);
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
