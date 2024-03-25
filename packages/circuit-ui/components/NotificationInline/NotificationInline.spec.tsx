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

import {
  axe,
  render,
  userEvent,
  waitFor,
  screen,
} from '../../util/test-utils.js';

import {
  NotificationInline,
  NotificationInlineProps,
} from './NotificationInline.js';

describe('NotificationInline', () => {
  const renderNotificationInline = (props: NotificationInlineProps) =>
    render(<NotificationInline {...props} />);

  const baseProps: NotificationInlineProps = {
    body: 'This is an inline message',
  };

  it('should render the notification inline', async () => {
    renderNotificationInline({
      ...baseProps,
    });

    const toastEl = screen.getByText('This is an inline message');

    await waitFor(() => {
      expect(toastEl).toBeVisible();
    });
  });

  it('should render notification inline with headline', () => {
    renderNotificationInline({
      ...baseProps,
      headline: 'Information',
    });

    const headingEl = screen.getByRole('heading');

    expect(headingEl.tagName).toBe('H3');
    expect(headingEl).toHaveTextContent('Information');
  });

  it.each(['h2', 'h3', 'h4', 'h5', 'h6'] as const)(
    'should render notification inline as an %s headline',
    (level) => {
      renderNotificationInline({
        ...baseProps,
        headline: {
          label: `${level} headline`,
          as: level,
        },
      });

      const headingEl = screen.getByRole('heading');

      expect(headingEl.tagName).toBe(level.toUpperCase());
    },
  );

  it('should render notification toast with an action button', () => {
    renderNotificationInline({
      ...baseProps,
      action: {
        onClick: vi.fn(),
        children: 'Click here',
      },
    });
    expect(screen.getByRole('button')).toBeVisible();
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <NotificationInline ref={ref} {...baseProps} />,
    );
    const wrapper = container.querySelector('div');
    expect(ref.current).toBe(wrapper);
  });

  it('should click on a call to action button', async () => {
    const props = {
      ...baseProps,
      action: {
        onClick: vi.fn(),
        children: 'Click here',
      },
    };
    renderNotificationInline(props);

    await userEvent.click(screen.getByRole('button'));

    expect(props.action.onClick).toHaveBeenCalledTimes(1);
  });

  it('should close the notification inline when the onClose method is called', async () => {
    const props = {
      ...baseProps,
      onClose: vi.fn(),
      closeButtonLabel: 'Close notification',
    };
    renderNotificationInline(props);

    await userEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(props.onClose).toHaveBeenCalled();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderNotificationInline(baseProps);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
