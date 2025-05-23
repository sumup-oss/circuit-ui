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

'use client';

import { useContext, useCallback, useRef, useId, type ReactNode } from 'react';

import { ModalContext, type SetModalArgs } from './ModalContext.js';
import type { ModalProps } from './Modal.js';

export type ModalDialogComponent<TProps extends ModalProps = ModalProps> = (
  props: TProps,
) => ReactNode;

export function createUseModal<T extends ModalProps>(
  component: ModalDialogComponent<T>,
) {
  return (): {
    setModal: (props: SetModalArgs<T>) => void;
    removeModal: () => void;
  } => {
    const id = useId();
    const modalRef = useRef<SetModalArgs<T> | null>(null);
    const context = useContext(ModalContext);

    // biome-ignore lint/correctness/useExhaustiveDependencies: The `component` never changes
    const setModal = useCallback(
      (props: SetModalArgs<T>): void => {
        modalRef.current = props;
        context.setModal({ ...props, id, component, open: true });
      },
      [context, id],
    );

    // biome-ignore lint/correctness/useExhaustiveDependencies: The `component` never changes
    const removeModal = useCallback((): void => {
      if (modalRef.current) {
        context.removeModal({
          ...modalRef.current,
          id,
          component,
          open: false,
        });
        modalRef.current = null;
      }
    }, [context, id]);

    return { setModal, removeModal };
  };
}
