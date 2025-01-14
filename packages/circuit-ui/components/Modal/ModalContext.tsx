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

import { createContext, type ReactNode, useCallback, useMemo } from 'react';

import { type StackItem, useStack } from '../../hooks/useStack/index.js';

import { ANIMATION_DURATION, type ModalProps } from './Modal.js';
import type { ModalDialogComponent } from './createUseModal.js';

export type SetModalArgs<T> = Omit<T, 'open'>;

// keep initial state compatible with the old version of this component
export type ModalState<T extends ModalProps> = SetModalArgs<T> &
  StackItem & {
    component: ModalDialogComponent<T>;
    open: boolean;
  };

type ModalContextValue<T extends ModalProps> = {
  setModal: (modal: ModalState<T>) => void;
  removeModal: (modal: ModalState<T>) => void;
};
export interface ModalProviderProps<T extends ModalProps> {
  /**
   * The ModalProvider should wrap your entire application.
   */
  children: ReactNode;
  /**
   * An array of modals that should be displayed immediately, e.g. on page load.
   */
  initialState?: ModalState<T>[];
}

// TODO replace any
export const ModalContext = createContext<ModalContextValue<any>>({
  setModal: () => {},
  removeModal: () => {},
});

export function ModalProvider<T extends ModalProps>({
  children,
  initialState,
  ...defaultModalProps
}: ModalProviderProps<T>) {
  const [modals, dispatch] = useStack<ModalState<T>>(
    initialState?.map((modal) => ({ ...modal, open: true })),
  );

  const setModal = useCallback(
    (modal: ModalState<T>) => {
      dispatch({ type: 'push', item: modal });
    },
    [dispatch],
  );

  const removeModal = useCallback(
    (modal: ModalState<T>) => {
      if (modal.onClose) {
        modal.onClose();
      }
      dispatch({
        type: 'update',
        item: modal,
      });
      dispatch({
        type: 'remove',
        id: modal.id,
        transition: {
          duration: ANIMATION_DURATION,
        },
      });
    },
    [dispatch],
  );

  const context = useMemo(
    () => ({ setModal, removeModal }),
    [setModal, removeModal],
  );

  return (
    <ModalContext.Provider value={context}>
      {children}
      {modals.map((modal) => {
        const { id, component: Component, transition, ...modalProps } = modal;

        return (
          // @ts-expect-error type will either be ModalProps or NotificationProps
          <Component
            {...defaultModalProps}
            {...modalProps}
            key={id}
            open={!transition}
            onClose={() => removeModal(modal)}
          />
        );
      })}
    </ModalContext.Provider>
  );
}
