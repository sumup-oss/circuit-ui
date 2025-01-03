/**
 * Copyright 2024, SumUp Ltd.
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

import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';

import {
  render,
  screen,
  axe,
  userEvent,
  waitFor,
  act,
} from '../../util/test-utils.js';

import { ANIMATION_DURATION, Modal } from './Modal.js';

vi.mock('../../hooks/useMedia/index.js');

describe('Modal', () => {
  const props = {
    onClose: vi.fn(),
    open: false,
    closeButtonLabel: 'Close',
    children: 'Modal dialog content',
  };
  let originalHTMLDialogElement: typeof window.HTMLDialogElement;

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
    render(<Modal {...props} ref={ref} />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(ref.current).toBe(dialog);
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<Modal {...props} className={className} />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog?.className).toContain(className);
  });

  it('should render in closed state by default', () => {
    render(<Modal {...props} />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).not.toBeVisible();
  });

  it('should open the dialog when the open prop becomes truthy', () => {
    const { rerender } = render(<Modal {...props} />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = screen.getByRole('dialog', {
      hidden: true,
    });
    vi.spyOn(dialog, 'showModal');
    rerender(<Modal {...props} open />);
    expect(dialog.showModal).toHaveBeenCalledOnce();
    expect(dialog).toBeVisible();
  });

  it('should close the dialog when the open prop becomes falsy', () => {
    const { rerender } = render(<Modal {...props} open />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = screen.getByRole('dialog', {
      hidden: true,
    });
    vi.spyOn(dialog, 'close');
    rerender(<Modal {...props} />);
    act(() => {
      vi.advanceTimersByTime(ANIMATION_DURATION);
    });
    expect(dialog.close).toHaveBeenCalledOnce();
    expect(dialog).not.toBeVisible();
  });

  it('should close the dialog when the component is unmounted', async () => {
    const { unmount } = render(<Modal {...props} open />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = screen.getByRole('dialog', {
      hidden: true,
    });
    vi.spyOn(dialog, 'close');
    unmount();
    expect(dialog.close).toHaveBeenCalledOnce();
    expect(dialog).not.toBeVisible();
  });

  describe('when the dialog is closed', () => {
    it('should not render its children', () => {
      render(<Modal {...props} />);
      const children = screen.queryByText('Modal dialog content');

      expect(children).not.toBeInTheDocument();
    });

    it('should do nothing when pressing the Escape key', async () => {
      render(<Modal {...props} />);
      await userEvent.keyboard('{Escape}');
      expect(props.onClose).not.toHaveBeenCalled();
    });
  });

  describe('when the dialog is open', () => {
    it('should render its children', () => {
      render(<Modal {...props} open />);
      act(() => {
        vi.advanceTimersByTime(ANIMATION_DURATION);
      });
      expect(screen.getByText('Modal dialog content')).toBeVisible();
    });

    it('should not close modal on backdrop click if preventClose is true', async () => {
      render(<Modal {...props} open preventClose />);
      // eslint-disable-next-line testing-library/no-container
      const dialog = screen.getByRole('dialog', { hidden: true });
      await userEvent.click(dialog);
      act(() => {
        vi.advanceTimersByTime(ANIMATION_DURATION);
      });
      expect(props.onClose).not.toHaveBeenCalled();
      expect(dialog).toBeVisible();
    });

    it('should close the dialog when pressing the backdrop', async () => {
      render(<Modal {...props} open />);
      const dialog = screen.getByRole('dialog', { hidden: true });
      await userEvent.click(screen.getByRole('dialog', { hidden: true }));
      act(() => {
        vi.advanceTimersByTime(ANIMATION_DURATION);
      });
      expect(props.onClose).toHaveBeenCalledOnce();
      expect(dialog).not.toBeVisible();
    });

    it('should close the dialog when the close button is clicked', async () => {
      render(<Modal {...props} open />);
      const dialog = screen.getByRole('dialog', { hidden: true });
      await userEvent.click(screen.getByRole('button', { name: 'Close' }));
      act(() => {
        vi.advanceTimersByTime(ANIMATION_DURATION);
      });
      expect(props.onClose).toHaveBeenCalledOnce();
      expect(dialog).not.toBeVisible();
    });

    it('should remove animation classes when closed when polyfill is used', async () => {
      Object.defineProperty(window, 'HTMLDialogElement', {
        writable: true,
        value: undefined,
      });

      render(<Modal {...props} open />);
      const dialog = screen.getByRole('dialog', { hidden: true });

      const backdrop = document.getElementsByClassName('backdrop')[0];
      expect(backdrop.classList.toString()).toContain('backdrop-visible');
      await userEvent.click(screen.getByRole('button', { name: 'Close' }));
      expect(backdrop.classList.toString()).not.toContain('backdrop-visible');
      act(() => {
        vi.advanceTimersByTime(ANIMATION_DURATION);
      });

      expect(props.onClose).toHaveBeenCalledOnce();
      expect(dialog).not.toBeVisible();
    });
  });

  describe('accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Modal {...props} open />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it('should focus the close button when opened', () => {
      render(<Modal {...props} open />);
      expect(screen.getByRole('button', { name: /Close/i })).toHaveFocus();
    });

    it('should focus the first interactive element when opened', async () => {
      render(
        <Modal {...props} open>
          {() => (
            <button type="button" name="btn">
              Button
            </button>
          )}
        </Modal>,
      );
      const closeButton = screen.getByRole('button', { name: /Button/i });

      await waitFor(() => expect(closeButton).toHaveFocus());
    });

    it('should focus a given element when provided', async () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <Modal {...props} open initialFocusRef={ref}>
          {() => (
            <div>
              <button type="button" name="btn">
                Button
              </button>
              <button ref={ref} type="button" name="btn">
                Special button
              </button>
            </div>
          )}
        </Modal>,
      );
      const spacialButton = screen.getByRole('button', {
        name: /Special button/i,
      });

      await waitFor(() => expect(spacialButton).toHaveFocus());
    });
  });
});
