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
  type ReactNode,
  Fragment,
  useCallback,
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type HTMLAttributes,
  forwardRef,
  type RefObject,
  type AriaRole,
} from 'react';
import {
  useFloating,
  flip,
  offset as offsetMiddleware,
  size,
  type Placement,
  type SizeOptions,
  arrow,
  shift,
  type Side,
} from '@floating-ui/react-dom';

import type { ClickEvent } from '../../types/events.js';
import { isArrowDown, isArrowUp } from '../../util/key-codes.js';
import { isFunction } from '../../util/type-check.js';
import { clsx } from '../../styles/clsx.js';
import { useEscapeKey } from '../../hooks/useEscapeKey/index.js';
import { useClickOutside } from '../../hooks/useClickOutside/index.js';
import { useMedia } from '../../hooks/useMedia/index.js';
import { usePrevious } from '../../hooks/usePrevious/index.js';
import { Modal } from '../Modal/index.js';
import { getKeyboardFocusableElements } from '../Modal/ModalService.js';
import { applyMultipleRefs } from '../../util/refs.js';
import dialogPolyfill from '../../vendor/dialog-polyfill/index.js';
import { CircuitError } from '../../util/errors.js';
import { Hr } from '../Hr/index.js';
import { useFocusList } from '../../hooks/useFocusList/index.js';
import type { Locale } from '../../util/i18n.js';
import { useStackContext } from '../StackContext/index.js';

import classes from './Popover.module.css';
import {
  PopoverItem,
  type PopoverItemProps,
} from './components/PopoverItem.js';

type Divider = { type: 'divider' };
export type Action = PopoverItemProps | Divider;

function isDivider(action: Action): action is Divider {
  return 'type' in action && action.type === 'divider';
}

type OnToggle = (open: boolean | ((prevOpen: boolean) => boolean)) => void;

export interface PopoverReferenceProps {
  'onClick': (event: ClickEvent) => void;
  'onKeyDown': (event: KeyboardEvent) => void;
  'id': string;
  'aria-haspopup': boolean;
  'aria-controls': string;
  'aria-expanded': boolean;
}

interface BasePopoverProps
  extends Omit<HTMLAttributes<HTMLDialogElement>, 'children'> {
  /**
   * The class name to add to the Popover wrapper element.
   */
  className?: string;
  /**
   * Determines whether the Popover is open or closed.
   */
  isOpen: boolean;
  /**
   * Function that is called when opening and closing the Popover.
   */
  onToggle: OnToggle;
  /**
   * One of the accepted placement values. Defaults to `bottom`.
   */
  placement?: Placement;
  /**
   * The placements to fallback to when there is not enough space for the
   * Popover. Defaults to `['top', 'right', 'left']`.
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
   * The component that toggles the Popover when clicked. Also referred to as
   * reference element.
   */
  component: (props: PopoverReferenceProps) => ReactNode;
  /**
   * Remove the [`menu` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/roles/menu_role)
   * when its semantics aren't appropriate for the use case, for example when
   * the Popover is used as part of a navigation. Default: 'menu'.
   *
   * Learn more: https://inclusive-components.design/menus-menu-buttons/
   */
  role?: AriaRole;
  /**
   * Text label for the close button for screen readers.
   * Important for accessibility.
   */
  closeButtonLabel?: string;
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   * Defaults to `navigator.language` in supported environments.
   */
  locale?: Locale;
  /**
   * Whether the Popover should show  an arrow as a reference to the trigger element.
   */
  hasArrow?: boolean;
}

type PopoverContent =
  | {
      /**
       * a ReactNode or a function that returns the content of the popover.
       * Should not be used at the same time with `actions`.
       */
      children: ReactNode | (() => ReactNode);
      actions?: never;
    }
  | {
      /**
       * An array of PopoverItem or Divider.
       Should not be used at the same time with `children`.
       */
      actions: Action[];
      children?: never;
    };

type TriggerKey = 'ArrowUp' | 'ArrowDown';

const sizeOptions: SizeOptions = {
  apply({ availableHeight, elements }) {
    elements.floating.style.setProperty(
      '--popover-max-height',
      `${availableHeight}px`,
    );
  },
};

export type PopoverProps = BasePopoverProps & PopoverContent;

