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

import { render, act, axe } from '../../../../util/test-utils';

import { MobileSidePanel, MobileSidePanelProps } from './MobileSidePanel';

describe('MobileSidePanel', () => {
  const baseProps: MobileSidePanelProps = {
    isBottomPanelClosing: false,
    isStacked: false,
    // Silences the warning about the missing app element.
    // In user land, the side panel is always rendered by the SidePanelProvider,
    // which takes care of setting the app element.
    // http://reactcommunity.org/react-modal/accessibility/#app-element
    ariaHideApp: false,
    // Keep the modal opened by setting the react-modal isOpen prop.
    // Usually this is controlled by the SidePanelProvider.
    isOpen: true,
  };

  const renderComponent = (props: Partial<MobileSidePanelProps> = {}) =>
    render(<MobileSidePanel {...baseProps} {...props} />);

  it('should match the snapshot', () => {
    const { baseElement } = renderComponent();
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the side panel', () => {
    const { getByRole } = renderComponent();
    expect(getByRole('dialog')).toBeVisible();
  });

  it('should slide in from the bottom when the side panel is not stacked', () => {
    const { getByRole } = renderComponent();
    expect(getByRole('dialog')).toHaveStyle('transform: translateY(100%)');
  });

  it('should slide in from the right when the side panel is stacked', () => {
    const { getByRole } = renderComponent({ isStacked: true });
    expect(getByRole('dialog')).toHaveStyle('transform: translateX(100%)');
  });

  it('should slide out towards the bottom when the side panel is not stacked', () => {
    const props = {
      isBottomPanelClosing: true,
      isStacked: true,
    };

    const { getByRole, rerender } = renderComponent(props);

    act(() => {
      rerender(<MobileSidePanel {...baseProps} {...props} isOpen={false} />);
    });

    expect(getByRole('dialog')).toMatchSnapshot();
  });

  it('should slide out towards the right when the side panel is stacked', () => {
    const props = {
      isStacked: true,
    };

    const { getByRole, rerender } = renderComponent(props);

    act(() => {
      rerender(<MobileSidePanel {...baseProps} {...props} isOpen={false} />);
    });

    expect(getByRole('dialog')).toMatchSnapshot();
  });

  it('should slide out towards the bottom when the side panel is stacked and all panels are closing', () => {
    const props = {
      isBottomPanelClosing: true,
      isStacked: true,
    };

    const { getByRole, rerender } = renderComponent(props);

    act(() => {
      rerender(<MobileSidePanel {...baseProps} {...props} isOpen={false} />);
    });

    expect(getByRole('dialog')).toMatchSnapshot();
  });

  it('should describe the side panel as modal', () => {
    const { getByRole } = renderComponent();
    expect(getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = renderComponent();
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
