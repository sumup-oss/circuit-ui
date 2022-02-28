/**
 * Copyright 2022, SumUp Ltd.
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

import { SidePanel, SidePanelProps } from './SidePanel';

jest.mock('../../util/id', () => ({
  uniqueId: () => 'the_one',
}));

describe('SidePanel', () => {
  const baseProps: SidePanelProps = {
    backButtonLabel: 'Back',
    children: () => <p data-testid="children">Side panel content</p>,
    closeButtonLabel: 'Close',
    headline: 'Side panel title',
    isBottomPanelClosing: false,
    isInstantOpen: false,
    isMobile: false,
    isStacked: false,
    onBack: undefined,
    onClose: undefined,
    top: '0px',
    // Silences the warning about the missing app element.
    // In user land, the side panel is always rendered by the SidePanelProvider,
    // which takes care of setting the app element.
    // http://reactcommunity.org/react-modal/accessibility/#app-element
    ariaHideApp: false,
    // Keep the modal opened by setting the react-modal isOpen prop.
    // Usually this is controlled by the SidePanelProvider.
    isOpen: true,
    // Close the modals instantly to prevent buildup of `ReactModalPortal__SidePanel` div elements.
    closeTimeoutMS: 0,
  };

  const renderComponent = (props: Partial<SidePanelProps> = {}) =>
    render(<SidePanel {...baseProps} {...props} />);

  it('should match the snapshot', () => {
    const { baseElement } = renderComponent();
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the side panel', () => {
    const { getByRole } = renderComponent();
    expect(getByRole('dialog')).toBeVisible();
  });

  it('should render the children render prop', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('children')).toHaveTextContent('Side panel content');
  });

  it('should render the header', () => {
    const { getByText } = renderComponent();
    expect(getByText(baseProps.headline)).toBeVisible();
  });

  it('should call the onClose callback from the close button', () => {
    const onClose = jest.fn();
    const { getByTitle } = renderComponent({ onClose });

    act(() => {
      userEvent.click(getByTitle(baseProps.closeButtonLabel));
    });

    expect(onClose).toHaveBeenCalled();
  });

  it('should call the onClose callback from the onClose render prop', () => {
    const onClose = jest.fn();
    const { getByTestId } = renderComponent({
      children: ({ onClose: onCloseRenderProp }) => (
        <button data-testid="close" onClick={onCloseRenderProp}>
          Close
        </button>
      ),
      onClose,
    });

    act(() => {
      userEvent.click(getByTestId('close'));
    });

    expect(onClose).toHaveBeenCalled();
  });

  it('should call the onClose callback when Esc is pressed', () => {
    const onClose = jest.fn();
    renderComponent({ onClose });

    act(() => {
      userEvent.keyboard('{escape}');
    });

    expect(onClose).toHaveBeenCalled();
  });

  describe('when the panel is not stacked', () => {
    it('should not show the back button', () => {
      const { queryByTitle } = renderComponent();

      expect(queryByTitle(baseProps.backButtonLabel)).toBeNull();
    });
  });

  describe('when the panel is stacked', () => {
    it('should show the back button', () => {
      const onBack = jest.fn();
      const { getByTitle } = renderComponent({
        isStacked: true,
        onBack,
      });

      expect(getByTitle(baseProps.backButtonLabel)).toBeVisible();
    });

    it('should call the onBack callback from the back button', () => {
      const onBack = jest.fn();
      const { getByTitle } = renderComponent({
        isStacked: true,
        onBack,
      });

      act(() => {
        userEvent.click(getByTitle(baseProps.backButtonLabel));
      });

      expect(onBack).toHaveBeenCalled();
    });

    it('should call the onBack callback from the onBack render prop', () => {
      const onBack = jest.fn();
      const { getByTestId } = renderComponent({
        children: ({ onBack: onBackRenderProp }) => (
          <button data-testid="back" onClick={onBackRenderProp}>
            Back
          </button>
        ),
        isStacked: true,
        onBack,
      });

      act(() => {
        userEvent.click(getByTestId('back'));
      });

      expect(onBack).toHaveBeenCalled();
    });

    it('should call the onBack callback when Esc is pressed', () => {
      const onBack = jest.fn();
      renderComponent({
        isStacked: true,
        onBack,
      });

      act(() => {
        userEvent.keyboard('{escape}');
      });

      expect(onBack).toHaveBeenCalled();
    });
  });

  describe('when the panel is on desktop resolution', () => {
    it('should describe the side panel as modal', () => {
      const { getByRole } = renderComponent();
      expect(getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('when the panel is on mobile resolution', () => {
    it('should match the snapshot', () => {
      const { baseElement } = renderComponent({ isMobile: true });
      expect(baseElement).toMatchSnapshot();
    });

    it('should describe the side panel as modal', () => {
      const { getByRole } = renderComponent({ isMobile: true });
      expect(getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = renderComponent();
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
