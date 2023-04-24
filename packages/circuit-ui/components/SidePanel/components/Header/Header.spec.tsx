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

import { render, userEvent, axe } from '../../../../util/test-utils.jsx';

import { Header, HeaderProps } from './Header.jsx';

describe('Header', () => {
  const baseProps: HeaderProps = {
    backButtonLabel: 'Back',
    closeButtonLabel: 'Close',
    headline: 'Side panel title',
    id: 'side-panel-header',
    isSticky: false,
    onBack: undefined,
    onClose: undefined,
  };

  const renderComponent = (props: Partial<HeaderProps> = {}) =>
    render(<Header {...baseProps} {...props} />);

  it('should match the snapshot', () => {
    const { baseElement } = renderComponent();
    expect(baseElement).toMatchSnapshot();
  });

  it('should have a bottom separator when sticky', () => {
    const { baseElement } = renderComponent({ isSticky: true });
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the header text', () => {
    const { getByText } = renderComponent();
    expect(getByText(baseProps.headline)).toBeVisible();
  });

  it('should call the onClose callback from the close button', async () => {
    const onClose = vi.fn();
    const { getByTitle } = renderComponent({ onClose });

    await userEvent.click(getByTitle(baseProps.closeButtonLabel));

    expect(onClose).toHaveBeenCalled();
  });

  it('should show the back button when onBack is passed', () => {
    const onBack = vi.fn();
    const { getByTitle } = renderComponent({
      onBack,
    });

    expect(getByTitle(baseProps.backButtonLabel)).toBeVisible();
  });

  it('should call the onBack callback from the back button', async () => {
    const onBack = vi.fn();
    const { getByTitle } = renderComponent({
      onBack,
    });

    await userEvent.click(getByTitle(baseProps.backButtonLabel));

    expect(onBack).toHaveBeenCalled();
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = renderComponent();
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
