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
  type ComponentType,
  type FocusEventHandler,
  type HTMLAttributes,
  type MouseEventHandler,
} from 'react';
import {
  useFloating,
  arrow,
  flip,
  shift,
  type Placement,
  type Side,
  autoUpdate,
} from '@floating-ui/react-dom';
import { atom } from 'nanostores';
import { useStore } from '@nanostores/react';

import { clsx } from '../../styles/clsx.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { useEscapeKey } from '../../hooks/useEscapeKey/index.js';
import {
  AccessibilityError,
  CircuitError,
  isSufficientlyLabelled,
} from '../../util/errors.js';

import classes from './Tooltip.module.css';

export interface TooltipReferenceProps {
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
  'className': string;
  'onFocus': FocusEventHandler;
  'onBlur': FocusEventHandler;
  'onMouseEnter': MouseEventHandler;
  'onMouseLeave': MouseEventHandler;
}

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A clear and concise label for the reference component.
   * Interactive content such as buttons or links and rich content such as
   * bold text or headings are not supported.
   */
  label: string;
  /**
   * The focusable element that acts as the reference for the tooltip.
   */
  component: ComponentType<TooltipReferenceProps>;
  /**
   * Whether the tooltip is the [main label](https://w3c.github.io/accname/#dfn-accessible-name)
   * or a [supplemental description](https://w3c.github.io/accname/#dfn-accessible-description)
   * of the reference component.
   */
  type: 'label' | 'description';
  /**
   * Where to display the tooltip relative to the reference component. The
   * tooltip will automatically move if there isn't enough space available.
   * Default: 'top'.
   */
  placement?: Placement;
}

const $activeTooltipId = atom<string | null>('initial');

enum State {
  initial = 'initial',
  open = 'open',
  closed = 'closed',
}

function getState(activeTooltipId: string | null, tooltipId: string) {
  switch (activeTooltipId) {
    case 'initial': {
      return State.initial;
    }
    case tooltipId: {
      return State.open;
    }
    default: {
      return State.closed;
    }
  }
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      label,
      component: Component,
      type,
      placement: defaultPlacement = 'top',
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const activeTooltipId = useStore($activeTooltipId);
    const tooltipId = useId();
    const arrowRef = useRef<HTMLDivElement>(null);

    const state = getState(activeTooltipId, tooltipId);
    const ariaAttributeName =
      type === 'label' ? 'aria-labelledby' : 'aria-describedby';

    const handleOpen = useCallback(() => {
      $activeTooltipId.set(tooltipId);
    }, [tooltipId]);
    const handleClose = useCallback(() => {
      $activeTooltipId.set(null);
    }, []);

    const handleFocus: FocusEventHandler = useCallback(
      (event) => {
        if (
          // Vitest and Jest use nwsapi to mock the `Element.matches` API.
          // It has a bug where `:focus-visible` is not matched unless
          // the element has the `autofocus` property set.
          // https://github.com/dperini/nwsapi/issues/122
          process.env.NODE_ENV === 'test'
            ? event.currentTarget.matches(':focus')
            : event.currentTarget.matches(':focus-visible')
        ) {
          handleOpen();
        }
      },
      [handleOpen],
    );

    // The tooltip works without JavaScript using only CSS (the "initial" state).
    // When JS is available, the component is progressively enhanced and toggles
    // between the "closed" and "open" states.
    useEffect(() => {
      $activeTooltipId.set(null);
    }, []);

    useEscapeKey(handleClose, state === State.open);

    const { refs, floatingStyles, middlewareData, update, placement } =
      useFloating({
        open: state === State.open,
        placement: defaultPlacement,
        middleware: [
          flip(),
          shift({ padding: 4 }),
          arrow({
            element: arrowRef,
            // This accounts for the content's border radius
            padding: 8,
          }),
        ],
      });

    useEffect(() => {
      /* Intentionally running useEffect without dependencies
       * to ensure that the reference element is always up-to-date.
       * to fix the issue of the tooltip rendering in the wrong position
       * whenever the reference component re-renders.
       * */
      const selector = `[${ariaAttributeName}="${tooltipId}"]`;
      const referenceElement = document.querySelector(selector);

      refs.setReference(referenceElement);
    });

    /**
     * We can't use Floating UI's `whileElementsMounted` option because our
     * implementation hides the floating element using CSS instead of using
     * conditional rendering.
     */
    useEffect(() => {
      if (
        state === State.open &&
        refs.reference.current &&
        refs.floating.current
      ) {
        return autoUpdate(
          refs.reference.current,
          refs.floating.current,
          update,
        );
      }
      return undefined;
    }, [state, refs.reference, refs.floating, update]);

    if (process.env.NODE_ENV !== 'production') {
      if (!type) {
        throw new CircuitError('Tooltip', 'The `type` prop is required.');
      }

      if (!isSufficientlyLabelled(label)) {
        throw new AccessibilityError(
          'Tooltip',
          'The `label` prop is missing or invalid.',
        );
      }
    }

    const referenceProps = { [ariaAttributeName]: tooltipId };
    const side = placement.split('-')[0] as Side;

    return (
      <Fragment>
        <Component
          {...referenceProps}
          onFocus={handleFocus}
          onBlur={handleClose}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          className={classes.component}
        />
        <div
          {...props}
          ref={applyMultipleRefs(ref, refs.setFloating)}
          id={tooltipId}
          // See https://github.com/w3c/aria/issues/979
          role="tooltip"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          data-state={state}
          data-side={side}
          className={clsx(classes.base, className)}
          style={
            state === State.initial ? style : { ...style, ...floatingStyles }
          }
        >
          <div className={classes.content}>{label}</div>
          <div
            ref={arrowRef}
            className={classes.arrow}
            style={{
              top: middlewareData.arrow?.y,
              left: middlewareData.arrow?.x,
            }}
          />
        </div>
      </Fragment>
    );
  },
);

Tooltip.displayName = 'Tooltip';
