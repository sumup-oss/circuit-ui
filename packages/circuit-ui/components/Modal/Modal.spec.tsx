/**
 * Copyright 2019, SumUp Ltd.
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

import {
  render,
  userEvent,
  axe,
  waitFor,
  screen,
} from '../../util/test-utils.js';

import { Modal, type ModalProps } from './Modal.js';

describe('Modal', () => {
  const defaultModal: ModalProps = {
    variant: 'immersive',
    isOpen: true,
    closeButtonLabel: 'Close modal',
    onClose: vi.fn(),
    // eslint-disable-next-line react/prop-types, react/display-name
    children: <p data-testid="children">Hello world!</p>,
    // Silences the warning about the missing app element.
    // In user land, the modal is always rendered by the ModalProvider,
    // which takes care of setting the app element.
    // http://reactcommunity.org/react-modal/accessibility/#app-element
    ariaHideApp: false,
  };

  it('should render the modal', async () => {
    render(<Modal {...defaultModal} />);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible();
    });
  });

  it('should call the onClose callback', async () => {
    render(<Modal {...defaultModal} />);

    await userEvent.click(screen.getByRole('button'));

    expect(defaultModal.onClose).toHaveBeenCalled();
  });

  it('should render the children render prop', () => {
    render(<Modal {...defaultModal} />);
    expect(screen.getByTestId('children')).toHaveTextContent('Hello world!');
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Modal {...defaultModal} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
