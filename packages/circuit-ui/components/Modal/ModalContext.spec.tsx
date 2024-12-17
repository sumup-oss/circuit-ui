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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useContext } from 'react';

import { render, act, screen, userEvent } from '../../util/test-utils.js';

import { ModalProvider, ModalContext } from './ModalContext.js';
import { ANIMATION_DURATION, type ModalProps } from './Modal.js';

const Modal = ({ onClose, open }: ModalProps) => (
  <dialog aria-label="Modal" open={open} data-testid="dummy-dialog">
    <button onClick={onClose} type="button">
      Close
    </button>
  </dialog>
);

describe('ModalContext', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe('ModalProvider', () => {
    const onClose = vi.fn();
    const modal = {
      id: 'initial',
      component: Modal,
      onClose,
      children: () => <p>Modal content</p>,
      closeButtonLabel: 'Close',
    };
    const initialState = [modal];

    it('should render the initial modals', () => {
      render(
        <ModalProvider initialState={initialState}>
          <div />
        </ModalProvider>,
      );

      act(() => {
        vi.advanceTimersByTime(ANIMATION_DURATION);
      });

      expect(
        (screen.getByTestId('dummy-dialog')).open,
      ).toBe(true);
      expect(screen.getByTestId('dummy-dialog')).toBeVisible();
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

      render(
        <ModalProvider>
          <Trigger />
        </ModalProvider>,
      );

      await userEvent.click(screen.getByRole('button', { name: 'Open modal' }));

      expect(screen.getByRole('dialog')).toBeVisible();

      await userEvent.click(screen.getByRole('button', { name: 'Close' }));

      act(() => {
        vi.runAllTimers();
      });

      expect(screen.queryByTestId('dummy-dialog')).not.toBeInTheDocument();
    });

    it('should close the modal when the onClose method is called', async () => {
      render(
        <ModalProvider initialState={initialState}>
          <div />
        </ModalProvider>,
      );

      const closeButton = screen.queryByRole('button') as HTMLButtonElement;
      await userEvent.click(closeButton);
      act(() => {
        vi.runAllTimers();
      });

      expect(screen.queryByTestId('dummy-dialog')).not.toBeInTheDocument();
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
