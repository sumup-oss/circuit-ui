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

import { describe, expect, it, vi } from 'vitest';
import { Shop, SumUpLogo } from '@sumup-oss/icons';

import { axe, render, screen } from '../../util/test-utils.js';

import { TopNavigation, type TopNavigationProps } from './TopNavigation.js';

describe('TopNavigation', () => {
  const baseProps: TopNavigationProps = {
    logo: (
      <a
        href="https://sumup.com"
        aria-label="Visit SumUp's website"
        target="_blank"
        rel="noreferrer"
      >
        <SumUpLogo />
      </a>
    ),
    hamburger: {
      isActive: false,
      onClick: vi.fn(),
      activeLabel: 'Close menu',
      inactiveLabel: 'Open menu',
    },
    links: [
      {
        icon: Shop,
        label: 'Shop',
        href: '/shop',
        onClick: vi.fn(),
      },
    ],
  };

  it('should render a skip navigation link', () => {
    render(
      <TopNavigation
        {...baseProps}
        skipNavigationHref="#main-content"
        skipNavigationLabel="Skip navigation"
      />,
    );

    const skipLink = screen.getByRole('link', { name: 'Skip navigation' });
    expect(skipLink).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<TopNavigation {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
