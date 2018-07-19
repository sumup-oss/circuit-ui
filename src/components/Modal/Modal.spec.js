import React from 'react';

import { ModalConsumer, ModalProvider } from '.';
import Button from '../Button';

import * as MockedModal from './Modal';

describe('Modal', () => {
  beforeEach(() => {
    MockedModal.TRANSITION_DURATION = 0;
  });

  // eslint-disable-next-line react/prop-types
  const PageWithModal = ({ modal }) => (
    <div id="root">
      <ModalProvider>
        <ModalConsumer>
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
        </ModalConsumer>
      </ModalProvider>
    </div>
  );

  const defaultModal = {
    // eslint-disable-next-line react/prop-types, no-unused-vars
    children: ({ onClose }) => (
      <div>
        <div data-test="card">Hello World!</div>
        <button data-test="close" onClick={onClose} />
      </div>
    ),
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
    expect(wrapper.find('[data-test="card"]')).toHaveLength(1);
  });

  describe('closing the modal', () => {
    it('should be closeable by pressing a close button', async () => {
      const wrapper = openModal(defaultModal);
      const closeButton = wrapper.find('[data-test="close"]').find('button');
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
      expect(wrapper.find('[data-test="card"]')).toHaveLength(0);
    });

    it('should close by clicking the overlay by default', async () => {
      const wrapper = openModal({ ...defaultModal });
      const overlay = wrapper
        .find('ModalPortal')
        .children()
        .first();
      overlay.simulate('click');
      await new Promise(resolve => {
        setTimeout(() => resolve());
      });
      wrapper.update();
      expect(defaultModal.onClose).toHaveBeenCalled();
      expect(wrapper.find('[data-test="card"]')).toHaveLength(0);
    });

    it("should not close by clicking the overlay when 'shouldCloseOnOverlayClick' is 'false'", async () => {
      const wrapper = openModal({
        ...defaultModal,
        shouldCloseOnOverlayClick: false
      });
      const overlay = wrapper
        .find('ModalPortal')
        .children()
        .first();
      overlay.simulate('click');
      await new Promise(resolve => {
        setTimeout(() => resolve());
      });
      wrapper.update();
      expect(wrapper.find('[data-test="card"]')).toHaveLength(1);
    });
  });

  it('should render the children render prop', () => {
    const wrapper = openModal(defaultModal);
    expect(wrapper.find('[data-test="card"]').html()).toContain('Hello World!');
  });
});
