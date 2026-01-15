/**
 * Copyright 2019, SumUp Ltd.
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
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';

import { useStack, type StackItem } from '../../hooks/useStack/index.js';
import { clsx } from '../../styles/clsx.js';

import type { BaseToastProps, ToastComponent } from './types.js';
import classes from './ToastContext.module.css';
import { usePrevious } from '../../hooks/usePrevious/usePrevious.js';

const DEFAULT_TOAST_DURATION = 6000;

type ToastState<TProps extends BaseToastProps> = TProps &
  StackItem & { component: ToastComponent<TProps> };

type ToastContextValue = {
  setToast: (toast: ToastState<any>) => void;
  removeToast: (toast: ToastState<any>) => void;
};

export const ToastContext = createContext<ToastContextValue>({
  setToast: () => {},
  removeToast: () => {},
});

export interface ToastProviderProps {
  /**
   * The ToastProvider should wrap your entire application.
   */
  children: ReactNode;
  /**
   * Choose the position of all toasts on screen (please consider sticking to default value if possible). Default: 'bottom'.
   */
  position?: 'bottom' | 'top' | 'top-right';
  /**
   * The class name to add to the toast wrapper element.
   */
  className?: string;
}

export function ToastProvider<TProps extends BaseToastProps>({
  children,
  position = 'bottom',
  className,
}: ToastProviderProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [toasts, dispatch] = useStack<ToastState<TProps>>([]);
  const prevToastLength = usePrevious(toasts.length);

  const setToast = useCallback(
    (toast: ToastState<TProps>) => {
      dispatch({
        type: 'push',
        item: toast,
      });
    },
    [dispatch],
  );

  const removeToast = useCallback(
    (toast: ToastState<TProps>) => {
      if (toast.onClose) {
        toast.onClose();
      }
      dispatch({
        type: 'remove',
        id: toast.id,
        transition: {
          duration: toast.component.TRANSITION_DURATION,
        },
      });
    },
    [dispatch],
  );

  const context = useMemo(
    () => ({ setToast, removeToast }),
    [setToast, removeToast],
  );

  useEffect(() => {
    const toastToDismiss = toasts[0];
    if (!toastToDismiss) {
      return undefined;
    }
    const duration = toastToDismiss.duration
      ? Math.max(toastToDismiss.duration, DEFAULT_TOAST_DURATION)
      : DEFAULT_TOAST_DURATION;
    const timeoutId = setTimeout(() => {
      context.removeToast(toastToDismiss);
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [toasts, context]);

  useEffect(() => {
    const supportsPopover =
      // @ts-expect-error
      // eslint-disable-next-line compat/compat
      (typeof Object.hasOwn === 'function' &&
        // @ts-expect-error
        // eslint-disable-next-line compat/compat, @typescript-eslint/no-unsafe-call
        Object.hasOwn(HTMLElement.prototype, 'popover')) as boolean;

    if (!supportsPopover) {
      return;
    }

    const firstToastOpened = prevToastLength === 0 && toasts.length > 0;
    if (firstToastOpened) {
      popoverRef.current?.showPopover();
    }

    const lastToastClosed =
      prevToastLength && prevToastLength > 0 && toasts.length === 0;
    if (lastToastClosed) {
      popoverRef.current?.hidePopover();
    }
  }, [prevToastLength, toasts.length]);

  return (
    <ToastContext.Provider value={context}>
      {children}
      <div
        ref={popoverRef}
        className={classes.base}
        role="status"
        aria-live="polite"
        aria-atomic="false"
        popover="manual"
      >
        <div className={clsx(classes.toasts, classes[position], className)}>
          {toasts.map((toast) => {
            const {
              id,
              onClose,
              transition,
              component: Component,
              ...toastProps
            } = toast;
            return (
              // @ts-expect-error The props are enforced by the toast hooks,
              // so this warning can be safely ignored.
              <Component
                {...toastProps}
                key={id}
                isVisible={!transition}
                onClose={() => context.removeToast(toast)}
              />
            );
          })}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
