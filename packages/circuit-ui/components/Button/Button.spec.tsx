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

import { render, axe, userEvent } from '../../util/test-utils.js';

import { Button, ButtonProps } from './Button.js';

describe('Button', () => {
  function renderButton(props: ButtonProps) {
    return render(<Button {...props} />);
  }

  const baseProps = { children: 'Button' };

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = renderButton({ ...baseProps, className });
    const button = container.querySelector('button');
    expect(button?.className).toContain(className);
  });

  describe('business logic', () => {
    it('should render as a link when passed the href prop', () => {
      const props = {
        ...baseProps,
        'href': '#',
        'onClick': vi.fn(),
        'data-testid': 'link-button',
      };
      const { getByTestId } = renderButton(props);
      const buttonEl = getByTestId('link-button');
      expect(buttonEl.tagName).toBe('A');
      expect(buttonEl).toHaveAttribute('href');
    });

    it('should render as a custom element when passed the as prop', () => {
      const CustomLink = ({ children, ...props }: ButtonProps) => (
        <a {...props} href="https://sumup.com">
          {children}
        </a>
      );
      const props = { ...baseProps, as: CustomLink };
      const { getByRole } = renderButton(props);
      const linkEl = getByRole('link');
      expect(linkEl).toHaveAttribute('href');
    });

    it('should render loading button with loading label', () => {
      const loadingLabel = 'Loading';
      const props = {
        ...baseProps,
        isLoading: true,
        loadingLabel,
      };

      const { getByText } = renderButton(props);
      expect(getByText(loadingLabel)).toBeVisible();
    });

    it('should call the onClick handler when clicked', async () => {
      const props = {
        ...baseProps,
        'onClick': vi.fn(),
        'data-testid': 'link-button',
      };
      const { getByTestId } = renderButton(props);

      await userEvent.click(getByTestId('link-button'));

      expect(props.onClick).toHaveBeenCalledTimes(1);
    });

    it('should render as disabled', () => {
      const props = { ...baseProps, disabled: true };
      const { getByRole } = renderButton(props);

      const button = getByRole('button');

      expect(button).toBeDisabled();
    });

    it('should render as disabled when loading', () => {
      const props = {
        ...baseProps,
        isLoading: true,
        loadingLabel: 'Loading',
      };
      const { getByRole } = renderButton(props);

      const button = getByRole('button');

      expect(button).toBeDisabled();
    });

    it('should render as disabled when not loading', () => {
      const props = {
        ...baseProps,
        disabled: true,
        isLoading: false,
        loadingLabel: 'Loading',
      };
      const { getByRole } = renderButton(props);

      const button = getByRole('button');

      expect(button).toBeDisabled();
    });

    it('should accept a working ref for a button', () => {
      const tref = createRef<any>();
      const { container } = render(
        <Button ref={tref}>This is a button</Button>,
      );
      const button = container.querySelector('button');
      expect(tref.current).toBe(button);
    });

    it('should forward a ref to the button', () => {
      const ref = createRef<HTMLButtonElement>();
      const { container } = render(<Button {...baseProps} ref={ref} />);
      const button = container.querySelector('button');
      expect(ref.current).toBe(button);
    });

    it('should forward a ref to the link', () => {
      const ref = createRef<HTMLAnchorElement>();
      const { container } = render(
        <Button {...baseProps} href="http://sumup.com" ref={ref} />,
      );
      const anchor = container.querySelector('a');
      expect(ref.current).toBe(anchor);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = render(<Button>Button</Button>);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it('should meet accessibility guidelines for Loading button', async () => {
      const { container } = render(
        <Button isLoading={true} loadingLabel="Loading">
          Button
        </Button>,
      );
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it('should have aria-busy and aria-live for a loading button', () => {
      const { getByRole } = renderButton({
        ...baseProps,
        isLoading: true,
        loadingLabel: 'Loading...',
      });
      const button = getByRole('button');

      expect(button).toHaveAttribute('aria-live', 'polite');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should not have aria-busy and aria-live for a regular button', () => {
      const { getByRole } = renderButton({
        ...baseProps,
      });
      const button = getByRole('button');

      expect(button).not.toHaveAttribute('aria-live');
      expect(button).not.toHaveAttribute('aria-busy');
    });
  });
});
