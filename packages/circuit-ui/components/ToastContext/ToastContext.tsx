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
  type ReactNode,
} from 'react';

import { useStack, type StackItem } from '../../hooks/useStack/index.js';
import { clsx } from '../../styles/clsx.js';

import type { BaseToastProps, ToastComponent } from './types.js';
import classes from './ToastContext.module.css';

const DEFAULT_TOAST_DURATION = 6000;

type ToastState<TProps extends BaseToastProps> = TProps &
  StackItem & { component: ToastComponent<TProps> };

type ToastContextValue = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  setToast: (toast: ToastState<any>) => void;
  removeToast: (toast: ToastState<any>) => void;
  /* eslint-enable @typescript-eslint/no-explicit-any */
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
  position?: 'bottom' | 'top' | 'top-right';
  className?: string;
}

export function ToastProvider<TProps extends BaseToastProps>({
  children,
  position = 'bottom',
  className,
}: ToastProviderProps): JSX.Element {
  const [toasts, dispatch] = useStack<ToastState<TProps>>([]);

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

  return (
    <ToastContext.Provider value={context}>
      {children}
      <div
        className={clsx(classes.base, classes[position], className)}
        role="status"
        aria-live="polite"
        aria-atomic="false"
      >
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
              className={classes.toast}
              {...toastProps}
              key={id}
              isVisible={!transition}
              onClose={() => context.removeToast(toast)}
            />
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
