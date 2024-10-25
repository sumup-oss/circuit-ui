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

import type { ClickEvent } from '../../../../types/events';
import {
  render,
  axe,
  userEvent,
  screen,
  type RenderFn,
} from '../../../../util/test-utils';

import { SecondaryLinks, type SecondaryLinksProps } from './SecondaryLinks';

describe('SecondaryLinks', () => {
  function renderSecondaryLinks<T>(
    renderFn: RenderFn<T>,
    props: SecondaryLinksProps,
  ) {
    return renderFn(<SecondaryLinks {...props} />);
  }

  const baseProps = {
    secondaryGroups: [
      {
        secondaryLinks: [
          {
            label: 'Shirts',
            href: '/shop/shirts',
            onClick: vi.fn(),
          },
          {
            label: 'Pants',
            href: '/shop/pants',
            onClick: vi.fn(),
            badge: { children: 'New' },
          },
          {
            label: 'Socks',
            href: '/shop/socks',
            onClick: vi.fn(),
            isActive: true,
          },
        ],
      },
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
  };

  it('should call the onClick handler when clicked', async () => {
    const onClick = vi.fn((event: ClickEvent) => {
      event.preventDefault();
    });
    const props = {
      secondaryGroups: [
        {
          secondaryLinks: [
            {
              label: 'Shirts',
              href: '/shop/shirts',
              onClick,
            },
          ],
        },
      ],
    };
    renderSecondaryLinks(render, props);

    await userEvent.click(screen.getByRole('link'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderSecondaryLinks(render, baseProps);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
