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
  forwardRef,
  useEffect,
  useId,
  useRef,
  type ComponentType,
  type HTMLAttributes,
  type Ref,
} from 'react';
import {
  arrow,
  flip,
  offset,
  shift,
  useFloating,
  type Placement,
  type Side,
} from '@floating-ui/react-dom';

import type { ClickEvent } from '../../types/events.js';
import { clsx } from '../../styles/clsx.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { isHTMLElement } from '../../util/type-check.js';
import { useEscapeKey } from '../../hooks/useEscapeKey/index.js';
import { useClickOutside } from '../../hooks/useClickOutside/index.js';
import { useLatest } from '../../hooks/useLatest/index.js';
import { usePrevious } from '../../hooks/usePrevious/index.js';
import CloseButton from '../CloseButton/index.js';
import Headline from '../Headline/index.js';
import Body from '../Body/index.js';
import Button, { type ButtonProps } from '../Button/index.js';

import classes from './Toggletip.module.css';

// TODO: mobile:  position, focus trap
// TODO: what should the a11y semantics be?
// FIXME: IconButton with Toggletip
// FIXME: ghost tooltip on close button

// mobile modal
// inert with polyfill
// render modal outside root with portal
// add inert on root

export interface ToggletipReferenceProps {
  onClick: (event: ClickEvent) => void;
  ref: Ref<any>;
}

type OnToggle = (open: boolean | ((prevOpen: boolean) => boolean)) => void;

export interface ToggletipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The button element that triggers the toggletip.
   */
  component: ComponentType<ToggletipReferenceProps>;
  /**
   * Determines whether the toggletip is open or closed.
   */
  isOpen: boolean;
  /**
   * Function that is called when opening and closing the toggletip.
   */
  onToggle: OnToggle;
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
   * TODO:
   */
  placement?: Placement;
}

export const Toggletip = forwardRef<HTMLDivElement, ToggletipProps>(
  (
    {
      isOpen = false,
      onToggle,
      placement: defaultPlacement = 'top',
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
    const arrowRef = useRef<HTMLDivElement>(null);
    const toggletipId = useId();
    const prevOpen = usePrevious(isOpen);

    const { refs, floatingStyles, middlewareData, update, placement } =
      useFloating({
        open: isOpen,
        placement: defaultPlacement,
        middleware: [
          offset(12),
          flip(),
          shift(),
          arrow({ element: arrowRef, padding: 12 }),
        ],
      });

    const side = placement.split('-')[0] as Side;

    // This is a performance optimization to prevent event listeners from being
    // re-attached on every render.
    const floatingRef = useLatest(refs.floating.current);

    useEscapeKey(() => onToggle(false), isOpen);
    useClickOutside(floatingRef, () => onToggle(false), isOpen);

    useEffect(() => {
      /**
       * When we support `ResizeObserver` (https://caniuse.com/resizeobserver),
       * we can look into using Floating UI's `autoUpdate` (but we can't use
       * `whileElementInMounted` because our implementation hides the floating
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
      // Focus the toggletip content after opening
      if (!prevOpen && isOpen) {
        const contentElement = refs.floating.current?.firstElementChild;

        if (isHTMLElement(contentElement)) {
          contentElement.setAttribute('tabindex', '0');
          contentElement.focus();
          contentElement.setAttribute('tabindex', '-1');
        }
      }

      // Focus the reference element after closing
      const referenceElement = refs.reference.current;

      if (prevOpen && !isOpen && isHTMLElement(referenceElement)) {
        referenceElement.focus();
      }
    }, [isOpen, prevOpen, refs.reference, refs.floating]);

    const handleReferenceClick = (event: ClickEvent) => {
      // This prevents the event from bubbling which would trigger the
      // useClickOutside above and would prevent the popover from closing.
      event.stopPropagation();
      onToggle(true);
    };

    const handleActionClick = (event: ClickEvent) => {
      action?.onClick?.(event);
      onToggle(false);
    };

    return (
      <>
        <Component onClick={handleReferenceClick} ref={refs.setReference} />
        <div
          {...props}
          ref={applyMultipleRefs(ref, refs.setFloating)}
          id={toggletipId}
          data-state={isOpen ? 'open' : 'closed'}
          data-side={side}
          className={clsx(classes.base, className)}
          style={{ ...style, ...floatingStyles }}
        >
          <div className={classes.content}>
            {headline && (
              <Headline as="h2" size="four" className={classes.headline}>
                {headline}
              </Headline>
            )}
            <Body size="two" className={classes.body}>
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
            <CloseButton
              size="s"
              variant="tertiary"
              className={classes.close}
              onClick={() => onToggle(false)}
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
        </div>
      </>
    );
  },
);
