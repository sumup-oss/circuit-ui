/**
 * Copyright 2021, SumUp Ltd.
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

import { useContext, useMemo, useCallback, useDebugValue } from 'react';

import { uniqueId } from '../../util/id';

import { ModalContext } from './ModalContext';
import type { BaseModalProps, ModalComponent } from './types';

export function createUseModal<T extends BaseModalProps>(
  component: ModalComponent<T>,
) {
  return (): {
    setModal: (props: Omit<T, 'isOpen'>) => void;
    removeModal: () => void;
  } => {
    const id = useMemo(uniqueId, []);
    const [modals, dispatch] = useContext(ModalContext);

    const modal = useMemo<T | undefined>(
      () => modals.find((m) => m.id === id),
      [id, modals],
    );

    useDebugValue(modal);

    const setModal = useCallback(
      (props: Omit<T, 'isOpen'>): void => {
        dispatch({ type: 'push', item: { ...props, id, component } });
      },
      [dispatch, id],
    );

    const removeModal = useCallback((): void => {
      if (modal && modal.onClose) {
        modal.onClose();
      }
      dispatch({ type: 'remove', id, timeout: component.TIMEOUT });
    }, [dispatch, id, modal]);

    return { setModal, removeModal };
  };
}
