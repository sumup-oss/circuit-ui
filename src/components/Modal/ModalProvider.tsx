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

import React, {
  createContext,
  FC,
  useState,
  MouseEvent,
  KeyboardEvent
} from 'react';
import { Global, css } from '@emotion/core';

import { Modal, ModalProps } from './Modal';

// eslint-disable-next-line no-spaced-func
export const ModalContext = createContext<{
  setModal: (modal: ModalProps) => void;
  getModal: () => ModalProps | null;
}>({
  setModal: () => {},
  getModal: () => null
});

export const ModalConsumer = ModalContext.Consumer;

export const ModalProvider: FC<Pick<ModalProps, 'appElement'>> = props => {
  const [isOpen, setOpen] = useState(false);
  const [modal, setModal] = useState<ModalProps | null>(null);

  const closeModal = (): void => {
    window.onpopstate = null;
    setOpen(false);
  };

  const openModal = (newModal: ModalProps): void => {
    window.onpopstate = closeModal;
    setModal(newModal);
    setOpen(true);
  };

  const { onClose, children, ...modalProps } = modal || {};

  const handleClose = (event: MouseEvent | KeyboardEvent): void => {
    if (onClose) {
      onClose(event);
    }
    closeModal();
  };

  return (
    <ModalContext.Provider
      value={{ setModal: openModal, getModal: () => modal }}
    >
      {props.children}

      {modal && (
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          appElement={props.appElement}
          {...modalProps}
        >
          {children}
        </Modal>
      )}

      {isOpen && (
        <Global
          styles={css`
            /* Remove scroll on the body when react-modal is open */
            .ReactModal__Html--open {
              height: 100%;
              overflow-y: hidden;
              -webkit-overflow-scrolling: auto;
            }
          `}
        />
      )}
    </ModalContext.Provider>
  );
};
