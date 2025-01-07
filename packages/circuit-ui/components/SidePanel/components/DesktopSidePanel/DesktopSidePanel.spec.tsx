/**
 * Copyright 2022, SumUp Ltd.
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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';

import {
  render,
  axe,
  screen,
  waitFor,
  userEvent,
} from '../../../../util/test-utils.js';

import {
  DesktopSidePanel,
  type DesktopSidePanelProps,
} from './DesktopSidePanel.js';

describe('DesktopSidePanel', () => {
  const baseProps: DesktopSidePanelProps = {
    isInstantOpen: false,
    // Usually this is controlled by the SidePanelProvider.
    open: true,
    children: 'content',
    onClose: vi.fn(),
  };
  let originalHTMLDialogElement: typeof window.HTMLDialogElement;

  const renderComponent = (props: Partial<DesktopSidePanelProps> = {}) =>
    render(<DesktopSidePanel {...baseProps} {...props} />);

  beforeEach(() => {
    originalHTMLDialogElement = window.HTMLDialogElement;
    vi.clearAllMocks();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.resetAllMocks();
    Object.defineProperty(window, 'HTMLDialogElement', {
      writable: true,
      value: originalHTMLDialogElement,
    });
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDialogElement>();
    render(<DesktopSidePanel {...baseProps} ref={ref} />);

    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(ref.current).toBe(dialog);
  });

  it('should render the side panel', () => {
    renderComponent();
    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.getByText(baseProps.children)).toBeVisible();
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    renderComponent({ className });
    // eslint-disable-next-line testing-library/no-container
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog?.className).toContain(className);
  });

  it('should open the dialog when the open prop becomes truthy', () => {
    const { rerender } = render(
      <DesktopSidePanel {...baseProps} open={false} />,
    );
    const dialog = screen.getByRole('dialog', {
      hidden: true,
    });
    vi.spyOn(dialog, 'showModal');
    rerender(<DesktopSidePanel {...baseProps} open />);
    expect(dialog).toBeVisible();
  });

  it('should close when escape key is pressed', async () => {
    render(<DesktopSidePanel {...baseProps} />);
    await userEvent.keyboard('{Escape}');
    expect(baseProps.onClose).toHaveBeenCalled();
  });

  describe('when closed', () => {
    it('should not render its children', () => {
      render(<DesktopSidePanel {...baseProps} open={false} />);
      const children = screen.queryByText(baseProps.children);

      expect(children).not.toBeVisible();
    });

    it('should do nothing when pressing the Escape key', async () => {
      render(<DesktopSidePanel {...baseProps} open={false} />);
      await userEvent.keyboard('{Escape}');
      expect(baseProps.onClose).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderComponent();
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it('should focus the first interactive element when opened', async () => {
      render(
        <DesktopSidePanel {...baseProps}>
          <button type="button" name="btn">
            Button
          </button>
        </DesktopSidePanel>,
      );

      const closeButton = screen.getByRole('button', { name: /Button/i });

      await waitFor(() => expect(closeButton).toHaveFocus());
    });
  });
});
