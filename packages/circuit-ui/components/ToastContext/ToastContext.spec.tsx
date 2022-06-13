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
import * as Collector from '@sumup/collector';

import {
  render,
  userEvent as baseUserEvent,
  waitForElementToBeRemoved,
} from '../../util/test-utils';

import { ToastProvider, ToastContext } from './ToastContext';
import type { ToastComponent } from './types';

jest.mock('@sumup/collector');

const openButtonLabel = 'Open toast';
const toastMessage = "You've got mail!";
const closeButtonLabel = 'Close';
const Toast: ToastComponent = ({ onClose }) => (
  <>
    <p>{toastMessage}</p>
    <button onClick={onClose}>{closeButtonLabel}</button>
  </>
);
Toast.TRANSITION_DURATION = 200;

describe('ToastContext', () => {
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

  describe('ToastProvider', () => {
    const dispatch = jest.fn();
    // @ts-expect-error TypeScript doesn't allow assigning to the read-only
    // useClickTrigger
    Collector.useClickTrigger = jest.fn(() => dispatch);

    const onClose = jest.fn();
    const toast = {
      id: 'initial',
      component: Toast,
      onClose,
      tracking: { label: 'test-toast' },
    };

    it('should open a toast when the context function is called', async () => {
      const Trigger = () => {
        const { setToast } = useContext(ToastContext);
        return (
          <button onClick={() => setToast(toast)}>{openButtonLabel}</button>
        );
      };

      const { getByRole, getByText } = render(
        <ToastProvider>
          <Trigger />
        </ToastProvider>,
      );

      await userEvent.click(getByRole('button', { name: openButtonLabel }));

      expect(getByText(toastMessage)).toBeVisible();
    });

    it('should close the toast when the onClose method is called', async () => {
      const Trigger = () => {
        const { setToast } = useContext(ToastContext);
        return (
          <button onClick={() => setToast(toast)}>{openButtonLabel}</button>
        );
      };

      const { getByRole, getByText } = render(
        <ToastProvider>
          <Trigger />
        </ToastProvider>,
      );

      await userEvent.click(getByRole('button', { name: openButtonLabel }));
      await userEvent.click(getByRole('button', { name: closeButtonLabel }));

      await waitForElementToBeRemoved(getByText(toastMessage));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
