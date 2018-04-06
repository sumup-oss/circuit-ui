import React from 'react';

import { ModalConsumer as Modal, ModalProvider } from '.';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

import * as MockedModal from './Modal';

describe('Modal', () => {
  beforeEach(() => {
    MockedModal.TRANSITION_DURATION = 0;
  });

  // eslint-disable-next-line react/prop-types
  const PageWithModal = ({ modal }) => (
    <div id="root">
      <ModalProvider>
        <Modal>
          {({ setModal }) => (
            <Button
              type="button"
              onClick={() => {
                setModal({
                  ...modal,
                  appElement: document.getElementById('root')
                });
              }}
            >
              Open modal
            </Button>
          )}
        </Modal>
      </ModalProvider>
    </div>
  );

  const defaultModal = {
    // eslint-disable-next-line react/prop-types, no-unused-vars
    children: () => <div>Hello World!</div>,
    // Disables the need for a wrapper. I couldn't get the Modal to work
    // with the wrapper enabled. Here's an issue describing that it
    // should work:
    // https://github.com/reactjs/react-modal/issues/563
    // Here are the docs for setting the app element:
    // http://reactcommunity.org/react-modal/accessibility/#app-element
    ariaHideApp: false,
    onClose: jest.fn()
  };

  const openModal = modal => {
    const wrapper = mount(<PageWithModal modal={modal} />);
    const button = wrapper.find('Button');
    button.simulate('click');
    wrapper.update();
    return wrapper;
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should open', () => {
    const wrapper = openModal(defaultModal);
    expect(wrapper.find('Card')).toHaveLength(1);
  });

  it('should close', async () => {
    const wrapper = openModal(defaultModal);
    const closeButton = wrapper.find('SvgButton').find('button');
    closeButton.simulate('click');
    /**
     * Tried using jest's runAllTimers to force the ModalProvider
     * to update state, but this didn't work. Somehow, this hack does.
     */
    await new Promise(resolve => {
      setTimeout(() => resolve());
    });
    wrapper.update();
    expect(defaultModal.onClose).toHaveBeenCalled();
    expect(wrapper.find('Card')).toHaveLength(0);
  });

  it('should render the children render prop', () => {
    const wrapper = openModal(defaultModal);
    expect(wrapper.find('Card').html()).toContain('Hello World!');
  });

  it('should have a title, when the title prop is set', () => {
    const titleModal = { ...defaultModal, title: 'Some title' };
    const wrapper = openModal(titleModal);
    expect(wrapper.find('Heading')).toHaveLength(1);
    expect(
      wrapper
        .find('Heading')
        .first()
        .text()
    ).toBe(titleModal.title);
  });

  it('should show buttons when the buttons render prop is provided', () => {
    const buttonModal = {
      ...defaultModal,
      // eslint-disable-next-line react/prop-types
      buttons: ({ onClose }) => (
        <ButtonGroup>
          <Button key="confirm" onClick={onClose} data-test="confirm-button">
            Confirm Button
          </Button>
          <Button key="cancel" onClick={onClose} data-test="cancel-button">
            Cancel Button
          </Button>
        </ButtonGroup>
      )
    };
    const wrapper = openModal(buttonModal);
    const closeButton = wrapper.find('button[data-test="cancel-button"]');
    expect(closeButton).toHaveLength(1);
    closeButton.simulate('click');
    expect(buttonModal.onClose).toHaveBeenCalled();
  });
});
