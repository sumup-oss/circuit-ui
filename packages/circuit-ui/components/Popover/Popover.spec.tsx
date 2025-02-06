/**
 * Copyright 2025, SumUp Ltd.
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
import { waitFor } from '@testing-library/react';

import { act, axe, render, userEvent, screen } from '../../util/test-utils.js';

import { Popover, type PopoverProps } from './Popover.js';

describe('Popover', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  function renderPopover(props: PopoverProps) {
    return render(<Popover {...props} />);
  }

  /**
   * Flushes microtasks to prevent act() warnings.
   *
   * From https://floating-ui.com/docs/react-dom#testing:
   *
   * > The position of floating elements is computed asynchronously, so a state
   * > update occurs during a Promise microtask.
   * >
   * > The state update happens after tests complete, resulting in act warnings.
   */
  async function flushMicrotasks() {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {});
  }

  const popoverContent = 'Popover content';
  const baseProps: PopoverProps = {
    component: (triggerProps) => <button {...triggerProps}>Button</button>,
    children: popoverContent,
    isOpen: true,
    onClose: vi.fn(),
  };
  it('should forward a ref', () => {
    const ref = createRef<HTMLDialogElement>();
    render(<Popover {...baseProps} ref={ref} />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(ref.current).toBe(dialog);
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<Popover {...baseProps} className={className} />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog?.className).toContain(className);
  });

  describe('when closed', () => {
    it('should open the popover when clicking the trigger element', async () => {
      const isOpen = false;
      renderPopover({ ...baseProps, isOpen });

      const popoverTrigger = screen.getByRole('button');

      await userEvent.click(popoverTrigger);

      expect(screen.getByText(popoverContent)).toBeVisible();
    });

    it.each([
      ['space', '{ }'],
      ['enter', '{Enter}'],
    ])(
      'should open the popover when pressing the %s key on the trigger element',
      async (_, key) => {
        const isOpen = false;
        renderPopover({ ...baseProps, isOpen });

        const popoverTrigger = screen.getByRole('button');

        popoverTrigger.focus();
        await userEvent.keyboard(key);

        expect(screen.getByText(popoverContent)).toBeVisible();
      },
    );
  });

  describe('when open', () => {
    it('should close the popover when clicking outside', async () => {
      renderPopover(baseProps);

      await userEvent.click(document.body);

      await waitFor(() => {
        expect(baseProps.onClose).toHaveBeenCalledTimes(1);
      });
    });

    it('should close the popover when clicking the trigger element', async () => {
      renderPopover(baseProps);

      const popoverTrigger = screen.getByRole('button');

      await userEvent.click(popoverTrigger);

      expect(baseProps.onClose).toHaveBeenCalled();
    });

    it.each([
      ['space', '{ }'],
      ['enter', '{Enter}'],
    ])(
      'should close the popover when pressing the %s key on the trigger element',
      async (_, key) => {
        renderPopover(baseProps);
        vi.runAllTimers();

        const popoverTrigger = screen.getByRole('button');

        popoverTrigger.focus();
        await userEvent.keyboard(key);

        expect(baseProps.onClose).toHaveBeenCalledTimes(1);
      },
    );

    it('should close the popover when clicking the escape key', async () => {
      renderPopover(baseProps);

      await userEvent.keyboard('{Escape}');

      await waitFor(() => expect(baseProps.onClose).toHaveBeenCalledTimes(1));
    });
  });

  describe('Accessibility', () => {
    it('should move focus to the first popover item after opening', async () => {
      const popoverButton = <button type="button">Popover Button</button>;

      renderPopover({
        ...baseProps,

        children: popoverButton,
      });

      expect(screen.getByText('Popover Button')).toHaveFocus();

      await flushMicrotasks();
    });

    it('should move focus to the trigger element after closing', async () => {
      const { rerender } = renderPopover(baseProps);

      rerender(<Popover {...baseProps} isOpen={false} />);

      const popoverTrigger = screen.getByRole('button');

      await waitFor(() => {
        expect(popoverTrigger).toHaveFocus();
      });

      await flushMicrotasks();
    });

    it('should have no accessibility violations', async () => {
      const { container } = renderPopover(baseProps);

      await act(async () => {
        const actual = await axe(container);
        expect(actual).toHaveNoViolations();
      });
    });
  });
});
