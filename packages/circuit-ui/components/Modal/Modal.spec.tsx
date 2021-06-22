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

import { render, act, userEvent, axe } from '../../util/test-utils';

import { Modal, ModalProps } from './Modal';

describe('Modal', () => {
  const defaultModal: ModalProps = {
    variant: 'immersive',
    isOpen: true,
    labelCloseButton: 'Close modal',
    onClose: jest.fn(),
    // eslint-disable-next-line react/prop-types, react/display-name
    children: () => <p data-testid="children">Hello world!</p>,
    // Silences the warning about the missing app element.
    // In user land, the modal is always rendered by the ModalProvider,
    // which takes care of setting the app element.
    // http://reactcommunity.org/react-modal/accessibility/#app-element
    ariaHideApp: false,
  };

  it('should match the snapshot', () => {
    const { baseElement } = render(<Modal {...defaultModal} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the modal', () => {
    const { getByRole } = render(<Modal {...defaultModal} />);
    expect(getByRole('dialog')).toBeVisible();
  });

  it('should call the onClose callback', () => {
    const { getByRole } = render(<Modal {...defaultModal} />);

    act(() => {
      userEvent.click(getByRole('button'));
    });

    expect(defaultModal.onClose).toHaveBeenCalled();
  });

  it('should render the children render prop', () => {
    const { getByTestId } = render(<Modal {...defaultModal} />);
    expect(getByTestId('children')).toHaveTextContent('Hello world!');
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Modal {...defaultModal} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
