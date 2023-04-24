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

import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { useContext } from 'react';

import {
  render,
  act,
  userEvent,
  fireEvent,
  waitFor,
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
  afterAll(() => {
    vi.resetModules();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('ModalProvider', () => {
    const onClose = vi.fn();
    const modal = {
      id: 'initial',
      component: Modal,
      onClose,
    };
    const initialState = [modal];

    // `react-modal` tries to access `document` to hide the app which fails in
    // the simulated DOM environment of the unit tests. That's why we need to
    // set `ariaHideApp="false"`. This should not be done in production apps.
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

      await userEvent.click(getByRole('button', { name: 'Close' }));

      await waitFor(() => {
        expect(queryByRole('dialog')).toBeNull();
      });
    });

    it('should close the modal when the user navigates back', async () => {
      const { queryByRole } = render(
        <ModalProvider initialState={initialState} ariaHideApp={false}>
          <div />
        </ModalProvider>,
      );

      expect(queryByRole('dialog')).toBeVisible();

      act(() => {
        fireEvent.popState(window);
      });

      await waitFor(() => {
        expect(queryByRole('dialog')).toBeNull();
      });
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

      await waitFor(() => {
        expect(queryByRole('dialog')).toBeNull();
      });
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
