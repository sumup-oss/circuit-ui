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
import { cleanStores } from 'nanostores';

import { renderHook, act } from '../../util/test-utils.js';

import { createUseModal } from './createUseModal.js';
import type { ModalComponent } from './types.js';
import { $modals } from './ModalContext.js';

const Modal: ModalComponent = ({ onClose }) => (
  <div role="dialog">
    <button onClick={onClose}>Close</button>
  </div>
);
Modal.TRANSITION_DURATION = 200;

describe('createUseModal', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    $modals.set([]);
    cleanStores($modals);
  });

  const useModal = createUseModal(Modal);

  it('should add the modal when setModal is called', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.setModal({});
    });

    const expected = expect.arrayContaining([
      expect.objectContaining({
        component: expect.any(Function),
        id: expect.any(String),
      }),
    ]);
    expect($modals.get()).toEqual(expected);
  });

  it('should remove the modal when removeModal is called', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.setModal({});
    });

    act(() => {
      result.current.removeModal();
    });

    act(() => {
      vi.runAllTimers();
    });

    expect($modals.get()).toHaveLength(0);
  });
});
