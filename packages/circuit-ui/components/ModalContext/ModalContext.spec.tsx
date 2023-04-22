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

import { useContext } from 'react';

import {
  render,
  act,
  userEvent as baseUserEvent,
  fireEvent,
} from '../../util/test-utils';

import { ModalProvider, ModalContext } from './ModalContext';
import type { ModalComponent } from './types';

const Modal: ModalComponent = ({ onClose }) => (
  <div role="dialog" aria-label="Modal">
    <button onClick={onClose}>Close</button>
  </div>
);
Modal.TRANSITION_DURATION = 200;

describe('ModalContext', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
    jest.resetModules();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * We need to set up userEvent with delay=null to address this issue:
   * https://github.com/testing-library/user-event/issues/833
   */
  const userEvent = baseUserEvent.setup({ delay: null });

  describe('ModalProvider', () => {
    const onClose = jest.fn();
    const modal = {
      id: 'initial',
      component: Modal,
      onClose,
    };
    const initialState = [modal];

    it('should render the initial modals', () => {
      const { getByRole } = render(
        <ModalProvider initialState={initialState} ariaHideApp={false}>
          <div />
        </ModalProvider>,
      );

      expect(getByRole('dialog')).toBeVisible();
    });

    it('should open and close a modal when the context functions are called', async () => {
      const Trigger = () => {
        const { setModal, removeModal } = useContext(ModalContext);
        return (
          <>
            <button onClick={() => setModal(modal)}>Open modal</button>
            <button onClick={() => removeModal(modal)}>Close modal</button>
          </>
        );
      };

      const { getByRole, queryByRole } = render(
        <ModalProvider ariaHideApp={false}>
          <Trigger />
        </ModalProvider>,
      );

      await userEvent.click(getByRole('button', { name: 'Open modal' }));

      expect(getByRole('dialog')).toBeVisible();

      await userEvent.click(getByRole('button', { name: 'Close modal' }));

      act(() => {
        jest.runAllTimers();
      });

      expect(queryByRole('dialog')).toBeNull();
    });

    it('should close the modal when the user navigates back', () => {
      const { queryByRole } = render(
        <ModalProvider initialState={initialState} ariaHideApp={false}>
          <div />
        </ModalProvider>,
      );

      act(() => {
        fireEvent.popState(window);
      });
      act(() => {
        jest.runAllTimers();
      });

      expect(queryByRole('dialog')).toBeNull();
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should close the modal when the onClose method is called', async () => {
      const { queryByRole } = render(
        <ModalProvider initialState={initialState} ariaHideApp={false}>
          <div />
        </ModalProvider>,
      );

      const closeButton = queryByRole('button') as HTMLButtonElement;
      await userEvent.click(closeButton);
      act(() => {
        jest.runAllTimers();
      });

      expect(queryByRole('dialog')).toBeNull();
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
