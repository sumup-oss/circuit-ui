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

import { render, axe } from '../../../../util/test-utils';

import { DesktopSidePanel, DesktopSidePanelProps } from './DesktopSidePanel';

describe('DesktopSidePanel', () => {
  const baseProps: DesktopSidePanelProps = {
    isInstantOpen: false,
    top: '0px',
    // Silences the warning about the missing app element.
    // In user land, the side panel is always rendered by the SidePanelProvider,
    // which takes care of setting the app element.
    // http://reactcommunity.org/react-modal/accessibility/#app-element
    ariaHideApp: false,
    // Keep the modal opened by setting the react-modal isOpen prop.
    // Usually this is controlled by the SidePanelProvider.
    isOpen: true,
  };

  const renderComponent = (props: Partial<DesktopSidePanelProps> = {}) =>
    render(<DesktopSidePanel {...baseProps} {...props} />);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should match the snapshot', () => {
    const { baseElement } = renderComponent();
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the side panel', () => {
    const { getByRole } = renderComponent();
    expect(getByRole('dialog')).toBeVisible();
  });

  it('should slide in from the right', () => {
    const { getByRole } = renderComponent();
    expect(getByRole('dialog')).toHaveStyle('transform: translateX(100%)');
  });

  it('should open without animation when isInstantOpen is true', () => {
    const { getByRole } = renderComponent({ isInstantOpen: true });
    jest.advanceTimersByTime(100);
    expect(getByRole('dialog')).toHaveStyle('transition: none');
  });

  it('should describe the side panel as modal', () => {
    const { getByRole } = renderComponent();
    expect(getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('should meet accessibility guidelines', async () => {
    jest.useRealTimers();
    const { container } = renderComponent();
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
