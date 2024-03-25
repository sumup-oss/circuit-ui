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
import { createRef } from 'react';

import { render, axe, userEvent, screen } from '../../util/test-utils.js';

import {
  NotificationBanner,
  NotificationBannerProps,
} from './NotificationBanner.js';

describe('NotificationBanner', () => {
  const renderNotificationBanner = (props: NotificationBannerProps) =>
    render(<NotificationBanner {...props} />);

  const baseProps: NotificationBannerProps = {
    headline: 'Software update',
    body: 'There is updated firmware available for your card reader',
    action: {
      onClick: vi.fn(),
      children: 'Update',
      variant: 'primary',
    },
    image: {
      src: '/images/illustration-update.svg',
      alt: 'Update',
      width: '100',
    },
  };

  it('should forward a ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <NotificationBanner ref={ref} {...baseProps} />,
    );
    const wrapper = container.querySelector('div');
    expect(ref.current).toBe(wrapper);
  });

  it('should call onClick when clicked', async () => {
    renderNotificationBanner(baseProps);

    await userEvent.click(screen.getByRole('button'));

    expect(baseProps.action.onClick).toHaveBeenCalledTimes(1);
  });

  it('should render a close button', () => {
    renderNotificationBanner({
      ...baseProps,
      onClose: vi.fn(),
      closeButtonLabel: 'Close notification',
    });

    expect(screen.getByRole('button', { name: /close/i })).toBeVisible();
  });

  it('should call onClose when closed', async () => {
    const props = {
      ...baseProps,
      onClose: vi.fn(),
      closeButtonLabel: 'Close notification',
    };
    renderNotificationBanner(props);

    await userEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderNotificationBanner(baseProps);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
