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
  fireEvent,
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

  function swipeDown(dialog: Element) {
    fireEvent.touchStart(dialog, {
      targetTouches: [{ clientX: 0, clientY: 0 }],
    });

    fireEvent.touchMove(dialog, {
      targetTouches: [{ clientX: 0, clientY: 700 }],
    });

    fireEvent.touchEnd(dialog, {
      changedTouches: [{ clientX: 0, clientY: 700 }],
    });
  }

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
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog?.className).toContain(className);
  });

  it('should render in closed state by default', () => {
    render(<Dialog {...props} />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).not.toBeVisible();
  });

  it('should open the modal dialog when the open prop becomes truthy', () => {
    const { rerender } = render(<Dialog {...props} isModal />);
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
      expect(
        screen.queryByRole('button', { name: 'Close' }),
      ).not.toBeInTheDocument();
    });

    describe('preventOutsideClickClose', () => {
      it('should close modal on backdrop click if preventOutsideClickClose is false', async () => {
        render(<Dialog {...props} open />);
        const dialog = screen.getByRole('dialog', { hidden: true });
        vi.spyOn(dialog, 'close');
        await userEvent.click(document.body);
        act(() => {
          vi.runAllTimers();
        });
        expect(props.onCloseEnd).toHaveBeenCalled();
        expect(props.onCloseStart).toHaveBeenCalled();
        expect(dialog.close).toHaveBeenCalled();
      });
      it('should not close modal on backdrop click if preventOutsideClickClose is true', async () => {
        render(<Dialog {...props} open preventOutsideClickClose />);
        const dialog = screen.getByRole('dialog', { hidden: true });
        await userEvent.click(dialog);
        act(() => {
          vi.runAllTimers();
        });
        expect(props.onCloseEnd).not.toHaveBeenCalled();
        expect(props.onCloseStart).not.toHaveBeenCalled();
        expect(dialog).toBeVisible();
      });
      it('should not close modal on swipe down if preventOutsideClickClose is true', async () => {
        render(<Dialog {...props} open preventOutsideClickClose />);
        const dialog = screen.getByRole('dialog', { hidden: true });
        swipeDown(dialog);
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

      it('should not close the dialog pressing the Escape key and focus is outside the dialog', async () => {
        render(
          <>
            <Dialog {...props} open preventEscapeKeyClose />
            <button>Some button</button>
          </>,
        );
        const dialog = screen.getByRole('dialog', { hidden: true });
        const button = screen.getByText('Some button');
        vi.spyOn(dialog, 'close');

        button.focus();
        await userEvent.keyboard('{Escape}');
        expect(dialog.close).not.toHaveBeenCalled();
        expect(props.onCloseEnd).not.toHaveBeenCalled();
        expect(props.onCloseStart).not.toHaveBeenCalled();
      });
    });

    it('should close the dialog when pressing the backdrop', async () => {
      render(<Dialog {...props} open isModal />);
      const dialog = screen.getByRole('dialog', { hidden: true });
      vi.spyOn(dialog, 'getBoundingClientRect').mockImplementation(
        () => new DOMRect(100, 100, 500, 500),
      );

      fireEvent.click(dialog, { clientX: 700, clientY: 700 });
      vi.runAllTimers();
      expect(props.onCloseEnd).toHaveBeenCalledOnce();
      expect(props.onCloseStart).toHaveBeenCalledOnce();
      expect(dialog).not.toBeVisible();
    });

    it('should close the dialog when user swipes down', async () => {
      render(<Dialog {...props} open isModal />);

      const dialog = screen.getByRole('dialog', { hidden: true });

      swipeDown(dialog);

      vi.runAllTimers();
      expect(props.onCloseStart).toHaveBeenCalledOnce();
      expect(props.onCloseEnd).toHaveBeenCalledOnce();
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
      render(
        <Dialog {...props} open>
          {() => (
            <div>
              <button type="button" name="btn">
                Button
              </button>
              {/* @ts-expect-error React purposefully breaks the `autoFocus` property. Using the lowercase DOM attribute name instead forces it to be added to the DOM but will produce a console warning that can be safely ignored. https://github.com/facebook/react/issues/23301 */}
              <button type="button" name="btn" autofocus="true">
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
