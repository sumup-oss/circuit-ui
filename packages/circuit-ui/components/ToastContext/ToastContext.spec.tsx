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

import { ToastProvider, ToastContext } from './ToastContext';
import type { ToastComponent } from './types';

jest.mock('@sumup/collector');

const Toast: ToastComponent = ({ onClose }) => (
  <div role="dialog">
    <button onClick={onClose}>Close</button>
  </div>
);
Toast.TIMEOUT = 200;

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

    it('should open and close a toast when the context functions are called', () => {
      const Trigger = () => {
        const { setToast } = useContext(ToastContext);
        return (
          <>
            <button onClick={() => setToast(toast)}>Open toast</button>
          </>
        );
      };

      const { getByRole, getByText } = render(
        <ToastProvider>
          <Trigger />
        </ToastProvider>,
      );

      act(() => {
        fireEvent.click(getByText('Open toast'));
      });

      expect(getByRole('dialog')).toBeVisible();
    });

    it('should close the toast when the onClose method is called', () => {
      const Trigger = () => {
        const { setToast } = useContext(ToastContext);
        return (
          <>
            <button onClick={() => setToast(toast)}>Open toast</button>
          </>
        );
      };

      const { queryByRole } = render(
        <ToastProvider>
          <Trigger />
        </ToastProvider>,
      );
      act(() => {
        userEvent.click(queryByRole('button'));
        jest.runAllTimers();
      });

      expect(queryByRole('dialog')).toBeNull();
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
