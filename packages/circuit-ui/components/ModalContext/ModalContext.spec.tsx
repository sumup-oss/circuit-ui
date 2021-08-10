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
import React, { useContext } from 'react';
import * as Collector from '@sumup/collector';

import { render, act, userEvent, fireEvent } from '../../util/test-utils';

import { ModalProvider, ModalContext } from './ModalContext';
import type { ModalComponent } from './types';

jest.mock('@sumup/collector');

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
    jest.resetModules();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('ModalProvider', () => {
    const dispatch = jest.fn();
    // @ts-expect-error TypeScript doesn't allow assigning to the read-only
    // useClickTrigger
    Collector.useClickTrigger = jest.fn(() => dispatch);

    const onClose = jest.fn();
    const modal = {
      id: 'initial',
      component: Modal,
      onClose,
      tracking: { label: 'test-modal' },
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

    it('should open and close a modal when the context functions are called', () => {
      const Trigger = () => {
        const { setModal, removeModal } = useContext(ModalContext);
        return (
          <>
            <button onClick={() => setModal(modal)}>Open modal</button>
            <button onClick={() => removeModal(modal)}>Close modal</button>
          </>
        );
      };

      const { getByRole, queryByRole, getByText } = render(
        <ModalProvider ariaHideApp={false}>
          <Trigger />
        </ModalProvider>,
      );

      act(() => {
        fireEvent.click(getByText('Open modal'));
      });

      expect(getByRole('dialog')).toBeVisible();

      act(() => {
        fireEvent.click(getByText('Close modal'));
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
        jest.runAllTimers();
      });

      expect(queryByRole('dialog')).toBeNull();
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
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
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
