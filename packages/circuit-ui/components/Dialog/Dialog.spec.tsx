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

import { Dialog } from './Dialog.js';

describe('Dialog', () => {
  const props = {
    onCloseEnd: vi.fn(),
    onCloseStart: vi.fn(),
    open: false,
    isModal: false,
    closeButtonLabel: 'Close',
    children: 'Dialog content',
  };

  Object.defineProperty(window, 'scrollTo', {
    value: vi.fn(),
    writable: true,
  });

  Object.defineProperty(window, 'scrollY', { value: 1, writable: true });

  let originalHTMLDialogElement: typeof window.HTMLDialogElement;

  beforeEach(() => {
    originalHTMLDialogElement = window.HTMLDialogElement;
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    Object.defineProperty(window, 'HTMLDialogElement', {
      writable: true,
      value: originalHTMLDialogElement,
    });
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDialogElement>();
    render(<Dialog {...props} ref={ref} />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(ref.current).toBe(dialog);
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<Dialog {...props} className={className} />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog?.className).toContain(className);
  });

  it('should render in closed state by default', () => {
    render(<Dialog {...props} />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).not.toBeVisible();
  });

  it('should open the modal dialog when the open prop becomes truthy', () => {
    const { rerender } = render(<Dialog {...props} isModal />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = screen.getByRole('dialog', {
      hidden: true,
    });
    vi.spyOn(dialog, 'showModal');
    rerender(<Dialog {...props} open isModal />);
    expect(dialog.showModal).toHaveBeenCalledOnce();
    expect(dialog).toBeVisible();
  });

  it('should open the dialog when the open prop becomes truthy', () => {
    const { rerender } = render(<Dialog {...props} />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = screen.getByRole('dialog', {
      hidden: true,
    });
    vi.spyOn(dialog, 'show');
    rerender(<Dialog {...props} open />);
    expect(dialog.show).toHaveBeenCalledOnce();
    expect(dialog).toBeVisible();
  });

  it('should switch to modal mode when the isModal prop becomes truthy', () => {
    const { rerender } = render(<Dialog {...props} open />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = screen.getByRole('dialog', {
      hidden: true,
    });
    vi.spyOn(dialog, 'showModal');
    rerender(<Dialog {...props} open isModal />);
    expect(dialog.showModal).toHaveBeenCalledOnce();
    expect(props.onCloseEnd).not.toHaveBeenCalled();
    expect(props.onCloseStart).not.toHaveBeenCalled();
    expect(dialog).toBeVisible();
  });

  it('should close the dialog when the open prop becomes falsy', () => {
    const { rerender } = render(<Dialog {...props} open />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = screen.getByRole('dialog', {
      hidden: true,
    });
    vi.spyOn(dialog, 'close');
    rerender(<Dialog {...props} />);
    vi.runAllTimers();
    expect(dialog.close).toHaveBeenCalledOnce();
    expect(dialog).not.toBeVisible();
  });

  it('should close the dialog when the component is unmounted', async () => {
    const { unmount } = render(<Dialog {...props} open />);
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
      render(<Dialog {...props} />);
      const children = screen.queryByText('Dialog content');

      expect(children).not.toBeInTheDocument();
    });

    it('should do nothing when pressing the Escape key', async () => {
      render(<Dialog {...props} />);
      await userEvent.keyboard('{Escape}');
      expect(props.onCloseEnd).not.toHaveBeenCalled();
      expect(props.onCloseStart).not.toHaveBeenCalled();
    });
  });

  describe('when the dialog is open', () => {
    it('should render its children', () => {
      render(<Dialog {...props} open />);
      vi.runAllTimers();
      expect(screen.getByText('Dialog content')).toBeVisible();
      expect(screen.getByRole('button', { name: 'Close' })).toBeVisible();
    });

    it('should not show the close button if hideCloseButton is true', async () => {
      render(<Dialog {...props} open hideCloseButton />);
      // eslint-disable-next-line testing-library/no-container
      expect(
        screen.queryByRole('button', { name: 'Close' }),
      ).not.toBeInTheDocument();
    });

    describe('preventOutsideClickClose', () => {
      it('should close modal on backdrop click if preventOutsideClickClose is false', async () => {
        render(<Dialog {...props} open />);
        // eslint-disable-next-line testing-library/no-container
        const dialog = screen.getByRole('dialog', { hidden: true });
        vi.spyOn(dialog, 'close');
        await userEvent.click(dialog);
        act(() => {
          vi.runAllTimers();
        });
        expect(props.onCloseEnd).toHaveBeenCalled();
        expect(props.onCloseStart).toHaveBeenCalled();
        expect(dialog.close).toHaveBeenCalled();
      });
      it('should not close modal on backdrop click if preventOutsideClickClose is true', async () => {
        render(<Dialog {...props} open preventOutsideClickClose />);
        // eslint-disable-next-line testing-library/no-container
        const dialog = screen.getByRole('dialog', { hidden: true });
        await userEvent.click(dialog);
        act(() => {
          vi.runAllTimers();
        });
        expect(props.onCloseEnd).not.toHaveBeenCalled();
        expect(props.onCloseStart).not.toHaveBeenCalled();
        expect(dialog).toBeVisible();
      });
      it('should not close modal on backdrop click if preventOutsideClickClose is true - polyfill', async () => {
        Object.defineProperty(window, 'HTMLDialogElement', {
          writable: true,
          value: undefined,
        });
        render(<Dialog {...props} open preventOutsideClickClose />);
        // eslint-disable-next-line testing-library/no-container
        const dialog = screen.getByRole('dialog', { hidden: true });
        await userEvent.click(dialog);
        vi.runAllTimers();
        expect(props.onCloseEnd).not.toHaveBeenCalled();
        expect(props.onCloseStart).not.toHaveBeenCalled();
        expect(dialog).toBeVisible();
      });
    });

    describe('preventEscapeKeyClose', () => {
      it('should close the dialog pressing the Escape key and preventEscapeKeyClose is false', async () => {
        render(<Dialog {...props} open />);
        const dialog = screen.getByRole('dialog', { hidden: true });
        vi.spyOn(dialog, 'close');
        await userEvent.keyboard('{Escape}');
        expect(dialog.close).toHaveBeenCalled();
        expect(props.onCloseEnd).toHaveBeenCalled();
        expect(props.onCloseStart).toHaveBeenCalled();
      });

      it('should not close the dialog pressing the Escape key and preventEscapeKeyClose is true', async () => {
        render(<Dialog {...props} open preventEscapeKeyClose />);
        const dialog = screen.getByRole('dialog', { hidden: true });
        vi.spyOn(dialog, 'close');
        await userEvent.keyboard('{Escape}');
        expect(dialog.close).not.toHaveBeenCalled();
        expect(props.onCloseEnd).not.toHaveBeenCalled();
        expect(props.onCloseStart).not.toHaveBeenCalled();
      });
    });

    it('should close the dialog when pressing the backdrop', async () => {
      render(<Dialog {...props} open />);
      const dialog = screen.getByRole('dialog', { hidden: true });
      await userEvent.click(screen.getByRole('dialog', { hidden: true }));
      vi.runAllTimers();
      expect(props.onCloseEnd).toHaveBeenCalledOnce();
      expect(props.onCloseStart).toHaveBeenCalledOnce();
      expect(dialog).not.toBeVisible();
    });

    it('should close the dialog when pressing the backdrop - polyfill', async () => {
      render(<Dialog {...props} open />);
      const dialog = screen.getByRole('dialog', { hidden: true });
      const backdrop = document.getElementsByClassName('backdrop')[0];
      await userEvent.click(backdrop);
      vi.runAllTimers();
      expect(props.onCloseEnd).toHaveBeenCalledOnce();
      expect(props.onCloseStart).toHaveBeenCalledOnce();
      expect(dialog).not.toBeVisible();
    });

    it('should close the modal dialog when the close button is clicked', async () => {
      render(<Dialog {...props} open isModal />);
      const dialog = screen.getByRole('dialog', { hidden: true });
      await userEvent.click(screen.getByRole('button', { name: 'Close' }));
      vi.runAllTimers();
      expect(props.onCloseEnd).toHaveBeenCalledOnce();
      expect(props.onCloseStart).toHaveBeenCalledOnce();
      expect(dialog).not.toBeVisible();
    });
  });

  describe('accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Dialog {...props} open />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it('should focus the close button of the modal dialog when opened', () => {
      render(<Dialog {...props} open isModal />);
      expect(screen.getByRole('button', { name: /Close/i })).toHaveFocus();
    });

    it('should focus the first interactive element when opened', async () => {
      render(
        <Dialog {...props} open>
          {() => (
            <button type="button" name="btn">
              Button
            </button>
          )}
        </Dialog>,
      );
      const closeButton = screen.getByRole('button', { name: /Button/i });

      await waitFor(() => expect(closeButton).toHaveFocus());
    });

    it('should focus a given element when provided', async () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <Dialog {...props} open initialFocusRef={ref}>
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
        </Dialog>,
      );
      const spacialButton = screen.getByRole('button', {
        name: /Special button/i,
      });

      await waitFor(() => expect(spacialButton).toHaveFocus());
    });
  });
});
