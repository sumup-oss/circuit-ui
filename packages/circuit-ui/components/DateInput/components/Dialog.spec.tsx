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

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';

import { render, screen, axe, userEvent } from '../../../util/test-utils.js';

import { Dialog } from './Dialog.js';

describe('Dialog', () => {
  const props = {
    onClose: vi.fn(),
    open: false,
    children: vi.fn(() => <div data-testid="children" />),
  };

  beforeEach(() => {
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

  it('should open the dialog when the open prop becomes truthy', () => {
    const { container, rerender } = render(<Dialog {...props} />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = container.querySelector('dialog') as HTMLDialogElement;
    vi.spyOn(dialog, 'show');
    rerender(<Dialog {...props} open />);
    expect(dialog.show).toHaveBeenCalledOnce();
  });

  it('should open the dialog as a modal when the open prop becomes truthy', () => {
    const { container, rerender } = render(<Dialog {...props} isModal />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = container.querySelector('dialog') as HTMLDialogElement;
    vi.spyOn(dialog, 'showModal');
    rerender(<Dialog {...props} isModal open />);
    expect(dialog.showModal).toHaveBeenCalledOnce();
  });

  it('should re-open the dialog as a modal when the isModal prop changes', () => {
    const { container, rerender } = render(<Dialog {...props} open />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = container.querySelector('dialog') as HTMLDialogElement;
    vi.spyOn(dialog, 'close');
    vi.spyOn(dialog, 'showModal');
    rerender(<Dialog {...props} open isModal />);
    expect(dialog.close).toHaveBeenCalledOnce();
    expect(dialog.showModal).toHaveBeenCalledOnce();
  });

  it('should close the dialog when the open prop becomes falsy', () => {
    const { container, rerender } = render(<Dialog {...props} open />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = container.querySelector('dialog') as HTMLDialogElement;
    vi.spyOn(dialog, 'close');
    rerender(<Dialog {...props} />);
    expect(dialog.close).toHaveBeenCalledOnce();
  });

  it('should close the dialog when the component is unmounted', () => {
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
      const children = screen.queryByTestId('children');
      expect(props.children).not.toHaveBeenCalled();
      expect(children).not.toBeInTheDocument();
    });

    it('should do nothing when pressing the Escape key', async () => {
      render(<Dialog {...props} />);
      await userEvent.keyboard('{Escape}');
      expect(props.onClose).not.toHaveBeenCalled();
    });

    it('should do nothing when pressing outside the dialog', async () => {
      const { container } = render(<Dialog {...props} />);
      await userEvent.click(container);
      expect(props.onClose).not.toHaveBeenCalled();
    });
  });

  describe('when the dialog is open', () => {
    it('should render its children', () => {
      render(<Dialog {...props} open />);
      const children = screen.getByTestId('children');
      expect(props.children).toHaveBeenCalledOnce();
      expect(children).toBeVisible();
    });

    it('should close the dialog when pressing the Escape key', async () => {
      render(<Dialog {...props} open />);
      await userEvent.keyboard('{Escape}');
      expect(props.onClose).toHaveBeenCalledOnce();
    });

    it('should close the dialog when pressing outside the dialog', async () => {
      const { container } = render(<Dialog {...props} open />);
      await userEvent.click(container);
      expect(props.onClose).toHaveBeenCalledOnce();
    });

    it('should close the dialog when modal and pressing the backdrop', async () => {
      render(<Dialog {...props} isModal open />);
      await userEvent.click(screen.getByRole('dialog', { hidden: true }));
      expect(props.onClose).toHaveBeenCalledOnce();
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Dialog {...props} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
