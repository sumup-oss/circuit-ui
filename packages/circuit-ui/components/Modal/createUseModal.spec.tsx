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

import { describe, expect, it, vi } from 'vitest';
import type { PropsWithChildren } from 'react';

import { renderHook, act } from '../../util/test-utils.js';

import { createUseModal } from './createUseModal.js';
import { ModalContext } from './ModalContext.js';
import { Modal, type ModalProps } from './Modal.js';

const ModalComponent = (props: ModalProps) => <Modal {...props} />;

const props = {
  onClose: vi.fn(),
  open: false,
  closeButtonLabel: 'Close',
  children: vi.fn(() => <div data-testid="children">Modal dialog content</div>),
};

describe('createUseModal', () => {
  const useModal = createUseModal(ModalComponent);

  const setModal = vi.fn();
  const removeModal = vi.fn();

  const wrapper = ({ children }: PropsWithChildren) => (
    <ModalContext.Provider value={{ setModal, removeModal }}>
      {children}
    </ModalContext.Provider>
  );

  it('should add the modal when setModal is called', () => {
    const { result } = renderHook(() => useModal(), { wrapper });

    act(() => {
      result.current.setModal(props);
    });

    const expected = expect.objectContaining({
      component: expect.any(Function),
      id: expect.any(String),
    });
    expect(setModal).toHaveBeenCalledWith(expected);
  });

  it('should remove the modal when removeModal is called', () => {
    const { result } = renderHook(() => useModal(), { wrapper });

    act(() => {
      result.current.setModal(props);
    });

    act(() => {
      result.current.removeModal();
    });

    const expected = expect.any(Object);
    expect(removeModal).toHaveBeenCalledWith(expected);
  });
});
