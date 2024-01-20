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

import {
  forwardRef,
  useEffect,
  useId,
  useState,
  type ComponentType,
  type FocusEventHandler,
  type HTMLAttributes,
  type MouseEventHandler,
  type Ref,
} from 'react';
import {
  useFloating,
  flip,
  shift,
  type Placement,
} from '@floating-ui/react-dom';

import { clsx } from '../../styles/clsx.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { useEscapeKey } from '../../hooks/useEscapeKey/index.js';
import Portal from '../Portal/index.js';

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
   * the reference component. Default: 'label'.
   */
  type?: 'label' | 'description';
  /**
   * Where to display the tooltip relative to the reference component. The
   * tooltip will automatically move if there isn't enough space available.
   * Default: 'top'.
   */
  placement?: Placement;
}

enum State {
  initial = 'initial',
  open = 'open',
  closed = 'closed',
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      label,
      component: Component,
      type = 'label',
      placement = 'top',
      className,
      ...props
    },
    ref,
  ) => {
    const tooltipId = useId();
    // The tooltip works without JavaScript using only CSS (the "initial" state).
    // When JS is available, the component is progressively enhanced and toggles
    // between the "closed" and "open" states.
    const [state, setState] = useState<State>(State.initial);

    useEffect(() => {
      setState(State.closed);
    }, []);

    useEscapeKey(() => setState(State.closed), state === State.open);

    const { refs, floatingStyles, update } = useFloating({
      open: state === State.open,
      placement,
      middleware: [flip(), shift()],
    });

    useEffect(() => {
      /**
       * When we support `ResizeObserver` (https://caniuse.com/resizeobserver),
       * we can look into using Floating UI's `autoUpdate` (but we can't use
       * `whileElementInMounted` because our implementation hides the floating
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

    const handleOpen = () => {
      setState(State.open);
    };
    const handleClose = () => {
      setState(State.closed);
    };

    const referenceProps = {
      [type === 'label' ? 'aria-labelledby' : 'aria-describedby']: tooltipId,
    };

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
        <Portal>
          <div
            {...props}
            ref={applyMultipleRefs(ref, refs.setFloating)}
            id={tooltipId}
            role="tooltip"
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            data-state={state}
            style={{ ...props.style, ...floatingStyles }}
            className={clsx(classes.base, className)}
          >
            <div className={classes.content}>{label}</div>
          </div>
        </Portal>
      </>
    );
  },
);
