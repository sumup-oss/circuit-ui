/**
 * Copyright 2024, SumUp Ltd.
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
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type HTMLAttributes,
} from 'react';
import {
  arrow,
  flip,
  offset as offsetMiddleware,
  shift,
  useFloating,
  type Placement,
  type Side,
} from '@floating-ui/react-dom';
import dialogPolyfill from 'dialog-polyfill';

import type { ClickEvent } from '../../types/events.js';
import { clsx } from '../../styles/clsx.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { useMedia } from '../../hooks/useMedia/index.js';
import { useEscapeKey } from '../../hooks/useEscapeKey/index.js';
import { useClickOutside } from '../../hooks/useClickOutside/index.js';
import { useStackContext } from '../StackContext/index.js';
import CloseButton from '../CloseButton/index.js';
import Headline from '../Headline/index.js';
import Body from '../Body/index.js';
import Button, { type ButtonProps } from '../Button/index.js';

import classes from './Toggletip.module.css';

// TODO: mobile: focus trap
// TODO: check rerenders

// inert with polyfill
// render modal outside root with portal?
// add inert on root

export interface ToggletipReferenceProps {
  'id': string;
  'onClick': (event: ClickEvent) => void;
  'aria-haspopup': 'dialog';
}

export interface ToggletipProps extends HTMLAttributes<HTMLDialogElement> {
  /**
   * The button element that triggers the toggletip.
   */
  component: ComponentType<ToggletipReferenceProps>;
  /**
   * TODO:
   */
  headline?: string;
  /**
   * TODO:
   */
  body: string;
  /**
   * TODO:
   */
  action?: Omit<ButtonProps, 'variant' | 'size'>;
  /**
   * TODO:
   */
  closeButtonLabel: string;
  /**
   * Whether the toggletip is initially open. Default: 'false'.
   */
  defaultOpen?: boolean;
  /**
   * TODO:
   */
  placement?: Placement;
  /**
   * Displaces the floating element from its `placement` along specified axes.
   *
   * Pass a number to move the floating element on the main axis, away from (if
   * positive) or towards (if negative) the reference element. Pass an object
   * to displace the floating element on both the main and cross axes.
   *
   * Default: 12.
   */
  offset?: number | { mainAxis?: number; crossAxis?: number };
}

export const Toggletip = forwardRef<HTMLDialogElement, ToggletipProps>(
  (
    {
      defaultOpen = false,
      placement: defaultPlacement = 'top',
      offset = 12,
      headline,
      body,
      action,
      component: Component,
      closeButtonLabel,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const zIndex = useStackContext();
    const isMobile = useMedia('(max-width: 479px)');
    const arrowRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const referenceId = useId();
    const headlineId = useId();
    const bodyId = useId();
    const [open, setOpen] = useState(defaultOpen);

    const closeDialog = useCallback(() => {
      dialogRef.current?.close();
    }, []);

    useEscapeKey(closeDialog, open);
    useClickOutside(dialogRef, closeDialog, open);

    useEffect(() => {
      const dialogElement = dialogRef.current;

      if (!dialogElement) {
        return undefined;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore The package is bundled incorrectly
      dialogPolyfill.registerDialog(dialogElement);

      const handleClose = () => {
        setOpen(false);
      };

      dialogElement.addEventListener('close', handleClose);

      return () => {
        dialogElement.addEventListener('close', handleClose);
      };
    }, []);

    const { refs, floatingStyles, middlewareData, update, placement } =
      useFloating({
        open,
        placement: defaultPlacement,
        middleware: [
          offsetMiddleware(offset),
          flip(),
          shift(),
          arrow({ element: arrowRef, padding: 12 }),
        ],
      });

    useEffect(() => {
      const referenceElement = document.getElementById(referenceId);

      refs.setReference(referenceElement);
    }, [referenceId, refs]);

    useEffect(() => {
      /**
       * When we support `ResizeObserver` (https://caniuse.com/resizeobserver),
       * we can look into using Floating UI's `autoUpdate` (but we can't use
       * `whileElementInMounted` because our implementation hides the floating
       * element using CSS instead of using conditional rendering.
       * See https://floating-ui.com/docs/react-dom#updating
       */
      if (open) {
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
    }, [open, update]);

    const handleReferenceClick = useCallback((event: ClickEvent) => {
      // This prevents the event from bubbling which would trigger the
      // useClickOutside above and would prevent the dialog from closing.
      event.stopPropagation();
      if (dialogRef.current) {
        dialogRef.current.show();
        setOpen(true);
      }
    }, []);

    const handleActionClick = (event: ClickEvent) => {
      action?.onClick?.(event);
      closeDialog();
    };

    const side = placement.split('-')[0] as Side;

    const mobileStyles = {
      position: 'fixed',
      bottom: '0px',
      left: '0px',
      right: '0px',
    } as const;

    const dialogStyles = isMobile ? mobileStyles : floatingStyles;

    return (
      <Fragment>
        <Component
          id={referenceId}
          aria-haspopup="dialog"
          onClick={handleReferenceClick}
        />
        {/* eslint-disable jsx-a11y/no-autofocus */}
        {/* @ts-expect-error "Expression produces a union type that is too complex to represent" */}
        <dialog
          {...props}
          open={defaultOpen}
          ref={applyMultipleRefs(ref, dialogRef, refs.setFloating)}
          data-side={side}
          aria-labelledby={headline ? headlineId : bodyId}
          aria-describedby={headline ? bodyId : undefined}
          className={clsx(classes.base, className)}
          // @ts-expect-error z-index can be a string
          style={{
            ...style,
            ...dialogStyles,
            zIndex: zIndex || 'var(--cui-z-index-modal)',
          }}
        >
          <div className={classes.content}>
            {headline && (
              <Headline
                as="h2"
                size="four"
                id={headlineId}
                className={classes.headline}
              >
                {headline}
              </Headline>
            )}
            <Body size="two" id={bodyId} className={classes.body}>
              {body}
            </Body>
            {action && (
              <Button
                {...action}
                onClick={handleActionClick}
                variant="secondary"
                size="s"
                className={classes.action}
                autoFocus
              />
            )}
            <CloseButton
              size="s"
              variant="tertiary"
              className={classes.close}
              onClick={closeDialog}
              autoFocus={!action}
            >
              {closeButtonLabel}
            </CloseButton>
          </div>
          <div
            ref={arrowRef}
            className={classes.arrow}
            style={{
              top: middlewareData.arrow?.y,
              left: middlewareData.arrow?.x,
            }}
          />
        </dialog>
        {/* eslint-enable jsx-a11y/no-autofocus */}
        <div
          className={classes.backdrop}
          style={{
            // @ts-expect-error z-index can be a string
            zIndex: `calc(${zIndex?.toString() || 'var(--cui-z-index-modal)'} - 1)`,
          }}
        />
      </Fragment>
    );
  },
);

Toggletip.displayName = 'Toggletip';
