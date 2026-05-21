/**
 * Copyright 2026, SumUp Ltd.
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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { act, axe, fireEvent, render, screen } from '../../util/test-utils.js';
import { ToastProvider } from '../ToastContext/index.js';

import { CopyButton } from './CopyButton.js';

const defaultProps = {
  label: 'API token',
  value: 'secret-token',
  copyLabel: 'Copy token',
  onCopyLabel: 'Copied to clipboard.',
};

const renderWithToastProvider = (ui: React.ReactNode) =>
  render(<ToastProvider>{ui}</ToastProvider>);

describe('CopyButton', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render the input variant in a readonly input', () => {
    render(<CopyButton {...defaultProps} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    expect(
      screen.getByRole('button', { name: 'Copy token: API token' }),
    ).toBeVisible();
    expect(screen.getByDisplayValue(defaultProps.value)).toBeVisible();
  });

  it('should render text instead of value in the input variant when provided', () => {
    render(<CopyButton {...defaultProps} text="••••••••••••token" />);

    expect(screen.getByDisplayValue('••••••••••••token')).toBeVisible();
    expect(
      screen.queryByDisplayValue(defaultProps.value),
    ).not.toBeInTheDocument();
  });

  it('should show a notification toast when the input variant copies successfully', async () => {
    const onCopy = vi.fn();

    renderWithToastProvider(
      <CopyButton
        {...defaultProps}
        onCopyLabel="Token copied"
        onCopy={onCopy}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Copy token: API token' }),
    );

    await act(async () => {
      await Promise.resolve();
    });

    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Token copied')).toBeInTheDocument();
  });

  it('should render the button variant and show feedback after copying', async () => {
    renderWithToastProvider(
      <CopyButton
        copyVariant="button"
        value="secret-token"
        copyLabel="Copy token"
        onCopyLabel="Copied to clipboard."
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Copy token' }));

    await act(async () => {
      await Promise.resolve();
    });

    expect(await screen.findByRole('status')).toHaveTextContent(
      'Copied to clipboard.',
    );
  });

  it('should render the icon variant', () => {
    render(
      <CopyButton
        copyVariant="icon"
        value="secret-token"
        copyLabel="Copy token"
        onCopyLabel="Copied to clipboard."
      />,
    );

    expect(screen.getByRole('button', { name: 'Copy token' })).toBeVisible();
  });

  it('should fall back to execCommand when navigator.clipboard is unavailable', async () => {
    const execCommand = vi.fn();
    const selection = {
      addRange: vi.fn(),
      removeAllRanges: vi.fn(),
    };

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: execCommand,
    });
    Object.defineProperty(window, 'getSelection', {
      configurable: true,
      value: vi.fn(() => selection),
    });

    renderWithToastProvider(
      <CopyButton {...defaultProps} onCopyLabel="Token copied" />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Copy token: API token' }),
    );

    await act(async () => {
      await Promise.resolve();
    });

    expect(execCommand).toHaveBeenCalledWith('copy');
    expect(selection.removeAllRanges).toHaveBeenCalledTimes(2);
    expect(selection.addRange).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Token copied')).toBeInTheDocument();
  });

  it('should not announce success when clipboard write fails', async () => {
    const onCopy = vi.fn();

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockRejectedValue(new Error('clipboard denied')),
      },
    });

    renderWithToastProvider(<CopyButton {...defaultProps} onCopy={onCopy} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Copy token: API token' }),
    );

    await act(async () => {
      await Promise.resolve();
    });

    expect(onCopy).not.toHaveBeenCalled();
    expect(screen.queryByText('Copied to clipboard.')).not.toBeInTheDocument();
  });

  it('should disable copying when the value is empty', () => {
    render(<CopyButton {...defaultProps} value="" text="N/A" />);

    expect(
      screen.getByRole('button', { name: 'Copy token: API token' }),
    ).toHaveAttribute('aria-disabled', 'true');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithToastProvider(
      <CopyButton {...defaultProps} />,
    );

    const actual = await axe(container);

    expect(actual).toHaveNoViolations();
  });
});
