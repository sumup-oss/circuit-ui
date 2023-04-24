/**
 * Copyright 2020, SumUp Ltd.
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

import { afterEach, describe, expect, it, vi } from 'vitest';
import { FC } from 'react';
import { Delete, Add, Download, IconProps } from '@sumup/icons';
import { Placement } from '@floating-ui/react-dom';

import {
  act,
  axe,
  RenderFn,
  render,
  userEvent,
} from '../../util/test-utils.jsx';
import { ClickEvent } from '../../types/events.js';

import {
  PopoverItem,
  PopoverItemProps,
  Popover,
  PopoverProps,
} from './Popover';

const placements: Placement[] = ['top', 'bottom', 'left', 'right'];

describe('PopoverItem', () => {
  function renderPopoverItem<T>(
    renderFn: RenderFn<T>,
    props: PopoverItemProps,
  ) {
    return renderFn(<PopoverItem {...props} />);
  }

  const baseProps = {
    children: 'PopoverItem',
    icon: Download as FC<IconProps>,
  };

  describe('Styles', () => {
    it('should render as Link when an href (and onClick) is passed', () => {
      const props = {
        ...baseProps,
        href: 'https://sumup.com',
        onClick: vi.fn(),
      };
      const { container } = renderPopoverItem(render, props);
      const anchorEl = container.querySelector('a');
      expect(anchorEl).toBeVisible();
    });

    it('should render as a `button` when an onClick is passed', () => {
      const props = { ...baseProps, onClick: vi.fn() };
      const { container } = renderPopoverItem(render, props);
      const buttonEl = container.querySelector('button');
      expect(buttonEl).toBeVisible();
    });
  });

  describe('Logic', () => {
    it('should call onClick when rendered as Link', async () => {
      const props = {
        ...baseProps,
        href: 'https://sumup.com',
        onClick: vi.fn((event: ClickEvent) => {
          event.preventDefault();
        }),
      };
      const { container } = renderPopoverItem(render, props);
      const anchorEl = container.querySelector('a');
      if (anchorEl) {
        await userEvent.click(anchorEl);
      }
      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Popover', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  function renderPopover(props: PopoverProps) {
    return render(<Popover {...props} />);
  }

  function createStateSetter(initialState: boolean) {
    return (state: boolean | ((prev: boolean) => boolean)) =>
      typeof state === 'boolean' ? state : state(initialState);
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
    await act(async () => {});
  }

  const baseProps: PopoverProps = {
    component: (triggerProps) => <button {...triggerProps}>Button</button>,
    actions: [
      {
        onClick: vi.fn(),
        children: 'Add',
        icon: Add as FC<IconProps>,
      },
      { type: 'divider' },
      {
        onClick: vi.fn(),
        children: 'Remove',
        icon: Delete as FC<IconProps>,
        destructive: true,
      },
    ],
    isOpen: true,
    onToggle: vi.fn(createStateSetter(true)),
  };

  describe('Styles', () => {
    /**
     * Note: we can't test the offset behavior enabled by the `offset` prop
     * with `jsdom`. The logic is covered in Chromatic.
     */
    it('should render with default styles', async () => {
      const { baseElement } = renderPopover(baseProps);
      expect(baseElement).toMatchSnapshot();
      await flushMicrotasks();
    });

    it('should render with closed styles', async () => {
      const { baseElement } = renderPopover({ ...baseProps, isOpen: false });
      expect(baseElement).toMatchSnapshot();
      await flushMicrotasks();
    });

    it.each(placements)('should render popover on %s', async (placement) => {
      const { baseElement } = renderPopover({ ...baseProps, placement });
      expect(baseElement).toMatchSnapshot();
      await flushMicrotasks();
    });
  });

  describe('Logic', () => {
    it('should open the popover when clicking the trigger element', async () => {
      const isOpen = false;
      const onToggle = vi.fn(createStateSetter(isOpen));
      const { getByRole } = renderPopover({ ...baseProps, isOpen, onToggle });

      const popoverTrigger = getByRole('button');

      await userEvent.click(popoverTrigger);

      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it.each([
      ['space', '{ }'],
      ['enter', '{Enter}'],
      ['arrow down', '{ArrowDown}'],
      ['arrow up', '{ArrowUp}'],
    ])(
      'should open the popover when pressing the %s key on the trigger element',
      async (_, key) => {
        const isOpen = false;
        const onToggle = vi.fn(createStateSetter(isOpen));
        const { getByRole } = renderPopover({ ...baseProps, isOpen, onToggle });

        const popoverTrigger = getByRole('button');

        popoverTrigger.focus();
        await userEvent.keyboard(key);

        expect(onToggle).toHaveBeenCalledTimes(1);
      },
    );

    it('should close the popover when clicking outside', async () => {
      renderPopover(baseProps);

      await userEvent.click(document.body);

      expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
    });

    it('should close the popover when clicking the trigger element', async () => {
      const { getByRole } = renderPopover(baseProps);

      const popoverTrigger = getByRole('button');

      await userEvent.click(popoverTrigger);

      expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
    });

    it.each([
      ['space', '{ }'],
      ['enter', '{Enter}'],
      ['arrow up', '{ArrowUp}'],
    ])(
      'should close the popover when pressing the %s key on the trigger element',
      async (_, key) => {
        const { getByRole } = renderPopover(baseProps);

        const popoverTrigger = getByRole('button');

        popoverTrigger.focus();
        await userEvent.keyboard(key);

        expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
      },
    );

    it('should close the popover when clicking the escape key', async () => {
      renderPopover(baseProps);

      await userEvent.keyboard('{Escape}');

      expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
    });

    it('should close the popover when clicking a popover item', async () => {
      const { getAllByRole } = renderPopover(baseProps);

      const popoverItems = getAllByRole('menuitem');

      await userEvent.click(popoverItems[0]);

      expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
    });

    it('should move focus to the first popover item after opening', async () => {
      const isOpen = false;
      const onToggle = vi.fn(createStateSetter(isOpen));

      const { getAllByRole, rerender } = renderPopover({
        ...baseProps,
        isOpen,
        onToggle,
      });

      act(() => {
        rerender(<Popover {...baseProps} isOpen />);
      });

      const popoverItems = getAllByRole('menuitem');

      expect(popoverItems[0]).toHaveFocus();

      await flushMicrotasks();
    });

    it('should move focus to the trigger element after closing', async () => {
      const { getByRole, rerender } = renderPopover(baseProps);

      act(() => {
        rerender(<Popover {...baseProps} isOpen={false} />);
      });

      const popoverTrigger = getByRole('button');

      expect(popoverTrigger).toHaveFocus();

      await flushMicrotasks();
    });
  });

  describe('Accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderPopover(baseProps);

      await act(async () => {
        const actual = await axe(container);
        expect(actual).toHaveNoViolations();
      });
    });
  });
});
