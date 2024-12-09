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

/**
 * Copyright 2014, SumUp Ltd.
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
import {
  beforeEach,
  afterEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from 'vitest';
import { createRef } from 'react';

import {
  render,
  screen,
  axe,
  userEvent,
  waitFor,
  act,
} from '../../util/test-utils.js';

import { animationDuration, Dialog } from './Dialog.js';
import { hasNativeDialogSupport } from './DialogService.js';

vi.mock('./DialogService.js', async (importOriginal) => {
  const module = await importOriginal<typeof import('./DialogService.js')>();
  return {
    ...module,
    hasNativeDialogSupport: vi.fn().mockReturnValue(true),
  };
});

describe('Dialog', () => {
  const props = {
    onClose: vi.fn(),
    open: false,
    closeButtonLabel: 'Close',
    children: vi.fn(() => <div data-testid="children">Dialog content</div>),
  };

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    (hasNativeDialogSupport as Mock).mockReturnValue(true);
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDialogElement>();
    const { container } = render(<Dialog {...props} ref={ref} />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = container.querySelector('dialog');
    expect(ref.current).toBe(dialog);
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(<Dialog {...props} className={className} />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = container.querySelector('dialog');
    expect(dialog?.className).toContain(className);
  });

  it('should render in closed state by default', () => {
    const { container } = render(<Dialog {...props} />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = container.querySelector('dialog') as HTMLDialogElement;
    expect(dialog).not.toBeVisible();
  });

  it('should open the dialog when the open prop becomes truthy', () => {
    const { container, rerender } = render(<Dialog {...props} />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = container.querySelector('dialog') as HTMLDialogElement;
    vi.spyOn(dialog, 'showModal');
    rerender(<Dialog {...props} open />);
    expect(dialog.showModal).toHaveBeenCalledOnce();
  });

  it('should close the dialog when the open prop becomes falsy', () => {
    const { container, rerender } = render(<Dialog {...props} open />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = container.querySelector('dialog') as HTMLDialogElement;
    vi.spyOn(dialog, 'close');
    rerender(<Dialog {...props} />);
    act(() => {
      vi.advanceTimersByTime(animationDuration);
    });
    expect(dialog.close).toHaveBeenCalledOnce();
  });

  it('should close the dialog when the component is unmounted', async () => {
    const { container, unmount } = render(<Dialog {...props} open />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = container.querySelector('dialog') as HTMLDialogElement;
    vi.spyOn(dialog, 'close');
    unmount();
    expect(dialog.close).toHaveBeenCalledOnce();
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
      expect(props.onClose).not.toHaveBeenCalled();
    });
  });

  describe('when the dialog is open', () => {
    it('should render its children', () => {
      render(<Dialog {...props} open />);
      const children = screen.getByText('Dialog content');
      expect(props.children).toHaveBeenCalledOnce();
      expect(children).toBeVisible();
    });

    it('should not close modal on backdrop click if preventClose is true', async () => {
      const { container } = render(<Dialog {...props} open preventClose />);
      // eslint-disable-next-line testing-library/no-container
      const dialog = container.querySelector('dialog') as HTMLDialogElement;
      await userEvent.click(dialog);
      act(() => {
        vi.advanceTimersByTime(animationDuration);
      });
      expect(props.onClose).not.toHaveBeenCalled();
    });

    it('should open in immersive mode', async () => {
      const { container } = render(
        <Dialog {...props} open variant="immersive" />,
      );
      // eslint-disable-next-line testing-library/no-container
      const dialog = container.querySelector('dialog') as HTMLDialogElement;
      expect(dialog.className).toContain('immersive');
    });

    it('should close the dialog and pressing the backdrop', async () => {
      render(<Dialog {...props} open />);
      await userEvent.click(screen.getByRole('dialog', { hidden: true }));
      act(() => {
        vi.advanceTimersByTime(animationDuration);
      });
      expect(props.onClose).toHaveBeenCalledOnce();
    });

    it('should close the dialog when the close button is clicked', async () => {
      render(<Dialog {...props} open />);
      await userEvent.click(screen.getByRole('button', { name: 'Close' }));
      act(() => {
        vi.advanceTimersByTime(animationDuration);
      });
      expect(props.onClose).toHaveBeenCalledOnce();
    });

    it('should remove animation classes when closed when polyfill is used', async () => {
      (hasNativeDialogSupport as Mock).mockReturnValue(false);
      render(<Dialog {...props} open />);

      const backdrop = document.getElementsByClassName('backdrop')[0];
      expect(backdrop.classList.toString()).toContain('backdrop-visible');
      await userEvent.click(screen.getByRole('button', { name: 'Close' }));
      expect(backdrop.classList.toString()).not.toContain('backdrop-visible');
      act(() => {
        vi.advanceTimersByTime(animationDuration);
      });

      expect(props.onClose).toHaveBeenCalledOnce();
    });
  });

  describe('accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Dialog {...props} open />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it('should focus the close button when opened', () => {
      render(<Dialog {...props} open />);
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
