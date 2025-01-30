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
import { Home, Shop } from '@sumup-oss/icons';

import type { ClickEvent } from '../../../../types/events.js';
import {
  render,
  axe,
  userEvent,
  waitFor,
  screen,
  type RenderFn,
} from '../../../../util/test-utils.js';

import {
  MobileNavigation,
  type MobileNavigationProps,
} from './MobileNavigation.js';

describe('MobileNavigation', () => {
  function renderMobileNavigation<T>(
    renderFn: RenderFn<T>,
    props: MobileNavigationProps,
  ) {
    return renderFn(<MobileNavigation {...props} />);
  }

  const baseProps = {
    open: true,
    onClose: vi.fn(),
    closeButtonLabel: 'Close navigation modal',
    primaryNavigationLabel: 'Primary',
  };

  const defaultProps: MobileNavigationProps = {
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

  it('should toggle the secondary navigation', async () => {
    renderMobileNavigation(render, defaultProps);

    const primaryLinkEl = screen.getByRole('button', { name: /shop/i });
    const secondaryLinkEl = screen.getByText(/toys/i);

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
    const props: MobileNavigationProps = {
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
    renderMobileNavigation(render, props);

    const primaryLinkEl = screen.getByRole('link', { name: /home/i });

    await userEvent.click(primaryLinkEl);

    expect(baseProps.onClose).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should close the modal when clicking a secondary link', async () => {
    const onClick = vi.fn((event: ClickEvent) => {
      event.preventDefault();
    });
    const props: MobileNavigationProps = {
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
    renderMobileNavigation(render, props);

    const primaryLinkEl = screen.getByRole('button', { name: /shop/i });
    const secondaryLinkEl = screen.getByText(/toys/i);

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

  it('should have no accessibility violations', async () => {
    const { container } = renderMobileNavigation(render, defaultProps);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
