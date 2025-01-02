/**
 * Copyright 2024, SumUp Ltd.
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

import { render, axe, screen, userEvent } from '../../util/test-utils.js';
import type { PopoverReferenceProps } from '../Popover/Popover.js';

import { Toggletip } from './Toggletip.js';

const baseProps = {
  headline: 'What is a chargeback?',
  body: 'A chargeback is a return of money to a payer of a transaction, especially a credit card transaction.',
  action: {
    children: 'Learn more',
    onClick: vi.fn(),
    target: '_blank',
  },
  component: (props: PopoverReferenceProps) => (
    <button {...props}>Open toggletip</button>
  ),
} as const;

describe('Toggletip', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<Toggletip {...baseProps} className={className} defaultOpen />);
    const dialog = screen.getByRole('dialog');
    expect(dialog?.className).toContain(className);
  });

  it('should forward a ref to the dialog', () => {
    const ref = createRef<HTMLDialogElement>();
    render(<Toggletip {...baseProps} ref={ref} defaultOpen />);
    const dialog = screen.getByRole('dialog');
    expect(ref.current).toBe(dialog);
  });

  it('should use the headline and body as the label and description for the dialog element', () => {
    render(<Toggletip {...baseProps} defaultOpen />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName(baseProps.headline);
    expect(dialog).toHaveAccessibleDescription(baseProps.body);
  });

  it('should use the body as the label for the dialog element with no headline', () => {
    const { headline, ...props } = baseProps;
    render(<Toggletip {...props} defaultOpen />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName(props.body);
  });

  it('should be initially closed', () => {
    render(<Toggletip {...baseProps} />);
    const dialog = screen.queryByRole('dialog');
    expect(dialog).toBeNull();
  });

  it('should open when the reference element is clicked', async () => {
    render(<Toggletip {...baseProps} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('open');
  });

  it('should focus the action button when the dialog is opened', async () => {
    render(<Toggletip {...baseProps} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    const actionButton = screen.getByRole('button', { name: /learn more/i });
    expect(document.activeElement).toBe(actionButton);
  });

  it('should focus the close button when the dialog is opened with no action button', async () => {
    const { action, ...props } = baseProps;
    render(<Toggletip {...props} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(document.activeElement).toBe(closeButton);
  });

  it('should close when the escape key is pressed', async () => {
    render(<Toggletip {...baseProps} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('open');
    await userEvent.keyboard('{Escape}');
    expect(dialog).not.toHaveAttribute('open');
  });

  it('should close when clicking outside the dialog', async () => {
    render(<Toggletip {...baseProps} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    const dialog = screen.getByRole('dialog');
    await userEvent.click(document.body);
    expect(dialog).not.toHaveAttribute('open');
  });

  it('should close when the close button is pressed', async () => {
    render(<Toggletip {...baseProps} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    const dialog = screen.getByRole('dialog');
    const closeButton = screen.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);
    expect(dialog).not.toHaveAttribute('open');
  });

  it('should close when the action button is pressed', async () => {
    render(<Toggletip {...baseProps} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    const dialog = screen.getByRole('dialog');
    const actionButton = screen.getByRole('button', { name: /learn more/i });
    await userEvent.click(actionButton);
    expect(dialog).not.toHaveAttribute('open');
    expect(baseProps.action.onClick).toHaveBeenCalledOnce();
    expect(baseProps.action.onClick).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Toggletip {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
