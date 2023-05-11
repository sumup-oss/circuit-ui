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

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useClickTrigger } from '@sumup/collector';
import { css } from '@emotion/react';

import { useStack, StackItem } from '../../hooks/useStack';
import styled, { StyleProps } from '../../styles/styled';
import { spacing } from '../../styles/style-mixins';

import { BaseToastProps, ToastComponent } from './types';

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
}

const liveRegionStyles = ({ theme }: StyleProps) => css`
  position: fixed;
  width: 100%;
  padding: 0 ${theme.spacings.giga};
  bottom: ${theme.spacings.giga};
  left: 0;
  display: flex;
  flex-direction: column-reverse;
  z-index: ${theme.zIndex.toast};

  ${theme.mq.kilo} {
    width: auto;
    padding: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const LiveRegion = styled('div')(liveRegionStyles);

export function ToastProvider<TProps extends BaseToastProps>({
  children,
}: ToastProviderProps): JSX.Element {
  const sendEvent = useClickTrigger();
  const [toasts, dispatch] = useStack<ToastState<TProps>>([]);

  const setToast = useCallback(
    (toast: ToastState<TProps>) => {
      if (toast.tracking && toast.tracking.label) {
        sendEvent({
          component: 'toast',
          ...toast.tracking,
          label: `${toast.tracking.label}|open`,
        });
      }

      dispatch({
        type: 'push',
        item: toast,
      });
    },
    [dispatch, sendEvent],
  );

  const removeToast = useCallback(
    (toast: ToastState<TProps>) => {
      if (toast.tracking && toast.tracking.label) {
        sendEvent({
          component: 'toast',
          ...toast.tracking,
          label: `${toast.tracking.label}|close`,
        });
      }
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
    [dispatch, sendEvent],
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
      <LiveRegion role="status" aria-live="polite" aria-atomic="false">
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
              css={spacing({ top: 'byte' })}
              {...toastProps}
              key={id}
              isVisible={!transition}
              onClose={() => context.removeToast(toast)}
            />
          );
        })}
      </LiveRegion>
    </ToastContext.Provider>
  );
}
