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

/* eslint-disable react/display-name */
import React from 'react';

import {
  render,
  renderHook,
  act,
  actHook,
  userEvent,
  fireEvent,
} from '../../util/test-utils';

import {
  ModalProvider,
  createUseModal,
  ModalContext,
  ModalComponent,
} from './ModalContext';

const Modal: ModalComponent = ({ onClose }) => (
  <div role="dialog">
    <button onClick={onClose}>Close</button>
  </div>
);
Modal.TIMEOUT = 200;

describe('ModalContext', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ModalProvider', () => {
    const onClose = jest.fn();
    const initialState = [{ id: 'initial', component: Modal, onClose }];

    it('should render the open modals', () => {
      const { getByRole } = render(
        <ModalProvider initialState={initialState} ariaHideApp={false}>
          <div />
        </ModalProvider>,
      );

      expect(getByRole('dialog')).toBeVisible();
    });

    it('should close the modal when the user navigates back', () => {
      const { queryByRole } = render(
        <ModalProvider initialState={initialState} ariaHideApp={false}>
          <div />
        </ModalProvider>,
      );

      act(() => {
        fireEvent.popState(window);
        jest.runAllTimers();
      });

      expect(queryByRole('dialog')).toBeNull();
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should close the modal when the onClose method is called', () => {
      const { queryByRole } = render(
        <ModalProvider initialState={initialState} ariaHideApp={false}>
          <div />
        </ModalProvider>,
      );

      act(() => {
        userEvent.click(queryByRole('button'));
        jest.runAllTimers();
      });

      expect(queryByRole('dialog')).toBeNull();
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUseModal', () => {
    const useModal = createUseModal(Modal);

    const onClose = jest.fn();
    const dispatch = jest.fn();
    const state = [1, 2, 3, 4].map((id) => ({
      id: id.toString(),
      component: Modal,
      onClose,
    }));
    const wrapper = ({ children }) => (
      <ModalContext.Provider value={[state, dispatch]}>
        {children}
      </ModalContext.Provider>
    );

    it('should dispatch an action when setModal is called', () => {
      const { result } = renderHook(() => useModal(), { wrapper });

      actHook(() => {
        result.current.setModal({});
      });

      const expected = expect.objectContaining({
        type: 'push',
        item: expect.objectContaining({
          component: expect.any(Function),
          id: expect.any(String),
        }),
      });
      expect(dispatch).toHaveBeenCalledWith(expected);
    });

    it('should call the onClose callback when removeModal is called', () => {
      const { result } = renderHook(() => useModal(), { wrapper });

      actHook(() => {
        result.current.removeModal();
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should dispatch an action when removeModal is called', () => {
      const { result } = renderHook(() => useModal(), { wrapper });

      actHook(() => {
        result.current.removeModal();
      });

      const expected = expect.objectContaining({
        type: 'remove',
        id: expect.any(String),
        timeout: 200,
      });
      expect(dispatch).toHaveBeenCalledWith(expected);
    });
  });
});
