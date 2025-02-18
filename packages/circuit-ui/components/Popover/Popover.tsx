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

'use client';

import {
  flip,
  offset as offsetMiddleware,
  type Placement,
  size,
  type SizeOptions,
  useFloating,
} from '@floating-ui/react-dom';
import {
  type ComponentType,
  forwardRef,
  Fragment,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { Dialog, type DialogProps } from '../Dialog/Dialog.js';
import type { ClickEvent } from '../../types/events.js';
import { useStackContext } from '../StackContext/index.js';
import { useMedia } from '../../hooks/useMedia/index.js';
import { sharedClasses } from '../../styles/shared.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { clsx } from '../../styles/clsx.js';
import { usePrevious } from '../../hooks/usePrevious/index.js';

import classes from './Popover.module.css';

export interface PopoverReferenceProps {
  'onClick': (event: ClickEvent) => void;
  'onKeyDown'?: (event: KeyboardEvent) => void;
  'id': string;
  'aria-haspopup': boolean;
  'aria-controls': string;
  'aria-expanded': boolean;
}

export interface PopoverProps
  extends Omit<
    DialogProps,
    | 'open'
    | 'onCloseEnd'
    | 'onCloseStart'
    | 'isModal'
    | 'animationDuration'
    | 'preventClose'
    | 'initialFocusRef'
    | 'preventOutsideClickRefs'
  > {
  /**
   * Determines whether the Popover is open or closed.
   */
  isOpen: boolean;
  /**
   * Function that is called when the Popover is closed.
   */
  onClose: DialogProps['onCloseEnd'];
  /**
   * One of the accepted placement values.
   * @default `bottom`.
   */
  placement?: Placement;
  /**
   * The placements to fallback to when there is not enough space for the
   * Popover.
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
   * The component that toggles the Popover when clicked. Also referred to as
   * reference element.
   */
  component: ComponentType<PopoverReferenceProps>;
}

const sizeOptions: SizeOptions = {
  apply({ availableHeight, elements }) {
    elements.floating.style.setProperty(
      '--popover-max-height',
      `${availableHeight}px`,
    );
  },
};

export const Popover = forwardRef<HTMLDialogElement, PopoverProps>(
  (
    {
      isOpen: initialOpen = false,
      onClose,
      children,
      placement = 'bottom',
      fallbackPlacements = ['top', 'right', 'left'],
      component: Component,
      offset,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const zIndex = useStackContext();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const triggerId = useId();
    const contentId = useId();
    const [isClosing, setClosing] = useState(false);
    const isMobile = useMedia('(max-width: 479px)');
    const animationDuration = isMobile ? 300 : 0;
    const [isOpen, setIsOpen] = useState(initialOpen);

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
    const prevOpen = usePrevious(isOpen);

    useEffect(() => {
      setIsOpen(initialOpen);
    }, [initialOpen]);

    useEffect(() => {
      if (prevOpen && !isOpen) {
        const triggerButton = refs.reference.current
          ?.firstElementChild as HTMLElement;
        triggerButton.focus();
      }
    }, [prevOpen, isOpen, refs.reference]);

    const handleTriggerClick = useCallback(() => {
      setIsOpen((prev) => {
        if (prev) {
          setClosing(true);
          onClose?.();
          return false;
        }

        return true;
      });
    }, [onClose]);

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

    const handleCloseEnd = useCallback(() => {
      setClosing(false);
      setIsOpen(false);
      onClose?.();
    }, [onClose]);

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
            aria-haspopup={true}
            aria-controls={contentId}
            aria-expanded={isOpen}
            onClick={handleTriggerClick}
          />
        </div>
        <Dialog
          open={isOpen}
          onCloseStart={handleCloseStart}
          onCloseEnd={handleCloseEnd}
          isModal={isMobile}
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
          <div id={contentId} className={classes.content}>
            {typeof children === 'function'
              ? children?.({ onClose })
              : children}
          </div>
        </Dialog>
      </Fragment>
    );
  },
);
