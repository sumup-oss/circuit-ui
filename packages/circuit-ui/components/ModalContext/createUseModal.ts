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

import { useContext, useMemo, useCallback, useRef } from 'react';

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
    const modalRef = useRef<Omit<T, 'isOpen'> | null>(null);
    const context = useContext(ModalContext);

    const setModal = useCallback(
      (props: Omit<T, 'isOpen'>): void => {
        modalRef.current = props;
        context.setModal({ ...props, id, component });
      },
      [context, id],
    );

    const removeModal = useCallback((): void => {
      if (modalRef.current) {
        context.removeModal({ ...modalRef.current, id, component });
        modalRef.current = null;
      }
    }, [context, id]);

    return { setModal, removeModal };
  };
}
