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

import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { useContext } from 'react';

import {
  render,
  userEvent as baseUserEvent,
  waitForElementToBeRemoved,
  screen,
} from '../../util/test-utils.js';

import { ToastProvider, ToastContext } from './ToastContext.js';
import type { ToastComponent } from './types.js';

const openButtonLabel = 'Open toast';
const toastMessage = "You've got mail!";
const closeButtonLabel = 'Close';
const Toast: ToastComponent = ({ onClose }) => (
  <>
    <p>{toastMessage}</p>
    <button type="button" onClick={onClose}>
      {closeButtonLabel}
    </button>
  </>
);
Toast.TRANSITION_DURATION = 200;

describe('ToastContext', () => {
  beforeAll(() => {
    vi.useFakeTimers();

    // HACK: Temporary workaround for a bug in @testing-library/react when
    // using  @testing-library/user-event with fake timers.
    // https://github.com/testing-library/react-testing-library/issues/1197
    const originalJest = globalThis.jest;

    globalThis.jest = {
      ...globalThis.jest,
      advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
    };

    return () => {
      globalThis.jest = originalJest;
    };
  });
  afterAll(() => {
    vi.useRealTimers();
    vi.resetModules();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  const userEvent = baseUserEvent.setup({
    advanceTimers: vi.advanceTimersByTime,
  });

  describe('ToastProvider', () => {
    const onClose = vi.fn();
    const toast = {
      id: 'initial',
      component: Toast,
      onClose,
    };

    it('should open a toast when the context function is called', async () => {
      const Trigger = () => {
        const { setToast } = useContext(ToastContext);
        return (
          <button type="button" onClick={() => setToast(toast)}>
            {openButtonLabel}
          </button>
        );
      };

      render(
        <ToastProvider>
          <Trigger />
        </ToastProvider>,
      );

      await userEvent.click(
        screen.getByRole('button', { name: openButtonLabel }),
      );

      expect(screen.getByText(toastMessage)).toBeVisible();
    });

    it('should close the toast when the onClose method is called', async () => {
      const Trigger = () => {
        const { setToast } = useContext(ToastContext);
        return (
          <button type="button" onClick={() => setToast(toast)}>
            {openButtonLabel}
          </button>
        );
      };

      render(
        <ToastProvider>
          <Trigger />
        </ToastProvider>,
      );

      await userEvent.click(
        screen.getByRole('button', { name: openButtonLabel }),
      );
      await userEvent.click(
        screen.getByRole('button', { name: closeButtonLabel }),
      );

      await waitForElementToBeRemoved(screen.queryByText(toastMessage));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
