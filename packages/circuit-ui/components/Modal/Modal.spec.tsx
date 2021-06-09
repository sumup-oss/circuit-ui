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

import { render, act, userEvent, waitFor } from '../../util/test-utils';
import Button from '../Button';
import { ModalProvider } from '../ModalContext';

import { ModalProps } from './Modal';
import { useModal } from './useModal';
import * as MockedModal from './Modal';

describe('Modal', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (MockedModal as any).TRANSITION_DURATION = 0;
  });

  const SetModal = ({ modal }: { modal: ModalProps }) => {
    const { setModal } = useModal();
    return (
      <Button
        data-testid="button-open"
        type="button"
        onClick={() => setModal(modal)}
      >
        Open modal
      </Button>
    );
  };

  const PageWithModal = ({ modal }: { modal: ModalProps }) => (
    <ModalProvider>
      <SetModal modal={modal} />
    </ModalProvider>
  );

  const defaultModal: ModalProps = {
    // eslint-disable-next-line react/prop-types, react/display-name
    children: ({ onClose }) => (
      <div>
        <div data-testid="card">Hello World!</div>
        <button type="button" data-testid="button-close" onClick={onClose} />
      </div>
    ),
    // Disables the need for a wrapper. I couldn't get the Modal to work
    // with the wrapper enabled. Here's an issue describing that it
    // should work:
    // https://github.com/reactjs/react-modal/issues/563
    // Here are the docs for setting the app element:
    // http://reactcommunity.org/react-modal/accessibility/#app-element
    ariaHideApp: false,
    onClose: jest.fn(),
  };

  const openModal = (modal: ModalProps) => {
    const wrapper = render(<PageWithModal modal={modal} />);

    act(() => {
      userEvent.click(wrapper.getByTestId('button-open'));
    });

    return wrapper;
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should open', () => {
    const { getByTestId } = openModal(defaultModal);
    expect(getByTestId('card')).toBeVisible();
  });

  describe('closing the modal', () => {
    it('should be closeable by pressing a close button', async () => {
      const { getByTestId, queryByTestId } = openModal(defaultModal);

      act(() => {
        userEvent.click(getByTestId('button-close'));
      });

      await waitFor(() => {
        expect(defaultModal.onClose).toHaveBeenCalled();
        expect(queryByTestId('card')).toBeNull();
      });
    });
  });

  it('should render the children render prop', () => {
    const { getByTestId } = openModal(defaultModal);
    expect(getByTestId('card')).toHaveTextContent('Hello World!');
  });
});
