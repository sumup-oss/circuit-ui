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
import { createRef, useState } from 'react';
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

  const popoverContent = 'Popover content';
  const baseProps: PopoverProps = {
    component: (triggerProps) => <button {...triggerProps}>Button</button>,
    children: popoverContent,
    isOpen: true,
    onToggle: vi.fn(),
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
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog?.className).toContain(className);
  });

  describe('when closed', () => {
    it('should not render its content', () => {
      renderPopover({ ...baseProps, isOpen: false });

      expect(screen.queryByText(popoverContent)).not.toBeInTheDocument();
    });
    it('should open the popover when clicking the trigger element', async () => {
      renderPopover({ ...baseProps, isOpen: false });

      const popoverTrigger = screen.getByRole('button', { name: 'Button' });

      await userEvent.click(popoverTrigger);

      expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
    });

    it.each([
      ['space', '{ }'],
      ['enter', '{Enter}'],
    ])(
      'should open the popover when pressing the %s key on the trigger element',
      async (_, key) => {
        renderPopover({ ...baseProps, isOpen: false });

        const popoverTrigger = screen.getByRole('button');

        popoverTrigger.focus();
        await userEvent.keyboard(key);

        expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
      },
    );

    it('should not return focus to the previous trigger when another popover opens', async () => {
      function Wrapper() {
        const [open1, setOpen1] = useState(false);
        const [open2, setOpen2] = useState(false);

        return (
          <>
            <Popover
              id="popover1"
              isOpen={open1}
              onToggle={setOpen1}
              component={(triggerProps) => (
                <button {...triggerProps}>Open Popover 1</button>
              )}
            >
              Popover 1
            </Popover>

            <Popover
              aria-describedby="popover2"
              isOpen={open2}
              onToggle={setOpen2}
              component={(triggerProps) => (
                <button {...triggerProps}>Open Popover 2</button>
              )}
            >
              Popover 2
            </Popover>
          </>
        );
      }

      render(<Wrapper />);

      const firstTrigger = screen.getByRole('button', {
        name: 'Open Popover 1',
      });

      // Open the first popover
      await userEvent.click(firstTrigger);
      expect(screen.getByText('Popover 1')).toBeVisible();

      // Open the second popover, which should close the first
      await userEvent.click(
        screen.getByRole('button', { name: 'Open Popover 2' }),
      );

      // Popover 1 should be closed
      expect(screen.queryByText('Popover 1')).not.toBeInTheDocument();

      // Popover 2 should now be open
      const secondPopover = screen.getByRole('dialog', { hidden: false });
      expect(secondPopover).toBeVisible();
      expect(secondPopover).toHaveTextContent('Popover 2');

      // Focus should not return to the first trigger
      expect(firstTrigger).not.toHaveFocus();
      // eslint-disable-next-line testing-library/no-node-access
      expect(secondPopover.contains(document.activeElement)).toBe(true);
    });
  });

  describe('when open', () => {
    it('should render its content', () => {
      renderPopover(baseProps);

      expect(screen.getByText(popoverContent)).toBeVisible();
    });

    it('should close the popover when clicking outside', async () => {
      renderPopover(baseProps);

      await userEvent.click(document.body);

      await waitFor(() => {
        expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
      });
    });

    it('should close the popover when clicking the trigger element', async () => {
      renderPopover(baseProps);

      const popoverTrigger = screen.getByRole('button', { name: 'Button' });

      await userEvent.click(popoverTrigger);

      expect(baseProps.onToggle).toHaveBeenCalled();
    });

    it.each([
      ['space', '{ }'],
      ['enter', '{Enter}'],
    ])(
      'should close the popover when pressing the %s key on the trigger element',
      async (_, key) => {
        renderPopover(baseProps);
        vi.runAllTimers();

        const popoverTrigger = screen.getByRole('button', { name: 'Button' });

        popoverTrigger.focus();
        await userEvent.keyboard(key);

        expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
      },
    );

    it('should close the popover when clicking the escape key', async () => {
      renderPopover(baseProps);

      await userEvent.keyboard('{Escape}');

      await waitFor(() => expect(baseProps.onToggle).toHaveBeenCalledTimes(1));
    });

    it('should close when the isOpen prop changes', async () => {
      const { rerender } = renderPopover(baseProps);

      rerender(<Popover {...baseProps} isOpen={false} />);

      await waitFor(() => expect(baseProps.onToggle).toHaveBeenCalledTimes(1));
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderPopover(baseProps);

      await act(async () => {
        const actual = await axe(container);
        expect(actual).toHaveNoViolations();
      });
    });
  });
});
