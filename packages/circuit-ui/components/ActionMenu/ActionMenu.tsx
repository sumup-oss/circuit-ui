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
  Fragment,
  useCallback,
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  forwardRef,
  type ComponentType,
  useState,
} from 'react';
import {
  useFloating,
  flip,
  offset as offsetMiddleware,
  size,
  type Placement,
  type SizeOptions,
} from '@floating-ui/react-dom';

import type { ClickEvent } from '../../types/events.js';
import { isArrowDown, isArrowUp } from '../../util/key-codes.js';
import { isFunction } from '../../util/type-check.js';
import { clsx } from '../../styles/clsx.js';
import { useMedia } from '../../hooks/useMedia/index.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { Hr } from '../Hr/index.js';
import { useFocusList } from '../../hooks/useFocusList/index.js';
import { usePrevious } from '../../hooks/usePrevious/index.js';
import { useStackContext } from '../StackContext/index.js';
import { Dialog, type PublicDialogProps } from '../Dialog/Dialog.js';
import { sharedClasses } from '../../styles/shared.js';

import classes from './ActionMenu.module.css';
import {
  ActionMenuItem,
  type ActionMenuItemProps,
} from './components/ActionMenuItem.js';

type Divider = { type: 'divider' };
type Action = ActionMenuItemProps | Divider;

function isDivider(action: Action): action is Divider {
  return 'type' in action && action.type === 'divider';
}

type OnToggle = (open: boolean | ((prevOpen: boolean) => boolean)) => void;

export interface ActionMenuReferenceProps {
  'onClick': (event: ClickEvent) => void;
  'onKeyDown': (event: KeyboardEvent) => void;
  'id': string;
  'aria-controls': string;
  'aria-expanded': boolean;
}

