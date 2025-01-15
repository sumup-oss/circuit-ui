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

import type { ClickEvent } from '../../types/events.js';
import { clsx } from '../../styles/clsx.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { useMedia } from '../../hooks/useMedia/index.js';
import { useStackContext } from '../StackContext/index.js';
import { CloseButton } from '../CloseButton/index.js';
import { Headline } from '../Headline/index.js';
import { Body } from '../Body/index.js';
import { Button, type ButtonProps } from '../Button/index.js';
import { Dialog, type DialogProps } from '../Dialog/Dialog.js';

import classes from './Toggletip.module.css';

export interface ToggletipReferenceProps {
  'id': string;
  'onClick': (event: ClickEvent) => void;
  'aria-haspopup': 'dialog';
}

export interface ToggletipProps
  extends Omit<
    DialogProps,
    'onCloseStart' | 'onCloseEnd' | 'isModal' | 'animationDuration'
  > {
  /**
   * The button element that triggers the toggletip.
   */
  component: ComponentType<ToggletipReferenceProps>;
  /**
   * The optional headline acts as the toggletip's [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).
   * Keep it short and under 120 characters.
   */
  headline?: string;
  /**
   * Use the body text to provide additional help or to define a term.
   * The body acts as the toggletip's [accessible description](https://w3c.github.io/accname/#dfn-accessible-description)
   * or as its [accessible name](https://w3c.github.io/accname/#dfn-accessible-name)
   * when no headline is present.
   */
  body: string;
  /**
   * Use the optional action button to point the user to additional information
   * or enable a contextual action. Use one strong, clear imperative verb and
   * follow with a one-word object if needed to clarify.
   */
  action?: Omit<ButtonProps, 'variant' | 'size'>;
  /**
   * Whether the toggletip is initially open. Default: 'false'.
   */
  defaultOpen?: boolean;
  /**
   * Where to display the toggletip relative to the trigger component. The
   * toggletip will automatically move if there isn't enough space available.
   * Default: 'top'.
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
  (props, ref) => {
    const {
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
      locale,
      ...rest
    } = props;
    const zIndex = useStackContext();
    const isMobile = useMedia('(max-width: 479px)');
    const arrowRef = useRef<HTMLDivElement>(null);
    const referenceId = useId();
    const headlineId = useId();
    const bodyId = useId();
    const [open, setOpen] = useState(defaultOpen);

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
      /* Intentionally running useEffect without dependencies
       * to ensure that the reference element is always up-to-date.
       * to fix the issue of the tooltip rendering in the wrong position
       * whenever the reference component re-renders.
       * */
      const referenceElement = document.getElementById(referenceId);

      refs.setReference(referenceElement);
    });

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

    const closeDialog = useCallback(() => {
      setOpen(false);
    }, []);

    const handleReferenceClick = useCallback(() => {
      setOpen(true);
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
        <Dialog
          {...rest}
          open={open}
          isModal={isMobile}
          onCloseEnd={closeDialog}
          ref={applyMultipleRefs(ref, refs.setFloating)}
          data-side={side}
          aria-labelledby={headline ? headlineId : bodyId}
          aria-describedby={headline ? bodyId : undefined}
          className={clsx(classes.base, className)}
          closeButtonLabel={closeButtonLabel}
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
                size="s"
                id={headlineId}
                className={classes.headline}
              >
                {headline}
              </Headline>
            )}
            <Body size="s" id={bodyId} className={classes.body}>
              {body}
            </Body>
            {action && (
              <Button
                {...action}
                onClick={handleActionClick}
                variant="secondary"
                size="s"
                className={classes.action}
              />
            )}
            {!isMobile && (
              <CloseButton
                size="s"
                variant="tertiary"
                className={classes.close}
                onClick={closeDialog}
              >
                {closeButtonLabel}
              </CloseButton>
            )}
          </div>
          <div
            ref={arrowRef}
            className={classes.arrow}
            style={{
              top: middlewareData.arrow?.y,
              left: middlewareData.arrow?.x,
            }}
          />
        </Dialog>
      </Fragment>
    );
  },
);

Toggletip.displayName = 'Toggletip';
