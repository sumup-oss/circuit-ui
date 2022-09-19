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

import { ReactElement } from 'react';

import { renderHook, act } from '../../util/test-utils';

import { createUseToast } from './createUseToast';
import { ToastContext } from './ToastContext';
import type { ToastComponent } from './types';

const Toast: ToastComponent = ({ onClose }) => (
  <div role="dialog" aria-label="Toast">
    <button onClick={onClose}>Close</button>
  </div>
);
Toast.TRANSITION_DURATION = 200;

describe('createUseToast', () => {
  const useToast = createUseToast(Toast);

  const setToast = jest.fn();
  const removeToast = jest.fn();

  const wrapper = ({ children }: { children: ReactElement }) => (
    <ToastContext.Provider value={{ setToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );

  it('should add the toast when setToast is called', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.setToast({});
    });

    const expected = expect.objectContaining({
      component: expect.any(Function),
      id: expect.any(String),
    });
    expect(setToast).toHaveBeenCalledWith(expected);
  });
});
