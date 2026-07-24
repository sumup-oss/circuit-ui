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

import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  axe,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../util/test-utils.js';
import { ToastProvider } from '../ToastContext/index.js';

import { CopyButton } from './CopyButton.js';

const defaultProps = {
  label: 'API token',
  value: 'secret-token',
  copyLabel: 'Copy token',
  successLabel: 'Copied to clipboard.',
};

const buttonVariants = [
  {
    name: 'button',
    props: {
      copyVariant: 'button',
      value: 'secret-token',
      copyLabel: 'Copy token',
      successLabel: 'Copied to clipboard.',
    },
    buttonName: 'Copy token',
    description: 'secret-token',
  },
  {
    name: 'icon button',
    props: {
      copyVariant: 'icon-button',
      value: 'secret-token',
      copyLabel: 'Copy token',
      successLabel: 'Copied to clipboard.',
    },
    buttonName: 'Copy token',
    description: 'secret-token',
  },
] satisfies {
  name: string;
  props: React.ComponentProps<typeof CopyButton>;
  buttonName: string;
  description: string;
}[];

const variants = [
  {
    name: 'input',
    props: defaultProps,
    buttonName: 'Copy token',
  },
  ...buttonVariants,
] satisfies {
  name: string;
  props: React.ComponentProps<typeof CopyButton>;
  buttonName: string;
}[];

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
    expect(screen.getByRole('button', { name: 'Copy token' })).toBeVisible();
    expect(screen.getByDisplayValue(defaultProps.value)).toBeVisible();
  });

  it('should render text instead of value in the input variant when provided', () => {
    render(<CopyButton {...defaultProps} visibleValue="••••••••••••token" />);

    expect(screen.getByDisplayValue('••••••••••••token')).toBeVisible();
    expect(
      screen.queryByDisplayValue(defaultProps.value),
    ).not.toBeInTheDocument();
  });

  describe.each(variants)('as $name', ({ props, buttonName }) => {
    it('should show a notification toast when copying succeeds', async () => {
      const onCopy = vi.fn();

      renderWithToastProvider(
        <CopyButton {...props} successLabel="Token copied" onCopy={onCopy} />,
      );

      await userEvent.click(screen.getByRole('button', { name: buttonName }));

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(props.value);
      expect(onCopy).toHaveBeenCalledTimes(1);
      expect(await screen.findByText('Token copied')).toBeInTheDocument();
    });

    it('should have no accessibility violations', async () => {
      const { container } = renderWithToastProvider(<CopyButton {...props} />);

      const actual = await axe(container);

      expect(actual).toHaveNoViolations();
    });

    it('should disable copying when the value is empty', () => {
      render(<CopyButton {...props} value="" />);

      expect(screen.getByRole('button', { name: buttonName })).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });

    it('should forward refs to the control', () => {
      const ref = createRef<HTMLInputElement | HTMLButtonElement>();

      render(<CopyButton {...props} ref={ref} />);

      expect(ref.current).toBeInstanceOf(
        props.copyVariant === 'button' || props.copyVariant === 'icon-button'
          ? HTMLButtonElement
          : HTMLInputElement,
      );
    });

    it('should merge a custom class name with the default ones', () => {
      const className = 'custom-class';
      const { container } = render(
        <CopyButton {...props} className={className} />,
      );

      if (
        props.copyVariant === 'button' ||
        props.copyVariant === 'icon-button'
      ) {
        expect(screen.getByRole('button', { name: buttonName })).toHaveClass(
          className,
        );
        return;
      }

      expect(container.firstElementChild).toHaveClass(className);
    });
  });

  describe.each(buttonVariants)('as $name', ({
    props,
    buttonName,
    description,
  }) => {
    it('should describe the copied value when it is not visible', () => {
      render(<CopyButton {...props} />);

      expect(
        screen.getByRole('button', { name: buttonName }),
      ).toHaveAccessibleDescription(description);
    });
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

    await userEvent.click(screen.getByRole('button', { name: 'Copy token' }));

    await waitFor(() =>
      expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1),
    );

    expect(onCopy).not.toHaveBeenCalled();
    expect(screen.queryByText('Copied to clipboard.')).not.toBeInTheDocument();
  });
});