export interface ActionMenuProps
  extends Omit<PublicDialogProps, 'open' | 'role'> {
  /**
   * Determines whether the ActionMenu is open or closed.
   */
  isOpen: boolean;
  /**
   * Function that is called when opening and closing the ActionMenu.
   */
  onToggle: OnToggle;
  /**
   * An array of ActionMenuItem or Divider.
   */
  actions: Action[];
  /**
   * One of the accepted placement values.
   * @default `bottom`.
   */
  placement?: Placement;
  /**
   * The placements to fallback to when there is not enough space for the
   * ActionMenu.
   * @default `['top', 'right', 'left']`.
   */
  fallbackPlacements?: Placement[];
  /**
   * Displaces the floating element from its `placement` along specified axes.
   *
   * Pass a number to move the floating element on the main axis, away from (if
   * positive) or towards (if negative) the reference element. Pass an object
   * to displace the floating element on both the main and cross axes.
   */
  offset?: number | { mainAxis?: number; crossAxis?: number };
  /**
   * The component that toggles the ActionMenu when clicked. Also referred to as
   * reference element.
   */
  component: ComponentType<ActionMenuReferenceProps>;
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

const sizeOptions: SizeOptions = {
  apply({ availableHeight, elements }) {
    elements.floating.style.setProperty(
      '--popover-max-height',
      `${availableHeight}px`,
    );
  },
};

export const ActionMenu = forwardRef<HTMLDialogElement, ActionMenuProps>(
  (
    {
      isOpen = false,
      onToggle,
      actions,
      placement = 'bottom',
      fallbackPlacements = ['top', 'right', 'left'],
      component: Component,
      offset,
      className,
      role = 'menu',
      style,
      ...props
    },
    ref,
  ) => {
    const zIndex = useStackContext();
    const triggerKey = useRef<TriggerKey | null>(null);
    const menuEl = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const triggerId = useId();
    const menuId = useId();
    const [isClosing, setClosing] = useState(false);
    const isMobile = useMedia('(max-width: 479px)');
    const animationDuration = isMobile ? 300 : 0;

    const { floatingStyles, refs, update } = useFloating<HTMLElement>({
      open: isOpen,
      placement,
      strategy: 'fixed',
      middleware: offset
        ? [
            offsetMiddleware(offset),
            flip({ fallbackPlacements }),
            size(sizeOptions),
          ]
        : [flip({ fallbackPlacements }), size(sizeOptions)],
    });

    const focusProps = useFocusList();
    const prevOpen = usePrevious(isOpen);

    const handleToggle: OnToggle = useCallback(
      (state) => {
        onToggle((prev) => (isFunction(state) ? state(prev) : state));
      },
      [onToggle],
    );

    const handleTriggerClick = useCallback(() => {
      handleToggle((prev) => !prev);
    }, [handleToggle]);

    const handleTriggerKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (isArrowDown(event)) {
          triggerKey.current = 'ArrowDown';
          handleToggle(true);
        }
        if (isArrowUp(event)) {
          triggerKey.current = 'ArrowUp';
          handleToggle((prev) => !prev);
        }
      },
      [handleToggle],
    );

    const handleActionMenuItemClick =
      (onClick: ActionMenuItemProps['onClick']) => (event: ClickEvent) => {
        onClick?.(event);
        handleToggle(false);
      };

    useEffect(() => {
      /**
       * When we support `ResizeObserver` (https://caniuse.com/resizeobserver),
       * we can look into using Floating UI's `autoUpdate` (but we can't use
       * `whileElementIsMounted` because our implementation hides the floating
       * element using CSS instead of using conditional rendering.
       * See https://floating-ui.com/docs/react-dom#updating
       */
      if (isOpen) {
        update();
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update);
      } else {
        window.removeEventListener('resize', update);
        window.removeEventListener('scroll', update);
      }

      return () => {
        window.removeEventListener('resize', update);
        window.removeEventListener('scroll', update);
      };
    }, [isOpen, update]);

    useEffect(() => {
      // Focus the first or last action menu item after opening
      if (!prevOpen && isOpen) {
        const element = (
          triggerKey.current && triggerKey.current === 'ArrowUp'
            ? menuEl.current?.lastElementChild
            : menuEl.current?.firstElementChild
        ) as HTMLElement;
        if (element) {
          setTimeout(() => {
            element.focus();
          }, animationDuration);
        }
      }

      // Focus the reference element after closing
      if (prevOpen && !isOpen) {
        const triggerButton = refs.reference.current
          ?.firstElementChild as HTMLElement;
        triggerButton.focus();
      }

      triggerKey.current = null;
    }, [isOpen, prevOpen, refs.reference, animationDuration]);

    const isMenu = role === 'menu';

    const handleCloseEnd = useCallback(() => {
      setClosing(false);
      handleToggle(false);
    }, [handleToggle]);

    const handleCloseStart = useCallback(() => {
      setClosing(true);
    }, []);

    const outAnimation = isMobile
      ? sharedClasses.animationSlideUpOut
      : undefined;
    const inAnimation = isMobile ? sharedClasses.animationSlideUpIn : undefined;

    return (
      <Fragment>
        <div className={classes.trigger} ref={refs.setReference}>
          <Component
            id={triggerId}
            aria-controls={menuId}
            aria-expanded={isOpen}
            onClick={handleTriggerClick}
            onKeyDown={handleTriggerKeyDown}
          />
        </div>
        <Dialog
          open={isOpen}
          onCloseStart={handleCloseStart}
          onCloseEnd={handleCloseEnd}
          isModal={isMobile}
          hideCloseButton={!isMobile}
          ref={applyMultipleRefs(ref, refs.setFloating, dialogRef)}
          className={clsx(
            classes.base,
            isClosing ? outAnimation : inAnimation,
            className,
          )}
          animationDuration={animationDuration}
          style={
            isMobile
              ? style
              : {
                  ...style,
                  ...floatingStyles,
                  zIndex: zIndex || 'var(--cui-z-index-popover)',
                }
          }
          preventOutsideClickRefs={refs.reference}
          {...props}
        >
          <div
            id={menuId}
            ref={menuEl}
            aria-labelledby={isMenu ? triggerId : undefined}
            role={isMenu ? 'menu' : undefined}
            className={classes.menu}
          >
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
        </Dialog>
      </Fragment>
    );
  },
);
