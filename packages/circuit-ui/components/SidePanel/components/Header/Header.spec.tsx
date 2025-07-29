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

import { render, userEvent, axe, screen } from '../../../../util/test-utils.js';

import { Header, type HeaderProps } from './Header.js';

describe('Header', () => {
  const baseProps = {
    backButtonLabel: 'Back',
    closeButtonLabel: 'Close',
    headline: 'Side panel title',
    id: 'side-panel-header',
    isSticky: false,
    onBack: undefined,
    onClose: vi.fn(),
  } satisfies HeaderProps;

  const renderComponent = (props: Partial<HeaderProps> = {}) =>
    render(<Header {...baseProps} {...props} />);

  it('should render the header text', () => {
    renderComponent();
    expect(screen.getByText(baseProps.headline)).toBeVisible();
  });

  it('should call the onClose callback from the close button', async () => {
    const onClose = vi.fn();
    renderComponent({ onClose });

    await userEvent.click(screen.getByTitle(baseProps.closeButtonLabel));

    expect(onClose).toHaveBeenCalled();
  });

  it('should show the back button when onBack is passed', () => {
    const onBack = vi.fn();
    renderComponent({
      onBack,
    });

    expect(screen.getByTitle(baseProps.backButtonLabel)).toBeVisible();
  });

  it('should call the onBack callback from the back button', async () => {
    const onBack = vi.fn();
    renderComponent({
      onBack,
    });

    await userEvent.click(screen.getByTitle(baseProps.backButtonLabel));

    expect(onBack).toHaveBeenCalled();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderComponent();
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
