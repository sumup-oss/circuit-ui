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

import { useRef, forwardRef, useCallback, type KeyboardEvent } from 'react';

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

export interface ActionMenuProps extends PopoverProps {
  /**
   * An array of ActionMenuItem or Divider.
   */
  actions: Action[];
}
type TriggerKey = 'ArrowUp' | 'ArrowDown';

export const ActionMenu = forwardRef<HTMLDialogElement, ActionMenuProps>(
  ({ actions, className, onToggle, component: Component, ...props }, ref) => {
    const triggerKey = useRef<TriggerKey | null>(null);
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

    return (
      <Popover
        className={clsx(className, classes.base)}
        contentClassName={classes.content}
        ref={ref}
        hideCloseButton={!isMobile || props.disableModalOnMobile}
        onToggle={onToggle}
        component={(refProps) => (
          <Component {...refProps} onKeyDown={handleTriggerKeyDown} />
        )}
        {...props}
      >
        {actions.map((action, index) => {
          const key = isDivider(action) ? `divider-${index}` : action.children;
          return isDivider(action) ? (
            <Hr className={classes.divider} key={key} />
          ) : (
            <ActionMenuItem
              key={key}
              {...action}
              {...focusProps}
              onClick={handleActionMenuItemClick(action.onClick)}
            />
          );
        })}
      </Popover>
    );
  },
);
