import React, { Component } from 'react';
import createReactContext from 'create-react-context';

import Modal, { TRANSITION_DURATION } from './Modal';
import { childrenPropType } from '../../util/shared-prop-types';

const {
  Provider: ContextProvider,
  Consumer: ModalConsumer
} = createReactContext({
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
      </ContextProvider>
    );
  }
}
