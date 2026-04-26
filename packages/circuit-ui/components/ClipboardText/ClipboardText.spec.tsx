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

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { act, axe, fireEvent, render, screen } from '../../util/test-utils.js';

import { ClipboardText } from './ClipboardText.js';

const defaultProps = {
  label: 'API token',
  value: 'secret-token',
  copyLabel: 'Copy value',
};

describe('ClipboardText', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render the value without using an input element', () => {
    render(<ClipboardText {...defaultProps} />);

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Copy value: API token' }),
    ).toBeVisible();
    expect(screen.getByText(defaultProps.value)).toBeVisible();
  });

  it('should expose the display text with label context', () => {
    render(<ClipboardText {...defaultProps} />);

    expect(screen.getByText('API token:').className).toContain('hide-visually');
    expect(screen.getByText(defaultProps.value)).toBeVisible();
  });

  it('should render text instead of value when provided', () => {
    render(<ClipboardText {...defaultProps} text="••••••••••••token" />);

    expect(screen.getByText('••••••••••••token')).toBeVisible();
    expect(screen.queryByText(defaultProps.value)).not.toBeInTheDocument();
  });

  it('should copy the current value when the button is clicked', async () => {
    vi.useFakeTimers();
    const onCopied = vi.fn();

    render(
      <ClipboardText
        {...defaultProps}
        copiedLabel="Copied value"
        onCopied={onCopied}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Copy value: API token' }),
    );

    await act(async () => {
      await Promise.resolve();
    });

    expect(onCopied).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole('button', { name: 'Copy value: API token' }),
    ).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent('Copied value');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Copy value: API token' }),
    );

    await act(async () => {
      await Promise.resolve();
    });

    expect(onCopied).toHaveBeenCalledTimes(2);
    expect(screen.getByRole('status')).toHaveTextContent('Copied value');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(
      screen.getByRole('button', { name: 'Copy value: API token' }),
    ).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent('Copied value');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(screen.getByText('', { selector: 'output' })).toBeEmptyDOMElement();
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

    render(<ClipboardText {...defaultProps} copiedLabel="Copied value" />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Copy value: API token' }),
    );

    await act(async () => {
      await Promise.resolve();
    });

    expect(execCommand).toHaveBeenCalledWith('copy');
    expect(selection.removeAllRanges).toHaveBeenCalledTimes(2);
    expect(selection.addRange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('status')).toHaveTextContent('Copied value');
  });

  it('should not announce copied state when clipboard write fails', async () => {
    const onCopied = vi.fn();

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockRejectedValue(new Error('clipboard denied')),
      },
    });

    render(<ClipboardText {...defaultProps} onCopied={onCopied} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Copy value: API token' }),
    );

    await act(async () => {
      await Promise.resolve();
    });

    expect(onCopied).not.toHaveBeenCalled();
    expect(screen.getByText('', { selector: 'output' })).toBeEmptyDOMElement();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ClipboardText {...defaultProps} />);

    const actual = await axe(container);

    expect(actual).toHaveNoViolations();
  });
});
