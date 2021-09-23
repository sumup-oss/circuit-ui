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
import { Shop } from '@sumup/icons';

import { render, axe, RenderFn, waitFor } from '../../util/test-utils';
import { ModalProvider } from '../ModalContext';

import { SideNavigation, SideNavigationProps } from './SideNavigation';

describe('SideNavigation', () => {
  function setMediaMatches(matches: boolean) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
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
    onClose: jest.fn(),
    closeButtonLabel: 'Close navigation modal',
    primaryNavigationLabel: 'Primary',
    secondaryNavigationLabel: 'Secondary',
  };

  const defaultProps = {
    ...baseProps,
    primaryLinks: [
      {
        icon: (iconProps) => <Shop {...iconProps} size="24" />,
        label: 'Shop',
        href: '/shop',
        onClick: jest.fn(),
        isActive: true,
        secondaryGroups: [
          {
            label: 'For Kids',
            secondaryLinks: [
              {
                label: 'Toys',
                href: '/shop/toys',
                onClick: jest.fn(),
              },
              {
                label: 'Books',
                href: '/shop/books',
                onClick: jest.fn(),
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

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderSideNavigation(render, defaultProps);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
