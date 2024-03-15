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
  type FocusEventHandler,
  type HTMLAttributes,
  type MouseEventHandler,
  type Ref,
} from 'react';
import {
  useFloating,
  arrow,
  flip,
  offset,
  shift,
  type Placement,
  type Side,
} from '@floating-ui/react-dom';
import { atom, onMount } from 'nanostores';
import { useStore } from '@nanostores/react';

import { clsx } from '../../styles/clsx.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { useEscapeKey } from '../../hooks/useEscapeKey/index.js';
import { CircuitError } from '../../util/errors.js';

import classes from './Tooltip.module.css';

export interface TooltipReferenceProps {
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
  'className': string;
  'onFocus': FocusEventHandler;
  'onBlur': FocusEventHandler;
  'onMouseEnter': MouseEventHandler;
  'onMouseLeave': MouseEventHandler;
  'ref': Ref<any>;
}

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A clear and concise label for the reference component.
   * Interactive content such as buttons or links and rich content such as
   * bold text or headings are not supported.
   */
  label: string;
  /**
   * The focusable element that is labelled by the tooltip.
   */
  component: ComponentType<TooltipReferenceProps>;
  /**
   * Whether the tooltip is the main label or a supplemental description of
   * the reference component.
   */
  type: 'label' | 'description';
  /**
   * Where to display the tooltip relative to the reference component. The
   * tooltip will automatically move if there isn't enough space available.
   * Default: 'top'.
   */
  placement?: Placement;
}

const ARROW_ROTATION_MAP: Record<Side, `${number}deg`> = {
  top: '45deg',
  right: '135deg',
  bottom: '225deg',
  left: '315deg',
};

export const $activeTooltipId = atom<string | null>('initial');

// The tooltip works without JavaScript using only CSS (the "initial" state).
// When JS is available, the component is progressively enhanced and toggles
// between the "closed" and "open" states.
onMount($activeTooltipId, () => {
  $activeTooltipId.set(null);
  return () => {
    $activeTooltipId.set('initial');
  };
});

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

    const handleOpen = () => {
      $activeTooltipId.set(tooltipId);
    };
    const handleClose = () => {
      $activeTooltipId.set(null);
    };

    useEscapeKey(handleClose, state === State.open);

    const { refs, floatingStyles, middlewareData, update, placement } =
      useFloating({
        open: state === State.open,
        placement: defaultPlacement,
        middleware: [
          // 8px (arrow size) + 4px (actual offset)
          offset(12),
          flip(),
          shift(),
          arrow({
            element: arrowRef,
            // This accounts for the content's border radius
            padding: 8,
          }),
        ],
      });

    useEffect(() => {
      /**
       * When we support `ResizeObserver` (https://caniuse.com/resizeobserver),
       * we can look into using Floating UI's `autoUpdate` (but we can't use
       * `whileElementIsMounted` because our implementation hides the floating
       * element using CSS instead of using conditional rendering.
       * See https://floating-ui.com/docs/react-dom#updating
       */
      if (state === State.open) {
        update();
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update);

        return () => {
          window.removeEventListener('resize', update);
          window.removeEventListener('scroll', update);
        };
      }

      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);

      return undefined;
    }, [state, refs.reference, update]);

    if (process.env.NODE_ENV !== 'production' && !type) {
      throw new CircuitError('Tooltip', 'The `type` prop is required.');
    }

    const referenceProps = {
      [type === 'label' ? 'aria-labelledby' : 'aria-describedby']: tooltipId,
    };
    const side = placement.split('-')[0] as Side;

    return (
      <>
        <Component
          {...referenceProps}
          onFocus={handleOpen}
          onBlur={handleClose}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          className={classes.component}
          ref={refs.setReference}
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
          className={clsx(classes.base, className)}
          style={{ ...style, ...floatingStyles }}
        >
          <div className={classes.content}>{label}</div>
          <div
            ref={arrowRef}
            className={classes.arrow}
            // @ts-expect-error The dynamic style rules are valid.
            style={{
              left: middlewareData.arrow?.x,
              top: middlewareData.arrow?.y,
              [side]: 'calc(100% - (var(--cui-spacings-kilo) / 2))',
              transform: `rotate(${ARROW_ROTATION_MAP[side]})`,
            }}
          />
        </div>
      </>
    );
  },
);
