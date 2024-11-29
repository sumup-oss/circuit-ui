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
  createContext,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import type { Dialog, DialogProps } from './Dialog.js';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type SetModalArgs = Optional<DialogProps, 'open'>;

// keep initial state compatible with the old version of this component
type ModalDialogState = SetModalArgs & {
  component: typeof Dialog;
  id: string | number;
};

type ModalDialogContextValue = {
  setModal: (modal: ModalDialogState) => void;
  removeModal: (modal: ModalDialogState) => void;
};
export interface ModalDialogProviderProps {
  /**
   * The ModalProvider should wrap your entire application.
   */
  children: ReactNode;
  /**
   * An array of modals that should be displayed immediately, e.g. on page load.
   */
  initialState?: ModalDialogState[];
}

export const ModalDialogContext = createContext<ModalDialogContextValue>({
  setModal: () => {},
  removeModal: () => {},
});

export function ModalDialogProvider({
  children,
  initialState,
  ...defaultModalProps
}: ModalDialogProviderProps) {
  const [modals, setModals] = useState(initialState ?? []);

  const setModal = useCallback((modal: ModalDialogState) => {
    setModals((prevValue) => [...prevValue, modal]);
  }, []);

  const removeModal = useCallback((modal: ModalDialogState) => {
    if (modal.onClose) {
      modal.onClose();
    }
    setModals((prevValue) => prevValue.filter((m) => m.id !== modal.id));
  }, []);

  const context = useMemo(
    () => ({ setModal, removeModal }),
    [setModal, removeModal],
  );

  return (
    <ModalDialogContext.Provider value={context}>
      {children}
      {modals.map((modal) => {
        const { id, component: Component, ...modalProps } = modal;
        return (
          <Component
            {...defaultModalProps}
            {...modalProps}
            key={id}
            open={true}
            onClose={() => removeModal(modal)}
          />
        );
      })}
    </ModalDialogContext.Provider>
  );
}
