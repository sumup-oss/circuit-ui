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
        <div data-testid="card">Hello World!</div>
        <button data-testid="close" onClick={onClose} />
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
    expect(wrapper.find('[data-testid="card"]')).toHaveLength(1);
  });

  it('should close', async () => {
    const wrapper = openModal(defaultModal);
    const closeButton = wrapper.find('[data-testid="close"]').find('button');
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
    expect(wrapper.find('[data-testid="card"]').html()).toContain(
      'Hello World!'
    );
  });
});
