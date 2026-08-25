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
import { createRef } from 'react';
import { Close } from '@sumup-oss/icons';

import {
  render,
  axe,
  screen,
  userEvent,
  within,
} from '../../util/test-utils.js';

import { IconButton } from './IconButton.js';

describe('IconButton', () => {
  it('should render an icon passed a prop', () => {
    render(
      <IconButton icon={(props) => <svg {...props} data-testid="icon" />}>
        Close
      </IconButton>,
    );
    const icon = screen.getByTestId('icon');
    expect(icon).toBeVisible();
  });

  it('should render a visually hidden label', () => {
    render(<IconButton icon={Close}>Close</IconButton>);
    const button = screen.getByRole('button');
    const label = within(button).getByText('Close');
    expect(label).toBeInTheDocument();
  });

  it('should render with an accessible name', () => {
    render(<IconButton icon={Close}>Close</IconButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveAccessibleName('Close');
  });

  it('should forward a ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <IconButton icon={Close} ref={ref}>
        Close
      </IconButton>,
    );
    const button = screen.getByRole('button');
    expect(ref.current).toBe(button);
  });

  it('should merge a custom className', () => {
    render(
      <IconButton icon={Close} className="foo">
        Close
      </IconButton>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('foo');
  });

  it('should not render a native title attribute', () => {
    render(<IconButton icon={Close}>Close</IconButton>);
    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('title');
  });

  it('should render a tooltip with the label text', () => {
    render(<IconButton icon={Close}>Close</IconButton>);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent('Close');
    expect(tooltip).toHaveAttribute('data-state', 'closed');
  });

  it('should open the tooltip when the button is focused', async () => {
    render(<IconButton icon={Close}>Close</IconButton>);

    await userEvent.tab();

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveAttribute('data-state', 'open');
  });

  it('should open the tooltip when the button is hovered', async () => {
    render(<IconButton icon={Close}>Close</IconButton>);
    const button = screen.getByRole('button');

    await userEvent.hover(button);

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveAttribute('data-state', 'open');
  });

  it('should call a custom onFocus handler in addition to opening the tooltip', async () => {
    const onFocus = vi.fn();
    render(
      <IconButton icon={Close} onFocus={onFocus}>
        Close
      </IconButton>,
    );

    await userEvent.tab();

    expect(onFocus).toHaveBeenCalledTimes(1);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveAttribute('data-state', 'open');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<IconButton icon={Close}>Close</IconButton>);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
