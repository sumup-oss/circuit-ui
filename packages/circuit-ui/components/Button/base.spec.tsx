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

import { render, axe, userEvent, screen } from '../../util/test-utils.js';

import { BaseButton, type SharedButtonProps } from './base.js';

declare const process: {
  env: { NODE_ENV: string };
};

function Button({ size, ...props }: SharedButtonProps) {
  return (
    <BaseButton componentName="TestButton" size="m" {...props}>
      Button
    </BaseButton>
  );
}

describe('Button', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(<Button className={className} />);
    const button = container.querySelector('button');
    expect(button?.className).toContain(className);
  });

  describe('business logic', () => {
    it('should render as a link when passed the href prop', () => {
      render(<Button href="#" onClick={vi.fn()} />);
      const buttonEl = screen.getByRole('link');
      expect(buttonEl.tagName).toBe('A');
      expect(buttonEl).toHaveAttribute('href');
    });

    it('should render as a custom element when passed the as prop', () => {
      const CustomLink = ({ children, ...props }: SharedButtonProps) => (
        <a {...props} href="https://sumup.com">
          {children}
        </a>
      );
      render(<Button as={CustomLink} />);
      const linkEl = screen.getByRole('link');
      expect(linkEl).toHaveAttribute('href');
    });

    it('should render loading button with loading label', () => {
      const loadingLabel = 'Submitting form';
      render(<Button isLoading loadingLabel={loadingLabel} />);
      expect(screen.getByText(loadingLabel)).toBeVisible();
    });

    it('should call the onClick handler when clicked', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick} />);

      await userEvent.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should render as disabled', () => {
      render(<Button disabled />);

      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render as disabled when loading', () => {
      render(<Button isLoading />);

      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render as disabled when not loading', () => {
      render(<Button disabled isLoading={false} />);

      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not call the onClick handler when disabled', async () => {
      const onClick = vi.fn();
      render(<Button disabled onClick={onClick} />);

      await userEvent.click(screen.getByRole('button'));

      expect(onClick).not.toHaveBeenCalled();
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
      const { container } = render(<Button ref={ref} />);
      const button = container.querySelector('button');
      expect(ref.current).toBe(button);
    });

    it('should forward a ref to the link', () => {
      const ref = createRef<HTMLAnchorElement>();
      const { container } = render(
        <Button href="http://sumup.com" ref={ref} />,
      );
      const anchor = container.querySelector('a');
      expect(ref.current).toBe(anchor);
    });

    it('should render button with display: none when hidden attribute is set', () => {
      const { container } = render(<Button hidden />);
      const button = container.querySelector('button');
      expect(button).toHaveStyle({ display: 'none' });
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = render(<Button>Button</Button>);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it('should meet accessibility guidelines for Loading button', async () => {
      const { container } = render(<Button isLoading={true}>Button</Button>);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it('should have aria-busy and aria-live for a loading button', () => {
      render(<Button isLoading />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-live', 'polite');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should not have aria-busy and aria-live for a regular button', () => {
      render(<Button />);
      const button = screen.getByRole('button');

      expect(button).not.toHaveAttribute('aria-live');
      expect(button).not.toHaveAttribute('aria-busy');
    });

    it('should throw an AccessibilityError when it has an external link without externalLabel', () => {
      // Silence the console.error output and switch to development mode to throw the error
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      process.env.NODE_ENV = 'development';

      expect(() =>
        render(
          <Button href="www.foo.bar" target="_blank">
            Visit site
          </Button>,
        ),
      ).toThrow(
        expect.objectContaining({
          message: expect.stringContaining(
            '[Button] An external link is missing an alternative text',
          ),
        }),
      );
      process.env.NODE_ENV = 'test';
      vi.restoreAllMocks();
    });

    it('should throw an error when children is not a string', () => {
      // Silence the console.error output and switch to development mode to throw the error
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      process.env.NODE_ENV = 'development';

      expect(() =>
        render(
          <BaseButton componentName="TestButton" size="m">
            <span>foo</span>
          </BaseButton>,
        ),
      ).toThrow(
        expect.objectContaining({
          message: expect.stringContaining(
            '[TestButton] The `children` prop must be a string.',
          ),
        }),
      );

      process.env.NODE_ENV = 'test';
      vi.restoreAllMocks();
    });

    it('should throw an error when children is not provided', () => {
      // Silence the console.error output and switch to development mode to throw the error
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      process.env.NODE_ENV = 'development';

      expect(() =>
        // @ts-expect-error intentionally withholding the children prop
        render(<BaseButton componentName="TestButton" size="m" />),
      ).toThrow(
        expect.objectContaining({
          message: expect.stringContaining(
            '[TestButton] The `children` prop is missing or invalid.',
          ),
        }),
      );

      process.env.NODE_ENV = 'test';
      vi.restoreAllMocks();
    });
  });
});