export const Popover = forwardRef<HTMLDialogElement, PopoverProps>(
  (
    {
      isOpen = false,
      onToggle,
      placement = 'bottom',
      fallbackPlacements = ['top', 'right', 'left'],
      component: Component,
      offset,
      className,
      role = 'menu',
      children,
      actions,
      hasArrow,
      ...props
    },
    ref,
  ) => {
    const zIndex = useStackContext();
    const triggerKey = useRef<TriggerKey | null>(null);
    const menuEl = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);
    const triggerId = useId();
    const menuId = useId();

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      children &&
      actions
    ) {
      throw new CircuitError(
        'Popover',
        'The component can either accept children or actions, but not both.',
      );
    }

    const padding = 16; // px

    const {
      placement: finalPlacement,
      floatingStyles,
      middlewareData,
      refs,
      update,
    } = useFloating<HTMLElement>({
      open: isOpen,
      placement,
      strategy: 'fixed',
      middleware: offset
        ? [
            offsetMiddleware(hasArrow ? 8 : offset),
            flip({
              fallbackPlacements,
            }),
            shift({ padding }),
            size({ padding }),
            arrow({ element: arrowRef, padding: 12 }),
          ]
        : [
            offsetMiddleware(hasArrow ? 8 : 0),
            flip({ fallbackPlacements }),
            size(sizeOptions),
          ],
    });

    useEffect(
      () => () => {
        dialogRef.current?.close();
      },
      [],
    );

    const side = finalPlacement.split('-')[0] as Side;

    const focusProps = useFocusList();
    const prevOpen = usePrevious(isOpen);

    const isMobile = useMedia('(max-width: 479px)');

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

    const handlePopoverItemClick =
      (onClick: PopoverItemProps['onClick']) => (event: ClickEvent) => {
        onClick?.(event);
        handleToggle(false);
      };

    useEscapeKey(() => handleToggle(false), isOpen);
    useClickOutside(
      [refs.reference as RefObject<HTMLElement>, refs.floating],
      () => handleToggle(false),
      isOpen,
    );

    useEffect(() => {
      const dialogElement = dialogRef.current;

      if (!dialogElement) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore The package is bundled incorrectly
      dialogPolyfill.registerDialog(dialogElement);
    }, []);

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
      // Focus the first or last popover item after opening
      if (!prevOpen && isOpen && !isMobile && refs.floating.current) {
        const elements = getKeyboardFocusableElements(refs.floating.current);
        if (elements.length) {
          elements[0].focus();
        }
      }

      // Focus the reference element after closing
      if (prevOpen && !isOpen) {
        const triggerButton = refs.reference.current
          ?.firstElementChild as HTMLElement;
        triggerButton.focus();
      }

      triggerKey.current = null;
    }, [
      isOpen,
      prevOpen,
      isMobile,
      refs.reference.current,
      refs.floating.current,
    ]);

    const isMenu = role === 'menu';

    const childrenContent =
      typeof children === 'function' ? children?.() : children;

    const popoverContent = actions ? (
      <div
        id={menuId}
        ref={menuEl}
        aria-labelledby={isMenu ? triggerId : undefined}
        role={isMenu ? 'menu' : undefined}
        className={clsx(!isMobile && classes.menu, isOpen && classes.open)}
      >
        {actions.map((action, index) =>
          isDivider(action) ? (
            <Hr className={classes.divider} key={index} />
          ) : (
            <PopoverItem
              key={index}
              {...action}
              {...focusProps}
              role={isMenu ? 'menuitem' : undefined}
              onClick={handlePopoverItemClick(action.onClick)}
            />
          ),
        )}
      </div>
    ) : (
      childrenContent
    );

    return (
      <Fragment>
        <div className={classes.trigger} ref={refs.setReference}>
          <Component
            id={triggerId}
            aria-haspopup={true}
            aria-controls={menuId}
            aria-expanded={isOpen}
            onClick={handleTriggerClick}
            onKeyDown={handleTriggerKeyDown}
          />
        </div>
        {isMobile ? (
          <Modal
            ref={ref}
            onClose={handleTriggerClick}
            open={isOpen}
            className={className}
            {...props}
          >
            {popoverContent}
          </Modal>
        ) : (
          <dialog
            open={isOpen}
            {...props}
            data-side={side}
            ref={applyMultipleRefs(ref, refs.setFloating, dialogRef)}
            className={clsx(
              !isMobile && classes.content,
              isOpen && classes.open,
              actions && classes['with-actions'],
              className,
            )}
            style={{
              ...floatingStyles,
              zIndex: zIndex || 'var(--cui-z-index-popover)',
            }}
          >
            {popoverContent}
            {hasArrow && (
              <div
                ref={arrowRef}
                className={classes.arrow}
                style={{
                  top: middlewareData.arrow?.y,
                  left: middlewareData.arrow?.x,
                }}
              />
            )}
          </dialog>
        )}
      </Fragment>
    );
  },
);
