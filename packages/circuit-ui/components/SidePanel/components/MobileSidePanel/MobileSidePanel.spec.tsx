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

import { describe, expect, it } from 'vitest';

import { render, axe, screen } from '../../../../util/test-utils.js';

import {
  MobileSidePanel,
  type MobileSidePanelProps,
} from './MobileSidePanel.js';

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

  it('should render the side panel', () => {
    renderComponent();
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('should describe the side panel as modal', () => {
    renderComponent();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
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
