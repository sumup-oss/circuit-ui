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
import { describe, expect, it, vi } from 'vitest';
import { Home, Shop } from '@sumup/icons';

import { render, axe, RenderFn, screen } from '../../../../util/test-utils.js';

import {
  DesktopNavigation,
  DesktopNavigationProps,
} from './DesktopNavigation.js';

describe('DesktopNavigation', () => {
  function renderDesktopNavigation<T>(
    renderFn: RenderFn<T>,
    props: DesktopNavigationProps,
  ) {
    return renderFn(<DesktopNavigation {...props} />);
  }

  const baseProps = {
    primaryNavigationLabel: 'Primary',
    secondaryNavigationLabel: 'Secondary',
  };

  const defaultProps: DesktopNavigationProps = {
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

  it('should render with secondary links', () => {
    renderDesktopNavigation(render, defaultProps);

    const lists = screen.getAllByRole('list');

    expect(lists).toHaveLength(3);
  });

  it('should render without secondary links', () => {
    const props: DesktopNavigationProps = {
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
    renderDesktopNavigation(render, props);

    const lists = screen.getAllByRole('list');

    expect(lists).toHaveLength(1);
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderDesktopNavigation(render, defaultProps);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
