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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRef, type FC } from 'react';
import { Add, Delete, type IconProps } from '@sumup-oss/icons';
import { waitFor } from '@testing-library/react';

import { act, axe, render, userEvent, screen } from '../../util/test-utils.js';

import { ActionMenu, type ActionMenuProps } from './ActionMenu.js';

describe('ActionMenu', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  function renderActionMenu(props: ActionMenuProps) {
    return render(<ActionMenu {...props} />);
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

  const baseProps: ActionMenuProps = {
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
  it('should forward a ref', () => {
    const ref = createRef<HTMLDialogElement>();
    render(<ActionMenu {...baseProps} ref={ref} />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(ref.current).toBe(dialog);
  });

  it('should open the action menu when clicking the trigger element', async () => {
    const isOpen = false;
    const onToggle = vi.fn(createStateSetter(isOpen));
    renderActionMenu({ ...baseProps, isOpen, onToggle });

    const trigger = screen.getByRole('button');

    await userEvent.click(trigger);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['space', '{ }'],
    ['enter', '{Enter}'],
    ['arrow down', '{ArrowDown}'],
    ['arrow up', '{ArrowUp}'],
  ])(
    'should open the action menu when pressing the %s key on the trigger element',
    async (_, key) => {
      const isOpen = false;
      const onToggle = vi.fn(createStateSetter(isOpen));
      renderActionMenu({ ...baseProps, isOpen, onToggle });

      const trigger = screen.getByRole('button');

      trigger.focus();
      await userEvent.keyboard(key);

      expect(onToggle).toHaveBeenCalledTimes(1);
    },
  );

  it('should close the action menu when clicking outside', async () => {
    renderActionMenu(baseProps);

    await userEvent.click(document.body);

    await waitFor(() => {
      expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
    });
  });

  it('should close the action menu when clicking the trigger element', async () => {
    renderActionMenu(baseProps);

    const trigger = screen.getByRole('button');

    await userEvent.click(trigger);

    // TODO Find a better way to test this as toHaveBeenCalled is not reliable here.
    expect(baseProps.onToggle).toHaveBeenCalled();
  });

  it.each([
    ['space', '{ }'],
    ['enter', '{Enter}'],
    ['arrow up', '{ArrowUp}'],
  ])(
    'should close the action menu when pressing the %s key on the trigger element',
    async (_, key) => {
      renderActionMenu(baseProps);
      vi.runAllTimers();

      const trigger = screen.getByRole('button');

      trigger.focus();
      await userEvent.keyboard(key);

      expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
    },
  );

  it('should close the action menu when clicking the escape key', async () => {
    renderActionMenu(baseProps);

    await userEvent.keyboard('{Escape}');

    await waitFor(() => expect(baseProps.onToggle).toHaveBeenCalledTimes(1));
  });

  it('should close the action menu when clicking a action menu item', async () => {
    renderActionMenu(baseProps);

    const actionMenuItems = screen.getAllByRole('menuitem');

    await userEvent.click(actionMenuItems[0]);

    expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
  });

  it('should move focus to the first action menu item after opening', async () => {
    const isOpen = false;
    const onToggle = vi.fn(createStateSetter(isOpen));

    const { rerender } = renderActionMenu({
      ...baseProps,
      isOpen,
      onToggle,
    });

    rerender(<ActionMenu {...baseProps} isOpen />);

    const actionMenuItems = screen.getAllByRole('menuitem');

    expect(actionMenuItems[0]).toHaveFocus();

    await flushMicrotasks();
  });

  it('should move focus to the trigger element after closing', async () => {
    const { rerender } = renderActionMenu(baseProps);

    rerender(<ActionMenu {...baseProps} isOpen={false} />);

    const trigger = screen.getByRole('button');

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });

    await flushMicrotasks();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderActionMenu(baseProps);

    await act(async () => {
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });

  it('should render the action menu with menu semantics by default ', async () => {
    renderActionMenu(baseProps);

    const menu = screen.getByRole('menu');
    expect(menu).toBeVisible();
    const menuitems = screen.getAllByRole('menuitem');
    expect(menuitems.length).toBe(2);

    await flushMicrotasks();
  });

  it('should render the action menu without menu semantics ', async () => {
    renderActionMenu({ ...baseProps, role: null });

    const menu = screen.queryByRole('menu');
    expect(menu).toBeNull();
    const menuitems = screen.queryAllByRole('menuitem');
    expect(menuitems.length).toBe(0);

    await flushMicrotasks();
  });

  it('should hide dividers from the accessibility tree', async () => {
    const { baseElement } = renderActionMenu(baseProps);

    // eslint-disable-next-line testing-library/no-node-access
    const dividers = baseElement.querySelectorAll('hr[aria-hidden="true"');
    expect(dividers.length).toBe(1);

    await flushMicrotasks();
  });
});
