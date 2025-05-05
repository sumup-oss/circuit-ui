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

import {
  Dialog,
  type DialogProps,
  type PublicDialogProps,
} from '../Dialog/Dialog.js';
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
  'aria-controls': string;
  'aria-expanded': boolean;
}
type OnToggle = (open: boolean | ((prevOpen: boolean) => boolean)) => void;

export interface PopoverProps
  extends Omit<PublicDialogProps, 'open'>,
    Pick<DialogProps, 'hideCloseButton'> {
  /**
   * The state of the Popover.
   */
  isOpen?: boolean;
  /**
   * Function that is called when opening and closing the Popover.
   */
  onToggle: OnToggle;
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
  /**
   * An optional class name to be applied to the component's content.
   */
  contentClassName?: string;
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
      isOpen = false,
      onToggle,
      children,
      placement = 'bottom',
      fallbackPlacements = ['top', 'right', 'left'],
      component: Component,
      offset,
      className,
      contentClassName,
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
    const prevOpen = usePrevious(isOpen);

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

    const handleTriggerClick = () => {
      onToggle((prev) => {
        if (prev) {
          setClosing(true);
          return false;
        }

        return true;
      });
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

    const handleCloseEnd = useCallback(() => {
      setClosing(false);
      onToggle(false);
    }, [onToggle]);

    const handleCloseStart = useCallback(() => {
      setClosing(true);
    }, []);

    const outAnimation = isMobile
      ? sharedClasses.animationSlideUpOut
      : undefined;
    const inAnimation = isMobile ? sharedClasses.animationSlideUpIn : undefined;

    useEffect(() => {
      // Focus the reference element after closing
      if (prevOpen && !isOpen) {
        const triggerButton = refs.reference.current
          ?.firstElementChild as HTMLElement;
        triggerButton.focus();
      }
    }, [isOpen, prevOpen, refs.reference]);
    return (
      <Fragment>
        <div className={classes.trigger} ref={refs.setReference}>
          <Component
            id={triggerId}
            aria-controls={contentId}
            aria-expanded={isOpen}
            onClick={handleTriggerClick}
          />
        </div>
        <Dialog
          {...props}
          id={contentId}
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
        >
          <div
            id={contentId}
            className={clsx(classes.content, contentClassName)}
          >
            {typeof children === 'function'
              ? children?.({ onClose: handleCloseEnd })
              : children}
          </div>
        </Dialog>
      </Fragment>
    );
  },
);
