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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Plus } from '@sumup-oss/icons';

import { axe, render, userEvent, screen, act } from '../../util/test-utils.js';
import { ANIMATION_DURATION } from '../Modal/Modal.js';

import {
  NotificationModal,
  type NotificationModalProps,
} from './NotificationModal.js';

describe('NotificationModal', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  const renderNotificationModal = (props: NotificationModalProps) =>
    render(<NotificationModal {...props} />);

  const baseNotificationModal = {
    open: true,
    closeButtonLabel: 'Close modal',
    onClose: vi.fn(),
    image: {
      src: '/images/illustration-update.svg',
      alt: '',
    },
    headline: "It's time to update your browser",
    body: "You'll soon need a more up-to-date browser to continue using SumUp.",
    actions: {
      primary: {
        children: 'Update now',
        onClick: vi.fn(),
      },
      secondary: {
        children: 'Not now',
        onClick: vi.fn(),
      },
    },
  } as const;

  it('should render with an SVG', () => {
    const alt = 'Image description';
    const props = {
      ...baseNotificationModal,
      image: { svg: Plus, alt },
    };
    renderNotificationModal(props);
    act(() => {
      vi.advanceTimersByTime(ANIMATION_DURATION);
    });

    const svg = screen.getByRole('img');

    expect(svg).toBeVisible();
    expect(svg).toHaveAccessibleName(alt);
  });

  it('should render without an image', () => {
    const { image, ...props } = baseNotificationModal;
    renderNotificationModal(props);

    expect(screen.queryByRole('img')).toBeNull();
  });

  it('should render the modal', async () => {
    renderNotificationModal(baseNotificationModal);

    act(() => {
      vi.advanceTimersByTime(ANIMATION_DURATION);
    });

    const modalEl = await screen.findByRole('dialog');

    expect(modalEl).toBeVisible();
  });

  describe('business logic', () => {
    it('should close the modal when clicking the close button', async () => {
      renderNotificationModal(baseNotificationModal);
      act(() => {
        vi.advanceTimersByTime(ANIMATION_DURATION);
      });

      const closeButton = await screen.findByRole('button', {
        name: baseNotificationModal.closeButtonLabel,
      });

      await userEvent.click(closeButton);
      act(() => {
        vi.advanceTimersByTime(ANIMATION_DURATION);
      });

      expect(baseNotificationModal.onClose).toHaveBeenCalled();
    });

    it('should perform an action and close the modal when clicking an action button', async () => {
      renderNotificationModal(baseNotificationModal);
      act(() => {
        vi.advanceTimersByTime(ANIMATION_DURATION);
      });
      const actionButton = await screen.findByRole('button', {
        name: baseNotificationModal.actions.primary.children,
      });

      await userEvent.click(actionButton);

      expect(baseNotificationModal.actions.primary.onClick).toHaveBeenCalled();
      expect(baseNotificationModal.onClose).toHaveBeenCalled();
    });
  });

  /**
   * FIXME: calling axe here triggers an act() warning.
   */
  it('should have no accessibility violations', async () => {
    const { container } = renderNotificationModal(baseNotificationModal);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
