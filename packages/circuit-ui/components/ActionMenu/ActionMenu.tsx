/**
 * Copyright 2021, SumUp Ltd.
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

'use client';

import {
  useId,
  useRef,
  forwardRef,
  useCallback,
  type KeyboardEvent,
} from 'react';

import type { ClickEvent } from '../../types/events.js';
import { Hr } from '../Hr/index.js';
import { useFocusList } from '../../hooks/useFocusList/index.js';
import { Popover, type PopoverProps } from '../Popover/Popover.js';
import { isArrowDown, isArrowUp } from '../../util/key-codes.js';
import { useMedia } from '../../hooks/useMedia/index.js';
import { clsx } from '../../styles/clsx.js';

import {
  ActionMenuItem,
  type ActionMenuItemProps,
} from './components/ActionMenuItem.js';
import classes from './ActionMenu.module.css';

type Divider = { type: 'divider' };
type Action = ActionMenuItemProps | Divider;

function isDivider(action: Action): action is Divider {
  return 'type' in action && action.type === 'divider';
}

export interface ActionMenuProps extends Omit<PopoverProps, 'role'> {
  /**
   * An array of ActionMenuItem or Divider.
   */
  actions: Action[];
  /**
   * Remove the [`menu` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/roles/menu_role)
   * when its semantics aren't appropriate for the use case, for example when
   * the ActionMenu is used as part of a navigation.
   * @default 'menu'.
   *
   * Learn more: https://inclusive-components.design/menus-menu-buttons/
   */
  role?: 'menu' | null;
}
type TriggerKey = 'ArrowUp' | 'ArrowDown';

export const ActionMenu = forwardRef<HTMLDialogElement, ActionMenuProps>(
  (
    {
      actions,
      role = 'menu',
      className,
      onToggle,
      component: Component,
      ...props
    },
    ref,
  ) => {
    const menuEl = useRef<HTMLDivElement>(null);
    const triggerKey = useRef<TriggerKey | null>(null);
    const triggerId = useId();
    const menuId = useId();
    const isMobile = useMedia('(max-width: 479px)');

    const focusProps = useFocusList();

    const handleTriggerKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (isArrowDown(event)) {
          triggerKey.current = 'ArrowDown';
          onToggle(true);
        }
        if (isArrowUp(event)) {
          triggerKey.current = 'ArrowUp';
          onToggle((prev) => !prev);
        }
      },
      [onToggle],
    );

    const handleActionMenuItemClick =
      (onClick: ActionMenuItemProps['onClick']) => (event: ClickEvent) => {
        onClick?.(event);
        onToggle(false);
      };

    const isMenu = role === 'menu';
    const menuProps = isMenu
      ? { 'role': 'menu', 'aria-labelledby': triggerId }
      : {};

    return (
      <Popover
        className={clsx(className, classes.base)}
        contentClassName={classes.content}
        ref={ref}
        hideCloseButton={!isMobile || props.disableModalOnMobile}
        onToggle={onToggle}
        component={(refProps) => (
          <Component
            {...refProps}
            id={triggerId}
            onKeyDown={handleTriggerKeyDown}
          />
        )}
        {...props}
      >
        <div id={menuId} ref={menuEl} {...menuProps}>
          {actions.map((action, index) =>
            isDivider(action) ? (
              <Hr className={classes.divider} key={index} />
            ) : (
              <ActionMenuItem
                key={index}
                {...action}
                {...focusProps}
                role={isMenu ? 'menuitem' : undefined}
                onClick={handleActionMenuItemClick(action.onClick)}
              />
            ),
          )}
        </div>
      </Popover>
    );
  },
);
