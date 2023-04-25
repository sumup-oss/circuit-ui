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

import { afterEach, describe, expect, it, vi } from 'vitest';
import { Home, Shop } from '@sumup/icons';

import { ClickEvent } from '../../../../types/events.js';
import {
  render,
  axe,
  RenderFn,
  userEvent,
  waitFor,
} from '../../../../util/test-utils.js';

import { MobileNavigation, MobileNavigationProps } from './MobileNavigation.js';

describe('MobileNavigation', () => {
  function renderMobileNavigation<T>(
    renderFn: RenderFn<T>,
    props: MobileNavigationProps,
  ) {
    return renderFn(<MobileNavigation {...props} />);
  }

  const baseProps = {
    // Silences the warning about the missing app element.
    // In user land, the modal is always rendered by the ModalProvider,
    // which takes care of setting the app element.
    // http://reactcommunity.org/react-modal/accessibility/#app-element
    ariaHideApp: false,
    isOpen: true,
    onClose: vi.fn(),
    closeButtonLabel: 'Close navigation modal',
    primaryNavigationLabel: 'Primary',
  };

  const defaultProps = {
    ...baseProps,
    primaryLinks: [
      {
        icon: (iconProps) => <Shop {...iconProps} size="24" />,
        label: 'Shop',
        href: '/shop',
        onClick: vi.fn(),
        isActive: true,
        secondaryGroups: [
          {
            label: 'For Kids',
            secondaryLinks: [
              {
                label: 'Toys',
                href: '/shop/toys',
                onClick: vi.fn(),
              },
              {
                label: 'Books',
                href: '/shop/books',
                onClick: vi.fn(),
              },
            ],
          },
        ],
      },
    ],
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('styles', () => {
    it('should render with secondary links', () => {
      const { baseElement } = renderMobileNavigation(render, defaultProps);
      expect(baseElement).toMatchSnapshot();
    });

    it('should render without secondary links', () => {
      const props = {
        ...baseProps,
        primaryLinks: [
          {
            icon: (iconProps) => <Home {...iconProps} size="24" />,
            label: 'Home',
            href: '/',
            onClick: vi.fn(),
            secondaryGroups: [],
          },
        ],
      };
      const { baseElement } = renderMobileNavigation(render, props);
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should toggle the secondary navigation', async () => {
      const { getByRole, getByText } = renderMobileNavigation(
        render,
        defaultProps,
      );

      const primaryLinkEl = getByRole('button', { name: /shop/i });
      const secondaryLinkEl = getByText(/toys/i);

      expect(secondaryLinkEl).not.toBeVisible();

      await userEvent.click(primaryLinkEl);

      await waitFor(
        () => {
          expect(secondaryLinkEl).toBeVisible();
        },
        { timeout: 300 },
      );

      await userEvent.click(primaryLinkEl);

      await waitFor(
        () => {
          expect(secondaryLinkEl).not.toBeVisible();
        },
        { timeout: 300 },
      );
    });

    it('should close the modal when clicking a primary link', async () => {
      const onClick = vi.fn((event: ClickEvent) => {
        event.preventDefault();
      });
      const props = {
        ...baseProps,
        primaryLinks: [
          {
            icon: (iconProps) => <Home {...iconProps} size="24" />,
            label: 'Home',
            href: '/',
            onClick,
          },
        ],
      };
      const { getByRole } = renderMobileNavigation(render, props);

      const primaryLinkEl = getByRole('link', { name: /home/i });

      await userEvent.click(primaryLinkEl);

      expect(baseProps.onClose).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should close the modal when clicking a secondary link', async () => {
      const onClick = vi.fn((event: ClickEvent) => {
        event.preventDefault();
      });
      const props = {
        ...baseProps,
        primaryLinks: [
          {
            icon: (iconProps) => <Shop {...iconProps} size="24" />,
            label: 'Shop',
            href: '/shop',
            onClick: vi.fn(),
            isActive: true,
            secondaryGroups: [
              {
                secondaryLinks: [
                  {
                    label: 'Toys',
                    href: '/shop/toys',
                    onClick,
                  },
                ],
              },
            ],
          },
        ],
      };
      const { getByRole, getByText } = renderMobileNavigation(render, props);

      const primaryLinkEl = getByRole('button', { name: /shop/i });
      const secondaryLinkEl = getByText(/toys/i);

      expect(secondaryLinkEl).not.toBeVisible();

      await userEvent.click(primaryLinkEl);

      await waitFor(
        () => {
          expect(secondaryLinkEl).toBeVisible();
        },
        { timeout: 300 },
      );

      await userEvent.click(secondaryLinkEl);

      expect(baseProps.onClose).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderMobileNavigation(render, defaultProps);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
