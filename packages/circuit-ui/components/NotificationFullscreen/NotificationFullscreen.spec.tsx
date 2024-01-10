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
import { Plus } from '@sumup/icons';
import { createRef } from 'react';

import { render, axe, screen } from '../../util/test-utils.js';

import {
  NotificationFullscreen,
  NotificationFullscreenProps,
} from './NotificationFullscreen.js';

describe('NotificationFullscreen', () => {
  const renderNotificationFullscreen = (props: NotificationFullscreenProps) =>
    render(<NotificationFullscreen {...props} />);

  const baseProps = {
    headline: "The browser you're using is no longer supported",
    image: {
      src: '/images/illustration-update.svg',
      alt: '',
    },
    actions: {
      primary: {
        children: 'Update now',
        onClick: vi.fn(),
      },
    },
  };

  it('should render with an svg component as the image', () => {
    const alt = 'Image description';
    const props = { ...baseProps, image: { svg: Plus, alt } };
    renderNotificationFullscreen(props);

    const svg = screen.getByRole('img');

    expect(svg).toBeVisible();
    expect(svg).toHaveAccessibleName(alt);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <NotificationFullscreen ref={ref} {...baseProps} />,
    );
    const wrapper = container.querySelector('div');
    expect(ref.current).toBe(wrapper);
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderNotificationFullscreen(baseProps);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  describe('heading levels', () => {
    it('should render with an h1 headline', () => {
      const { getByRole } = renderNotificationFullscreen({
        ...baseProps,
        headline: {
          label: 'Headline 1',
          as: 'h1',
        },
      });
      const headingEl = getByRole('heading');
      expect(headingEl.tagName).toBe('H1');
    });
  });

  describe('alternative text', () => {
    it('should add an alt attribute to an img element', () => {
      const altText = 'alt text';
      const { getByRole } = renderNotificationFullscreen({
        ...baseProps,
        image: {
          src: '/images/illustration-update.svg',
          alt: altText,
        },
      });
      const imageEl = getByRole('img');
      expect(imageEl.tagName).toBe('IMG');
      expect(imageEl.getAttribute('alt')).toBe(altText);
    });

    it('should add aria-label to an svg element', () => {
      const altText = 'alt text';
      const { getByRole } = renderNotificationFullscreen({
        ...baseProps,
        image: {
          svg: Plus,
          alt: altText,
        },
      });
      const imageEl = getByRole('img');
      expect(imageEl.tagName).toBe('svg');
      expect(imageEl.getAttribute('aria-label')).toBe(altText);
    });
  });
});
