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
} from '../../util/test-utils.js';

import { SidePanel, type SidePanelProps } from './SidePanel.js';

describe('SidePanel', () => {
  const closeButtonLabel = 'Close';
  const baseProps: SidePanelProps = {
    backButtonLabel: 'Back',
    children: () => <p data-testid="children">Side panel content</p>,
    closeButtonLabel,
    headline: 'Side panel title',
    isMobile: false,
    onBack: undefined,
    onClose: () => {},
    // Keep the modal opened by setting the Dialog open prop.
    // Usually this is controlled by the SidePanelProvider.
    open: true,
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

    await userEvent.click(screen.getByTitle(closeButtonLabel));

    expect(onClose).toHaveBeenCalled();
  });

  it('should call the onClose callback from the onClose render prop', async () => {
    const onClose = vi.fn();
    renderComponent({
      children: ({ onClose: onCloseRenderProp }) => (
        <button data-testid="close" type="button" onClick={onCloseRenderProp}>
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
      renderComponent({ onBack });

      expect(
        screen.getByTitle(baseProps.backButtonLabel as string),
      ).toBeVisible();
    });

    it('should call the onBack callback from the back button', async () => {
      const onBack = vi.fn();
      renderComponent({ onBack });

      await userEvent.click(
        screen.getByTitle(baseProps.backButtonLabel as string),
      );

      expect(onBack).toHaveBeenCalled();
    });

    it('should call the onBack callback from the onBack render prop', async () => {
      const onBack = vi.fn();
      renderComponent({
        children: ({ onBack: onBackRenderProp }) => (
          <button data-testid="back" type="button" onClick={onBackRenderProp}>
            Back
          </button>
        ),
        onBack,
      });

      await userEvent.click(screen.getByTestId('back'));

      expect(onBack).toHaveBeenCalled();
    });

    it('should call the onBack callback when Esc is pressed', async () => {
      const onBack = vi.fn();
      renderComponent({ onBack });

      await userEvent.keyboard('{Escape}');

      expect(onBack).toHaveBeenCalled();
    });
  });

  describe('when the panel is on desktop resolution', () => {
    it('should open the side panel as non-modal', () => {
      const { rerender } = render(<SidePanel {...baseProps} open={false} />);
      const dialog = screen.getByRole('dialog', { hidden: true });
      vi.spyOn(dialog, 'show');
      rerender(<SidePanel {...baseProps} open />);
      expect(dialog.show).toHaveBeenCalledOnce();
    });
  });

  describe('when the panel is on mobile resolution', () => {
    it('should describe the side panel as modal', () => {
      const { rerender } = render(
        <SidePanel {...baseProps} isMobile open={false} />,
      );
      const dialog = screen.getByRole('dialog', { hidden: true });
      vi.spyOn(dialog, 'showModal');
      rerender(<SidePanel {...baseProps} isMobile open />);
      expect(dialog.showModal).toHaveBeenCalledOnce();
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
