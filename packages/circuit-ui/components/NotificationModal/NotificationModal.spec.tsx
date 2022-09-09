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

import { Plus } from '@sumup/icons';

import { axe, render, userEvent, waitFor } from '../../util/test-utils';

import { NotificationModal, NotificationModalProps } from './NotificationModal';

describe('NotificationModal', () => {
  const renderNotificationModal = (props: NotificationModalProps) =>
    render(<NotificationModal {...props} />);

  const baseNotificationModal = {
    isOpen: true,
    closeButtonLabel: 'Close modal',
    onClose: jest.fn(),
    image: {
      src: '/images/illustration-update-browser.svg',
      alt: '',
    },
    headline: "It's time to update your browser",
    body: "You'll soon need a more up-to-date browser to continue using SumUp.",
    actions: {
      primary: {
        children: 'Update now',
        onClick: jest.fn(),
      },
      secondary: {
        children: 'Not now',
        onClick: jest.fn(),
      },
    },
    ariaHideApp: false,
  } as const;

  describe('styles', () => {
    it('should render with default styles', () => {
      const { baseElement } = renderNotificationModal(baseNotificationModal);
      expect(baseElement).toMatchSnapshot();
    });

    it('should render with an SVG', () => {
      const props = { ...baseNotificationModal, image: { svg: Plus, alt: '' } };
      const { baseElement } = renderNotificationModal(props);
      expect(baseElement).toMatchSnapshot();
    });

    it('should render without an image', () => {
      const { image, ...props } = baseNotificationModal;
      const { baseElement } = renderNotificationModal(props);
      expect(baseElement).toMatchSnapshot();
    });

    it('should render the modal', async () => {
      const { findByRole } = renderNotificationModal(baseNotificationModal);

      const modalEl = await findByRole('dialog');

      await waitFor(() => {
        expect(modalEl).toBeVisible();
      });
    });
  });

  describe('business logic', () => {
    it('should close the modal when clicking the close button', async () => {
      const { findByRole } = renderNotificationModal(baseNotificationModal);

      const closeButton = await findByRole('button', {
        name: baseNotificationModal.closeButtonLabel,
      });

      await userEvent.click(closeButton);

      expect(baseNotificationModal.onClose).toHaveBeenCalled();
    });

    it('should close the modal when clicking outside', async () => {
      renderNotificationModal(baseNotificationModal);

      await userEvent.click(document.body);

      expect(baseNotificationModal.onClose).toHaveBeenCalled();
    });

    it('should perform an action and close the modal when clicking an action button', async () => {
      const { findByRole } = renderNotificationModal(baseNotificationModal);

      const actionButton = await findByRole('button', {
        name: baseNotificationModal.actions.primary.children,
      });

      await userEvent.click(actionButton);

      expect(baseNotificationModal.actions.primary.onClick).toHaveBeenCalled();
      expect(baseNotificationModal.onClose).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    /**
     * FIXME: calling axe here triggers an act() warning.
     */
    it('should have no violations', async () => {
      const { container } = renderNotificationModal(baseNotificationModal);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
