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

import { describe, expect, it, vi } from 'vitest';

import {
  render,
  userEvent,
  axe,
  waitFor,
  screen,
} from '../../util/test-utils';

import { SidePanel, type SidePanelProps } from './SidePanel';

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
    onClose: () => {},
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

  it('should render the side panel', () => {
    renderComponent();
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('should render the children render prop', () => {
    renderComponent();
    expect(screen.getByTestId('children')).toHaveTextContent(
      'Side panel content',
    );
  });

  it('should render the header', () => {
    renderComponent();
    expect(screen.getByText(baseProps.headline)).toBeVisible();
  });

  it('should call the onClose callback from the close button', async () => {
    const onClose = vi.fn();
    renderComponent({ onClose });

    await userEvent.click(screen.getByTitle(baseProps.closeButtonLabel));

    expect(onClose).toHaveBeenCalled();
  });

  it('should call the onClose callback from the onClose render prop', async () => {
    const onClose = vi.fn();
    renderComponent({
      children: ({ onClose: onCloseRenderProp }) => (
        <button data-testid="close" onClick={onCloseRenderProp}>
          Close
        </button>
      ),
      onClose,
    });

    await userEvent.click(screen.getByTestId('close'));

    expect(onClose).toHaveBeenCalled();
  });

  it('should call the onClose callback when Esc is pressed', async () => {
    const onClose = vi.fn();
    renderComponent({ onClose });

    const sidePanel = screen.getByText('Close');

    await waitFor(() => expect(sidePanel).toBeVisible());

    await userEvent.keyboard('{Escape}');

    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  describe('when the panel is not stacked', () => {
    it('should not show the back button', () => {
      renderComponent();

      expect(
        screen.queryByTitle(baseProps.backButtonLabel as string),
      ).toBeNull();
    });
  });

  describe('when the panel is stacked', () => {
    it('should show the back button', () => {
      const onBack = vi.fn();
      renderComponent({ isStacked: true, onBack });

      expect(
        screen.getByTitle(baseProps.backButtonLabel as string),
      ).toBeVisible();
    });

    it('should call the onBack callback from the back button', async () => {
      const onBack = vi.fn();
      renderComponent({ isStacked: true, onBack });

      await userEvent.click(
        screen.getByTitle(baseProps.backButtonLabel as string),
      );

      expect(onBack).toHaveBeenCalled();
    });

    it('should call the onBack callback from the onBack render prop', async () => {
      const onBack = vi.fn();
      renderComponent({
        children: ({ onBack: onBackRenderProp }) => (
          <button data-testid="back" onClick={onBackRenderProp}>
            Back
          </button>
        ),
        isStacked: true,
        onBack,
      });

      await userEvent.click(screen.getByTestId('back'));

      expect(onBack).toHaveBeenCalled();
    });

    it('should call the onBack callback when Esc is pressed', async () => {
      const onBack = vi.fn();
      renderComponent({ isStacked: true, onBack });

      await userEvent.keyboard('{Escape}');

      expect(onBack).toHaveBeenCalled();
    });
  });

  describe('when the panel is on desktop resolution', () => {
    it('should describe the side panel as modal', () => {
      renderComponent();
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('when the panel is on mobile resolution', () => {
    it('should describe the side panel as modal', () => {
      renderComponent({ isMobile: true });
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });
  });

  /**
   * FIXME: calling axe here triggers an act() warning.
   */
  it('should have no accessibility violations', async () => {
    const { container } = renderComponent();
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
