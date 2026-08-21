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

import { beforeAll, describe, expect, it, vi } from 'vitest';
import {
  Invoice,
  InvoiceFilled,
  Payouts,
  PayoutsFilled,
} from '@sumup-oss/icons';

import {
  render,
  axe,
  waitFor,
  screen,
  type RenderFn,
  userEvent,
  act,
  within,
} from '../../util/test-utils.js';

import { SideNavigation } from './SideNavigation.js';
import type { SideNavigationProps } from './types.js';

describe('SideNavigation', () => {
  function setMediaMatches(matches: boolean) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  }

  function renderSideNavigation<T>(
    renderFn: RenderFn<T>,
    props: SideNavigationProps,
  ) {
    return renderFn(<SideNavigation {...props} />);
  }

  const defaultProps: SideNavigationProps = {
    isOpen: false,
    onClose: vi.fn(),
    closeButtonLabel: 'Close navigation modal',
    label: 'Side navigation',
    groups: [
      {
        id: 'primary',
        label: 'Your shortcuts',
        items: [
          {
            icon: Payouts,
            activeIcon: PayoutsFilled,
            label: 'Payouts',
            href: '/#payouts',
          },
          {
            icon: Invoice,
            activeIcon: InvoiceFilled,
            label: 'Invoices',
            href: '/#invoices',
          },
        ],
      },
    ],
  };

  describe('on mobile', () => {
    beforeAll(() => {
      setMediaMatches(true);
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });
    afterAll(() => {
      vi.useRealTimers();
      vi.clearAllMocks();
    });

    it('should merge a custom class name with the default ones', () => {
      const className = 'foo';
      renderSideNavigation(render, {
        ...defaultProps,
        className,
      });
      const dialog = screen.getByRole<HTMLDialogElement>('dialog', {
        hidden: true,
      });
      expect(dialog?.className).toContain(className);
    });

    it('should open the mobile navigation', async () => {
      const { rerender } = renderSideNavigation(render, defaultProps);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      renderSideNavigation(rerender, { ...defaultProps, isOpen: true });

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeVisible();
      });
    });

    it('should call on close when closed', async () => {
      const props = { ...defaultProps, onClose: vi.fn() };
      const { rerender } = renderSideNavigation(render, props);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      renderSideNavigation(rerender, { ...props, isOpen: true });

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeVisible();
      });
      await userEvent.click(
        screen.getByRole('button', { name: props.closeButtonLabel }),
      );
      act(() => {
        vi.runAllTimers();
      });
      expect(props.onClose).toHaveBeenCalled();
    });

    it('should call on close when a navigation link is clicked', async () => {
      const props = { ...defaultProps, onClose: vi.fn() };
      const { rerender } = renderSideNavigation(render, props);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      renderSideNavigation(rerender, { ...props, isOpen: true });

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeVisible();
      });
      await userEvent.click(
        within(screen.getByRole('dialog')).getByRole('link', {
          name: 'Payouts',
        }),
      );
      act(() => {
        vi.runAllTimers();
      });
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  describe('on desktop', () => {
    beforeAll(() => {
      setMediaMatches(false);
    });
    it('should render a skip navigation link', () => {
      renderSideNavigation(render, {
        ...defaultProps,
        skipNavigationHref: '#main-content',
        skipNavigationLabel: 'Skip navigation',
      });
      const skipLink = screen.getByRole('link', { name: 'Skip navigation' });
      expect(skipLink).toBeInTheDocument();
    });

    it('should have no accessibility violations', async () => {
      const { container } = renderSideNavigation(render, defaultProps);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
