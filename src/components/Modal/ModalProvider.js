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

import React, { Component, createContext } from 'react';
import { Global, css } from '@emotion/core';

import Modal, { TRANSITION_DURATION } from './Modal';
import { childrenPropType } from '../../util/shared-prop-types';

const { Provider: ContextProvider, Consumer: ModalConsumer } = createContext({
  setModal: () => {},
  getModal: () => {}
});

export { ModalConsumer };

export class ModalProvider extends Component {
  static propTypes = {
    children: childrenPropType.isRequired
  };

  state = {
    modal: null,
    isOpen: false
  };

  componentDidUpdate(prevProps, { isOpen: prevIsOpen }) {
    const { isOpen } = this.state;
    if (!isOpen && prevIsOpen) {
      setTimeout(() => {
        this.setState(prevState => ({ ...prevState, modal: null }));
      }, TRANSITION_DURATION);
    }
  }

  setModal = config => {
    window.onpopstate = this.closeModal;
    this.setState(prevState => ({
      ...prevState,
      modal: { ...prevState.modal, ...config },
      isOpen: true
    }));
  };

  closeModal = () => {
    window.onpopstate = null;
    this.setState(prevState => ({
      ...prevState,
      isOpen: false
    }));
  };

  // eslint-disable-next-line react/sort-comp
  contextValue = {
    setModal: this.setModal,
    getModal: () => this.state.modal
  };

  render() {
    const { modal, isOpen } = this.state;
    // Cannot use noop from lodash here. Breaks tests on node 8 for
    // some reason.
    const { onClose = () => {}, children, ...otherProps } = modal || {};
    const handleClose = () => {
      onClose();
      this.closeModal();
    };
    const modalProps = modal
      ? {
          isOpen,
          ...otherProps,
          children: () => children({ onClose: handleClose }),
          onClose: handleClose
        }
      : { isOpen, onClose, children: () => null };

    return (
      <ContextProvider value={this.contextValue}>
        {this.props.children}
        {modal && <Modal {...modalProps} />}
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
      </ContextProvider>
    );
  }
}
