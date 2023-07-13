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
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Shop } from '@sumup/icons';

import { render, axe, RenderFn, waitFor } from '../../util/test-utils.js';
import { ModalProvider } from '../ModalContext/index.js';

import { SideNavigation, SideNavigationProps } from './SideNavigation.js';

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
    return renderFn(
      <ModalProvider>
        <SideNavigation {...props} />
      </ModalProvider>,
    );
  }

  const baseProps = {
    isOpen: false,
    onClose: vi.fn(),
    closeButtonLabel: 'Close navigation modal',
    primaryNavigationLabel: 'Primary',
    secondaryNavigationLabel: 'Secondary',
  };

  const defaultProps: SideNavigationProps = {
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

  describe('on mobile', () => {
    beforeAll(() => {
      setMediaMatches(true);
    });

    it('should open the mobile navigation', async () => {
      const { queryByRole, rerender } = renderSideNavigation(
        render,
        defaultProps,
      );

      expect(queryByRole('dialog')).not.toBeInTheDocument();

      renderSideNavigation(rerender, { ...defaultProps, isOpen: true });

      await waitFor(() => {
        expect(queryByRole('dialog')).toBeVisible();
      });
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderSideNavigation(render, defaultProps);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
