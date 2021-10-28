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

import React from 'react';

import { act, axe, render, userEvent, waitFor } from '../../util/test-utils';

import { NotificationModal, NotificationModalProps } from './NotificationModal';

describe('NotificationModal', () => {
  const renderNotificationModal = (props: NotificationModalProps) =>
    render(<NotificationModal {...props} />);

  const baseNotificationModal: NotificationModalProps = {
    isOpen: true,
    closeButtonLabel: 'Close modal',
    onClose: jest.fn(),
    image: {
      src: 'https://source.unsplash.com/TpHmEoVSmfQ/1600x900',
      alt: '',
    },
    headline: 'Example modal',
    body: 'Hello World!',
    actions: {
      primary: {
        children: 'Primary',
        onClick: jest.fn(),
      },
      secondary: {
        children: 'Secondary',
        onClick: jest.fn(),
      },
    },
    ariaHideApp: false,
  };

  describe('styles', () => {
    it('should render with default styles', () => {
      const { baseElement } = renderNotificationModal(baseNotificationModal);
      expect(baseElement).toMatchSnapshot();
    });

    it('should render the modal', async () => {
      const { getByRole } = renderNotificationModal(baseNotificationModal);

      await waitFor(() => {
        expect(getByRole('dialog')).toBeVisible();
      });
    });
  });

  describe('business logic', () => {
    it('should call the onClose callback', () => {
      const { getByRole } = renderNotificationModal(baseNotificationModal);

      act(() => {
        userEvent.click(getByRole('button', { name: /Close Modal/i }));
      });

      expect(baseNotificationModal.onClose).toHaveBeenCalled();
    });

    it('should close the modal without performing any action', () => {
      renderNotificationModal(baseNotificationModal);

      act(() => {
        userEvent.click(document.body);
      });

      expect(baseNotificationModal.onClose).toHaveBeenCalled();
    });

    it('should perform action by clicking the action button and close the modal', () => {
      const { getByRole } = renderNotificationModal(baseNotificationModal);

      act(() => {
        userEvent.click(getByRole('button', { name: /Primary/i }));
      });

      expect(baseNotificationModal.actions.primary.onClick).toHaveBeenCalled();
      expect(baseNotificationModal.onClose).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderNotificationModal(baseNotificationModal);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
