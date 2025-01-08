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
import { createRef, type FC } from 'react';
import { Add, Delete, type IconProps } from '@sumup-oss/icons';

import { act, axe, render, userEvent, screen } from '../../util/test-utils.js';

import { type Action, Popover, type PopoverProps } from './Popover.js';

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
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {});
  }

  const baseProps: PopoverProps = {
    component: (triggerProps) => <button {...triggerProps}>Button</button>,
    children: <div>Popover content</div>,
    isOpen: true,
    onToggle: vi.fn(createStateSetter(true)),
  };

  const actions: Action[] = [
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
  ];

  it('should forward a ref', () => {
    const ref = createRef<HTMLDialogElement>();
    render(<Popover {...baseProps} ref={ref} />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(ref.current).toBe(dialog);
  });

  it('should open the popover when clicking the trigger element', async () => {
    const isOpen = false;
    const onToggle = vi.fn(createStateSetter(isOpen));
    renderPopover({ ...baseProps, isOpen, onToggle });

    const popoverTrigger = screen.getByRole('button');

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
      renderPopover({ ...baseProps, isOpen, onToggle });

      const popoverTrigger = screen.getByRole('button');

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
    renderPopover(baseProps);

    const popoverTrigger = screen.getByRole('button');

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
      renderPopover(baseProps);

      const popoverTrigger = screen.getByRole('button');

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
    renderPopover({
      ...baseProps,
      children: undefined,
      actions,
    });

    const popoverItems = screen.getAllByRole('menuitem');

    await userEvent.click(popoverItems[0]);

    expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
  });

  it('should move focus to the first popover item after opening', async () => {
    const isOpen = false;
    const onToggle = vi.fn(createStateSetter(isOpen));

    const props = {
      ...baseProps,
      isOpen,
      onToggle,
      children: (
        <div>
          <button type="button">Item</button>
          <button type="button">Item</button>
        </div>
      ),
    };
    const { rerender } = renderPopover(props);

    rerender(<Popover {...props} isOpen />);

    const popoverItems = screen.getAllByText('Item');

    expect(popoverItems[0]).toHaveFocus();

    await flushMicrotasks();
  });

  it('should move focus to the trigger element after closing', async () => {
    const { rerender } = renderPopover(baseProps);

    rerender(<Popover {...baseProps} isOpen={false} />);

    const popoverTrigger = screen.getByRole('button');

    expect(popoverTrigger).toHaveFocus();

    await flushMicrotasks();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderPopover(baseProps);

    await act(async () => {
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });

  it('should render the popover with menu semantics by default ', async () => {
    renderPopover({
      ...baseProps,
      children: undefined,
      actions,
    });

    const menu = screen.getByRole('menu');
    expect(menu).toBeVisible();
    const menuitems = screen.getAllByRole('menuitem');
    expect(menuitems.length).toBe(2);

    await flushMicrotasks();
  });

  it('should render the popover without menu semantics ', async () => {
    renderPopover({ ...baseProps, role: 'none' });

    const menu = screen.queryByRole('menu');
    expect(menu).toBeNull();
    const menuitems = screen.queryAllByRole('menuitem');
    expect(menuitems.length).toBe(0);

    await flushMicrotasks();
  });

  it('should hide dividers from the accessibility tree', async () => {
    const { baseElement } = renderPopover({
      ...baseProps,
      children: undefined,
      actions,
    });

    const dividers = baseElement.querySelectorAll('hr[aria-hidden="true"');
    expect(dividers.length).toBe(1);

    await flushMicrotasks();
  });
});
